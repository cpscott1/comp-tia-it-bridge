
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { restoreWeek3QuizQuestions } from '@/hooks/restoreQuizQuestions';
import { useToast } from '@/hooks/use-toast';

export const RestoreQuestionsButton = () => {
  const [isRestoring, setIsRestoring] = useState(false);
  const { toast } = useToast();

  const handleRestore = async () => {
    setIsRestoring(true);
    try {
      await restoreWeek3QuizQuestions();
      toast({
        title: "Questions Restored",
        description: "Missing Week 3 quiz questions have been restored successfully.",
      });
    } catch (error) {
      console.error('Error restoring questions:', error);
      toast({
        title: "Error",
        description: "Failed to restore questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRestoring(false);
    }
  };

  return (
    <Button 
      onClick={handleRestore} 
      disabled={isRestoring}
      className="mb-4"
    >
      {isRestoring ? 'Restoring...' : 'Restore Missing Quiz Questions'}
    </Button>
  );
};
