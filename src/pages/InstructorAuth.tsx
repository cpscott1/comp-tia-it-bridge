
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useInstructorInvitation } from '@/hooks/useInstructorInvitation';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { GraduationCap, Users, KeyRound } from 'lucide-react';

export default function InstructorAuth() {
  const { signIn, signUp } = useAuth();
  const { validateAndUseInvitationCode, loading: invitationLoading } = useInstructorInvitation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    invitationCode: '',
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(signInData.email, signInData.password);
      
      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back, Instructor!",
          description: "Successfully signed in to your instructor account.",
        });
        navigate('/instructor');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    if (!signUpData.invitationCode.trim()) {
      toast({
        title: "Invitation code required",
        description: "Please enter a valid invitation code to create an instructor account.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // First create the user account
      const { error: signUpError } = await signUp(
        signUpData.email,
        signUpData.password,
        signUpData.firstName,
        signUpData.lastName
      );
      
      if (signUpError) {
        toast({
          title: "Sign up failed",
          description: signUpError.message,
          variant: "destructive",
        });
        return;
      }

      // Then validate and use the invitation code
      const { success, error: invitationError } = await validateAndUseInvitationCode(
        signUpData.invitationCode,
        signUpData.email
      );

      if (!success) {
        toast({
          title: "Invalid invitation code",
          description: invitationError || "The invitation code is invalid or has expired.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Instructor Account Created!",
        description: "Your instructor account has been created successfully. Please check your email to verify your account.",
      });
      navigate('/instructor');
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <GraduationCap className="h-8 w-8 text-purple-600" />
            <Users className="h-8 w-8 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Instructor Portal</h1>
          <p className="text-gray-600">Access your instructor dashboard and manage your classes</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{isSignUp ? 'Create Instructor Account' : 'Instructor Sign In'}</CardTitle>
                <CardDescription>
                  {isSignUp 
                    ? 'Register with a valid invitation code to access instructor features'
                    : 'Sign in to access your instructor dashboard'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!isSignUp ? (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instructor-email">Email</Label>
                  <Input
                    id="instructor-email"
                    type="email"
                    placeholder="instructor@school.edu"
                    value={signInData.email}
                    onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-password">Password</Label>
                  <Input
                    id="instructor-password"
                    type="password"
                    placeholder="Enter your password"
                    value={signInData.password}
                    onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
                  {loading ? 'Signing In...' : 'Sign In as Instructor'}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invitation-code" className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4" />
                    Invitation Code
                  </Label>
                  <Input
                    id="invitation-code"
                    placeholder="Enter invitation code"
                    value={signUpData.invitationCode}
                    onChange={(e) => setSignUpData({ ...signUpData, invitationCode: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="instructor-firstname">First Name</Label>
                    <Input
                      id="instructor-firstname"
                      placeholder="John"
                      value={signUpData.firstName}
                      onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="instructor-lastname">Last Name</Label>
                    <Input
                      id="instructor-lastname"
                      placeholder="Smith"
                      value={signUpData.lastName}
                      onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-signup-email">Email</Label>
                  <Input
                    id="instructor-signup-email"
                    type="email"
                    placeholder="instructor@school.edu"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-signup-password">Password</Label>
                  <Input
                    id="instructor-signup-password"
                    type="password"
                    placeholder="Create a strong password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor-signup-confirm">Confirm Password</Label>
                  <Input
                    id="instructor-signup-confirm"
                    type="password"
                    placeholder="Confirm your password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700" 
                  disabled={loading || invitationLoading}
                >
                  {loading || invitationLoading ? 'Creating Account...' : 'Create Instructor Account'}
                </Button>
              </form>
            )}
            
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-purple-600"
              >
                {isSignUp ? 'Already have an instructor account? Sign in' : 'Need to create an instructor account?'}
              </Button>
            </div>
            
            <div className="mt-4 pt-4 border-t text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/auth')}
                className="w-full"
              >
                Student Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
