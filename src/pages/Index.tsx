
import { Monitor, BookOpen, Target, TrendingUp, Brain, Users, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';

export default function Index() {
  const { user } = useAuth();

  const weeklyProgress = 25; // This would come from your progress tracking system
  const currentWeek = 2; // This would be calculated based on course start date

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
              <p className="text-sm text-gray-600">Week {currentWeek}: Hardware Foundations</p>
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
                  <span>{weeklyProgress}% Complete</span>
                </div>
                <Progress value={weeklyProgress} className="h-2" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-gray-600">Current Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">12</div>
                  <div className="text-sm text-gray-600">Assignments Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4</div>
                  <div className="text-sm text-gray-600">Days This Week</div>
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
                  <span>Questions Completed</span>
                  <span className="font-medium">47/100</span>
                </div>
                <Progress value={47} className="h-2" />
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
                  <span>Cards Mastered</span>
                  <span className="font-medium">23/50</span>
                </div>
                <Progress value={46} className="h-2" />
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
                <Users className="h-5 w-5 text-purple-600" />
                <span>Class Discussion</span>
              </CardTitle>
              <CardDescription>
                Connect with classmates and ask questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>3 new messages</span>
                  </div>
                  <div className="text-xs">Latest: "RAM troubleshooting tips"</div>
                </div>
                <Button className="w-full" variant="outline">
                  Join Discussion
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* This Week's Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>This Week: Hardware Foundations</span>
            </CardTitle>
            <CardDescription>
              Week 2 of 12 - Focus on component identification and basic troubleshooting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Learning Objectives</h4>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Identify CPU types and sockets</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Understand RAM specifications</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Storage device interfaces</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Power supply basics</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Recommended Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    📚 Review CPU Socket Types
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🧠 Practice RAM Identification
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    🎯 Take Hardware Assessment
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    💬 Ask Questions in Discussion
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
