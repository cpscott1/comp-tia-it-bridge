
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

  const submitDocumentation = useSubmitDocumentation();
  const { toast } = useToast();

  // Predefined help desk scenarios
  const helpDeskScenarios: HelpDeskScenario[] = [
    // Week 2 scenarios
    {
      id: "w2-scenario-1",
      title: "PC Won't Start",
      description: "Computer completely unresponsive",
      ticket: "My computer won't turn on at all. When I press the power button, nothing happens - no lights, no sounds, nothing. It was working fine yesterday.",
      week: 2,
      difficulty: 'Easy',
      options: [
        "Replace the motherboard immediately",
        "Check power cable connections and try a different outlet",
        "Remove all components and rebuild the PC",
        "Wait 24 hours and try again"
      ],
      correctAnswer: 1,
      rationale: "Always start with basic power troubleshooting - check connections, power outlet, and PSU switch before assuming hardware failure."
    },
    {
      id: "w2-scenario-2",
      title: "Random Shutdowns",
      description: "System shutting down unexpectedly",
      ticket: "My computer keeps shutting down randomly, especially when I'm playing games or using demanding software. It just turns off without any warning.",
      week: 2,
      difficulty: 'Medium',
      options: [
        "Reinstall the operating system",
        "Check for overheating issues and clean cooling system",
        "Replace the RAM",
        "Update all software"
      ],
      correctAnswer: 1,
      rationale: "Random shutdowns during high-performance tasks typically indicate overheating protection. Check temperatures and cooling system first."
    },
    {
      id: "w2-scenario-3",
      title: "Display Issues",
      description: "Monitor not showing image",
      ticket: "My screen is completely black but I can hear the computer running. The monitor power light is on but it says 'No Signal'.",
      week: 2,
      difficulty: 'Easy',
      options: [
        "Replace the graphics card",
        "Check video cable connections and monitor input source",
        "Replace the monitor",
        "Reinstall Windows"
      ],
      correctAnswer: 1,
      rationale: "No signal with working audio suggests video connection issues. Always check cables and connections first."
    },
    // Week 3 scenarios - using your specified scenarios
    {
      id: "w3-scenario-1",
      title: "BIOS Configuration Issue",
      description: "Boot failure after BIOS changes",
      ticket: "I was trying to improve my computer's performance and went into the BIOS to change some settings. Now my computer won't boot at all - it just shows a black screen with a blinking cursor. I can get into BIOS setup, but I don't remember what I changed.",
      week: 3,
      difficulty: 'Medium',
      options: [
        "Tell them to buy a new computer",
        "Guide them to reset BIOS to default settings",
        "Recommend a complete Windows reinstall",
        "Suggest they wait and try again tomorrow"
      ],
      correctAnswer: 1,
      rationale: "BIOS changes can prevent boot. Resetting to defaults (Load Setup Defaults or similar option) usually resolves configuration-related boot issues."
    },
    {
      id: "w3-scenario-2",
      title: "Overheating and Performance",
      description: "System overheating with performance issues",
      ticket: "My computer has been getting really slow lately, and yesterday it shut down by itself while I was working on a presentation. When I touched the case, it felt very hot. It's been making more noise than usual too.",
      week: 3,
      difficulty: 'Medium',
      options: [
        "Recommend they use the computer less frequently",
        "Suggest checking cooling system, cleaning dust, and verifying fan operation",
        "Tell them the noise is normal and ignore it",
        "Recommend immediately replacing the motherboard"
      ],
      correctAnswer: 1,
      rationale: "Symptoms indicate overheating: performance degradation, automatic shutdown, excessive heat and noise. Cooling system maintenance is needed."
    },
    {
      id: "w3-scenario-3",
      title: "Hard Drive Failure",
      description: "Drive making clicking sounds with errors",
      ticket: "My computer is making weird clicking sounds, especially when I try to open files. Sometimes programs freeze, and this morning I got an error message saying 'disk read error.' I'm worried about losing my important documents.",
      week: 3,
      difficulty: 'Hard',
      options: [
        "Tell them the clicking is normal hard drive operation",
        "Recommend immediately backing up data and replacing the drive",
        "Suggest defragmenting the hard drive to fix the sounds",
        "Advise running disk cleanup to solve the problem"
      ],
      correctAnswer: 1,
      rationale: "Clicking sounds with read errors indicate imminent hard drive failure. Data backup is critical before complete failure occurs."
    },
    {
      id: "w3-scenario-4",
      title: "Display Problems",
      description: "Monitor shows no signal during operation",
      ticket: "My monitor suddenly went black in the middle of working, but I can still hear sounds from the computer like email notifications. I checked that the monitor is plugged in and turned on, but it just shows 'No Signal' now.",
      week: 3,
      difficulty: 'Easy',
      options: [
        "Tell them to buy a new monitor immediately",
        "Guide them to check video cable connections and try a different cable",
        "Recommend restarting the computer 10 times",
        "Suggest it's a virus and run antivirus software"
      ],
      correctAnswer: 1,
      rationale: "'No Signal' with working audio suggests video connection issues. Check cable connections, try different cables, and verify correct input source."
    },
    {
      id: "w3-scenario-5",
      title: "Memory and Stability Issues",
      description: "Random crashes and blue screens",
      ticket: "My computer has been acting really strange lately. Programs keep crashing randomly, sometimes I get blue screens with lots of text, and occasionally the computer restarts by itself. It seems to happen more when I'm running multiple programs.",
      week: 3,
      difficulty: 'Hard',
      options: [
        "Tell them to only run one program at a time permanently",
        "Suggest testing memory (RAM) and checking for overheating",
        "Recommend never saving files to prevent crashes",
        "Advise that random crashes are normal for all computers"
      ],
      correctAnswer: 1,
      rationale: "Random crashes, blue screens, and application failures often indicate memory problems or overheating, especially under load (multiple programs)."
    }
  ];

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
