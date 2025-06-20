
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Settings } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'scheduled';
}

const InstructorCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Fetch real meeting data from Supabase
  const { data: meetings, isLoading } = useQuery({
    queryKey: ['instructor-meetings'],
    queryFn: async () => {
      console.log('Fetching instructor meetings...');
      
      // Get all meetings with student information using proper join
      const { data: meetingsData, error: meetingsError } = await supabase
        .from('meetings')
        .select(`
          id,
          scheduled_time,
          end_time,
          assignment_week,
          status,
          event_id,
          calendar_link,
          student_id,
          students!inner (
            name,
            email
          )
        `)
        .order('scheduled_time', { ascending: true });

      if (meetingsError) {
        console.error('Error fetching meetings:', meetingsError);
        throw meetingsError;
      }

      console.log('Fetched meetings with join:', meetingsData);
      return meetingsData || [];
    },
  });

  // Transform meetings data to calendar events
  useEffect(() => {
    if (meetings) {
      const transformedEvents: CalendarEvent[] = meetings.map((meeting) => {
        // Handle the students relationship properly
        const student = Array.isArray(meeting.students) ? meeting.students[0] : meeting.students;
        const studentName = student?.name || 'Unknown Student';
        const studentEmail = student?.email || 'unknown@email.com';
        
        return {
          id: meeting.id,
          title: `Progress Discussion - ${studentName}`,
          start: meeting.scheduled_time,
          end: meeting.end_time,
          studentName: studentName,
          studentEmail: studentEmail,
          topic: meeting.assignment_week || 'Progress Review',
          status: meeting.status === 'scheduled' ? 'confirmed' : meeting.status as any,
        };
      });
      
      setEvents(transformedEvents);
      console.log('Transformed events:', transformedEvents);
    }
  }, [meetings]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': 
      case 'scheduled': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const todaysEvents = events.filter(event => {
    const eventDate = new Date(event.start).toDateString();
    const today = new Date().toDateString();
    return eventDate === today;
  });

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.start);
    const today = new Date();
    return eventDate > today;
  }).slice(0, 5);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Sessions</p>
                <p className="text-2xl font-bold text-gray-900">{todaysEvents.length}</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Students Met</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(events.map(e => e.studentEmail)).size}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Today's Schedule</span>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Manage Availability
            </Button>
          </CardTitle>
          <CardDescription>
            Your scheduled progress discussions for today
          </CardDescription>
        </CardHeader>
        <CardContent>
          {todaysEvents.length > 0 ? (
            <div className="space-y-3">
              {todaysEvents.map((event) => {
                const { date, time } = formatDateTime(event.start);
                return (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="font-semibold">{event.studentName}</h4>
                          <p className="text-sm text-gray-600">{event.topic}</p>
                          <p className="text-xs text-gray-500">{time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions scheduled for today</h3>
              <p className="text-gray-600">No student sessions are currently scheduled for today.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Sessions</CardTitle>
          <CardDescription>
            Your scheduled progress discussions for the next few days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map((event) => {
                const { date, time } = formatDateTime(event.start);
                return (
                  <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h4 className="font-semibold">{event.studentName}</h4>
                          <p className="text-sm text-gray-600">{event.topic}</p>
                          <p className="text-xs text-gray-500">{date} at {time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming sessions</h3>
              <p className="text-gray-600">No student sessions are currently scheduled.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCalendar;
