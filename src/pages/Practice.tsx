
import { useState } from "react";
import { TopicSelector } from "@/components/TopicSelector";
import { WeekSelector } from "@/components/WeekSelector";
import { Quiz } from "@/components/Quiz";
import { Button } from "@/components/ui/button";
import { useQuizTopics } from "@/hooks/usePracticeQuestions";
import { useWeekProgress } from "@/hooks/useWeekProgress";
import { QuizTopic } from "@/hooks/usePracticeQuestions";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const COURSE_WEEKS = [
  {
    number: 1,
    title: "Hardware Foundations",
    description: "Motherboards, PCIe, Basic Components, Troubleshooting, and Safety"
  },
  {
    number: 2,
    title: "Installing System Devices",
    description: "Power Supplies, Storage, Memory, CPU Installation, Cooling, and BIOS/UEFI"
  },
  {
    number: 3,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 4,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 5,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 6,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 7,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 8,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 9,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 10,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 11,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  },
  {
    number: 12,
    title: "Coming Soon",
    description: "Additional CompTIA A+ topics will be added here"
  }
];

const Practice = () => {
  const { data: weekProgress } = useWeekProgress();
  const currentWeek = weekProgress?.current_week || 1;
  const [selectedTopic, setSelectedTopic] = useState<QuizTopic | null>(null);
  const { data: topics = [], isLoading } = useQuizTopics(currentWeek);

  console.log("Practice page - Current week:", currentWeek);
  console.log("Practice page - Week progress:", weekProgress);
  console.log("Practice page - Topics for current week:", topics);

  const handleTopicSelect = (topic: QuizTopic) => {
    console.log("Selected topic:", topic);
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  // If a topic is selected, show the quiz
  if (selectedTopic) {
    return <Quiz topic={selectedTopic} onBack={handleBackToTopics} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              CompTIA A+ Practice Questions
            </h1>
            <p className="text-lg text-gray-600">
              Master hardware fundamentals and system installation with structured practice
            </p>
          </div>
        </div>

        <WeekSelector 
          courseWeeks={COURSE_WEEKS}
          currentWeek={currentWeek}
          onWeekChange={() => {}} // Disable week changing - user follows progression
        />

        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Week {currentWeek}: {COURSE_WEEKS[currentWeek - 1]?.title}
          </h2>
          <p className="text-gray-600 mb-4">
            {COURSE_WEEKS[currentWeek - 1]?.description}
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              Debug info - Current week: {currentWeek}, Topics found: {topics.length}
            </p>
          </div>
        </div>

        <TopicSelector
          topics={topics}
          onTopicSelect={handleTopicSelect}
          loading={isLoading}
        />

        {topics.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              No practice questions available for Week {currentWeek} yet.
            </div>
            <p className="text-gray-400 mt-2">
              Content for this week is coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;
