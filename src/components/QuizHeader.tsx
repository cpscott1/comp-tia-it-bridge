
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";

interface QuizHeaderProps {
  topicName: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentWeek: number;
  onBack: () => void;
}

export const QuizHeader = ({ 
  topicName, 
  currentQuestionIndex, 
  totalQuestions, 
  currentWeek, 
  onBack 
}: QuizHeaderProps) => {
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {totalQuestions} (Week {currentWeek})
        </div>
      </div>
      <CardTitle>Week {currentWeek}: {topicName}</CardTitle>
      <CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardDescription>
    </CardHeader>
  );
};
