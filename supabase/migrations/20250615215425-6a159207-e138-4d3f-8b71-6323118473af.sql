
-- Create a table for quiz topics
CREATE TABLE public.quiz_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'blue',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for practice questions
CREATE TABLE public.practice_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES public.quiz_topics(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- Array of answer options
  correct_answer INTEGER NOT NULL, -- Index of correct answer
  explanation TEXT NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table for user quiz attempts
CREATE TABLE public.quiz_attempts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  topic_id UUID REFERENCES public.quiz_topics(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  total_questions INTEGER NOT NULL DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quiz_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_topics (public read access)
CREATE POLICY "Anyone can view quiz topics" 
  ON public.quiz_topics 
  FOR SELECT 
  USING (true);

-- Create policies for practice_questions (public read access)
CREATE POLICY "Anyone can view practice questions" 
  ON public.practice_questions 
  FOR SELECT 
  USING (true);

-- Create policies for quiz_attempts (user-specific access)
CREATE POLICY "Users can view their own quiz attempts" 
  ON public.quiz_attempts 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts" 
  ON public.quiz_attempts 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert sample hardware topic
INSERT INTO public.quiz_topics (name, description, color) VALUES 
('Hardware Foundations', 'Component identification and basic hardware concepts', 'blue');

-- Insert sample questions for the hardware topic
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which component is primarily responsible for temporarily storing data that the CPU needs quick access to?',
  '["Hard Drive", "RAM (Random Access Memory)", "Graphics Card", "Power Supply"]'::jsonb,
  1,
  'RAM (Random Access Memory) is volatile memory that provides fast access to data and programs currently in use by the CPU. Unlike storage devices, RAM loses its contents when power is removed.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the standard form factor for most modern desktop motherboards?',
  '["Mini-ITX", "Micro-ATX", "ATX", "E-ATX"]'::jsonb,
  2,
  'ATX (Advanced Technology eXtended) is the most common motherboard form factor for desktop computers, measuring 12 × 9.6 inches and providing good expansion capabilities.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which connector type is commonly used for modern SATA drives?',
  '["4-pin Molex", "6-pin PCIe", "15-pin SATA power", "24-pin ATX"]'::jsonb,
  2,
  'SATA drives use a 15-pin SATA power connector that provides 3.3V, 5V, and 12V power rails. This is different from the older 4-pin Molex connectors.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the purpose of the BIOS/UEFI in a computer system?',
  '["To provide internet connectivity", "To manage file storage", "To initialize hardware and boot the operating system", "To run application software"]'::jsonb,
  2,
  'BIOS (Basic Input/Output System) or UEFI (Unified Extensible Firmware Interface) is firmware that initializes hardware components during startup and provides the bootloader with information needed to boot the operating system.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which type of memory is considered non-volatile?',
  '["RAM", "Cache memory", "SSD storage", "System memory"]'::jsonb,
  2,
  'Non-volatile memory retains its contents even when power is removed. SSDs, hard drives, and flash memory are examples of non-volatile storage, while RAM is volatile.',
  'Easy';
