
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, FileText, Briefcase, User, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'resume' | 'skills' | 'interview' | 'application';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
}

const JOB_READINESS_CHECKLIST: ChecklistItem[] = [
  {
    id: "resume-1",
    title: "Create Technical Resume",
    description: "Build a resume highlighting your IT skills and CompTIA A+ knowledge",
    category: 'resume',
    priority: 'high',
    estimatedTime: "2-3 hours"
  },
  {
    id: "resume-2",
    title: "Add CompTIA A+ Certification",
    description: "Include your certification status and expected completion date",
    category: 'resume',
    priority: 'high',
    estimatedTime: "15 minutes"
  },
  {
    id: "skills-1",
    title: "Practice Technical Terminology",
    description: "Review and practice explaining common IT terms and concepts",
    category: 'skills',
    priority: 'high',
    estimatedTime: "1 hour"
  },
  {
    id: "skills-2",
    title: "Build Home Lab",
    description: "Set up a basic home lab to practice troubleshooting skills",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "4-6 hours"
  },
  {
    id: "interview-1",
    title: "Prepare Common Interview Questions",
    description: "Practice answers for typical help desk and entry-level IT questions",
    category: 'interview',
    priority: 'high',
    estimatedTime: "2 hours"
  },
  {
    id: "interview-2",
    title: "Practice Scenario Questions",
    description: "Prepare for technical troubleshooting scenarios in interviews",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1 hour"
  },
  {
    id: "application-1",
    title: "Create Professional Profiles",
    description: "Set up LinkedIn and other professional networking profiles",
    category: 'application',
    priority: 'medium',
    estimatedTime: "1-2 hours"
  },
  {
    id: "application-2",
    title: "Research Target Companies",
    description: "Identify potential employers and learn about their IT environments",
    category: 'application',
    priority: 'medium',
    estimatedTime: "30 minutes per company"
  }
];

const RESUME_TEMPLATES = [
  {
    id: "it-entry",
    title: "Entry-Level IT Resume",
    description: "Perfect for help desk and desktop support positions",
    downloadUrl: "#"
  },
  {
    id: "comptia-focused",
    title: "CompTIA A+ Focused Resume",
    description: "Highlights certification and technical skills",
    downloadUrl: "#"
  }
];

const JobReadiness = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleItemToggle = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = selectedCategory === 'all' 
    ? JOB_READINESS_CHECKLIST
    : JOB_READINESS_CHECKLIST.filter(item => item.category === selectedCategory);

  const completedCount = completedItems.length;
  const totalItems = JOB_READINESS_CHECKLIST.length;
  const progress = (completedCount / totalItems) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'resume': return <FileText className="h-4 w-4" />;
      case 'skills': return <Briefcase className="h-4 w-4" />;
      case 'interview': return <User className="h-4 w-4" />;
      case 'application': return <ExternalLink className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'resume': return 'bg-blue-100 text-blue-800';
      case 'skills': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'application': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Job Readiness Center
            </h1>
            <p className="text-lg text-gray-600">
              Prepare for your IT career with our comprehensive job readiness tools
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Readiness Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-600">{totalItems - completedCount}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resume Templates */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Resume Templates</span>
            </CardTitle>
            <CardDescription>
              Download professional resume templates tailored for IT positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {RESUME_TEMPLATES.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{template.title}</h4>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Tasks
          </Button>
          {['resume', 'skills', 'interview', 'application'].map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </Button>
          ))}
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className={`${
              completedItems.includes(item.id) ? 'bg-green-50 border-green-200' : ''
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={completedItems.includes(item.id)}
                    onCheckedChange={() => handleItemToggle(item.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${
                        completedItems.includes(item.id) ? 'line-through text-gray-600' : ''
                      }`}>
                        {item.title}
                      </h3>
                      <div className="flex space-x-2">
                        <Badge className={getCategoryColor(item.category)}>
                          {item.category}
                        </Badge>
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className={`text-gray-600 mb-2 ${
                      completedItems.includes(item.id) ? 'line-through' : ''
                    }`}>
                      {item.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Estimated time: {item.estimatedTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {progress === 100 && (
          <Card className="mt-6 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-green-900 mb-2">Congratulations!</h3>
              <p className="text-green-700 mb-4">
                You've completed all job readiness tasks. You're well-prepared to start your IT career!
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                View Job Opportunities
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobReadiness;
