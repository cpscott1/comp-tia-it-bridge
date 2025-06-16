
-- Create a table for instructor invitation codes
CREATE TABLE public.instructor_invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  email TEXT, -- Optional: restrict to specific email
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable Row Level Security
ALTER TABLE public.instructor_invitations ENABLE ROW LEVEL SECURITY;

-- Create policies for invitation codes
CREATE POLICY "Anyone can read active unused invitations for validation" 
  ON public.instructor_invitations 
  FOR SELECT 
  USING (is_active = true AND used_at IS NULL AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins can manage all invitations" 
  ON public.instructor_invitations 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create a function to validate and use invitation codes
CREATE OR REPLACE FUNCTION public.use_invitation_code(invitation_code TEXT, user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  invitation_record RECORD;
BEGIN
  -- Find the invitation
  SELECT * INTO invitation_record
  FROM public.instructor_invitations
  WHERE code = invitation_code
    AND is_active = true
    AND used_at IS NULL
    AND (expires_at IS NULL OR expires_at > now())
    AND (email IS NULL OR email = user_email);
  
  -- If invitation not found or invalid
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Mark invitation as used
  UPDATE public.instructor_invitations
  SET used_by = auth.uid(),
      used_at = now()
  WHERE id = invitation_record.id;
  
  -- Update user profile to instructor role
  UPDATE public.profiles
  SET role = 'instructor'
  WHERE id = auth.uid();
  
  RETURN TRUE;
END;
$$;
