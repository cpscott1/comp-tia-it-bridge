
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Downloads = () => {
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

        {/* Coming Soon Message */}
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-500 text-lg">
            Downloadable resources are coming soon!
          </div>
          <p className="text-gray-400 mt-2">
            We're preparing study guides, flowcharts, and reference materials for your CompTIA A+ journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
