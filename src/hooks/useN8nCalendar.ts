import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface Student {
  id: string;
  user_id: string;
  name: string;
  email: string;
  current_week: number;
  current_assignment: string;
  next_meeting_time: string | null;
}

interface Meeting {
  id: string;
  student_id: string;
  event_id: string;
  calendar_link: string;
  scheduled_time: string;
  end_time: string;
  assignment_week: string;
  status: string;
  created_at: string;
}

interface BookingData {
  preferred_time: string;
  duration?: number;
}

export const useN8nCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<Student | null>(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [pastMeetings, setPastMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  const N8N_WEBHOOK_URL = "https://bridgeresources.app.n8n.cloud/webhook-test/book-progress-meeting";

  const fetchStudentData = async () => {
    if (!user) return;

    try {
      // First try to get existing student record
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching student:', error);
        return;
      }

      if (data) {
        setStudent(data);
      } else {
        // Create student record if it doesn't exist
        console.log('No student record found, creating one...');
        const firstName = user.user_metadata?.first_name || '';
        const lastName = user.user_metadata?.last_name || '';
        const fullName = `${firstName} ${lastName}`.trim() || 'Student';

        const { data: newStudent, error: createError } = await supabase
          .from('students')
          .insert([{
            user_id: user.id,
            name: fullName,
            email: user.email,
            current_week: 1,
            current_assignment: 'Getting Started'
          }])
          .select()
          .single();

        if (createError) {
          console.error('Error creating student record:', createError);
          toast({
            title: "Error",
            description: "Failed to create student profile",
            variant: "destructive",
          });
          return;
        }

        setStudent(newStudent);
        console.log('Student record created successfully');
      }
    } catch (error) {
      console.error('Error in fetchStudentData:', error);
    }
  };

  const fetchMeetings = async () => {
    if (!user) return;

    try {
      const now = new Date().toISOString();
      
      // Get student record first
      const { data: studentData, error: studentError } = await supabase
        .from('students')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (studentError) {
        console.error('Error fetching student for meetings:', studentError);
        return;
      }

      if (!studentData) {
        console.log('No student record found for meetings');
        return;
      }

      // Fetch upcoming meetings
      const { data: upcoming, error: upcomingError } = await supabase
        .from('meetings')
        .select('*')
        .eq('student_id', studentData.id)
        .gte('scheduled_time', now)
        .order('scheduled_time', { ascending: true });

      if (upcomingError) {
        console.error('Error fetching upcoming meetings:', upcomingError);
      } else {
        setUpcomingMeetings(upcoming || []);
      }

      // Fetch past meetings
      const { data: past, error: pastError } = await supabase
        .from('meetings')
        .select('*')
        .eq('student_id', studentData.id)
        .lt('scheduled_time', now)
        .order('scheduled_time', { ascending: false })
        .limit(5);

      if (pastError) {
        console.error('Error fetching past meetings:', pastError);
      } else {
        setPastMeetings(past || []);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const bookMeeting = async (bookingData: BookingData) => {
    if (!user || !student) {
      toast({
        title: "Error",
        description: "Please make sure you're logged in",
        variant: "destructive",
      });
      return { success: false };
    }

    setLoading(true);

    try {
      const duration = bookingData.duration || 30;
      
      console.log('Calling n8n webhook:', N8N_WEBHOOK_URL);
      console.log('Payload:', {
        student_id: student.id,
        student_name: student.name,
        assignment: {
          week: `Week ${student.current_week}`,
          title: student.current_assignment || 'Progress Review'
        },
        preferred_time: bookingData.preferred_time,
        duration: duration
      });
      
      // Call n8n webhook to create calendar event with CORS handling
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors', // Explicitly set CORS mode
        body: JSON.stringify({
          student_id: student.id,
          student_name: student.name,
          assignment: {
            week: `Week ${student.current_week}`,
            title: student.current_assignment || 'Progress Review'
          },
          preferred_time: bookingData.preferred_time,
          duration: duration
        })
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response result:', result);
      
      if (result.success) {
        // Calculate end time
        const endTime = new Date(new Date(bookingData.preferred_time).getTime() + (duration * 60 * 1000));
        
        // Save meeting details to Supabase
        const { data: meetingData, error: meetingError } = await supabase
          .from('meetings')
          .insert([
            {
              student_id: student.id,
              event_id: result.event_details.event_id,
              calendar_link: result.event_details.meeting_link,
              scheduled_time: bookingData.preferred_time,
              end_time: endTime.toISOString(),
              assignment_week: `Week ${student.current_week}`,
              status: 'scheduled'
            }
          ])
          .select()
          .single();

        if (meetingError) {
          console.error('Supabase meeting error:', meetingError);
          toast({
            title: "Warning",
            description: "Meeting created in calendar but failed to save to database",
            variant: "destructive",
          });
          return { success: false };
        }

        // Update student's next meeting time
        const { error: updateError } = await supabase
          .from('students')
          .update({ 
            next_meeting_time: bookingData.preferred_time
          })
          .eq('id', student.id);

        if (updateError) {
          console.error('Student update error:', updateError);
        }

        // Refresh data
        await fetchMeetings();
        await fetchStudentData();

        toast({
          title: "Meeting Scheduled",
          description: `Your progress review has been scheduled for ${new Date(bookingData.preferred_time).toLocaleString()}`,
        });

        return { 
          success: true, 
          eventId: result.event_details.event_id,
          meetingLink: result.event_details.meeting_link
        };
      } else {
        throw new Error(result.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      
      // Provide more specific error messages
      let errorMessage = "Failed to book meeting. Please try again.";
      
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        errorMessage = "Unable to connect to booking service. Please check your internet connection and try again.";
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        errorMessage = `Booking service error (${error.message}). Please try again later.`;
      }
      
      toast({
        title: "Booking Failed",
        description: errorMessage,
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    student,
    upcomingMeetings,
    pastMeetings,
    loading,
    fetchStudentData,
    fetchMeetings,
    bookMeeting
  };
};
