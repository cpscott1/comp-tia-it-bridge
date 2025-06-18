
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { toast } = useToast();

  const getGoogleAuthUrl = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: { action: 'getAuthUrl' }
      });

      if (error) throw error;

      if (data.success) {
        return data.authUrl;
      } else {
        throw new Error(data.error || 'Failed to get auth URL');
      }
    } catch (error) {
      console.error('Error getting auth URL:', error);
      toast({
        title: "Error",
        description: "Failed to get Google authorization URL",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleOAuthCallback = async (code: string) => {
    setLoading(true);
    try {
      const redirectUri = `${window.location.origin}/calendar/oauth-callback`;
      
      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: { 
          action: 'exchangeCode',
          code,
          redirectUri
        }
      });

      if (error) throw error;

      if (data.success) {
        setAccessToken(data.tokens.access_token);
        setIsAuthenticated(true);
        
        // Store tokens in localStorage for persistence
        localStorage.setItem('google_access_token', data.tokens.access_token);
        if (data.tokens.refresh_token) {
          localStorage.setItem('google_refresh_token', data.tokens.refresh_token);
        }
        
        toast({
          title: "Connected!",
          description: "Successfully connected to Google Calendar",
        });
        
        return true;
      } else {
        throw new Error(data.error || 'Failed to exchange code');
      }
    } catch (error) {
      console.error('Error handling OAuth callback:', error);
      toast({
        title: "Error",
        description: "Failed to authenticate with Google Calendar",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const checkStoredTokens = () => {
    const storedToken = localStorage.getItem('google_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const disconnectGoogle = () => {
    localStorage.removeItem('google_access_token');
    localStorage.removeItem('google_refresh_token');
    setAccessToken(null);
    setIsAuthenticated(false);
    setTimeSlots([]);
    
    toast({
      title: "Disconnected",
      description: "Disconnected from Google Calendar",
    });
  };

  const fetchAvailableSlots = async () => {
    if (!accessToken) {
      toast({
        title: "Not Connected",
        description: "Please connect to Google Calendar first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching available slots from Google Calendar...');
      
      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: { 
          action: 'getAvailableSlots',
          accessToken
        }
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
    if (!accessToken) {
      toast({
        title: "Not Connected",
        description: "Please connect to Google Calendar first",
        variant: "destructive",
      });
      return { success: false };
    }

    setLoading(true);
    try {
      const slot = timeSlots.find(s => s.id === slotId);
      if (!slot) throw new Error('Selected time slot not found');

      console.log('Booking slot:', slotId, bookingData);

      const { data, error } = await supabase.functions.invoke('google-calendar', {
        body: {
          action: 'bookSlot',
          accessToken,
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
          description: `${data.message}. Event created in your Google Calendar.`,
        });

        return { 
          success: true, 
          eventId: data.eventId,
          eventUrl: data.eventUrl,
          meetingUrl: data.meetingUrl
        };
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
    isAuthenticated,
    getGoogleAuthUrl,
    handleOAuthCallback,
    checkStoredTokens,
    disconnectGoogle,
    fetchAvailableSlots,
    bookSlot
  };
};
