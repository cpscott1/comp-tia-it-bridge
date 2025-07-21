
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, TrendingUp, BookOpen, Clock, Calendar, User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface StudentData {
  id: string;
  name: string;
  email: string;
  current_week: number;
  completed_weeks: number[];
  last_activity?: string;
  quiz_attempts?: Array<{
    completed_at: string;
    score: number;
    total_questions: number;
  }>;
  meetings?: Array<{
    scheduled_time: string;
    status: string;
    assignment_week: string;
  }>;
}

interface Meeting {
  id: string;
  scheduled_time: string;
  end_time: string;
  status: string;
  assignment_week: string;
  student_id: string;
  student?: {
    name: string;
    email: string;
  };
}

interface MeetingFormData {
  student_id: string;
  scheduled_time: string;
  end_time: string;
  assignment_week: string;
  event_id: string;
}

const InstructorDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  
  // Define the total number of weeks that currently have content
  const TOTAL_WEEKS_WITH_CONTENT = 5;

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async (): Promise<StudentData[]> => {
      // First get students data
      const { data: studentsData, error: studentsError } = await supabase
        .from('students')
        .select(`
          *,
          quiz_attempts (
            completed_at,
            score,
            total_questions
          )
        `)
        .order('name', { ascending: true });

      if (studentsError) {
        console.error('Error fetching students:', studentsError);
        throw studentsError;
      }

      // Get user week progress for each student
      const studentIds = studentsData?.map(s => s.user_id).filter(Boolean) || [];
      
      let progressData: any[] = [];
      if (studentIds.length > 0) {
        const { data: progressResponse, error: progressError } = await supabase
          .from('user_week_progress')
          .select('*')
          .in('user_id', studentIds);

        if (progressError) {
          console.error('Error fetching progress:', progressError);
          // Don't throw error, just use empty progress
        } else {
          progressData = progressResponse || [];
        }
      }

      // Combine the data
      const combinedData: StudentData[] = studentsData?.map(student => {
        const userProgress = progressData.find(p => p.user_id === student.user_id);
        return {
          id: student.id,
          name: student.name,
          email: student.email || '',
          current_week: userProgress?.current_week || student.current_week || 1,
          completed_weeks: userProgress?.completed_weeks || [],
          quiz_attempts: student.quiz_attempts || []
        };
      }) || [];

      return combinedData;
    },
  });

  const { data: meetings, isLoading: meetingsLoading } = useQuery({
    queryKey: ['meetings'],
    queryFn: async (): Promise<Meeting[]> => {
      const { data, error } = await supabase
        .from('meetings')
        .select(`
          *,
          student:student_id (
            name,
            email
          )
        `)
        .gte('scheduled_time', new Date().toISOString())
        .order('scheduled_time', { ascending: true });

      if (error) {
        console.error('Error fetching meetings:', error);
        throw error;
      }

      return data || [];
    },
  });

  const upcomingMeetings = meetings?.filter(meeting => new Date(meeting.scheduled_time) > new Date()) || [];

  const scheduleMeeting = useMutation({
    mutationFn: async (meetingData: MeetingFormData) => {
      const { data, error } = await supabase
        .from('meetings')
        .insert([meetingData]);

      if (error) {
        console.error('Error scheduling meeting:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      toast.success("Meeting scheduled successfully!");
    },
    onError: (error) => {
      toast.error(`Failed to schedule meeting: ${error.message}`);
    },
  });

  // Calculate stats from real data with dynamic total weeks
  const stats = {
    totalStudents: students?.length || 0,
    averageProgress: students?.length ? 
      Math.round(students.reduce((acc, student) => {
        const completedWeeks = student.completed_weeks?.length || 0;
        return acc + (completedWeeks / TOTAL_WEEKS_WITH_CONTENT * 100);
      }, 0) / students.length) : 0,
    activeThisWeek: students?.filter(student => {
      const lastActivity = student.quiz_attempts?.[0]?.completed_at;
      if (!lastActivity) return false;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(lastActivity) > weekAgo;
    }).length || 0,
    upcomingMeetings: upcomingMeetings?.length || 0,
  };

  const filteredStudents = selectedWeek === 0 ? students : students?.filter(student => student.current_week === selectedWeek);

  const getCompletionRate = (student: StudentData) => {
    const completedWeeks = student.completed_weeks?.length || 0;
    return Math.round((completedWeeks / TOTAL_WEEKS_WITH_CONTENT) * 100);
  };

  const getCompletionColor = (completionRate: number) => {
    if (completionRate < 50) return "red";
    if (completionRate < 80) return "yellow";
    return "green";
  };

  const getStatusBadge = (completionRate: number) => {
    const color = getCompletionColor(completionRate);
    let label = "Behind";
    if (completionRate >= 50) label = "On Track";
    if (completionRate >= 80) label = "Advanced";

    return (
      <Badge variant="secondary">
        {label}
      </Badge>
    );
  };

  const handleScheduleMeeting = async (formData: MeetingFormData) => {
    try {
      await scheduleMeeting.mutateAsync(formData);
    } catch (error) {
      console.error("Failed to schedule meeting:", error);
    }
  };

  if (studentsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor student progress and manage your CompTIA A+ course
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Active learners
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">
              Course completion
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active This Week</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Students with recent activity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingMeetings}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Student Progress */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Student Progress</CardTitle>
                <CardDescription>Track individual student advancement</CardDescription>
              </div>
              <Select value={selectedWeek.toString()} onValueChange={(value) => setSelectedWeek(parseInt(value))}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">All Weeks</SelectItem>
                  <SelectItem value="1">Week 1</SelectItem>
                  <SelectItem value="2">Week 2</SelectItem>
                  <SelectItem value="3">Week 3</SelectItem>
                  <SelectItem value="4">Week 4</SelectItem>
                  <SelectItem value="5">Week 5</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents?.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium">Week {student.current_week}</p>
                      <p className="text-xs text-muted-foreground">{getCompletionRate(student)}% complete</p>
                    </div>
                    {getStatusBadge(getCompletionRate(student))}
                  </div>
                </div>
              ))}
              {(!filteredStudents || filteredStudents.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  {selectedWeek === 0 ? "No students enrolled yet" : `No students in Week ${selectedWeek}`}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Meetings */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>Scheduled student meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMeetings?.slice(0, 5).map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="font-medium">{meeting.student?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(meeting.scheduled_time), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {meeting.assignment_week}
                  </Badge>
                </div>
              ))}
              {(!upcomingMeetings || upcomingMeetings.length === 0) && (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming meetings scheduled
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorDashboard;
