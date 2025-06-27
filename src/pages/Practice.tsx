
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TopicSelector } from "@/components/TopicSelector";
import { WeekSelector } from "@/components/WeekSelector";
import { Quiz } from "@/components/Quiz";
import { useQuizTopics, QuizTopic } from "@/hooks/usePracticeQuestions";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { restoreWeek3QuizQuestions } from "@/hooks/restoreQuizQuestions";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const { data: topics = [] } = useQuizTopics(currentWeek);
  const { toast } = useToast();

  // Auto-restore Week 3 questions on component mount
  useEffect(() => {
    const autoRestoreQuestions = async () => {
      if (currentWeek === 3) {
        try {
          await restoreWeek3QuizQuestions();
          console.log('Week 3 questions restored successfully');
        } catch (error) {
          console.log('Questions may already exist or error occurred:', error);
        }
      }
    };

    autoRestoreQuestions();
  }, [currentWeek]);

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    return <Quiz topic={selectedTopic} onBack={handleBackToTopics} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Practice Questions</h1>
        
        <WeekSelector />
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Week {currentWeek} Topics</CardTitle>
            <CardDescription>
              Select a topic to start practicing questions for this week.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopicSelector 
              topics={topics} 
              onTopicSelect={handleTopicSelect}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practice;
