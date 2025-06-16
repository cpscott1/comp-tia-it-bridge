
import { useMutation, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface DocumentationSubmission {
  id: string;
  user_id: string;
  scenario_id: string;
  scenario_title: string;
  documentation: string;
  submitted_at: string;
}

export const useSubmitDocumentation = () => {
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (submission: { 
      scenario_id: string; 
      scenario_title: string; 
      documentation: string; 
    }) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('documentation_submissions')
        .insert({
          user_id: user.id,
          scenario_id: submission.scenario_id,
          scenario_title: submission.scenario_title,
          documentation: submission.documentation,
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error submitting documentation:', error);
        throw error;
      }
      
      return data;
    },
  });
};

export const useDocumentationSubmissions = (scenarioId?: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['documentation-submissions', user?.id, scenarioId],
    queryFn: async () => {
      if (!user) return [];
      
      let query = supabase
        .from('documentation_submissions')
        .select('*')
        .eq('user_id', user.id);
      
      if (scenarioId) {
        query = query.eq('scenario_id', scenarioId);
      }
      
      const { data, error } = await query.order('submitted_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching documentation submissions:', error);
        throw error;
      }
      
      return data as DocumentationSubmission[];
    },
    enabled: !!user,
  });
};
