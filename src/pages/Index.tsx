import { Monitor, BookOpen, Target, TrendingUp, Brain, Users, Clock, CheckCircle, Briefcase, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { useUserQuizAttempts } from '@/hooks/useQuizAttempts';
import { usePracticeQuestions } from '@/hooks/usePracticeQuestions';
import { useWeekProgress } from '@/hooks/useWeekProgress';
import { WeekSelector } from '@/components/WeekSelector';
import { useState } from 'react';

// Week structure for CompTIA A+ course
const courseWeeks = [
  { number: 1, title: "Hardware Foundations & Basic Components", description: "CPU, RAM, motherboard identification and troubleshooting basics" },
  { number: 2, title: "Advanced Hardware & Installation", description: "Memory, storage, power supplies, and cooling systems" },
  { number: 3, title: "Mobile Devices & Networking", description: "Laptops, tablets, smartphones, and basic networking concepts" },
  { number: 4, title: "Network Troubleshooting", description: "TCP/IP, wireless networks, and network troubleshooting" },
  { number: 5, title: "Operating Systems Fundamentals", description: "Windows, macOS, Linux basics and file systems" },
  { number: 6, title: "OS Installation & Configuration", description: "OS installation, updates, and system configuration" },
  { number: 7, title: "Security Fundamentals", description: "Physical security, authentication, and basic security concepts" },
  { number: 8, title: "Operational Procedures", description: "Safety procedures, environmental controls, and documentation" },
  { number: 9, title: "Cloud Computing & Virtualization", description: "Cloud services, virtual machines, and remote access" },
  { number: 10, title: "Printers & Peripherals", description: "Printer types, installation, and troubleshooting" },
  { number: 11, title: "Exam Preparation", description: "Practice exams, review sessions, and test-taking strategies" },
  { number: 12, title: "Final Review & Certification", description: "Comprehensive review and certification exam preparation" }
];

export default function Index() {
  const { user } = useAuth();
  const { data: quizAttempts = [] } = useUserQuizAttempts();
  const { data: weekProgress } = useWeekProgress();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  
  // Use week progression system instead of automatic calculation
  const currentWeek = selectedWeek || weekProgress?.current_week || 1;
  const currentWeekInfo = courseWeeks[currentWeek - 1];
  
  // Get questions for the current week specifically
  const { data: currentWeekQuestions = [] } = usePracticeQuestions(undefined, currentWeek);
  
  // Calculate progress for current week only - count unique questions attempted
  const currentWeekAttempts = quizAttempts.filter(attempt => {
    // Check if this attempt matches questions from current week by comparing total questions
    const weekQuestionCount = currentWeekQuestions.length;
    return attempt.total_questions === weekQuestionCount;
  });
  
  // For progress calculation, we want to show completion based on whether questions have been attempted
  // If there are any attempts for this week, show the total questions available as "completed"
  const questionsAnsweredCurrentWeek = currentWeekAttempts.length > 0 ? currentWeekQuestions.length : 0;
  const totalCorrectCurrentWeek = currentWeekAttempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const totalAttemptsCurrentWeek = currentWeekAttempts.reduce((sum, attempt) => sum + attempt.total_questions, 0);
  const avgScore = totalAttemptsCurrentWeek > 0 ? Math.round((totalCorrectCurrentWeek / totalAttemptsCurrentWeek) * 100) : 0;
  
  // Practice progress should show completed questions vs available questions for current week
  const totalQuestionsCurrentWeek = currentWeekQuestions.length;
  const practiceProgress = totalQuestionsCurrentWeek > 0 ? Math.min((questionsAnsweredCurrentWeek / totalQuestionsCurrentWeek) * 100, 100) : 0;
  
  // Calculate overall course progress based on completed weeks
  const completedWeeks = weekProgress?.completed_weeks?.length || 0;
  const weeklyProgress = (completedWeeks / 12) * 100;
  
  // Calculate study streak and assignments (based on quiz attempts)
  const uniqueDaysStudied = new Set(
    quizAttempts.map(attempt => new Date(attempt.completed_at).toDateString())
  ).size;

  // Generate week objectives based on current week
  const getWeekObjectives = (week: number) => {
    const baseObjectives = {
      1: [
        { completed: questionsAnsweredCurrentWeek >= 5, text: "Identify CPU types and sockets" },
        { completed: questionsAnsweredCurrentWeek >= 10, text: "Understand RAM specifications" },
        { completed: questionsAnsweredCurrentWeek >= 15, text: "Storage device interfaces" },
        { completed: questionsAnsweredCurrentWeek >= 20, text: "Power supply basics" }
      ],
      2: [
        { completed: questionsAnsweredCurrentWeek >= 25, text: "Advanced CPU architectures" },
        { completed: questionsAnsweredCurrentWeek >= 30, text: "Memory channel configurations" },
        { completed: questionsAnsweredCurrentWeek >= 35, text: "NVMe and storage optimization" },
        { completed: questionsAnsweredCurrentWeek >= 40, text: "Cooling system design" }
      ],
      3: [
        { completed: questionsAnsweredCurrentWeek >= 45, text: "Mobile device components" },
        { completed: questionsAnsweredCurrentWeek >= 50, text: "Tablet and smartphone troubleshooting" },
        { completed: questionsAnsweredCurrentWeek >= 55, text: "Basic networking concepts" },
        { completed: questionsAnsweredCurrentWeek >= 60, text: "Network topology understanding" }
      ]
    };
    
    // For weeks beyond what we've defined, create generic objectives
    if (!baseObjectives[week]) {
      const baseQuestions = (week - 1) * 20;
      return [
        { completed: questionsAnsweredCurrentWeek >= baseQuestions + 5, text: `Week ${week} foundational concepts` },
        { completed: questionsAnsweredCurrentWeek >= baseQuestions + 10, text: `Week ${week} intermediate topics` },
        { completed: questionsAnsweredCurrentWeek >= baseQuestions + 15, text: `Week ${week} advanced concepts` },
        { completed: questionsAnsweredCurrentWeek >= baseQuestions + 20, text: `Week ${week} practical applications` }
      ];
    }
    
    return baseObjectives[week];
  };

  const weekObjectives = getWeekObjectives(currentWeek);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-blue-600" />
              <BookOpen className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CompTIA A+ Platform</h1>
              <p className="text-sm text-gray-600">Week {currentWeek}: {currentWeekInfo.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-sm">
              Student
            </Badge>
            <UserMenu />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.user_metadata?.first_name || 'Student'}!
          </h2>
          <p className="text-gray-600 text-lg">
            Continue your CompTIA A+ certification journey. You're doing great!
          </p>
        </div>

        {/* Week Selector */}
        <WeekSelector 
          courseWeeks={courseWeeks}
          currentWeek={currentWeek}
          onWeekChange={setSelectedWeek}
        />

        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Progress</span>
            </CardTitle>
            <CardDescription>
              Track your learning journey through the 12-week program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Overall Course Progress</span>
                  <span>{Math.round(weeklyProgress)}% Complete</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{currentWeek}</div>
                  <div className="text-sm text-gray-600">Current Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{avgScore}%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{quizAttempts.length}</div>
                  <div className="text-sm text-gray-600">Quiz Attempts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{uniqueDaysStudied}</div>
                  <div className="text-sm text-gray-600">Days Studied</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Access Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span>Practice Questions</span>
              </CardTitle>
              <CardDescription>
                Test your knowledge with targeted practice questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Week {currentWeek} Questions</span>
                  <span className="font-medium">{questionsAnsweredCurrentWeek}/{totalQuestionsCurrentWeek}</span>
                </div>
                <Progress value={practiceProgress} className="h-2" />
                <Link to="/practice">
                  <Button className="w-full">
                    Continue Practice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-green-600" />
                <span>Flashcards</span>
              </CardTitle>
              <CardDescription>
                Master key concepts with interactive flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Cards Available</span>
                  <span className="font-medium">{totalQuestionsCurrentWeek}</span>
                </div>
                <Progress value={practiceProgress} className="h-2" />
                <Link to="/flashcards">
                  <Button className="w-full" variant="outline">
                    Study Flashcards
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <span>Help Desk Scenarios</span>
              </CardTitle>
              <CardDescription>
                Practice real-world IT support situations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Available Scenarios</span>
                  <span className="font-medium">5</span>
                </div>
                <Progress value={0} className="h-2" />
                <Link to="/help-desk">
                  <Button className="w-full" variant="outline">
                    Practice Scenarios
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5 text-purple-600" />
                <span>Job Readiness</span>
              </CardTitle>
              <CardDescription>
                Prepare for your IT career with job readiness tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Checklist Items</span>
                  <span className="font-medium">8</span>
                </div>
                <Progress value={0} className="h-2" />
                <Link to="/job-readiness">
                  <Button className="w-full" variant="outline">
                    Career Prep
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* This Week's Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>This Week: {currentWeekInfo.title}</span>
            </CardTitle>
            <CardDescription>
              Week {currentWeek} of 12 - {currentWeekInfo.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  {weekObjectives.map((objective, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      {objective.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={`text-sm ${objective.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                        {objective.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Recommended Actions</h4>
                <div className="space-y-2">
                  <Link to="/practice">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      📚 Practice {currentWeekInfo.title} Questions
                    </Button>
                  </Link>
                  <Link to="/flashcards">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🧠 Study Component Flashcards
                    </Button>
                  </Link>
                  <Link to="/help-desk">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      🎯 Practice Help Desk Scenarios
                    </Button>
                  </Link>
                  <Link to="/job-readiness">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      💼 Work on Job Readiness
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
