
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Lock, Clock } from "lucide-react";
import { useWeekProgress, useAdvanceWeek } from "@/hooks/useWeekProgress";
import { useUserQuizAttempts } from "@/hooks/useQuizAttempts";
import { useToast } from "@/hooks/use-toast";

interface WeekSelectorProps {
  courseWeeks: Array<{
    number: number;
    title: string;
    description: string;
  }>;
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export const WeekSelector = ({ courseWeeks, currentWeek, onWeekChange }: WeekSelectorProps) => {
  const { data: weekProgress } = useWeekProgress();
  const { data: quizAttempts = [] } = useUserQuizAttempts();
  const advanceWeek = useAdvanceWeek();
  const { toast } = useToast();

  // Check if a week is completed based on quiz attempts
  const isWeekCompleted = (weekNumber: number) => {
    if (!weekProgress) return false;
    return weekProgress.completed_weeks.includes(weekNumber);
  };

  // Check if user can access a week
  const canAccessWeek = (weekNumber: number) => {
    if (!weekProgress) return weekNumber === 1;
    return weekNumber <= weekProgress.current_week;
  };

  // Check if current week objectives are completed
  const areCurrentWeekObjectivesCompleted = () => {
    const questionsAnswered = quizAttempts.reduce((sum, attempt) => sum + attempt.total_questions, 0);
    const requiredQuestions = currentWeek * 20; // 20 questions per week
    return questionsAnswered >= requiredQuestions;
  };

  const handleAdvanceWeek = async () => {
    if (!areCurrentWeekObjectivesCompleted()) {
      toast({
        title: "Week not complete",
        description: "Complete all objectives for this week before advancing.",
        variant: "destructive",
      });
      return;
    }

    try {
      await advanceWeek.mutateAsync(currentWeek);
      toast({
        title: "Week completed!",
        description: `You've advanced to Week ${currentWeek + 1}`,
      });
      onWeekChange(currentWeek + 1);
    } catch (error) {
      console.error('Error advancing week:', error);
      toast({
        title: "Error",
        description: "Failed to advance to next week",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>
          Complete each week's objectives to unlock the next week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
          {courseWeeks.map((week) => {
            const completed = isWeekCompleted(week.number);
            const accessible = canAccessWeek(week.number);
            const isCurrent = week.number === currentWeek;
            
            return (
              <button
                key={week.number}
                onClick={() => accessible ? onWeekChange(week.number) : null}
                disabled={!accessible}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  isCurrent
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : completed
                    ? 'border-green-500 bg-green-50 text-green-900 hover:bg-green-100'
                    : accessible
                    ? 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50'
                    : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">Week {week.number}</span>
                  {completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                  {!accessible && <Lock className="h-4 w-4 text-gray-400" />}
                  {isCurrent && !completed && <Clock className="h-4 w-4 text-blue-600" />}
                </div>
                <div className="text-xs opacity-75 line-clamp-2">
                  {week.title}
                </div>
              </button>
            );
          })}
        </div>

        {weekProgress && currentWeek < 12 && (
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-medium text-blue-900">Ready for next week?</h4>
              <p className="text-sm text-blue-700">
                Complete all objectives to advance to Week {currentWeek + 1}
              </p>
            </div>
            <Button
              onClick={handleAdvanceWeek}
              disabled={!areCurrentWeekObjectivesCompleted() || advanceWeek.isPending}
              size="sm"
            >
              {advanceWeek.isPending ? 'Advancing...' : 'Complete Week'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
