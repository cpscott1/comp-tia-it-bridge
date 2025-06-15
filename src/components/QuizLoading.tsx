
import { Card, CardContent } from "@/components/ui/card";

export const QuizLoading = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardContent className="p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading quiz questions...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
