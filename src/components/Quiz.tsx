
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { usePracticeQuestions, QuizTopic } from "@/hooks/usePracticeQuestions";
import { useSaveQuizAttempt } from "@/hooks/useQuizAttempts";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { useToast } from "@/hooks/use-toast";
import { QuizHeader } from "./QuizHeader";
import { QuizQuestion } from "./QuizQuestion";
import { QuizResults } from "./QuizResults";
import { QuizLoading } from "./QuizLoading";
import { QuizEmpty } from "./QuizEmpty";

interface QuizProps {
  topic: QuizTopic;
  onBack: () => void;
}

export const Quiz = ({ topic, onBack }: QuizProps) => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const { data: allQuestions = [], isLoading } = usePracticeQuestions(topic.id);
  const saveAttempt = useSaveQuizAttempt();
  const { toast } = useToast();
  
  // Filter questions to only show those from the current week and exclude help desk scenarios
  const questions = allQuestions.filter(question => {
    // Only include questions from the current week
    if (question.week_number !== currentWeek) return false;
    
    // Exclude help desk scenarios - they start with specific patterns
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
    
    return !isHelpDeskScenario;
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateResults = async () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setShowResults(true);

    // Save the quiz attempt
    try {
      await saveAttempt.mutateAsync({
        topic_id: topic.id,
        score: correctCount,
        total_questions: questions.length
      });
      
      toast({
        title: "Quiz completed!",
        description: `Score: ${correctCount}/${questions.length} (${Math.round((correctCount / questions.length) * 100)}%)`,
      });
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (isLoading) {
    return <QuizLoading />;
  }

  if (questions.length === 0) {
    return <QuizEmpty topic={topic} currentWeek={currentWeek} onBack={onBack} />;
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <QuizResults
          topic={topic}
          questions={questions}
          selectedAnswers={selectedAnswers}
          score={score}
          currentWeek={currentWeek}
          onBack={onBack}
          onRestart={handleRestart}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <QuizHeader
          topicName={topic.name}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          currentWeek={currentWeek}
          onBack={onBack}
        />
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isFirstQuestion={currentQuestionIndex === 0}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        )}
      </Card>
    </div>
  );
};
