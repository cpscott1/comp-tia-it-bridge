
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface WeekProgress {
  id: string;
  user_id: string;
  current_week: number;
  completed_weeks: number[];
  created_at: string;
  updated_at: string;
}

export const useWeekProgress = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['week-progress', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('user_week_progress')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching week progress:', error);
        // If there's an error fetching, return default progress
        return {
          id: 'temp',
          user_id: user.id,
          current_week: 1,
          completed_weeks: [],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        } as WeekProgress;
      }
      
      // If no progress exists, try to create initial record
      if (!data) {
        try {
          const { data: newProgress, error: createError } = await supabase
            .from('user_week_progress')
            .insert({
              user_id: user.id,
              current_week: 1,
              completed_weeks: []
            })
            .select()
            .maybeSingle();
          
          if (createError) {
            console.error('Error creating week progress:', createError);
            // Return default progress if creation fails
            return {
              id: 'temp',
              user_id: user.id,
              current_week: 1,
              completed_weeks: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            } as WeekProgress;
          }
          
          return newProgress as WeekProgress;
        } catch (err) {
          console.error('Failed to create week progress:', err);
          // Return default progress
          return {
            id: 'temp',
            user_id: user.id,
            current_week: 1,
            completed_weeks: [],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as WeekProgress;
        }
      }
      
      return data as WeekProgress;
    },
    enabled: !!user,
  });
};

export const useAdvanceWeek = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (weekToComplete: number) => {
      if (!user) throw new Error('User not authenticated');
      
      // First get current progress to append to completed_weeks array
      const { data: currentProgress } = await supabase
        .from('user_week_progress')
        .select('completed_weeks')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (!currentProgress) {
        // Create initial progress if it doesn't exist
        const { data, error } = await supabase
          .from('user_week_progress')
          .insert({
            user_id: user.id,
            current_week: weekToComplete + 1,
            completed_weeks: [weekToComplete]
          })
          .select()
          .maybeSingle();
        
        if (error) {
          console.error('Error creating week progress:', error);
          throw error;
        }
        
        return data;
      }
      
      const updatedCompletedWeeks = [...(currentProgress.completed_weeks || []), weekToComplete];
      
      const { data, error } = await supabase
        .from('user_week_progress')
        .update({
          current_week: weekToComplete + 1,
          completed_weeks: updatedCompletedWeeks,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .maybeSingle();
      
      if (error) {
        console.error('Error advancing week:', error);
        throw error;
      }
      
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['week-progress'] });
    },
  });
};
