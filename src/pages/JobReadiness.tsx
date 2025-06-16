
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { JOB_READINESS_CHECKLIST } from "@/data/jobReadinessData";
import ProgressOverview from "@/components/job-readiness/ProgressOverview";
import ResumeTemplates from "@/components/job-readiness/ResumeTemplates";
import FilterButtons from "@/components/job-readiness/FilterButtons";
import ChecklistItem from "@/components/job-readiness/ChecklistItem";
import CompletionCard from "@/components/job-readiness/CompletionCard";

const JobReadiness = () => {
  const [completedItems, setCompletedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');

  const handleItemToggle = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = JOB_READINESS_CHECKLIST.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    const phaseMatch = selectedPhase === 'all' || item.phase === selectedPhase;
    return categoryMatch && phaseMatch;
  });

  const completedCount = completedItems.length;
  const totalItems = JOB_READINESS_CHECKLIST.length;
  const progress = (completedCount / totalItems) * 100;

  const phases = Array.from(new Set(JOB_READINESS_CHECKLIST.map(item => item.phase)));

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
              CompTIA A+ Career Readiness Tools
            </h1>
            <p className="text-lg text-gray-600">
              Complete job readiness checklist to prepare for your IT career
            </p>
          </div>
        </div>

        <ProgressOverview 
          completedCount={completedCount} 
          totalItems={totalItems} 
        />

        <ResumeTemplates />

        <FilterButtons
          selectedCategory={selectedCategory}
          selectedPhase={selectedPhase}
          phases={phases}
          onCategoryChange={setSelectedCategory}
          onPhaseChange={setSelectedPhase}
        />

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              isCompleted={completedItems.includes(item.id)}
              onToggle={handleItemToggle}
            />
          ))}
        </div>

        <CompletionCard progress={progress} />
      </div>
    </div>
  );
};

export default JobReadiness;
