
-- Create user_week_progress table to track user progression through weeks
CREATE TABLE public.user_week_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_week integer NOT NULL DEFAULT 1,
  completed_weeks integer[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.user_week_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own week progress"
  ON public.user_week_progress
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own week progress"
  ON public.user_week_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own week progress"
  ON public.user_week_progress
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own week progress"
  ON public.user_week_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create unique constraint to ensure one record per user
ALTER TABLE public.user_week_progress ADD CONSTRAINT user_week_progress_user_id_unique UNIQUE (user_id);
