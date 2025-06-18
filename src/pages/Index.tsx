
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Brain, 
  Download, 
  Calendar,
  HelpCircle, 
  Briefcase, 
  User, 
  LogOut,
  Trophy,
  Target,
  Clock,
  Users
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { useQuizAttempts } from "@/hooks/useQuizAttempts";
import WeekSelector from "@/components/WeekSelector";
import UserMenu from "@/components/UserMenu";

const Index = () => {
  const { user } = useAuth();
  const { weekProgress } = useWeekProgress();
  const { attempts } = useQuizAttempts();

  const currentWeek = weekProgress?.current_week || 1;
  const completedWeeks = weekProgress?.completed_weeks || [];
  const totalWeeks = 12;
  const progressPercentage = (completedWeeks.length / totalWeeks) * 100;

  // Calculate recent quiz performance
  const recentAttempts = attempts?.slice(0, 5) || [];
  const averageScore = recentAttempts.length > 0 
    ? Math.round(recentAttempts.reduce((sum, attempt) => sum + (attempt.score / attempt.total_questions * 100), 0) / recentAttempts.length)
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-blue-600">CompTIA A+ Study Hub</CardTitle>
            <CardDescription>
              Master hardware fundamentals and ace your certification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/auth">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
            </Link>
            <div className="text-center">
              <Link to="/instructor/auth" className="text-sm text-blue-600 hover:underline">
                Instructor Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">CompTIA A+ Study Hub</h1>
            </div>
            <UserMenu />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.user_metadata?.first_name || 'Student'}!
          </h2>
          <p className="text-lg text-gray-600">
            Continue your CompTIA A+ certification journey
          </p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Week</p>
                  <p className="text-2xl font-bold text-blue-600">Week {currentWeek}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-bold text-green-600">{Math.round(progressPercentage)}%</p>
                </div>
                <Trophy className="h-8 w-8 text-green-600" />
              </div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quiz Average</p>
                  <p className="text-2xl font-bold text-purple-600">{averageScore}%</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Week Selection */}
        <div className="mb-8">
          <WeekSelector />
        </div>

        {/* Study Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/practice">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-blue-600" />
                  <span>Practice Quiz</span>
                </CardTitle>
                <CardDescription>
                  Test your knowledge with targeted practice questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">
                  {attempts?.length || 0} attempts completed
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link to="/flashcards">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-green-600" />
                  <span>Flashcards</span>
                </CardTitle>
                <CardDescription>
                  Review key concepts and definitions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Quick review</Badge>
              </CardContent>
            </Card>
          </Link>

          <Link to="/calendar">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  <span>Book Progress Meeting</span>
                </CardTitle>
                <CardDescription>
                  Schedule a one-on-one discussion with your instructor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Weekly check-ins
                </Badge>
              </CardContent>
            </Card>
          </Link>

          <Link to="/job-readiness">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <span>Job Readiness</span>
                </CardTitle>
                <CardDescription>
                  Prepare for your career transition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Career prep</Badge>
              </CardContent>
            </Card>
          </Link>

          <Link to="/downloads">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-indigo-600" />
                  <span>Downloads</span>
                </CardTitle>
                <CardDescription>
                  Access study materials and resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Study resources</Badge>
              </CardContent>
            </Card>
          </Link>

          <Link to="/help">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-red-600" />
                  <span>Help & Support</span>
                </CardTitle>
                <CardDescription>
                  Get assistance and submit documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Support</Badge>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity */}
        {recentAttempts.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Quiz Activity</CardTitle>
                <CardDescription>Your latest practice session results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAttempts.slice(0, 3).map((attempt, index) => {
                    const score = Math.round((attempt.score / attempt.total_questions) * 100);
                    return (
                      <div key={attempt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Practice Quiz #{recentAttempts.length - index}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(attempt.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={score >= 80 ? "default" : score >= 60 ? "secondary" : "destructive"}>
                          {score}%
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
