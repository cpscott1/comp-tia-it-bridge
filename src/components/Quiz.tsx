
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { usePracticeQuestions, QuizTopic } from "@/hooks/usePracticeQuestions";
import { useSaveQuizAttempt } from "@/hooks/useQuizAttempts";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { useToast } from "@/hooks/use-toast";

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
  
  // Filter questions to only show those from the current week
  const questions = allQuestions.filter(question => question.week_number === currentWeek);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

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
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
            <CardTitle>No Questions Available</CardTitle>
            <CardDescription>
              There are no practice questions available for {topic.name} in Week {currentWeek} yet.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4" />
                Back to Topics
              </Button>
              <Button variant="outline" size="sm" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
            <CardTitle className="text-center">Quiz Results</CardTitle>
            <CardDescription className="text-center">{topic.name} - Week {currentWeek}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-4xl font-bold mb-2">
                {score}/{questions.length}
              </div>
              <div className="text-2xl text-gray-600">
                {Math.round((score / questions.length) * 100)}%
              </div>
              <div className="mt-4">
                {score / questions.length >= 0.8 ? (
                  <div className="flex items-center justify-center text-green-600">
                    <CheckCircle className="h-6 w-6 mr-2" />
                    Great job! You passed the quiz.
                  </div>
                ) : (
                  <div className="flex items-center justify-center text-yellow-600">
                    <XCircle className="h-6 w-6 mr-2" />
                    Consider reviewing the material and trying again.
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((question, index) => {
                const userAnswer = selectedAnswers[index];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                    <CardHeader>
                      <CardTitle className="text-sm flex items-center">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        )}
                        Question {index + 1}
                      </CardTitle>
                      <CardDescription>{question.question}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded text-sm ${
                              optionIndex === question.correct_answer
                                ? 'bg-green-100 text-green-800 border border-green-300'
                                : optionIndex === userAnswer && !isCorrect
                                ? 'bg-red-100 text-red-800 border border-red-300'
                                : 'bg-gray-50'
                            }`}
                          >
                            {option}
                            {optionIndex === question.correct_answer && (
                              <span className="ml-2 text-green-600 font-medium">✓ Correct</span>
                            )}
                            {optionIndex === userAnswer && !isCorrect && (
                              <span className="ml-2 text-red-600 font-medium">✗ Your answer</span>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {questions.length} (Week {currentWeek})
            </div>
          </div>
          <CardTitle>{topic.name}</CardTitle>
          <CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentQuestion && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                        selectedAnswers[currentQuestionIndex] === index
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          selectedAnswers[currentQuestionIndex] === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswers[currentQuestionIndex] === index && (
                            <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                          )}
                        </div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestionIndex] === undefined}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
