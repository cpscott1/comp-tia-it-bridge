import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle, FileText, Briefcase, User, Download, ExternalLink, GraduationCap, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'professional' | 'resume' | 'skills' | 'interview' | 'application';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  phase: string;
}

const JOB_READINESS_CHECKLIST: ChecklistItem[] = [
  // Phase 1: Foundation Building (Weeks 1-4) - Technical Preparation
  {
    id: "tech-1",
    title: "Complete CompTIA A+ Core 1 study materials",
    description: "Finish all assigned reading and practice materials for Core 1 certification",
    category: 'technical',
    priority: 'high',
    estimatedTime: "20-30 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-2",
    title: "Practice hardware troubleshooting scenarios",
    description: "Work through various hardware problem-solving exercises and simulations",
    category: 'technical',
    priority: 'high',
    estimatedTime: "5-8 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-3",
    title: "Learn basic networking concepts",
    description: "Understand TCP/IP, subnetting, and common network protocols",
    category: 'technical',
    priority: 'high',
    estimatedTime: "4-6 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-4",
    title: "Understand computer components and functions",
    description: "Master identification and functionality of all major PC components",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-5",
    title: "Practice customer service communication",
    description: "Develop skills for explaining technical concepts to non-technical users",
    category: 'technical',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  // Phase 1: Foundation Building (Weeks 1-4) - Professional Development
  {
    id: "prof-1",
    title: "Create professional email address",
    description: "Set up firstname.lastname@gmail.com for job applications",
    category: 'professional',
    priority: 'high',
    estimatedTime: "15 minutes",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-2",
    title: "Set up LinkedIn profile with professional photo",
    description: "Create comprehensive LinkedIn profile highlighting IT skills and goals",
    category: 'professional',
    priority: 'high',
    estimatedTime: "1-2 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-3",
    title: "Research local IT help desk job market",
    description: "Analyze job postings, salary ranges, and required skills in your area",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-4",
    title: "Identify 3-5 target companies",
    description: "Research specific companies where you'd like to work and their IT environments",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-5",
    title: "Begin building technical vocabulary",
    description: "Create and study a glossary of common IT terms and acronyms",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "30 minutes daily",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  // Phase 2: Skill Development (Weeks 5-8) - Technical Skills
  {
    id: "tech-6",
    title: "Complete CompTIA A+ Core 2 study materials",
    description: "Finish all assigned reading and practice materials for Core 2 certification",
    category: 'technical',
    priority: 'high',
    estimatedTime: "25-35 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-7",
    title: "Practice operating system troubleshooting",
    description: "Work through Windows, macOS, and Linux troubleshooting scenarios",
    category: 'technical',
    priority: 'high',
    estimatedTime: "8-10 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-8",
    title: "Learn ticketing system basics (ServiceNow, Zendesk)",
    description: "Understand how to create, update, and manage IT support tickets",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-9",
    title: "Understand remote support tools",
    description: "Learn to use remote desktop, VNC, and other remote assistance tools",
    category: 'technical',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-10",
    title: "Practice documentation and reporting",
    description: "Learn to write clear, concise technical documentation and incident reports",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  // Phase 2: Skill Development (Weeks 5-8) - Soft Skills
  {
    id: "skills-3",
    title: "Develop active listening techniques",
    description: "Practice listening skills to better understand user problems and concerns",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-4",
    title: "Practice explaining technical concepts simply",
    description: "Learn to communicate complex IT issues in user-friendly language",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-5",
    title: "Learn conflict resolution basics",
    description: "Develop skills to handle frustrated users and difficult situations",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-6",
    title: "Improve written communication skills",
    description: "Practice writing professional emails and clear technical instructions",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-7",
    title: "Practice time management and prioritization",
    description: "Learn to manage multiple tickets and prioritize urgent vs non-urgent issues",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  // Original items (keeping existing functionality)
  {
    id: "resume-1",
    title: "Create Technical Resume",
    description: "Build a resume highlighting your IT skills and CompTIA A+ knowledge",
    category: 'resume',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Resume & Application Phase"
  },
  {
    id: "resume-2",
    title: "Add CompTIA A+ Certification",
    description: "Include your certification status and expected completion date",
    category: 'resume',
    priority: 'high',
    estimatedTime: "15 minutes",
    phase: "Resume & Application Phase"
  },
  {
    id: "skills-1",
    title: "Practice Technical Terminology",
    description: "Review and practice explaining common IT terms and concepts",
    category: 'skills',
    priority: 'high',
    estimatedTime: "1 hour",
    phase: "Skills Development Phase"
  },
  {
    id: "skills-2",
    title: "Build Home Lab",
    description: "Set up a basic home lab to practice troubleshooting skills",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "4-6 hours",
    phase: "Skills Development Phase"
  },
  {
    id: "interview-1",
    title: "Prepare Common Interview Questions",
    description: "Practice answers for typical help desk and entry-level IT questions",
    category: 'interview',
    priority: 'high',
    estimatedTime: "2 hours",
    phase: "Interview Preparation Phase"
  },
  {
    id: "interview-2",
    title: "Practice Scenario Questions",
    description: "Prepare for technical troubleshooting scenarios in interviews",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1 hour",
    phase: "Interview Preparation Phase"
  },
  {
    id: "application-1",
    title: "Create Professional Profiles",
    description: "Set up LinkedIn and other professional networking profiles",
    category: 'application',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Application Phase"
  },
  {
    id: "application-2",
    title: "Research Target Companies",
    description: "Identify potential employers and learn about their IT environments",
    category: 'application',
    priority: 'medium',
    estimatedTime: "30 minutes per company",
    phase: "Application Phase"
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
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  const handleItemToggle = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = JOB_READINESS_CHECKLIST.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const phaseMatch = selectedPhase === 'all' || item.phase === selectedPhase;
    return categoryMatch && phaseMatch;
  });

  const completedCount = completedItems.length;
  const totalItems = JOB_READINESS_CHECKLIST.length;
  const progress = (completedCount / totalItems) * 100;

  const phases = Array.from(new Set(JOB_READINESS_CHECKLIST.map(item => item.phase)));

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical': return <GraduationCap className="h-4 w-4" />;
      case 'professional': return <Network className="h-4 w-4" />;
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
      case 'technical': return 'bg-blue-100 text-blue-800';
      case 'professional': return 'bg-purple-100 text-purple-800';
      case 'resume': return 'bg-indigo-100 text-indigo-800';
      case 'skills': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-orange-100 text-orange-800';
      case 'application': return 'bg-pink-100 text-pink-800';
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
              CompTIA A+ Career Readiness Tools
            </h1>
            <p className="text-lg text-gray-600">
              Complete job readiness checklist to prepare for your IT career
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Career Readiness Progress</span>
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

        {/* Phase Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            variant={selectedPhase === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPhase('all')}
          >
            All Phases
          </Button>
          {phases.map((phase) => (
            <Button
              key={phase}
              variant={selectedPhase === phase ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPhase(phase)}
              className="text-xs"
            >
              {phase.split(':')[0]}
            </Button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Categories
          </Button>
          {['technical', 'professional', 'resume', 'skills', 'interview', 'application'].map((category) => (
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
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Estimated time: {item.estimatedTime}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {item.phase}
                      </span>
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
