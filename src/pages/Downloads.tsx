
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileText, Wrench, BookOpen, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useWeekProgress } from "@/hooks/useWeekProgress";

interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'guide' | 'checklist';
  week: number;
  fileSize: string;
  downloadUrl: string;
  isAvailable: boolean;
}

const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  {
    id: "week1-hardware",
    title: "Week 1: Hardware Overview",
    description: "Comprehensive guide to computer hardware components, identification, and basic troubleshooting",
    type: 'pdf',
    week: 1,
    fileSize: "2.3 MB",
    downloadUrl: "#",
    isAvailable: true
  },
  {
    id: "week2-troubleshooting",
    title: "Week 2: Troubleshooting Flowcharts",
    description: "Step-by-step troubleshooting flowcharts for common hardware and software issues",
    type: 'guide',
    week: 2,
    fileSize: "1.8 MB",
    downloadUrl: "#",
    isAvailable: true
  },
  {
    id: "week2-acronyms",
    title: "Week 2: IT Acronyms Reference",
    description: "Complete reference guide for essential IT acronyms and terminology",
    type: 'pdf',
    week: 2,
    fileSize: "800 KB",
    downloadUrl: "#",
    isAvailable: true
  },
  {
    id: "week3-networking",
    title: "Week 3: Networking Fundamentals",
    description: "Basic networking concepts, protocols, and troubleshooting techniques",
    type: 'pdf',
    week: 3,
    fileSize: "2.1 MB",
    downloadUrl: "#",
    isAvailable: false
  },
  {
    id: "week4-wireless",
    title: "Week 4: Wireless Network Setup",
    description: "Guide to setting up and troubleshooting wireless networks",
    type: 'guide',
    week: 4,
    fileSize: "1.5 MB",
    downloadUrl: "#",
    isAvailable: false
  },
  {
    id: "exam-prep",
    title: "CompTIA A+ Exam Preparation Checklist",
    description: "Complete checklist to prepare for the CompTIA A+ certification exam",
    type: 'checklist',
    week: 11,
    fileSize: "500 KB",
    downloadUrl: "#",
    isAvailable: false
  }
];

const Downloads = () => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;

  const availableResources = DOWNLOADABLE_RESOURCES.filter(resource => 
    resource.week <= currentWeek || resource.isAvailable
  );

  const lockedResources = DOWNLOADABLE_RESOURCES.filter(resource => 
    resource.week > currentWeek && !resource.isAvailable
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
      case 'guide': return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'checklist': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'checklist': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (resource: DownloadableResource) => {
    // In a real implementation, this would trigger the actual download
    console.log(`Downloading: ${resource.title}`);
    // You could implement actual file serving here
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
              Downloadable Resources
            </h1>
            <p className="text-lg text-gray-600">
              Download study guides, flowcharts, and reference materials for your CompTIA A+ journey
            </p>
          </div>
        </div>

        {/* Available Resources */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Downloads</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">Week {resource.week}</Badge>
                    <Badge className={getTypeColor(resource.type)}>
                      {resource.type.toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="flex items-center space-x-2">
                    {getTypeIcon(resource.type)}
                    <span className="text-lg">{resource.title}</span>
                  </CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{resource.fileSize}</span>
                    <Button onClick={() => handleDownload(resource)} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Locked Resources */}
        {lockedResources.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Coming Soon</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedResources.map((resource) => (
                <Card key={resource.id} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">Week {resource.week}</Badge>
                      <Badge className={getTypeColor(resource.type)}>
                        {resource.type.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="flex items-center space-x-2">
                      {getTypeIcon(resource.type)}
                      <span className="text-lg">{resource.title}</span>
                    </CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{resource.fileSize}</span>
                      <Button disabled size="sm">
                        <Wrench className="h-4 w-4 mr-2" />
                        Locked
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {availableResources.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-lg">
              No downloads available for Week {currentWeek} yet.
            </div>
            <p className="text-gray-400 mt-2">
              Resources will be unlocked as you progress through the course!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloads;
