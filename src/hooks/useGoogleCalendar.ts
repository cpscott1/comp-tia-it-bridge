
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  available: boolean;
  bookedBy?: string;
}

interface BookingData {
  startTime: string;
  endTime: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  notes?: string;
}

export const useGoogleCalendar = () => {
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const { toast } = useToast();

  const fetchAvailableSlots = async () => {
    setLoading(true);
    try {
      console.log('Fetching available slots from Google Calendar...');
      
      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: { action: 'getAvailableSlots' }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Response from Google Calendar:', data);

      if (data.success) {
        setTimeSlots(data.slots);
        console.log('Updated time slots:', data.slots.length);
      } else {
        throw new Error(data.error || 'Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      toast({
        title: "Error",
        description: "Failed to load available time slots. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const bookSlot = async (slotId: string, bookingData: BookingData) => {
    setLoading(true);
    try {
      const slot = timeSlots.find(s => s.id === slotId);
      if (!slot) throw new Error('Selected time slot not found');

      console.log('Booking slot:', slotId, bookingData);

      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: {
          action: 'bookSlot',
          startTime: slot.start,
          endTime: slot.end,
          ...bookingData
        }
      });

      if (error) {
        console.error('Booking error:', error);
        throw error;
      }

      console.log('Booking response:', data);

      if (data.success) {
        // Update local state to mark slot as booked
        setTimeSlots(prev => prev.map(s => 
          s.id === slotId 
            ? { ...s, available: false, bookedBy: bookingData.studentName }
            : s
        ));

        toast({
          title: "Booking Confirmed",
          description: data.message || "Your session has been scheduled successfully.",
        });

        return { success: true, eventId: data.eventId };
      } else {
        throw new Error(data.error || 'Failed to book session');
      }
    } catch (error) {
      console.error('Error booking slot:', error);
      toast({
        title: "Booking Failed",
        description: error.message || "There was an error scheduling your session. Please try again.",
        variant: "destructive",
      });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    timeSlots,
    loading,
    fetchAvailableSlots,
    bookSlot
  };
};
