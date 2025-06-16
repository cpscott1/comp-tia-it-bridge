
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { RESUME_TEMPLATES } from "@/data/jobReadinessData";

const ResumeTemplates = () => {
  return (
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
  );
};

export default ResumeTemplates;
