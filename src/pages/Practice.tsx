
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
  const { data: topics = [], isLoading: topicsLoading, refetch: refetchTopics } = useQuizTopics(currentWeek);
  const { toast } = useToast();

  // Course weeks data for WeekSelector
  const courseWeeks = [
    { number: 1, title: "IT Fundamentals", description: "Basic IT concepts and terminology" },
    { number: 2, title: "Hardware Basics", description: "Computer hardware components" },
    { number: 3, title: "Hardware Troubleshooting", description: "Diagnosing and fixing hardware issues" },
    { number: 4, title: "Coming Soon", description: "Advanced topics" },
    { number: 5, title: "Coming Soon", description: "Advanced topics" },
    { number: 6, title: "Coming Soon", description: "Advanced topics" },
    { number: 7, title: "Coming Soon", description: "Advanced topics" },
    { number: 8, title: "Coming Soon", description: "Advanced topics" },
    { number: 9, title: "Coming Soon", description: "Advanced topics" },
    { number: 10, title: "Coming Soon", description: "Advanced topics" },
    { number: 11, title: "Coming Soon", description: "Advanced topics" },
    { number: 12, title: "Coming Soon", description: "Advanced topics" },
  ];

  // Auto-restore Week 3 questions on component mount
  useEffect(() => {
    const autoRestoreQuestions = async () => {
      if (currentWeek === 3) {
        try {
          console.log('Attempting to restore Week 3 questions...');
          const result = await restoreWeek3QuizQuestions();
          console.log('Restoration result:', result);
          
          // Refetch topics to update the UI with new questions
          await refetchTopics();
          
          if (result.success) {
            toast({
              title: "Questions Updated",
              description: result.message,
            });
          }
        } catch (error) {
          console.error('Error restoring questions:', error);
          toast({
            title: "Error",
            description: "Failed to restore missing questions. Please try refreshing the page.",
            variant: "destructive",
          });
        }
      }
    };

    autoRestoreQuestions();
  }, [currentWeek, toast, refetchTopics]);

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  const handleWeekChange = (week: number) => {
    // This will be handled by the WeekSelector component internally
    console.log('Week changed to:', week);
  };

  if (selectedTopic) {
    return <Quiz topic={selectedTopic} onBack={handleBackToTopics} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Practice Questions</h1>
        
        <WeekSelector 
          courseWeeks={courseWeeks}
          currentWeek={currentWeek}
          onWeekChange={handleWeekChange}
        />
        
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
              loading={topicsLoading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practice;
