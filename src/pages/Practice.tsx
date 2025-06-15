
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Target } from "lucide-react";
import { Link } from "react-router-dom";

const Practice = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const hardwareQuestions = [
    {
      id: 1,
      question: "Which component is primarily responsible for temporarily storing data that the CPU needs quick access to?",
      options: [
        "Hard Drive",
        "RAM (Random Access Memory)",
        "Graphics Card",
        "Power Supply"
      ],
      correctAnswer: 1,
      explanation: "RAM (Random Access Memory) is volatile memory that provides fast access to data and programs currently in use by the CPU. Unlike storage devices, RAM loses its contents when power is removed.",
      domain: "Hardware",
      difficulty: "Easy"
    },
    {
      id: 2,
      question: "What is the standard form factor for most modern desktop motherboards?",
      options: [
        "Mini-ITX",
        "Micro-ATX",
        "ATX",
        "E-ATX"
      ],
      correctAnswer: 2,
      explanation: "ATX (Advanced Technology eXtended) is the most common motherboard form factor for desktop computers, measuring 12 × 9.6 inches and providing good expansion capabilities.",
      domain: "Hardware",
      difficulty: "Medium"
    },
    {
      id: 3,
      question: "Which connector type is commonly used for modern SATA drives?",
      options: [
        "4-pin Molex",
        "6-pin PCIe",
        "15-pin SATA power",
        "24-pin ATX"
      ],
      correctAnswer: 2,
      explanation: "SATA drives use a 15-pin SATA power connector that provides 3.3V, 5V, and 12V power rails. This is different from the older 4-pin Molex connectors.",
      domain: "Hardware",
      difficulty: "Medium"
    }
  ];

  const currentQ = hardwareQuestions[currentQuestion];
  const totalQuestions = hardwareQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

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
    
    if (selectedAnswer === currentQ.correctAnswer) {
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

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = currentQuestion === totalQuestions - 1 && showFeedback;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Hardware Foundations Practice</h1>
                <p className="text-sm text-gray-500">Week 1-2 • Component Identification</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Question {currentQuestion + 1} of {totalQuestions}
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!isQuizComplete ? (
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <Card className="mb-6 bg-white/70 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Practice Progress</span>
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
                    <div className="text-lg font-bold text-orange-600">{currentQ.difficulty}</div>
                    <div className="text-sm text-gray-600">Difficulty</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card className="mb-6 bg-white/70 backdrop-blur">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{currentQ.domain}</Badge>
                  <Badge variant="outline">{currentQ.difficulty}</Badge>
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
                            ? index === currentQ.correctAnswer
                              ? 'border-green-500 bg-green-50 text-green-900'
                              : 'border-red-500 bg-red-50 text-red-900'
                            : 'border-blue-500 bg-blue-50 text-blue-900'
                          : showFeedback && index === currentQ.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{option}</span>
                        {showFeedback && index === currentQ.correctAnswer && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {showFeedback && selectedAnswer === index && index !== currentQ.correctAnswer && (
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
          </div>
        ) : (
          /* Quiz Complete */
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/70 backdrop-blur">
              <CardHeader>
                <Target className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-2xl">Practice Session Complete!</CardTitle>
                <CardDescription>Great work on completing the hardware foundations practice</CardDescription>
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
