
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
      console.log('useQuizTopics - Fetching topics for week:', weekNumber);
      
      if (!weekNumber) {
        // If no week number, get all topics
        const { data, error } = await supabase
          .from('quiz_topics')
          .select('*')
          .order('created_at');
        
        if (error) {
          console.error('Error fetching all quiz topics:', error);
          throw error;
        }
        
        return data as QuizTopic[];
      }
      
      // Get topics that have questions for the specified week
      const { data, error } = await supabase
        .from('quiz_topics')
        .select(`
          id,
          name,
          description,
          color,
          created_at
        `)
        .order('created_at');
      
      if (error) {
        console.error('Error fetching quiz topics:', error);
        throw error;
      }
      
      console.log('useQuizTopics - All topics fetched:', data?.length);
      
      // Now filter topics that have questions for the current week
      const topicsWithQuestions: QuizTopic[] = [];
      
      for (const topic of data || []) {
        const { data: questions, error: questionsError } = await supabase
          .from('practice_questions')
          .select('id')
          .eq('topic_id', topic.id)
          .eq('week_number', weekNumber)
          .limit(1);
        
        if (questionsError) {
          console.error('Error checking questions for topic:', topic.name, questionsError);
          continue;
        }
        
        if (questions && questions.length > 0) {
          console.log('useQuizTopics - Topic has questions for week', weekNumber, ':', topic.name);
          topicsWithQuestions.push({
            id: topic.id,
            name: topic.name,
            description: topic.description,
            color: topic.color
          });
        }
      }
      
      console.log('useQuizTopics - Final topics with questions:', topicsWithQuestions.length);
      return topicsWithQuestions;
    },
  });
};
