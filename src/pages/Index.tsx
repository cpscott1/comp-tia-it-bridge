
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Cpu, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const currentWeek = 1;
  const totalWeeks = 12;
  const weekProgress = (currentWeek / totalWeeks) * 100;

  const weekTopics = [
    { week: 1, title: "Hardware Foundations", status: "current", topics: ["Component ID", "Basic Troubleshooting"] },
    { week: 2, title: "Hardware Deep Dive", status: "upcoming", topics: ["Installation", "Configuration"] },
    { week: 3, title: "Networking Fundamentals", status: "upcoming", topics: ["Network Concepts", "Wireless"] },
    { week: 4, title: "Mobile & Peripherals", status: "upcoming", topics: ["Mobile Devices", "Printers"] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CompTIA A+ Companion</h1>
                <p className="text-sm text-gray-500">12-Week Learning Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Week {currentWeek} of {totalWeeks}
              </Badge>
              <Link to="/dashboard">
                <Button size="sm">Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Master CompTIA A+ with Confidence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your digital companion for in-person CompTIA A+ training. Practice, track progress, and prepare for your IT career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/practice">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Practice Session
              </Button>
            </Link>
            <Link to="/assessment">
              <Button size="lg" variant="outline">
                <Target className="mr-2 h-5 w-5" />
                Take Baseline Assessment
              </Button>
            </Link>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Your Progress
            </CardTitle>
            <CardDescription>
              Track your journey through the 12-week program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Program Progress</span>
                <span>{Math.round(weekProgress)}% Complete</span>
              </div>
              <Progress value={weekProgress} className="h-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Practice Sessions</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0%</div>
                  <div className="text-sm text-gray-600">Avg. Score</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Scenarios Completed</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Week Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cpu className="mr-2 h-5 w-5 text-blue-600" />
                Week 1-2: Hardware Foundations
              </CardTitle>
              <CardDescription>
                Master the fundamentals of computer hardware
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Component Identification</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">Basic Troubleshooting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-600">Performance Assessment</span>
                </div>
                <Link to="/practice/hardware">
                  <Button className="w-full mt-4">Start Hardware Practice</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-600" />
                Class Activity
              </CardTitle>
              <CardDescription>
                Connect with your classmates and instructor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-medium text-blue-900">Latest Announcement</div>
                  <div className="text-sm text-blue-700 mt-1">
                    Week 1 hardware lab materials are now available
                  </div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-green-900">Study Group</div>
                  <div className="text-sm text-green-700 mt-1">
                    3 classmates are practicing hardware scenarios
                  </div>
                </div>
                <Link to="/community">
                  <Button variant="outline" className="w-full">Join Discussion</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/flashcards">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/70 backdrop-blur">
              <CardContent className="p-6 text-center">
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900">Flashcards</h3>
                <p className="text-sm text-gray-600 mt-1">300+ key terms</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/scenarios">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/70 backdrop-blur">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900">Scenarios</h3>
                <p className="text-sm text-gray-600 mt-1">Real-world practice</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/references">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/70 backdrop-blur">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900">Quick Refs</h3>
                <p className="text-sm text-gray-600 mt-1">Study guides</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link to="/career">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/70 backdrop-blur">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-medium text-gray-900">Career Prep</h3>
                <p className="text-sm text-gray-600 mt-1">Job readiness</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
