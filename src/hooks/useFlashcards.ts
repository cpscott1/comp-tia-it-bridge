
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topicId: string;
  weekNumber: number;
}

export const useFlashcards = (topicId?: string, weekNumber?: number) => {
  return useQuery({
    queryKey: ['flashcards', topicId, weekNumber],
    queryFn: async () => {
      console.log('useFlashcards called with:', { topicId, weekNumber });
      
      let query = supabase
        .from('flashcards')
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
      
      if (weekNumber) {
        query = query.eq('week_number', weekNumber);
      }
      
      const { data, error } = await query.order('created_at');
      
      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }
      
      // Convert flashcards to the expected format
      const flashcards: Flashcard[] = data.map((flashcard: any) => ({
        id: flashcard.id,
        front: flashcard.front,
        back: flashcard.back,
        category: flashcard.quiz_topics?.name || 'Unknown',
        difficulty: flashcard.difficulty as 'Easy' | 'Medium' | 'Hard',
        topicId: flashcard.topic_id,
        weekNumber: flashcard.week_number || 1,
      }));
      
      console.log(`Fetched ${flashcards.length} flashcards from database for topic ${topicId}, week ${weekNumber}`);
      
      return flashcards;
    },
    enabled: true,
  });
};
