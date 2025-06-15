
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { PracticeQuestion } from "@/hooks/usePracticeQuestions";

interface QuizQuestionProps {
  question: PracticeQuestion;
  selectedAnswer: number | undefined;
  onAnswerSelect: (answerIndex: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
}

export const QuizQuestion = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  isFirstQuestion,
  isLastQuestion,
}: QuizQuestionProps) => {
  return (
    <CardContent>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswer === index && (
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
            onClick={onPrevious}
            disabled={isFirstQuestion}
          >
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={selectedAnswer === undefined}
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next'}
          </Button>
        </div>
      </div>
    </CardContent>
  );
};
