
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  available: boolean;
  bookedBy?: string;
}

interface BookingRequest {
  startTime: string;
  endTime: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  notes?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    const googleApiKey = Deno.env.get('GOOGLE_CALENDAR_API_KEY');
    const googleClientId = Deno.env.get('GOOGLE_CLIENT_ID');
    const googleClientSecret = Deno.env.get('GOOGLE_CLIENT_SECRET');

    if (!googleApiKey || !googleClientId || !googleClientSecret) {
      throw new Error('Google Calendar API credentials not configured');
    }

    // For this demo, we'll use the primary calendar ID
    // In production, you might want to use a specific calendar
    const calendarId = 'primary';

    switch (action) {
      case 'getAvailableSlots': {
        // Get busy times from Google Calendar
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(); // 2 weeks ahead
        
        // This would require OAuth token for the instructor's calendar
        // For now, we'll generate available slots and filter out busy times
        const availableSlots = generateTimeSlots(timeMin, timeMax);
        
        return new Response(
          JSON.stringify({ success: true, slots: availableSlots }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'bookSlot': {
        const bookingData = data as BookingRequest;
        
        // Create calendar event
        const event = {
          summary: `Progress Discussion - ${bookingData.studentName}`,
          description: `Topic: ${bookingData.topic}\nNotes: ${bookingData.notes || 'No additional notes'}`,
          start: {
            dateTime: bookingData.startTime,
            timeZone: 'America/New_York', // Adjust as needed
          },
          end: {
            dateTime: bookingData.endTime,
            timeZone: 'America/New_York',
          },
          attendees: [
            {
              email: bookingData.studentEmail,
              displayName: bookingData.studentName,
            }
          ],
        };

        // For now, we'll simulate the booking
        // In production, you'd need to implement OAuth flow for calendar access
        console.log('Would create calendar event:', event);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            eventId: `mock-event-${Date.now()}`,
            message: 'Session booked successfully' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        throw new Error('Invalid action');
    }
  } catch (error) {
    console.error('Google Calendar API error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

function generateTimeSlots(timeMin: string, timeMax: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const start = new Date(timeMin);
  const end = new Date(timeMax);
  
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    // Skip weekends
    if (day.getDay() === 0 || day.getDay() === 6) continue;
    
    // Generate hourly slots from 9 AM to 5 PM
    for (let hour = 9; hour < 17; hour++) {
      const startTime = new Date(day);
      startTime.setHours(hour, 0, 0, 0);
      
      // Skip past times
      if (startTime <= new Date()) continue;
      
      const endTime = new Date(startTime);
      endTime.setHours(hour + 1, 0, 0, 0);
      
      slots.push({
        id: `${day.toISOString().split('T')[0]}-${hour}`,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        title: `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        available: true, // In production, check against actual calendar
      });
    }
  }
  
  return slots;
}
