
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useInstructorInvitation() {
  const [loading, setLoading] = useState(false);

  const validateAndUseInvitationCode = async (code: string, email: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('use_invitation_code', {
        invitation_code: code,
        user_email: email
      });
      
      if (error) {
        console.error('Error validating invitation code:', error);
        return { success: false, error: error.message };
      }
      
      return { success: data, error: data ? null : 'Invalid or expired invitation code' };
    } catch (error) {
      console.error('Unexpected error:', error);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  return {
    validateAndUseInvitationCode,
    loading
  };
}
