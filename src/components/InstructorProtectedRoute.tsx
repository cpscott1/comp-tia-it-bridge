
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

interface InstructorProtectedRouteProps {
  children: React.ReactNode;
}

export function InstructorProtectedRoute({ children }: InstructorProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/instructor-auth" replace />;
  }

  return <>{children}</>;
}
