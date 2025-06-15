
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Target } from "lucide-react";
import { QuizTopic } from "@/hooks/usePracticeQuestions";
import { useUserQuizAttempts } from "@/hooks/useQuizAttempts";

interface TopicSelectorProps {
  topics: QuizTopic[];
  onTopicSelect: (topic: QuizTopic) => void;
  loading?: boolean;
}

export const TopicSelector = ({ topics, onTopicSelect, loading }: TopicSelectorProps) => {
  const { data: attempts = [] } = useUserQuizAttempts();

  const getTopicStats = (topicId: string) => {
    const topicAttempts = attempts.filter(attempt => attempt.topic_id === topicId);
    const totalAttempts = topicAttempts.length;
    const bestScore = totalAttempts > 0 ? Math.max(...topicAttempts.map(a => (a.score / a.total_questions) * 100)) : 0;
    const lastAttempt = topicAttempts[0]; // Most recent due to ordering
    
    return { totalAttempts, bestScore, lastAttempt };
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-10 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {topics.map((topic) => {
        const stats = getTopicStats(topic.id);
        return (
          <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{topic.name}</CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  style={{ 
                    borderColor: topic.color, 
                    color: topic.color 
                  }}
                >
                  {topic.color}
                </Badge>
              </div>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.totalAttempts > 0 && (
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4 text-green-600" />
                      <span>Best: {Math.round(stats.bestScore)}%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span>{stats.totalAttempts} attempts</span>
                    </div>
                  </div>
                )}
                <Button 
                  onClick={() => onTopicSelect(topic)}
                  className="w-full"
                  variant={stats.totalAttempts > 0 ? "outline" : "default"}
                >
                  {stats.totalAttempts > 0 ? "Practice Again" : "Start Practice"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
