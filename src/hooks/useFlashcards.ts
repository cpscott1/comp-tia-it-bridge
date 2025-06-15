
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PracticeQuestion } from './usePracticeQuestions';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topicId: string;
}

export const useFlashcards = (topicId?: string) => {
  return useQuery({
    queryKey: ['flashcards', topicId],
    queryFn: async () => {
      let query = supabase
        .from('practice_questions')
        .select(`
          *,
          quiz_topics (
            name,
            description
          )
        `);
      
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      
      const { data, error } = await query.order('created_at');
      
      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }
      
      // Convert practice questions to flashcard format
      const flashcards: Flashcard[] = data.map((question: any) => ({
        id: question.id,
        front: question.question,
        back: question.explanation,
        category: question.quiz_topics?.name || 'Unknown',
        difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard',
        topicId: question.topic_id,
      }));
      
      return flashcards;
    },
    enabled: true,
  });
};
