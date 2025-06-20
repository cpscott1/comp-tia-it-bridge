
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Eye, HelpCircle } from "lucide-react";
import { RESUME_TEMPLATES, INTERVIEW_GUIDES } from "@/data/jobReadinessData";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ResumeTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    // You could add a toast here if needed
  };

  return (
    <div className="space-y-6">
      {/* Resume Templates Section */}
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
                <div className="flex-1">
                  <h4 className="font-semibold">{template.title}</h4>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
                <div className="flex space-x-2">
                  {template.content && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{template.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border">
                            {template.content}
                          </pre>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => copyToClipboard(template.content!)}
                              variant="outline"
                            >
                              Copy to Clipboard
                            </Button>
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interview Guides Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>Interview Preparation</span>
          </CardTitle>
          <CardDescription>
            Prepare for your IT help desk interviews with common questions and sample answers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-1 gap-4">
            {INTERVIEW_GUIDES.map((guide) => (
              <div key={guide.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{guide.title}</h4>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                </div>
                <div className="flex space-x-2">
                  {guide.content && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>{guide.title}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg border">
                            {guide.content}
                          </pre>
                          <div className="flex space-x-2">
                            <Button 
                              onClick={() => copyToClipboard(guide.content!)}
                              variant="outline"
                            >
                              Copy to Clipboard
                            </Button>
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeTemplates;
