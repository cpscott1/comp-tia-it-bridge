
-- Enable RLS on user_week_progress table (if not already enabled)
ALTER TABLE public.user_week_progress ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Users can view their own week progress" ON public.user_week_progress;
DROP POLICY IF EXISTS "Users can create their own week progress" ON public.user_week_progress;
DROP POLICY IF EXISTS "Users can update their own week progress" ON public.user_week_progress;
DROP POLICY IF EXISTS "Users can delete their own week progress" ON public.user_week_progress;

-- Create policy that allows users to SELECT their own week progress
CREATE POLICY "Users can view their own week progress" 
  ON public.user_week_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own week progress
CREATE POLICY "Users can create their own week progress" 
  ON public.user_week_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own week progress
CREATE POLICY "Users can update their own week progress" 
  ON public.user_week_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own week progress
CREATE POLICY "Users can delete their own week progress" 
  ON public.user_week_progress 
  FOR DELETE 
  USING (auth.uid() = user_id);
