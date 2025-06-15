
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Target, BookOpen, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { usePracticeQuestions, useQuizTopics, QuizTopic, PracticeQuestion } from "@/hooks/usePracticeQuestions";
import { useSaveQuizAttempt } from "@/hooks/useQuizAttempts";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { TopicSelector } from "@/components/TopicSelector";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const { toast } = useToast();
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  
  const { data: topics = [], isLoading: topicsLoading } = useQuizTopics(currentWeek);
  const { data: questions = [], isLoading: questionsLoading } = usePracticeQuestions(selectedTopic?.id, currentWeek);
  const saveQuizAttempt = useSaveQuizAttempt();

  const currentQ = questions[currentQuestion];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestion + 1) / totalQuestions) * 100 : 0;

  const handleTopicSelect = (topic: QuizTopic) => {
    setSelectedTopic(topic);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowFeedback(true);
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);
    
    if (selectedAnswer === currentQ.correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleCompleteQuiz = async () => {
    if (!selectedTopic) return;
    
    try {
      await saveQuizAttempt.mutateAsync({
        topic_id: selectedTopic.id,
        score,
        total_questions: totalQuestions,
      });
      
      toast({
        title: "Quiz completed!",
        description: `Your score has been saved: ${score}/${totalQuestions}`,
      });
    } catch (error) {
      console.error('Error saving quiz attempt:', error);
      toast({
        title: "Error",
        description: "Failed to save your quiz results",
        variant: "destructive",
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = currentQuestion === totalQuestions - 1 && showFeedback;

  // Handle quiz completion
  if (isQuizComplete && !saveQuizAttempt.isPending) {
    handleCompleteQuiz();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedTopic ? (
                <Button variant="ghost" size="sm" onClick={handleBackToTopics}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Topics
                </Button>
              ) : (
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  {selectedTopic ? selectedTopic.name : "Practice Quizzes"}
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Calendar className="h-3 w-3 mr-1" />
                    Week {currentWeek}
                  </Badge>
                </h1>
                <p className="text-sm text-gray-500">
                  {selectedTopic 
                    ? selectedTopic.description 
                    : `CompTIA A+ Week ${currentWeek} practice questions`
                  }
                </p>
              </div>
            </div>
            {selectedTopic && totalQuestions > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                Question {currentQuestion + 1} of {totalQuestions}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!selectedTopic ? (
          /* Topic Selection */
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Week {currentWeek} Practice Topics</h2>
              <p className="text-gray-600">Select a topic to start practicing Week {currentWeek} questions</p>
            </div>
            <TopicSelector 
              topics={topics} 
              onTopicSelect={handleTopicSelect}
              loading={topicsLoading}
            />
          </div>
        ) : questionsLoading ? (
          /* Loading State */
          <div className="max-w-4xl mx-auto">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : totalQuestions === 0 ? (
          /* No Questions Available */
          <div className="max-w-2xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Questions Available</h3>
                <p className="text-gray-600 mb-4">
                  There are currently no practice questions for Week {currentWeek} in this topic.
                </p>
                <Button onClick={handleBackToTopics}>
                  Choose Another Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : !isQuizComplete ? (
          /* Quiz Interface */
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <Card className="mb-6 bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Week {currentWeek} Practice Progress</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between mt-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">{answeredQuestions.filter(Boolean).length}</div>
                    <div className="text-sm text-gray-600">Answered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{currentQ?.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            {currentQ && (
              <Card className="mb-6 bg-white/70 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{selectedTopic.name}</Badge>
                    <div className="flex gap-2">
                      <Badge variant="outline">Week {currentWeek}</Badge>
                      <Badge variant="outline">{currentQ.difficulty}</Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentQ.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {currentQ.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={showFeedback}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          selectedAnswer === index
                            ? showFeedback
                              ? index === currentQ.correct_answer
                                ? 'border-green-500 bg-green-50 text-green-900'
                                : 'border-red-500 bg-red-50 text-red-900'
                              : 'border-blue-500 bg-blue-50 text-blue-900'
                            : showFeedback && index === currentQ.correct_answer
                            ? 'border-green-500 bg-green-50 text-green-900'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showFeedback && index === currentQ.correct_answer && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                          {showFeedback && selectedAnswer === index && index !== currentQ.correct_answer && (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {showFeedback && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-2">Explanation:</h4>
                      <p className="text-blue-800">{currentQ.explanation}</p>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    {!showFeedback ? (
                      <Button 
                        onClick={handleSubmitAnswer}
                        disabled={selectedAnswer === null}
                        className="ml-auto"
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleNextQuestion}
                        disabled={currentQuestion === totalQuestions - 1}
                        className="ml-auto"
                      >
                        {currentQuestion === totalQuestions - 1 ? 'Complete Quiz' : 'Next Question'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* Quiz Complete */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/70 backdrop-blur">
              <CardHeader>
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Week {currentWeek} Practice Complete!</CardTitle>
                <CardDescription>Great work on completing {selectedTopic.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{score}</div>
                    <div className="text-sm text-gray-600">Correct</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">{Math.round((score / totalQuestions) * 100)}%</div>
                    <div className="text-sm text-gray-600">Score</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">{totalQuestions}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button onClick={handleRestartQuiz} className="w-full">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Practice Again
                  </Button>
                  <Button onClick={handleBackToTopics} variant="outline" className="w-full">
                    Choose Another Topic
                  </Button>
                  <Link to="/flashcards" className="block">
                    <Button variant="outline" className="w-full">
                      Study with Flashcards
                    </Button>
                  </Link>
                  <Link to="/" className="block">
                    <Button variant="ghost" className="w-full">
                      Return to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
