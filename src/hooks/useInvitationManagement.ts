
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useInvitationManagement() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: invitations, isLoading } = useQuery({
    queryKey: ['instructor-invitations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('instructor_invitations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching invitations:', error);
        throw error;
      }
      
      return data;
    },
  });

  const createInvitation = useMutation({
    mutationFn: async ({ email, expiresAt }: { email?: string; expiresAt?: string }) => {
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await supabase
        .from('instructor_invitations')
        .insert([{
          code,
          email,
          expires_at: expiresAt,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-invitations'] });
    },
  });

  const deactivateInvitation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('instructor_invitations')
        .update({ is_active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-invitations'] });
    },
  });

  return {
    invitations,
    isLoading,
    createInvitation,
    deactivateInvitation,
    loading
  };
}
