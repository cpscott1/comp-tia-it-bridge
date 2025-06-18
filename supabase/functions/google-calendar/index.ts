
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

// Store booked sessions in memory (in production, you'd use a database)
let bookedSessions: TimeSlot[] = [];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...data } = await req.json();
    console.log('Google Calendar action:', action, data);

    switch (action) {
      case 'getAvailableSlots': {
        console.log('Fetching available slots...');
        
        // Generate available time slots for the next 2 weeks
        const timeMin = new Date().toISOString();
        const timeMax = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
        
        const availableSlots = generateTimeSlots(timeMin, timeMax);
        
        // Filter out booked sessions
        const filteredSlots = availableSlots.map(slot => {
          const isBooked = bookedSessions.some(booked => booked.id === slot.id);
          if (isBooked) {
            const bookedSession = bookedSessions.find(booked => booked.id === slot.id);
            return {
              ...slot,
              available: false,
              bookedBy: bookedSession?.bookedBy
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
        console.log('Booking slot:', bookingData);
        
        // Find the slot being booked
        const slotId = generateSlotId(bookingData.startTime);
        
        // Check if already booked
        const alreadyBooked = bookedSessions.some(session => session.id === slotId);
        if (alreadyBooked) {
          throw new Error('This time slot is no longer available');
        }
        
        // Create the booked session
        const bookedSession: TimeSlot = {
          id: slotId,
          start: bookingData.startTime,
          end: bookingData.endTime,
          title: formatSlotTitle(bookingData.startTime),
          available: false,
          bookedBy: bookingData.studentName
        };
        
        // Add to booked sessions
        bookedSessions.push(bookedSession);
        
        console.log('Session booked successfully:', bookedSession);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            eventId: `event-${Date.now()}`,
            message: `Session booked successfully for ${formatSlotTitle(bookingData.startTime)}` 
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
