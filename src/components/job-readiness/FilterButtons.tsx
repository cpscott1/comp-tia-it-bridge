
import { Button } from "@/components/ui/button";
import { getCategoryIcon } from "@/utils/jobReadinessUtils";

interface FilterButtonsProps {
  selectedCategory: string;
  selectedPhase: string;
  phases: string[];
  onCategoryChange: (category: string) => void;
  onPhaseChange: (phase: string) => void;
}

const FilterButtons = ({ 
  selectedCategory, 
  selectedPhase, 
  phases, 
  onCategoryChange, 
  onPhaseChange 
}: FilterButtonsProps) => {
  const categories = ['technical', 'professional', 'certification', 'resume', 'skills', 'interview', 'application'];

  return (
    <>
      {/* Phase Filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={selectedPhase === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPhaseChange('all')}
        >
          All Phases
        </Button>
        {phases.map((phase) => (
          <Button
            key={phase}
            variant={selectedPhase === phase ? 'default' : 'outline'}
            size="sm"
            onClick={() => onPhaseChange(phase)}
            className="text-xs"
          >
            {phase.split(':')[0]}
          </Button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
        >
          All Categories
        </Button>
        {categories.map((category) => {
          const IconComponent = getCategoryIcon(category);
          return (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className="capitalize"
            >
              <IconComponent className="h-4 w-4" />
              <span className="ml-2">{category}</span>
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default FilterButtons;
