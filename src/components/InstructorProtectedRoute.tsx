
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface InstructorProtectedRouteProps {
  children: React.ReactNode;
}

export function InstructorProtectedRoute({ children }: InstructorProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Fetch user profile to check role
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/instructor-auth" replace />;
  }

  // Check if user has instructor role
  if (profile?.role !== 'instructor' && profile?.role !== 'admin') {
    return <Navigate to="/instructor-auth" replace />;
  }

  return <>{children}</>;
}
