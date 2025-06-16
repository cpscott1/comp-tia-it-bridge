
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  TrendingUp, 
  FileText, 
  Download, 
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";
import { Link } from "react-router-dom";

// Mock data for demonstration
const MOCK_STUDENTS = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", currentWeek: 2, completionRate: 85, lastActive: "2 hours ago" },
  { id: "2", name: "Bob Smith", email: "bob@example.com", currentWeek: 1, completionRate: 60, lastActive: "1 day ago" },
  { id: "3", name: "Carol Davis", email: "carol@example.com", currentWeek: 2, completionRate: 95, lastActive: "30 minutes ago" },
  { id: "4", name: "David Wilson", email: "david@example.com", currentWeek: 1, completionRate: 40, lastActive: "3 days ago" },
  { id: "5", name: "Eva Brown", email: "eva@example.com", currentWeek: 2, completionRate: 78, lastActive: "1 hour ago" },
];

const MOCK_COMPLETION_STATS = {
  week1: { total: 5, completed: 4, percentage: 80 },
  week2: { total: 3, completed: 2, percentage: 67 },
  overall: { total: 8, completed: 6, percentage: 75 }
};

const MOCK_MISSED_TOPICS = [
  { topic: "Power Supply Troubleshooting", missedBy: 3, percentage: 60 },
  { topic: "Memory Installation", missedBy: 2, percentage: 40 },
  { topic: "CPU Socket Types", missedBy: 2, percentage: 40 }
];

const InstructorDashboard = () => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  const generateWeeklyReport = () => {
    // In a real implementation, this would generate and download an actual PDF
    console.log("Generating weekly report...");
    alert("Weekly report would be generated and downloaded here.");
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
            <Button onClick={generateWeeklyReport}>
              <Download className="h-4 w-4 mr-2" />
              Generate Weekly Report
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{MOCK_STUDENTS.length}</p>
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
                  <p className="text-2xl font-bold text-gray-900">{MOCK_COMPLETION_STATS.overall.percentage}%</p>
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
                  <p className="text-2xl font-bold text-gray-900">4</p>
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
                  <p className="text-2xl font-bold text-gray-900">1</p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Student Management</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
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
                <div className="space-y-4">
                  {MOCK_STUDENTS.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="font-semibold text-blue-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-gray-600">{student.email}</p>
                          <p className="text-xs text-gray-500">Last active: {student.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm font-medium">Week {student.currentWeek}</p>
                          <p className="text-xs text-gray-600">Current</p>
                        </div>
                        <div className="text-center">
                          <p className={`text-sm font-medium ${getCompletionColor(student.completionRate)}`}>
                            {student.completionRate}%
                          </p>
                          <p className="text-xs text-gray-600">Complete</p>
                        </div>
                        {getStatusBadge(student.completionRate)}
                      </div>
                    </div>
                  ))}
                </div>
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
                      <span>{MOCK_COMPLETION_STATS.week1.completed}/{MOCK_COMPLETION_STATS.week1.total} students</span>
                    </div>
                    <Progress value={MOCK_COMPLETION_STATS.week1.percentage} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Week 2</span>
                      <span>{MOCK_COMPLETION_STATS.week2.completed}/{MOCK_COMPLETION_STATS.week2.total} students</span>
                    </div>
                    <Progress value={MOCK_COMPLETION_STATS.week2.percentage} className="h-2" />
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
                      <span className="text-sm">Computer Won't Boot</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={80} className="w-20 h-2" />
                        <span className="text-xs text-gray-600">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Slow Performance</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={60} className="w-20 h-2" />
                        <span className="text-xs text-gray-600">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Monitor Issues</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={40} className="w-20 h-2" />
                        <span className="text-xs text-gray-600">40%</span>
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
                <CardTitle>Top 3 Missed Topics</CardTitle>
                <CardDescription>
                  Topics that need additional attention in class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_MISSED_TOPICS.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-red-900">{topic.topic}</h4>
                        <p className="text-sm text-red-700">
                          Missed by {topic.missedBy} students ({topic.percentage}%)
                        </p>
                      </div>
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Statistics</CardTitle>
                <CardDescription>
                  Student engagement metrics for the current week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-gray-600">Questions Answered</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">24h</div>
                    <div className="text-sm text-gray-600">Avg. Study Time</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">73%</div>
                    <div className="text-sm text-gray-600">Avg. Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Reports</CardTitle>
                <CardDescription>
                  Auto-generated reports for class impact tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Week 2 Class Impact Report</h4>
                        <p className="text-sm text-gray-600">Generated on Dec 15, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold">Week 1 Class Impact Report</h4>
                        <p className="text-sm text-gray-600">Generated on Dec 8, 2024</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
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
