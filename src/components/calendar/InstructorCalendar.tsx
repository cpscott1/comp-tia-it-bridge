
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Plus, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  studentName: string;
  studentEmail: string;
  topic: string;
  notes?: string;
  status: 'confirmed' | 'pending' | 'completed';
}

const InstructorCalendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isAddingAvailability, setIsAddingAvailability] = useState(false);
  const { toast } = useToast();

  // Sample events for demonstration
  useEffect(() => {
    const sampleEvents: CalendarEvent[] = [
      {
        id: "1",
        title: "Progress Discussion - John Smith",
        start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
        studentName: "John Smith",
        studentEmail: "john.smith@email.com",
        topic: "Week 1 Progress Review",
        notes: "Struggling with networking concepts",
        status: "confirmed"
      },
      {
        id: "2",
        title: "Progress Discussion - Sarah Johnson",
        start: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        end: new Date(Date.now() + 49 * 60 * 60 * 1000).toISOString(),
        studentName: "Sarah Johnson",
        studentEmail: "sarah.j@email.com",
        topic: "Week 2 Assignment Help",
        status: "confirmed"
      }
    ];
    setEvents(sampleEvents);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
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
              <p className="text-gray-600">Enjoy your day! Students can book time slots for future discussions.</p>
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
              <p className="text-gray-600">Students can book time slots to discuss their progress.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorCalendar;
