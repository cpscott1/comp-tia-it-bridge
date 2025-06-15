
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface QuizAttempt {
  id: string;
  user_id: string;
  topic_id: string;
  score: number;
  total_questions: number;
  completed_at: string;
}

export const useSaveQuizAttempt = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (attempt: { topic_id: string; score: number; total_questions: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('quiz_attempts')
        .insert({
          user_id: user.id,
          topic_id: attempt.topic_id,
          score: attempt.score,
          total_questions: attempt.total_questions,
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error saving quiz attempt:', error);
        throw error;
      }
      
      return data;
    },
  });
};

export const useUserQuizAttempts = (topicId?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['quiz-attempts', user?.id, topicId],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('quiz_attempts')
        .select(`
          *,
          quiz_topics (
            name,
            description
          )
        `)
        .eq('user_id', user.id);
      
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      
      const { data, error } = await query.order('completed_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching quiz attempts:', error);
        throw error;
      }
      
      return data as QuizAttempt[];
    },
    enabled: !!user,
  });
};
