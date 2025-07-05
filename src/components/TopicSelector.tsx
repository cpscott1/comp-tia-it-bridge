
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, BookOpen } from "lucide-react";
import { QuizTopic } from "@/hooks/usePracticeQuestions";
import { usePracticeQuestions } from "@/hooks/usePracticeQuestions";
import { useFlashcards } from "@/hooks/useFlashcards";
import { useUserQuizAttempts } from "@/hooks/useQuizAttempts";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { useLocation } from "react-router-dom";

interface TopicSelectorProps {
  topics: QuizTopic[];
  onTopicSelect: (topic: QuizTopic) => void;
  loading: boolean;
}

export const TopicSelector = ({ topics, onTopicSelect, loading }: TopicSelectorProps) => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const { data: attempts = [] } = useUserQuizAttempts();
  const location = useLocation();
  const isFlashcardsPage = location.pathname === '/flashcards';

  console.log("TopicSelector - Current week:", currentWeek);
  console.log("TopicSelector - Week progress:", weekProgress);
  console.log("TopicSelector - Available topics:", topics);
  console.log("TopicSelector - Is flashcards page:", isFlashcardsPage);

  // Get the appropriate topic display name based on the week and content
  const getTopicDisplayName = (topic: QuizTopic, week: number) => {
    if (week === 4) {
      return "Comparing Local Networking Hardware";
    }
    return topic.name;
  };

  // Get the appropriate topic description based on the week and content
  const getTopicDescription = (topic: QuizTopic, week: number) => {
    if (week === 4) {
      return "Week 4: Network Fundamentals - Cable types, networking hardware, wireless, and network types";
    }
    return topic.description;
  };

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
        const displayName = getTopicDisplayName(topic, currentWeek);
        const displayDescription = getTopicDescription(topic, currentWeek);
        return <TopicCard 
          key={topic.id} 
          topic={{ ...topic, name: displayName, description: displayDescription }}
          currentWeek={currentWeek}
          attempts={attempts}
          isFlashcardsPage={isFlashcardsPage}
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
  isFlashcardsPage,
  onSelect 
}: { 
  topic: QuizTopic; 
  currentWeek: number;
  attempts: any[];
  isFlashcardsPage: boolean;
  onSelect: (topic: QuizTopic) => void; 
}) => {
  // Get questions for practice or flashcards based on the page
  const { data: allQuestions = [] } = usePracticeQuestions(topic.id);
  // Always pass currentWeek to flashcards hook
  const { data: flashcardsData = [] } = useFlashcards(topic.id, currentWeek);
  
  console.log(`TopicCard ${topic.name} - Topic ID:`, topic.id);
  console.log(`TopicCard ${topic.name} - Current week:`, currentWeek);
  console.log(`TopicCard ${topic.name} - All questions from API:`, allQuestions.length);
  console.log(`TopicCard ${topic.name} - Questions by week:`, allQuestions.reduce((acc, q) => {
    acc[q.week_number] = (acc[q.week_number] || 0) + 1;
    return acc;
  }, {} as Record<number, number>));
  
  // Filter questions to match the same logic as Quiz component
  const weekQuestions = allQuestions.filter(question => {
    console.log(`Question: "${question.question.substring(0, 50)}..." - Week: ${question.week_number}`);
    
    // Only include questions from the current week
    if (question.week_number !== currentWeek) {
      console.log(`  Excluded: Wrong week (${question.week_number} vs ${currentWeek})`);
      return false;
    }
    
    // For Week 4, exclude help desk scenarios - they start with specific patterns
    if (currentWeek === 4) {
      const helpDeskPatterns = [
        'Network Connectivity Issues:',
        'Slow Wireless Performance:',
        'Cable Connection Problem:',
        'Wireless Security Configuration:',
        'Network Printer Access Issues:'
      ];
      
      const isHelpDeskScenario = helpDeskPatterns.some(pattern => 
        question.question.startsWith(pattern)
      );
      
      if (isHelpDeskScenario) {
        console.log(`  Excluded: Help desk scenario`);
        return false;
      }
    }
    
    // For Week 3, exclude help desk scenarios as well
    if (currentWeek === 3) {
      const helpDeskPatterns = [
        'Network Connectivity Issues:',
        'Slow Wireless Performance:',
        'Cable Connection Problem:',
        'Wireless Security Configuration:',
        'Network Printer Access Issues:'
      ];
      
      const isHelpDeskScenario = helpDeskPatterns.some(pattern => 
        question.question.startsWith(pattern)
      );
      
      if (isHelpDeskScenario) {
        console.log(`  Excluded: Help desk scenario`);
        return false;
      }
    }
    
    console.log(`  Included: Valid question`);
    return true;
  });
  
  // Use appropriate count based on page type
  const itemCount = isFlashcardsPage ? flashcardsData.length : weekQuestions.length;
  const itemType = isFlashcardsPage ? "Flashcards" : "Questions";
  
  console.log(`TopicCard ${topic.name} - Final filtered questions for Week ${currentWeek}:`, weekQuestions.length);
  console.log(`TopicCard ${topic.name} - Flashcards data:`, flashcardsData.length);
  console.log(`TopicCard ${topic.name} - Item count (${itemType}):`, itemCount);
  
  // Get the most recent attempt for this topic AND current week specifically
  const recentAttempt = attempts
    .filter(attempt => attempt.topic_id === topic.id)
    .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime())[0];

  // Check if the recent attempt matches the current week's question count
  // If not, don't show it as it's from a different week
  const isRecentAttemptForCurrentWeek = recentAttempt && 
    recentAttempt.total_questions === weekQuestions.length;

  const completionRate = isRecentAttemptForCurrentWeek 
    ? Math.round((recentAttempt.score / recentAttempt.total_questions) * 100)
    : 0;

  const getStatusInfo = () => {
    if (!isRecentAttemptForCurrentWeek) {
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
            <span className="text-sm text-gray-600">Week {currentWeek} {itemType}:</span>
            <span className="font-medium">{itemCount}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Status:</span>
            <span className={`text-sm font-medium ${status.color}`}>
              {status.text}
            </span>
          </div>
          {isRecentAttemptForCurrentWeek && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Score:</span>
              <span className="font-medium">
                {recentAttempt.score}/{weekQuestions.length}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
