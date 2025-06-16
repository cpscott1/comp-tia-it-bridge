
-- Create documentation_submissions table for storing student documentation
CREATE TABLE public.documentation_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  scenario_id TEXT NOT NULL,
  scenario_title TEXT NOT NULL,
  documentation TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.documentation_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Students can insert their own submissions
CREATE POLICY "Students can create their own documentation submissions" 
  ON public.documentation_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Students can view their own submissions
CREATE POLICY "Students can view their own documentation submissions" 
  ON public.documentation_submissions 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Instructors can view all submissions
CREATE POLICY "Instructors can view all documentation submissions" 
  ON public.documentation_submissions 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'instructor'
    )
  );
