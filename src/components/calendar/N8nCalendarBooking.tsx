
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { useN8nCalendar } from "@/hooks/useN8nCalendar";

const N8nCalendarBooking = () => {
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const {
    student,
    upcomingMeetings,
    pastMeetings,
    loading,
    fetchStudentData,
    fetchMeetings,
    bookMeeting
  } = useN8nCalendar();

  useEffect(() => {
    fetchStudentData();
    fetchMeetings();
  }, []);

  const handleBookMeeting = async () => {
    if (!selectedDateTime) {
      return;
    }

    const result = await bookMeeting({
      preferred_time: new Date(selectedDateTime).toISOString(),
      duration: 30
    });

    if (result.success) {
      setSelectedDateTime('');
    }
  };

  // Set minimum datetime to current time
  const now = new Date();
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  if (!student) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-600">Loading student information...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Student Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Progress Review Scheduling</span>
          </CardTitle>
          <CardDescription>
            Schedule your weekly progress discussion with your instructor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-1">Current Progress</p>
            <p className="font-medium">Week {student.current_week}</p>
            {student.current_assignment && (
              <p className="text-sm text-gray-600">{student.current_assignment}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Meetings */}
      {upcomingMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border">
                  <div>
                    <p className="font-medium text-blue-900">{meeting.assignment_week}</p>
                    <p className="text-sm text-blue-700">
                      {new Date(meeting.scheduled_time).toLocaleString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href={meeting.calendar_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>View</span>
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule New Meeting */}
      {upcomingMeetings.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Schedule Progress Review</CardTitle>
            <CardDescription>
              Book a 30-minute session to discuss your weekly progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="datetime">Select Date & Time</Label>
              <Input
                id="datetime"
                type="datetime-local"
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
                min={minDateTime}
                className="w-full"
              />
            </div>

            <Button 
              onClick={handleBookMeeting} 
              disabled={loading || !selectedDateTime}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Scheduling...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Book 30min Progress Review</span>
                </div>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Meetings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
                  <div>
                    <p className="font-medium text-gray-900">{meeting.assignment_week}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(meeting.scheduled_time).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    meeting.status === 'completed' ? 'bg-green-100 text-green-800' :
                    meeting.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meeting.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default N8nCalendarBooking;
