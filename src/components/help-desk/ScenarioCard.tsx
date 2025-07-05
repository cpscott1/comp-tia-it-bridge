
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, CheckCircle } from "lucide-react";
import { HelpDeskScenario } from "@/types/helpDesk";

interface ScenarioCardProps {
  scenario: HelpDeskScenario;
  isCompleted: boolean;
  onSelect: (scenario: HelpDeskScenario) => void;
}

export const ScenarioCard = ({ scenario, isCompleted, onSelect }: ScenarioCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onSelect(scenario)}
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
          {isCompleted && (
            <CheckCircle className="h-5 w-5 text-green-600" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
