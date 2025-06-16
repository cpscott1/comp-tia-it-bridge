
-- Add RLS policies to allow instructors to view student data

-- Allow instructors and admins to view all profiles
CREATE POLICY "Instructors can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles instructor_profile 
      WHERE instructor_profile.id = auth.uid() 
      AND instructor_profile.role IN ('instructor', 'admin')
    )
  );

-- Allow instructors and admins to view all user week progress
CREATE POLICY "Instructors can view all user week progress"
  ON public.user_week_progress
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles instructor_profile 
      WHERE instructor_profile.id = auth.uid() 
      AND instructor_profile.role IN ('instructor', 'admin')
    )
  );

-- Allow instructors and admins to view all quiz attempts
CREATE POLICY "Instructors can view all quiz attempts"
  ON public.quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles instructor_profile 
      WHERE instructor_profile.id = auth.uid() 
      AND instructor_profile.role IN ('instructor', 'admin')
    )
  );
