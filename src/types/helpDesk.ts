
export interface HelpDeskScenario {
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
