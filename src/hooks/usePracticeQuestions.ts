
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
  week_number: number;
}

export interface QuizTopic {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const usePracticeQuestions = (topicId?: string, weekNumber?: number) => {
  return useQuery({
    queryKey: ['practice-questions', topicId, weekNumber],
    queryFn: async () => {
      let query = supabase
        .from('practice_questions')
        .select('*');
      
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      
      if (weekNumber) {
        query = query.eq('week_number', weekNumber);
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

export const useQuizTopics = (weekNumber?: number) => {
  return useQuery({
    queryKey: ['quiz-topics', weekNumber],
    queryFn: async () => {
      let query = supabase
        .from('quiz_topics')
        .select(`
          *,
          practice_questions!inner(week_number)
        `);
      
      if (weekNumber) {
        query = query.eq('practice_questions.week_number', weekNumber);
      }
      
      const { data, error } = await query.order('created_at');
      
      if (error) {
        console.error('Error fetching quiz topics:', error);
        throw error;
      }
      
      // Remove duplicates and clean up the data
      const uniqueTopics = data?.reduce((acc: QuizTopic[], current: any) => {
        const exists = acc.find(topic => topic.id === current.id);
        if (!exists) {
          acc.push({
            id: current.id,
            name: current.name,
            description: current.description,
            color: current.color
          });
        }
        return acc;
      }, []) || [];
      
      return uniqueTopics;
    },
  });
};
