
-- Update the RLS policy to allow any authenticated user to create invitation codes
-- This is more practical for initial setup and testing
DROP POLICY IF EXISTS "Admins can manage all invitations" ON public.instructor_invitations;

-- Create a more permissive policy for creating invitations
CREATE POLICY "Authenticated users can create invitations" 
  ON public.instructor_invitations 
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow authenticated users to read invitations they created
CREATE POLICY "Users can read invitations they created" 
  ON public.instructor_invitations 
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid() OR created_by IS NULL);

-- Allow users to update invitations they created
CREATE POLICY "Users can update invitations they created" 
  ON public.instructor_invitations 
  FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid());
