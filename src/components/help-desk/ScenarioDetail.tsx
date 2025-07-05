
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, AlertCircle, CheckCircle, Send } from "lucide-react";
import { HelpDeskScenario } from "@/types/helpDesk";
import { useSubmitDocumentation } from "@/hooks/useDocumentationSubmissions";
import { useToast } from "@/hooks/use-toast";

interface ScenarioDetailProps {
  scenario: HelpDeskScenario;
  onBack: () => void;
  onComplete: (scenarioId: string) => void;
}

export const ScenarioDetail = ({ scenario, onBack, onComplete }: ScenarioDetailProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [documentation, setDocumentation] = useState("");
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);

  const submitDocumentation = useSubmitDocumentation();
  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
      onComplete(scenario.id);
    }
  };

  const handleSubmitDocumentation = async () => {
    if (!documentation.trim()) {
      toast({
        title: "Documentation required",
        description: "Please write some documentation before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingDoc(true);
    try {
      await submitDocumentation.mutateAsync({
        scenario_id: scenario.id,
        scenario_title: scenario.title,
        documentation: documentation.trim()
      });

      toast({
        title: "Documentation submitted!",
        description: "Your documentation has been sent to the instructor for review.",
      });

      setDocumentation("");
    } catch (error) {
      console.error('Error submitting documentation:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your documentation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingDoc(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Scenarios
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span>{scenario.title}</span>
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </div>
              <div className="flex space-x-2">
                <Badge variant="outline">Week {scenario.week}</Badge>
                <Badge className={getDifficultyColor(scenario.difficulty)}>
                  {scenario.difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Support Ticket</h4>
              <p className="text-blue-800 italic">"{scenario.ticket}"</p>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold">How would you respond?</h4>
              {scenario.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedAnswer === index 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300'
                    }`} />
                    <span className={selectedAnswer === index ? 'font-medium' : ''}>
                      {option}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {!showResult && selectedAnswer !== null && (
              <Button onClick={handleSubmit} className="w-full">
                Submit Response
              </Button>
            )}

            {showResult && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${
                  selectedAnswer === scenario.correctAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className={`h-5 w-5 ${
                      selectedAnswer === scenario.correctAnswer 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`} />
                    <span className={`font-semibold ${
                      selectedAnswer === scenario.correctAnswer 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {selectedAnswer === scenario.correctAnswer ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className={
                    selectedAnswer === scenario.correctAnswer 
                      ? 'text-green-700' 
                      : 'text-red-700'
                  }>
                    {scenario.rationale}
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Documentation Practice</CardTitle>
                    <CardDescription>
                      Document this issue and your resolution process for instructor review
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Describe the issue, steps taken, and resolution..."
                      value={documentation}
                      onChange={(e) => setDocumentation(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSubmitDocumentation}
                        disabled={!documentation.trim() || isSubmittingDoc}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        {isSubmittingDoc ? 'Submitting...' : 'Submit to Instructor'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
