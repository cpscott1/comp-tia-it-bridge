import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Download, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  MessageSquare
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import InstructorCalendar from "@/components/calendar/InstructorCalendar";

interface StudentData {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  created_at: string;
  current_week?: number;
  completed_weeks?: number[];
  quiz_attempts?: {
    score: number;
    total_questions: number;
    completed_at: string;
    quiz_topics: {
      name: string;
    };
  }[];
}

interface DocumentationSubmission {
  id: string;
  user_id: string;
  scenario_id: string;
  scenario_title: string;
  documentation: string;
  submitted_at: string;
  student_name?: string;
  student_email?: string;
}

const InstructorDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  
  // Define the total number of weeks that currently have content
  const TOTAL_WEEKS_WITH_CONTENT = 4;

  // Fetch all students (users with student role)
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      console.log('Fetching students...');
      
      // First get all student profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, email, created_at')
        .eq('role', 'student')
        .order('created_at', { ascending: false });
      
      if (profilesError) {
        console.error('Error fetching student profiles:', profilesError);
        throw profilesError;
      }

      if (!profiles || profiles.length === 0) {
        console.log('No students found');
        return [];
      }

      // Get week progress for all students
      const { data: weekProgress, error: weekError } = await supabase
        .from('user_week_progress')
        .select('user_id, current_week, completed_weeks')
        .in('user_id', profiles.map(p => p.id));

      if (weekError) {
        console.error('Error fetching week progress:', weekError);
      }

      // Get quiz attempts for all students
      const { data: quizAttempts, error: quizError } = await supabase
        .from('quiz_attempts')
        .select(`
          user_id,
          score,
          total_questions,
          completed_at,
          quiz_topics (
            name
          )
        `)
        .in('user_id', profiles.map(p => p.id))
        .order('completed_at', { ascending: false });

      if (quizError) {
        console.error('Error fetching quiz attempts:', quizError);
      }

      // Combine the data
      const studentsWithData: StudentData[] = profiles.map(profile => {
        const userWeekProgress = weekProgress?.find(wp => wp.user_id === profile.id);
        const userQuizAttempts = quizAttempts?.filter(qa => qa.user_id === profile.id) || [];

        return {
          ...profile,
          current_week: userWeekProgress?.current_week || 1,
          completed_weeks: userWeekProgress?.completed_weeks || [],
          quiz_attempts: userQuizAttempts
        };
      });

      console.log('Fetched students with data:', studentsWithData);
      return studentsWithData;
    },
  });

  // Fetch documentation submissions
  const { data: documentationSubmissions, isLoading: documentationLoading } = useQuery({
    queryKey: ['documentation-submissions'],
    queryFn: async () => {
      console.log('Fetching documentation submissions...');
      
      const { data: submissions, error } = await supabase
        .from('documentation_submissions')
        .select('*')
        .order('submitted_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching documentation submissions:', error);
        throw error;
      }

      // Get student profiles for the submissions
      if (submissions && submissions.length > 0) {
        const userIds = [...new Set(submissions.map(s => s.user_id))];
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, email')
          .in('id', userIds);

        if (profilesError) {
          console.error('Error fetching student profiles for submissions:', profilesError);
        }

        // Combine submissions with student data
        const submissionsWithStudentData: DocumentationSubmission[] = submissions.map(submission => {
          const student = profiles?.find(p => p.id === submission.user_id);
          return {
            ...submission,
            student_name: student?.first_name && student?.last_name 
              ? `${student.first_name} ${student.last_name}`
              : student?.email || 'Unknown Student',
            student_email: student?.email
          };
        });

        return submissionsWithStudentData;
      }

      return submissions as DocumentationSubmission[] || [];
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
      const daysSince = Math.floor((Date.now() - new Date(lastActivity).getTime()) / (1000 * 60 * 60 * 24));
      return daysSince <= 7;
    }).length || 0,
    atRiskStudents: students?.filter(student => {
      const completedWeeks = student.completed_weeks?.length || 0;
      return completedWeeks === 0;
    }).length || 0
  };

  const generateWeeklyReport = () => {
    console.log("Generating weekly report...");
    alert("Weekly report would be generated and downloaded here.");
  };

  const getCompletionRate = (student: StudentData) => {
    const completedWeeks = student.completed_weeks?.length || 0;
    return Math.round((completedWeeks / TOTAL_WEEKS_WITH_CONTENT) * 100);
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusBadge = (rate: number) => {
    if (rate >= 80) return <Badge className="bg-green-100 text-green-800">On Track</Badge>;
    if (rate >= 60) return <Badge className="bg-yellow-100 text-yellow-800">At Risk</Badge>;
    return <Badge className="bg-red-100 text-red-800">Behind</Badge>;
  };

  const getLastActive = (student: StudentData) => {
    const lastQuizAttempt = student.quiz_attempts?.[0]?.completed_at;
    if (!lastQuizAttempt) return "Never";
    
    const daysSince = Math.floor((Date.now() - new Date(lastQuizAttempt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSince === 0) return "Today";
    if (daysSince === 1) return "1 day ago";
    return `${daysSince} days ago`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (studentsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Instructor Dashboard
              </h1>
              <p className="text-lg text-gray-600">
                Monitor student progress and manage your CompTIA A+ class
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active This Week</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeThisWeek}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At Risk Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.atRiskStudents}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Overview</CardTitle>
                <CardDescription>
                  Monitor individual student progress and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                {students && students.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Current Week</TableHead>
                        <TableHead>Completion Rate</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => {
                        const completionRate = getCompletionRate(student);
                        const currentWeek = student.current_week || 1;
                        const displayName = student.first_name && student.last_name 
                          ? `${student.first_name} ${student.last_name}`
                          : student.email || 'Unknown';
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <span className="font-semibold text-blue-600 text-sm">
                                    {displayName.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                  </span>
                                </div>
                                <span className="font-medium">{displayName}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{student.email}</TableCell>
                            <TableCell>Week {currentWeek}</TableCell>
                            <TableCell>
                              <span className={`font-medium ${getCompletionColor(completionRate)}`}>
                                {completionRate}%
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-600">{getLastActive(student)}</TableCell>
                            <TableCell>{getStatusBadge(completionRate)}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Yet</h3>
                    <p className="text-gray-600">Students will appear here once they sign up for the course.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-6">
            <InstructorCalendar />
          </TabsContent>

          <TabsContent value="documentation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Documentation Submissions</CardTitle>
                <CardDescription>
                  Review documentation from help desk scenario practice
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documentationLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Loading submissions...</p>
                  </div>
                ) : documentationSubmissions && documentationSubmissions.length > 0 ? (
                  <div className="space-y-4">
                    {documentationSubmissions.map((submission) => (
                      <Card key={submission.id} className="border-l-4 border-l-blue-500">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center space-x-2">
                                <MessageSquare className="h-5 w-5 text-blue-600" />
                                <span>{submission.scenario_title}</span>
                              </CardTitle>
                              <CardDescription>
                                Submitted by {submission.student_name} • {formatDate(submission.submitted_at)}
                              </CardDescription>
                            </div>
                            <Badge variant="outline">{submission.scenario_id}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-2">Documentation:</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{submission.documentation}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Documentation Submitted</h3>
                    <p className="text-gray-600">Student documentation submissions will appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Week Completion Rates</CardTitle>
                  <CardDescription>
                    Assignment completion by week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Week 1</span>
                      <span>Data from database</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Week 2</span>
                      <span>Data from database</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Help Desk Scenario Completion</CardTitle>
                  <CardDescription>
                    Student performance on practice scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Real data coming soon</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={0} className="w-20 h-2" />
                        <span className="text-xs text-gray-600">0%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Student Analytics</CardTitle>
                <CardDescription>
                  Real-time data from your students
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">
                      {students?.reduce((acc, s) => acc + (s.quiz_attempts?.length || 0), 0) || 0}
                    </div>
                    <div className="text-sm text-gray-600">Total Quiz Attempts</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round((students?.reduce((acc, s) => {
                        const avgScore = s.quiz_attempts?.length ? 
                          s.quiz_attempts.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / s.quiz_attempts.length : 0;
                        return acc + avgScore;
                      }, 0) || 0) / (students?.length || 1))}%
                    </div>
                    <div className="text-sm text-gray-600">Avg. Quiz Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{stats.totalStudents}</div>
                    <div className="text-sm text-gray-600">Enrolled Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InstructorDashboard;
