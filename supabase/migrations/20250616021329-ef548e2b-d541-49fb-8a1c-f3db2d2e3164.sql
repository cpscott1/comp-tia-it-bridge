
-- Fix the security issue by setting an explicit search_path for use_invitation_code function
CREATE OR REPLACE FUNCTION public.use_invitation_code(invitation_code TEXT, user_email TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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
