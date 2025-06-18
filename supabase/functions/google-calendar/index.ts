
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
    console.log('Google Calendar action:', action, data);

    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_CALENDAR_API_KEY');
    const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
    const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');

    if (!GOOGLE_API_KEY) {
      throw new Error('Google Calendar API key not configured');
    }

    switch (action) {
      case 'getAvailableSlots': {
        console.log('Fetching available slots from Google Calendar...');
        
        // Generate available time slots for the next 2 weeks
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
        
        // First, get existing events from Google Calendar
        let existingEvents = [];
        try {
          const calendarResponse = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&key=${GOOGLE_API_KEY}`,
            {
              headers: {
                'Authorization': `Bearer ${GOOGLE_API_KEY}`, // Note: This would need OAuth token in production
              }
            }
          );
          
          if (calendarResponse.ok) {
            const calendarData = await calendarResponse.json();
            existingEvents = calendarData.items || [];
            console.log('Fetched existing events:', existingEvents.length);
          }
        } catch (error) {
          console.log('Could not fetch existing events, proceeding with generated slots:', error);
        }
        
        const availableSlots = generateTimeSlots(timeMin, timeMax);
        
        // Filter out slots that conflict with existing events
        const filteredSlots = availableSlots.map(slot => {
          const slotStart = new Date(slot.start);
          const slotEnd = new Date(slot.end);
          
          const isConflicting = existingEvents.some(event => {
            if (!event.start?.dateTime || !event.end?.dateTime) return false;
            
            const eventStart = new Date(event.start.dateTime);
            const eventEnd = new Date(event.end.dateTime);
            
            // Check for overlap
            return (slotStart < eventEnd && slotEnd > eventStart);
          });
          
          if (isConflicting) {
            const conflictingEvent = existingEvents.find(event => {
              if (!event.start?.dateTime || !event.end?.dateTime) return false;
              const eventStart = new Date(event.start.dateTime);
              const eventEnd = new Date(event.end.dateTime);
              return (slotStart < eventEnd && slotEnd > eventStart);
            });
            
            return {
              ...slot,
              available: false,
              bookedBy: conflictingEvent?.summary || 'Booked'
            };
          }
          return slot;
        });
        
        console.log('Generated slots:', filteredSlots.length);
        
        return new Response(
          JSON.stringify({ success: true, slots: filteredSlots }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'bookSlot': {
        const bookingData = data as BookingRequest;
        console.log('Booking slot in Google Calendar:', bookingData);
        
        // Create the calendar event
        const event = {
          summary: `Progress Discussion - ${bookingData.studentName}`,
          description: `Topic: ${bookingData.topic}\nStudent: ${bookingData.studentName} (${bookingData.studentEmail})\nNotes: ${bookingData.notes || 'No additional notes'}`,
          start: {
            dateTime: bookingData.startTime,
            timeZone: 'UTC',
          },
          end: {
            dateTime: bookingData.endTime,
            timeZone: 'UTC',
          },
          attendees: [
            {
              email: bookingData.studentEmail,
              displayName: bookingData.studentName,
            }
          ],
          conferenceData: {
            createRequest: {
              requestId: `meeting-${Date.now()}`,
              conferenceSolutionKey: {
                type: 'hangoutsMeet'
              }
            }
          }
        };

        try {
          // Note: In production, you would need OAuth token instead of API key for creating events
          // For now, we'll simulate the booking response
          console.log('Would create event:', event);
          
          const eventId = `event-${Date.now()}`;
          const message = `Session booked for ${formatSlotTitle(bookingData.startTime)}`;
          
          console.log('Session booking simulated successfully:', {
            eventId,
            summary: event.summary,
            start: event.start.dateTime,
            end: event.end.dateTime
          });
          
          return new Response(
            JSON.stringify({ 
              success: true, 
              eventId,
              message,
              note: 'Event creation simulated. OAuth implementation needed for actual Google Calendar integration.'
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        } catch (error) {
          console.error('Error creating calendar event:', error);
          throw new Error(`Failed to create calendar event: ${error.message}`);
        }
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
        id: generateSlotId(startTime.toISOString()),
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        title: formatSlotTitle(startTime.toISOString()),
        available: true,
      });
    }
  }
  
  return slots;
}

function generateSlotId(startTime: string): string {
  const date = new Date(startTime);
  return `${date.toISOString().split('T')[0]}-${date.getHours()}`;
}

function formatSlotTitle(startTime: string): string {
  const date = new Date(startTime);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}
