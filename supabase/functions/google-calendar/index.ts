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

    const GOOGLE_CLIENT_ID = Deno.env.get('GOOGLE_CLIENT_ID');
    const GOOGLE_CLIENT_SECRET = Deno.env.get('GOOGLE_CLIENT_SECRET');

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      throw new Error('Google OAuth credentials not configured');
    }

    switch (action) {
      case 'getAuthUrl': {
        const redirectUri = `${req.headers.get('origin')}/calendar/oauth-callback`;
        // Updated scope to include calendar events creation
        const scope = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events';
        
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${GOOGLE_CLIENT_ID}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `scope=${encodeURIComponent(scope)}&` +
          `response_type=code&` +
          `access_type=offline&` +
          `prompt=consent`;

        console.log('Generated auth URL with calendar.events scope:', authUrl);
        
        return new Response(
          JSON.stringify({ success: true, authUrl }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'exchangeCode': {
        const { code, redirectUri } = data;
        
        console.log('Exchanging code for tokens...');
        
        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: redirectUri,
          }),
        });

        if (!tokenResponse.ok) {
          const errorText = await tokenResponse.text();
          console.error('Token exchange failed:', errorText);
          throw new Error(`Failed to exchange code for tokens: ${errorText}`);
        }

        const tokens = await tokenResponse.json();
        console.log('Token exchange successful, scope:', tokens.scope);
        
        return new Response(
          JSON.stringify({ success: true, tokens }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'getAvailableSlots': {
        const { accessToken } = data;
        console.log('Fetching available slots from Google Calendar...');
        
        // Test the access token first
        try {
          const testResponse = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary',
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            }
          );
          
          if (!testResponse.ok) {
            const errorText = await testResponse.text();
            console.error('Access token test failed:', testResponse.status, errorText);
            throw new Error(`Invalid access token: ${testResponse.status} ${errorText}`);
          }
          
          console.log('Access token verified successfully');
        } catch (error) {
          console.error('Access token verification failed:', error);
          throw new Error('Access token verification failed');
        }
        
        // Generate available time slots for the next 2 weeks
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
        
        // Get existing events from Google Calendar
        let existingEvents = [];
        try {
          const calendarResponse = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}`,
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            }
          );
          
          if (calendarResponse.ok) {
            const calendarData = await calendarResponse.json();
            existingEvents = calendarData.items || [];
            console.log('Fetched existing events:', existingEvents.length);
          } else {
            const errorText = await calendarResponse.text();
            console.error('Failed to fetch calendar events:', calendarResponse.status, errorText);
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
        const { accessToken, ...bookingData } = data as BookingRequest & { accessToken: string };
        console.log('Creating actual calendar event:', bookingData);
        
        // Verify access token and permissions first
        try {
          const testResponse = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary',
            {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
              }
            }
          );
          
          if (!testResponse.ok) {
            const errorText = await testResponse.text();
            console.error('Access token verification failed for booking:', testResponse.status, errorText);
            throw new Error(`Invalid access token for booking: ${testResponse.status} ${errorText}`);
          }
        } catch (error) {
          console.error('Cannot verify access token for booking:', error);
          throw new Error('Access token verification failed for booking');
        }
        
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

        console.log('Making Google Calendar API call to create event...');
        console.log('Event data:', JSON.stringify(event, null, 2));
        
        const createResponse = await fetch(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
          }
        );

        if (!createResponse.ok) {
          const errorText = await createResponse.text();
          console.error('Failed to create calendar event:', createResponse.status, errorText);
          console.error('Response headers:', createResponse.headers);
          
          if (createResponse.status === 403) {
            throw new Error('Insufficient permissions to create calendar events. Please reconnect your Google account with proper calendar permissions.');
          }
          
          throw new Error(`Failed to create calendar event: ${createResponse.status} ${errorText}`);
        }

        const createdEvent = await createResponse.json();
        console.log('SUCCESS: Real calendar event created:', createdEvent.id);
        console.log('Event URL:', createdEvent.htmlLink);
        
        const message = `Session booked for ${formatSlotTitle(bookingData.startTime)}`;
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            eventId: createdEvent.id,
            eventUrl: createdEvent.htmlLink,
            meetingUrl: createdEvent.conferenceData?.entryPoints?.[0]?.uri,
            message
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
