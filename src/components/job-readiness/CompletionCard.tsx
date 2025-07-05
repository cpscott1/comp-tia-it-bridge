
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface CompletionCardProps {
  progress: number;
}

const CompletionCard = ({ progress }: CompletionCardProps) => {
  if (progress < 100) return null;

  return (
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
  );
};

export default CompletionCard;
