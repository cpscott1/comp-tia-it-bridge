
import { useAuth } from "@/hooks/useAuth";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Award, Clock, CheckCircle2, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  const { data: weekProgress } = useWeekProgress();
  const navigate = useNavigate();
  const currentWeek = weekProgress?.current_week || 1;

  // Define learning objectives for each week
  const weekObjectives = {
    1: [
      "Identify computer components and their functions",
      "Understand motherboard form factors and features", 
      "Compare different CPU types and specifications",
      "Differentiate between memory types and storage devices"
    ],
    2: [
      "Compare Windows, macOS, and Linux operating systems",
      "Understand file systems and directory structures",
      "Perform basic OS installation and configuration",
      "Apply fundamental troubleshooting methodology"
    ],
    3: [
      "Configure BIOS/UEFI settings and features",
      "Troubleshoot power supply and boot issues",
      "Diagnose storage device problems and failures", 
      "Resolve display and performance issues"
    ],
    4: [
      "Compare network cable types and connectors",
      "Understand networking hardware and wireless standards",
      "Identify different network types and topologies",
      "Apply network troubleshooting scenarios"
    ],
    5: [
      "Understand TCP vs UDP protocols and their uses",
      "Memorize common network ports and protocols",
      "Configure IP addressing and subnet basics",
      "Implement DHCP and DNS services"
    ],
    6: [
      "Understand server roles and network services",
      "Implement AAA (Authentication, Authorization, Accounting)",
      "Configure network appliances and security devices",
      "Manage legacy systems and IoT devices",
      "Troubleshoot network connectivity issues",
      "Implement VLANs and VPN technologies"
    ]
  };

  const currentObjectives = weekObjectives[currentWeek as keyof typeof weekObjectives] || [];

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to CompTIA A+ Prep</h1>
          <p className="text-xl text-gray-600 mb-8">Your comprehensive study platform for IT certification success</p>
          <Button onClick={() => navigate('/auth')} size="lg">
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.user_metadata?.first_name || 'Student'}!
            </h1>
            <p className="text-xl text-gray-600">
              Continue your CompTIA A+ certification journey
            </p>
          </div>

          {/* Current Week Progress */}
          <Card className="mb-8 border-l-4 border-l-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Week {currentWeek} Progress</CardTitle>
                  <CardDescription>
                    {currentWeek === 1 && "Hardware Fundamentals"}
                    {currentWeek === 2 && "Operating Systems"}
                    {currentWeek === 3 && "Troubleshooting PC Hardware"}
                    {currentWeek === 4 && "Network Fundamentals"}
                    {currentWeek === 5 && "Network Addressing & Internet Connections"}
                    {currentWeek === 6 && "Supporting Network Services"}
                    {currentWeek > 6 && "Advanced Topics"}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  Week {currentWeek} of 12
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Target className="h-4 w-4 mr-2" />
                    Learning Objectives
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentObjectives.map((objective, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{objective}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/practice')}>
              <CardHeader className="text-center">
                <BookOpen className="h-8 w-8 mx-auto text-blue-600 mb-2" />
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>Test your knowledge with interactive quizzes</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/flashcards')}>
              <CardHeader className="text-center">
                <Award className="h-8 w-8 mx-auto text-green-600 mb-2" />
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>Review key concepts and terminology</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/help-desk')}>
              <CardHeader className="text-center">
                <Users className="h-8 w-8 mx-auto text-purple-600 mb-2" />
                <CardTitle>Help Desk Scenarios</CardTitle>
                <CardDescription>Practice real-world troubleshooting</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/job-readiness')}>
              <CardHeader className="text-center">
                <Target className="h-8 w-8 mx-auto text-orange-600 mb-2" />
                <CardTitle>Job Readiness</CardTitle>
                <CardDescription>Prepare for your IT career</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Study Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Study Tips for Week {currentWeek}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentWeek === 1 && (
                  <>
                    <p>• Start with hardware identification exercises</p>
                    <p>• Focus on understanding component relationships</p>
                    <p>• Use visual aids to memorize form factors</p>
                  </>
                )}
                {currentWeek === 2 && (
                  <>
                    <p>• Practice command-line operations in different OS environments</p>
                    <p>• Understand file system differences between Windows, macOS, and Linux</p>
                    <p>• Learn the troubleshooting methodology steps by heart</p>
                  </>
                )}
                {currentWeek === 3 && (
                  <>
                    <p>• Practice accessing BIOS/UEFI on different systems</p>
                    <p>• Learn to identify hardware failure symptoms</p>
                    <p>• Understand POST beep codes and error messages</p>
                  </>
                )}
                {currentWeek === 4 && (
                  <>
                    <p>• Memorize cable types and their maximum distances</p>
                    <p>• Understand wireless standards and frequencies</p>
                    <p>• Practice network topology identification</p>
                  </>
                )}
                {currentWeek === 5 && (
                  <>
                    <p>• Memorize common port numbers and their protocols</p>
                    <p>• Practice subnet mask calculations</p>
                    <p>• Understand DHCP lease process and DNS resolution</p>
                  </>
                )}
                {currentWeek === 6 && (
                  <>
                    <p>• Understand the differences between server roles</p>
                    <p>• Learn AAA concepts and RADIUS implementation</p>
                    <p>• Practice VLAN configuration scenarios</p>
                    <p>• Study network security appliance functions</p>
                  </>
                )}
                {currentWeek > 6 && (
                  <>
                    <p>• Continue practicing with previous week concepts</p>
                    <p>• Focus on areas where you scored lowest</p>
                    <p>• Review CompTIA objectives systematically</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
