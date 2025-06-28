
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Monitor, CheckCircle, FileText, AlertCircle, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitDocumentation } from "@/hooks/useDocumentationSubmissions";
import { useToast } from "@/hooks/use-toast";
import { usePracticeQuestions } from "@/hooks/usePracticeQuestions";
import { supabase } from "@/integrations/supabase/client";

interface HelpDeskScenario {
  id: string;
  title: string;
  description: string;
  ticket: string;
  week: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options: string[];
  correctAnswer: number;
  rationale: string;
}

const HelpDesk = () => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const [selectedScenario, setSelectedScenario] = useState<HelpDeskScenario | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [documentation, setDocumentation] = useState("");
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);
  const [isSubmittingDoc, setIsSubmittingDoc] = useState(false);
  const [helpDeskScenarios, setHelpDeskScenarios] = useState<HelpDeskScenario[]>([]);
  const [loading, setLoading] = useState(true);

  const submitDocumentation = useSubmitDocumentation();
  const { toast } = useToast();

  // Fetch Help Desk scenarios from database
  useEffect(() => {
    const fetchHelpDeskScenarios = async () => {
      try {
        // Get the Help Desk Scenarios topic for current week
        const { data: topic } = await supabase
          .from('quiz_topics')
          .select('id')
          .eq('name', `Week ${currentWeek} Help Desk Scenarios`)
          .single();

        if (topic) {
          const { data: questions } = await supabase
            .from('practice_questions')
            .select('*')
            .eq('topic_id', topic.id)
            .eq('week_number', currentWeek);

          if (questions) {
            const scenarios: HelpDeskScenario[] = questions.map((q, index) => ({
              id: q.id,
              title: `Hardware Scenario ${index + 1}`,
              description: q.question.split(':')[1]?.split('.')[0]?.trim() || 'Hardware troubleshooting scenario',
              ticket: q.question.replace(/^SCENARIO:\s*/, ''),
              week: currentWeek,
              difficulty: q.difficulty as 'Easy' | 'Medium' | 'Hard',
              options: q.options as string[],
              correctAnswer: q.correct_answer,
              rationale: q.explanation
            }));
            setHelpDeskScenarios(scenarios);
          }
        }
      } catch (error) {
        console.error('Error fetching help desk scenarios:', error);
        toast({
          title: "Error loading scenarios",
          description: "Could not load help desk scenarios from database.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHelpDeskScenarios();
  }, [currentWeek, toast]);

  const availableScenarios = helpDeskScenarios.filter(scenario => scenario.week <= currentWeek);
  const completedCount = completedScenarios.length;
  const progress = availableScenarios.length > 0 ? (completedCount / availableScenarios.length) * 100 : 0;

  const handleScenarioSelect = (scenario: HelpDeskScenario) => {
    setSelectedScenario(scenario);
    setSelectedAnswer(null);
    setShowResult(false);
    setDocumentation("");
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && selectedScenario) {
      setShowResult(true);
      if (!completedScenarios.includes(selectedScenario.id)) {
        setCompletedScenarios([...completedScenarios, selectedScenario.id]);
      }
    }
  };

  const handleSubmitDocumentation = async () => {
    if (!selectedScenario || !documentation.trim()) {
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
        scenario_id: selectedScenario.id,
        scenario_title: selectedScenario.title,
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

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setDocumentation("");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-lg">Loading help desk scenarios...</div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedScenario) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={handleBackToScenarios} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scenarios
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span>{selectedScenario.title}</span>
                  </CardTitle>
                  <CardDescription>{selectedScenario.description}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="outline">Week {selectedScenario.week}</Badge>
                  <Badge className={getDifficultyColor(selectedScenario.difficulty)}>
                    {selectedScenario.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Support Ticket</h4>
                <p className="text-blue-800 italic">"{selectedScenario.ticket}"</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold">How would you respond?</h4>
                {selectedScenario.options.map((option, index) => (
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
                    selectedAnswer === selectedScenario.correctAnswer 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center space-x-2 mb-2">
                      <CheckCircle className={`h-5 w-5 ${
                        selectedAnswer === selectedScenario.correctAnswer 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`} />
                      <span className={`font-semibold ${
                        selectedAnswer === selectedScenario.correctAnswer 
                          ? 'text-green-800' 
                          : 'text-red-800'
                      }`}>
                        {selectedAnswer === selectedScenario.correctAnswer ? 'Correct!' : 'Incorrect'}
                      </span>
                    </div>
                    <p className={
                      selectedAnswer === selectedScenario.correctAnswer 
                        ? 'text-green-700' 
                        : 'text-red-700'
                    }>
                      {selectedScenario.rationale}
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
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Help Desk Scenarios
            </h1>
            <p className="text-lg text-gray-600">
              Practice real-world IT support situations with interactive scenarios
            </p>
          </div>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Scenario Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-3" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-xl font-bold text-blue-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xl font-bold text-gray-600">{availableScenarios.length - completedCount}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableScenarios.map((scenario) => (
            <Card 
              key={scenario.id}
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleScenarioSelect(scenario)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Week {scenario.week}</Badge>
                  <Badge className={getDifficultyColor(scenario.difficulty)}>
                    {scenario.difficulty}
                  </Badge>
                </div>
                <CardTitle className="flex items-center space-x-2">
                  <Monitor className="h-5 w-5 text-blue-600" />
                  <span className="text-lg">{scenario.title}</span>
                </CardTitle>
                <CardDescription>{scenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Interactive Scenario</span>
                  {completedScenarios.includes(scenario.id) && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {availableScenarios.length === 0 && (
          <div className="text-center py-12">
            <Monitor className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-lg">
              No help desk scenarios available for Week {currentWeek} yet.
            </div>
            <p className="text-gray-400 mt-2">
              Scenarios will be unlocked as you progress through the course!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpDesk;
