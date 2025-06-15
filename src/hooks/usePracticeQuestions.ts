
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic_id: string;
}

export interface QuizTopic {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const usePracticeQuestions = (topicId?: string) => {
  return useQuery({
    queryKey: ['practice-questions', topicId],
    queryFn: async () => {
      let query = supabase
        .from('practice_questions')
        .select('*');
      
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      
      const { data, error } = await query.order('created_at');
      
      if (error) {
        console.error('Error fetching practice questions:', error);
        throw error;
      }
      
      return data as PracticeQuestion[];
    },
    enabled: true,
  });
};

export const useQuizTopics = () => {
  return useQuery({
    queryKey: ['quiz-topics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quiz_topics')
        .select('*')
        .order('created_at');
      
      if (error) {
        console.error('Error fetching quiz topics:', error);
        throw error;
      }
      
      return data as QuizTopic[];
    },
  });
};
