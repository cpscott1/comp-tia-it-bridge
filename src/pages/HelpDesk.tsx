
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { helpDeskScenarios } from "@/data/helpDeskScenarios";
import { HelpDeskScenario } from "@/types/helpDesk";
import { ScenarioCard } from "@/components/help-desk/ScenarioCard";
import { ProgressCard } from "@/components/help-desk/ProgressCard";
import { ScenarioDetail } from "@/components/help-desk/ScenarioDetail";

const HelpDesk = () => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  
  const [selectedScenario, setSelectedScenario] = useState<HelpDeskScenario | null>(null);
  const [completedScenarios, setCompletedScenarios] = useState<string[]>([]);

  const availableScenarios = helpDeskScenarios.filter(scenario => scenario.week <= currentWeek);
  const completedCount = completedScenarios.length;
  const progress = availableScenarios.length > 0 ? (completedCount / availableScenarios.length) * 100 : 0;

  const handleScenarioSelect = (scenario: HelpDeskScenario) => {
    setSelectedScenario(scenario);
  };

  const handleBackToScenarios = () => {
    setSelectedScenario(null);
  };

  const handleScenarioComplete = (scenarioId: string) => {
    if (!completedScenarios.includes(scenarioId)) {
      setCompletedScenarios([...completedScenarios, scenarioId]);
    }
  };

  if (selectedScenario) {
    return (
      <ScenarioDetail
        scenario={selectedScenario}
        onBack={handleBackToScenarios}
        onComplete={handleScenarioComplete}
      />
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

        <ProgressCard
          progress={progress}
          completedCount={completedCount}
          remainingCount={availableScenarios.length - completedCount}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              scenario={scenario}
              isCompleted={completedScenarios.includes(scenario.id)}
              onSelect={handleScenarioSelect}
            />
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
