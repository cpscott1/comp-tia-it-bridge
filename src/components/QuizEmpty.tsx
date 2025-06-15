
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { QuizTopic } from "@/hooks/usePracticeQuestions";

interface QuizEmptyProps {
  topic: QuizTopic;
  currentWeek: number;
  onBack: () => void;
}

export const QuizEmpty = ({ topic, currentWeek, onBack }: QuizEmptyProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <CardTitle>No Questions Available</CardTitle>
          <CardDescription>
            There are no practice questions available for {topic.name} in Week {currentWeek} yet.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};
