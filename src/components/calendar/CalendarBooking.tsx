
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, RefreshCw, Link2, Unlink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useGoogleCalendar } from "@/hooks/useGoogleCalendar";
import { useAuth } from "@/hooks/useAuth";
import { useSearchParams } from "react-router-dom";

interface BookingFormData {
  studentName: string;
  studentEmail: string;
  topic: string;
  notes: string;
}

const CalendarBooking = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const { 
    timeSlots, 
    loading, 
    isAuthenticated, 
    getGoogleAuthUrl, 
    checkStoredTokens, 
    disconnectGoogle, 
    fetchAvailableSlots, 
    bookSlot 
  } = useGoogleCalendar();
  
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
    studentName: user?.user_metadata?.first_name && user?.user_metadata?.last_name 
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` 
      : "",
    studentEmail: user?.email || "",
    topic: "Weekly Progress Discussion",
    notes: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    // Check for stored tokens on component mount
    const hasStoredTokens = checkStoredTokens();
    
    // Check for connection success in URL params
    if (searchParams.get('connected') === 'true') {
      if (hasStoredTokens) {
        fetchAvailableSlots();
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Update form with user data when user changes
    if (user) {
      setBookingForm(prev => ({
        ...prev,
        studentName: user.user_metadata?.first_name && user.user_metadata?.last_name 
          ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}` 
          : prev.studentName,
        studentEmail: user.email || prev.studentEmail
      }));
    }
  }, [user]);

  const handleConnectGoogle = async () => {
    const authUrl = await getGoogleAuthUrl();
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  const handleBookSlot = async () => {
    if (!selectedSlot) return;
    
    setIsBooking(true);
    
    const result = await bookSlot(selectedSlot.id, {
      startTime: selectedSlot.start,
      endTime: selectedSlot.end,
      studentName: bookingForm.studentName,
      studentEmail: bookingForm.studentEmail,
      topic: bookingForm.topic,
      notes: bookingForm.notes
    });

    if (result.success) {
      // Reset form
      setBookingForm(prev => ({
        ...prev,
        topic: "Weekly Progress Discussion",
        notes: ""
      }));
      setSelectedSlot(null);
      setIsDialogOpen(false);
      
      // Refresh the slots to show updated availability
      fetchAvailableSlots();
    }
    
    setIsBooking(false);
  };

  const availableSlots = timeSlots.filter(slot => slot.available);
  const bookedSlots = timeSlots.filter(slot => !slot.available);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Schedule Progress Discussion</span>
            </div>
            <div className="flex space-x-2">
              {isAuthenticated ? (
                <>
                  <Button 
                    onClick={fetchAvailableSlots} 
                    disabled={loading}
                    variant="outline" 
                    size="sm"
                  >
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button 
                    onClick={disconnectGoogle}
                    variant="outline" 
                    size="sm"
                  >
                    <Unlink className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button 
                  onClick={handleConnectGoogle}
                  variant="outline" 
                  size="sm"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Connect Google Calendar
                </Button>
              )}
            </div>
          </CardTitle>
          <CardDescription>
            Book a one-on-one session to discuss your weekly progress and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isAuthenticated ? (
            <Alert>
              <Link2 className="h-4 w-4" />
              <AlertDescription>
                Please connect your Google Calendar to view available time slots and book sessions. 
                This will allow you to create actual calendar events.
              </AlertDescription>
            </Alert>
          ) : loading && timeSlots.length === 0 ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Loading available time slots from your Google Calendar...</p>
            </div>
          ) : (
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
                                  disabled={isBooking || !bookingForm.studentName || !bookingForm.studentEmail}
                                  className="flex-1"
                                >
                                  {isBooking ? "Booking..." : "Confirm Booking"}
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
                  <span>Booked Sessions</span>
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarBooking;
