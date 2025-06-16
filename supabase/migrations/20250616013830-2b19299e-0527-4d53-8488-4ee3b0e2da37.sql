
-- Create the first invitation code manually for initial setup
INSERT INTO public.instructor_invitations (code, email, is_active, created_at)
VALUES ('FIRST-ADMIN-2025', null, true, now());

-- Keep the authentication requirement for creating new invitation codes
-- (The existing RLS policies will handle this)
