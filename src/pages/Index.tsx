
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  FileText, 
  Users,
  Trophy,
  Clock,
  CheckCircle
} from "lucide-react";
import { WeekSelector } from "@/components/WeekSelector";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { useUserQuizAttempts } from "@/hooks/useQuizAttempts";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Index = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const { data: weekProgress } = useWeekProgress();
  const { data: quizAttempts = [] } = useUserQuizAttempts();
  const { user } = useAuth();

  // Course structure
  const courseWeeks = [
    {
      number: 1,
      title: "Hardware Fundamentals",
      description: "Computer components, motherboards, CPUs, memory, storage devices"
    },
    {
      number: 2,
      title: "Operating Systems",
      description: "Windows, macOS, Linux basics, file systems, and basic troubleshooting"
    },
    {
      number: 3,
      title: "Troubleshooting PC Hardware",
      description: "BIOS/UEFI, Power Issues, Storage, Display, and Performance Troubleshooting"
    },
    {
      number: 4,
      title: "Network Fundamentals",
      description: "Cable types, networking hardware, wireless, network types, and help desk scenarios"
    },
    // Future weeks - coming soon
    ...Array.from({ length: 8 }, (_, i) => ({
      number: i + 5,
      title: "Coming Soon",
      description: "Additional content will be available soon"
    }))
  ];

  const currentWeek = weekProgress?.current_week || 1;

  // Calculate progress stats
  const totalWeeksCompleted = weekProgress?.completed_weeks.length || 0;
  const totalQuizAttempts = quizAttempts.length;
  const averageScore = quizAttempts.length > 0 
    ? Math.round(quizAttempts.reduce((sum, attempt) => sum + ((attempt.score / attempt.total_questions) * 100), 0) / quizAttempts.length)
    : 0;

  const recentQuizAttempts = quizAttempts
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            CompTIA A+ Learning Platform
          </h1>
          <p className="text-lg text-gray-600">
            Master IT fundamentals with hands-on practice and expert guidance
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Week</p>
                  <p className="text-2xl font-bold text-gray-900">{currentWeek}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Weeks Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{totalWeeksCompleted}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quiz Attempts</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuizAttempts}</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Selection */}
        <WeekSelector 
          courseWeeks={courseWeeks}
          currentWeek={selectedWeek}
          onWeekChange={setSelectedWeek}
        />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="help-desk">Help Desk</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Week Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Week {selectedWeek}: {courseWeeks[selectedWeek - 1]?.title}</CardTitle>
                  <CardDescription>
                    {courseWeeks[selectedWeek - 1]?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseWeeks[selectedWeek - 1]?.title === "Coming Soon" ? (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Content Coming Soon</h3>
                      <p className="text-gray-600">This week's content is being prepared and will be available soon.</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <h4 className="font-semibold">Learning Objectives:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {selectedWeek === 1 && (
                            <>
                              <li>Understand core hardware components</li>
                              <li>Learn about motherboards and expansion slots</li>
                              <li>Master CPU and memory fundamentals</li>
                            </>
                          )}
                          {selectedWeek === 2 && (
                            <>
                              <li>Explore operating system basics</li>
                              <li>Understand file systems and management</li>
                              <li>Practice basic troubleshooting steps</li>
                            </>
                          )}
                          {selectedWeek === 3 && (
                            <>
                              <li>Master BIOS/UEFI configuration</li>
                              <li>Diagnose power and performance issues</li>
                              <li>Troubleshoot storage and display problems</li>
                            </>
                          )}
                          {selectedWeek === 4 && (
                            <>
                              <li>Understand network cable types and standards</li>
                              <li>Learn about networking hardware components</li>
                              <li>Practice wireless networking troubleshooting</li>
                              <li>Handle real-world network support scenarios</li>
                            </>
                          )}
                        </ul>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Link to="/practice">
                          <Button className="flex-1">
                            <Brain className="h-4 w-4 mr-2" />
                            Start Practice Questions
                          </Button>
                        </Link>
                        <Link to="/flashcards">
                          <Button variant="outline" className="flex-1">
                            <FileText className="h-4 w-4 mr-2" />
                            Review Flashcards
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quiz Activity</CardTitle>
                  <CardDescription>Your latest practice sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  {recentQuizAttempts.length > 0 ? (
                    <div className="space-y-3">
                      {recentQuizAttempts.map((attempt, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-sm">Quiz Attempt</p>
                            <p className="text-xs text-gray-600">
                              {new Date(attempt.completed_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-sm">{Math.round((attempt.score / attempt.total_questions) * 100)}%</p>
                            <p className="text-xs text-gray-600">{attempt.total_questions} questions</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Quiz Activity Yet</h3>
                      <p className="text-gray-600">Start practicing to see your progress here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>
                  Test your knowledge with CompTIA A+ practice questions
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Brain className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Ready to Practice?</h3>
                <p className="text-gray-600 mb-6">
                  Challenge yourself with questions tailored to Week {selectedWeek}
                </p>
                <Link to="/practice">
                  <Button size="lg">
                    Start Practice Session
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital Flashcards</CardTitle>
                <CardDescription>
                  Review key concepts with interactive flashcards
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <FileText className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Study with Flashcards</h3>
                <p className="text-gray-600 mb-6">
                  Master important terms and concepts for Week {selectedWeek}
                </p>
                <Link to="/flashcards">
                  <Button size="lg" variant="outline">
                    Start Flashcard Review
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help-desk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Help Desk Scenarios</CardTitle>
                <CardDescription>
                  Practice real-world IT support scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-8">
                <Users className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Real-World Practice</h3>
                <p className="text-gray-600 mb-6">
                  Handle customer scenarios and document your solutions
                </p>
                <Link to="/help-desk">
                  <Button size="lg" variant="outline">
                    Start Help Desk Practice
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
