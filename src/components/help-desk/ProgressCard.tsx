
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressCardProps {
  progress: number;
  completedCount: number;
  remainingCount: number;
}

export const ProgressCard = ({ progress, completedCount, remainingCount }: ProgressCardProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Scenario Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3" />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-xl font-bold text-blue-600">{completedCount}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-xl font-bold text-gray-600">{remainingCount}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
