
-- First, drop the existing policies that might be causing recursion
DROP POLICY IF EXISTS "Instructors can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Instructors can view all user week progress" ON public.user_week_progress;
DROP POLICY IF EXISTS "Instructors can view all quiz attempts" ON public.quiz_attempts;

-- Create a security definer function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_week_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create new policies using the security definer function
CREATE POLICY "Users can view own profile, instructors can view all"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    id = auth.uid() OR 
    public.get_current_user_role() IN ('instructor', 'admin')
  );

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can view own progress, instructors can view all"
  ON public.user_week_progress
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    public.get_current_user_role() IN ('instructor', 'admin')
  );

CREATE POLICY "Users can manage own progress"
  ON public.user_week_progress
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own quiz attempts, instructors can view all"
  ON public.quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR 
    public.get_current_user_role() IN ('instructor', 'admin')
  );

CREATE POLICY "Users can create own quiz attempts"
  ON public.quiz_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());
