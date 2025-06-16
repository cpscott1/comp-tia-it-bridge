
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useInvitationManagement() {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: invitations, isLoading } = useQuery({
    queryKey: ['instructor-invitations'],
    queryFn: async () => {
      console.log('Fetching invitations...');
      const { data, error } = await supabase
        .from('instructor_invitations')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching invitations:', error);
        throw error;
      }
      
      console.log('Fetched invitations:', data);
      return data;
    },
  });

  const createInvitation = useMutation({
    mutationFn: async ({ email, expiresAt }: { email?: string; expiresAt?: string }) => {
      console.log('Creating invitation with:', { email, expiresAt });
      
      // Check if user is authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Current user:', user);
      
      if (userError) {
        console.error('Error getting user:', userError);
        throw userError;
      }
      
      if (!user) {
        throw new Error('User not authenticated');
      }
      
      const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      console.log('Generated code:', code);
      
      const insertData = {
        code,
        email: email || null,
        expires_at: expiresAt || null,
        created_by: user.id
      };
      
      console.log('Insert data:', insertData);
      
      const { data, error } = await supabase
        .from('instructor_invitations')
        .insert([insertData])
        .select()
        .single();
      
      if (error) {
        console.error('Error creating invitation:', error);
        console.error('Error details:', {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }
      
      console.log('Successfully created invitation:', data);
      return data;
    },
    onSuccess: (data) => {
      console.log('Mutation success:', data);
      queryClient.invalidateQueries({ queryKey: ['instructor-invitations'] });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
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
