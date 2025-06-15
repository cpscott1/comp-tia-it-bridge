
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, ArrowLeft, RotateCcw } from "lucide-react";
import { PracticeQuestion, QuizTopic } from "@/hooks/usePracticeQuestions";

interface QuizResultsProps {
  topic: QuizTopic;
  questions: PracticeQuestion[];
  selectedAnswers: number[];
  score: number;
  currentWeek: number;
  onBack: () => void;
  onRestart: () => void;
}

export const QuizResults = ({
  topic,
  questions,
  selectedAnswers,
  score,
  currentWeek,
  onBack,
  onRestart,
}: QuizResultsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Back to Topics
          </Button>
          <Button variant="outline" size="sm" onClick={onRestart}>
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
  );
};
