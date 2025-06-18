
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  title: string;
  available: boolean;
  bookedBy?: string;
}

interface BookingFormData {
  studentName: string;
  studentEmail: string;
  topic: string;
  notes: string;
}

const CalendarBooking = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    studentName: "",
    studentEmail: "",
    topic: "Weekly Progress Discussion",
    notes: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  // Generate sample time slots for the next 2 weeks (Mon-Fri, 9 AM - 5 PM)
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
    const today = new Date();
    
    for (let day = 1; day <= 14; day++) {
      const date = new Date(today);
      date.setDate(today.getDate() + day);
      
      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      
      // Generate hourly slots from 9 AM to 5 PM
      for (let hour = 9; hour < 17; hour++) {
        const startTime = new Date(date);
        startTime.setHours(hour, 0, 0, 0);
        
        const endTime = new Date(startTime);
        endTime.setHours(hour + 1, 0, 0, 0);
        
        slots.push({
          id: `${date.toISOString().split('T')[0]}-${hour}`,
          start: startTime.toISOString(),
          end: endTime.toISOString(),
          title: `${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          available: Math.random() > 0.3, // Randomly make some slots unavailable for demo
        });
      }
    }
    
    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots());
  }, []);

  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    
    setIsLoading(true);
    
    try {
      // In a real implementation, this would call Google Calendar API
      // For now, we'll simulate the booking
      
      const updatedSlots = timeSlots.map(slot => 
        slot.id === selectedSlot.id 
          ? { ...slot, available: false, bookedBy: bookingForm.studentName }
          : slot
      );
      
      setTimeSlots(updatedSlots);
      
      toast({
        title: "Booking Confirmed",
        description: `Your session has been scheduled for ${selectedSlot.title}`,
      });
      
      // Reset form
      setBookingForm({
        studentName: "",
        studentEmail: "",
        topic: "Weekly Progress Discussion",
        notes: ""
      });
      setSelectedSlot(null);
      setIsDialogOpen(false);
      
    } catch (error) {
      toast({
        title: "Booking Failed",
        description: "There was an error scheduling your session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const availableSlots = timeSlots.filter(slot => slot.available);
  const bookedSlots = timeSlots.filter(slot => !slot.available);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Schedule Progress Discussion</span>
          </CardTitle>
          <CardDescription>
            Book a one-on-one session to discuss your weekly progress and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Available Time Slots */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Available Time Slots</span>
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableSlots.length > 0 ? (
                  availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                    >
                      <span className="text-sm font-medium">{slot.title}</span>
                      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            onClick={() => setSelectedSlot(slot)}
                          >
                            Book
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Book Progress Discussion</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm font-medium text-blue-900">
                                Selected Time: {selectedSlot?.title}
                              </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="studentName">Your Name</Label>
                                <Input
                                  id="studentName"
                                  value={bookingForm.studentName}
                                  onChange={(e) => setBookingForm(prev => ({ ...prev, studentName: e.target.value }))}
                                  placeholder="Enter your name"
                                />
                              </div>
                              <div>
                                <Label htmlFor="studentEmail">Email</Label>
                                <Input
                                  id="studentEmail"
                                  type="email"
                                  value={bookingForm.studentEmail}
                                  onChange={(e) => setBookingForm(prev => ({ ...prev, studentEmail: e.target.value }))}
                                  placeholder="Enter your email"
                                />
                              </div>
                            </div>
                            
                            <div>
                              <Label htmlFor="topic">Discussion Topic</Label>
                              <Input
                                id="topic"
                                value={bookingForm.topic}
                                onChange={(e) => setBookingForm(prev => ({ ...prev, topic: e.target.value }))}
                                placeholder="e.g., Week 1 Progress Review"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="notes">Additional Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                value={bookingForm.notes}
                                onChange={(e) => setBookingForm(prev => ({ ...prev, notes: e.target.value }))}
                                placeholder="Any specific topics or questions you'd like to discuss..."
                                rows={3}
                              />
                            </div>
                            
                            <div className="flex space-x-3">
                              <Button
                                onClick={handleBookSlot}
                                disabled={isLoading || !bookingForm.studentName || !bookingForm.studentEmail}
                                className="flex-1"
                              >
                                {isLoading ? "Booking..." : "Confirm Booking"}
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                                className="flex-1"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No available time slots</p>
                )}
              </div>
            </div>

            {/* Booked Sessions */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Your Booked Sessions</span>
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {bookedSlots.length > 0 ? (
                  bookedSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-3 border rounded-lg bg-green-50 border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{slot.title}</span>
                        <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                          Booked
                        </span>
                      </div>
                      {slot.bookedBy && (
                        <p className="text-xs text-gray-600 mt-1">
                          Booked by: {slot.bookedBy}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No booked sessions</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarBooking;
