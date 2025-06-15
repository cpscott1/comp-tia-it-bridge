import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, BookOpen } from "lucide-react";
import { QuizTopic } from "@/hooks/usePracticeQuestions";
import { usePracticeQuestions } from "@/hooks/usePracticeQuestions";
import { useUserQuizAttempts } from "@/hooks/useQuizAttempts";
import { useWeekProgress } from "@/hooks/useWeekProgress";

interface TopicSelectorProps {
  topics: QuizTopic[];
  onTopicSelect: (topic: QuizTopic) => void;
  loading: boolean;
}

export const TopicSelector = ({ topics, onTopicSelect, loading }: TopicSelectorProps) => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const { data: attempts = [] } = useUserQuizAttempts();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => {
        return <TopicCard 
          key={topic.id} 
          topic={topic} 
          currentWeek={currentWeek}
          attempts={attempts}
          onSelect={onTopicSelect} 
        />;
      })}
    </div>
  );
};

const TopicCard = ({ 
  topic, 
  currentWeek, 
  attempts, 
  onSelect 
}: { 
  topic: QuizTopic; 
  currentWeek: number;
  attempts: any[];
  onSelect: (topic: QuizTopic) => void; 
}) => {
  // Get questions for this topic and current week only
  const { data: allQuestions = [] } = usePracticeQuestions(topic.id);
  const weekQuestions = allQuestions.filter(q => q.week_number === currentWeek);
  
  const recentAttempt = attempts
    .filter(attempt => attempt.topic_id === topic.id)
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())[0];

  const completionRate = recentAttempt 
    ? Math.round((recentAttempt.score / recentAttempt.total_questions) * 100)
    : 0;

  const getStatusInfo = () => {
    if (!recentAttempt) {
      return {
        icon: <Clock className="h-5 w-5 text-gray-400" />,
        text: "Not started",
        color: "text-gray-600"
      };
    }
    
    if (completionRate >= 80) {
      return {
        icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        text: `${completionRate}% - Passed`,
        color: "text-green-600"
      };
    }
    
    return {
      icon: <BookOpen className="h-5 w-5 text-yellow-500" />,
      text: `${completionRate}% - Review needed`,
      color: "text-yellow-600"
    };
  };

  const status = getStatusInfo();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 border-l-4"
      style={{ borderLeftColor: topic.color }}
      onClick={() => onSelect(topic)}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{topic.name}</span>
          {status.icon}
        </CardTitle>
        <CardDescription>{topic.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Questions Available:</span>
            <span className="font-medium">{weekQuestions.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`text-sm font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
          {recentAttempt && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Score:</span>
              <span className="font-medium">
                {recentAttempt.score}/{recentAttempt.total_questions}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
