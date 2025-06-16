
import { useState } from 'react';
import { useInvitationManagement } from '@/hooks/useInvitationManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Copy, Plus, X, KeyRound } from 'lucide-react';

export default function InvitationManager() {
  const { invitations, isLoading, createInvitation, deactivateInvitation } = useInvitationManagement();
  const [email, setEmail] = useState('');
  const [expiresAt, setExpiresAt] = useState('');

  const handleCreateInvitation = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const invitation = await createInvitation.mutateAsync({
        email: email || undefined,
        expiresAt: expiresAt || undefined
      });
      
      toast({
        title: "Invitation Created",
        description: `Invitation code: ${invitation.code}`,
      });
      
      setEmail('');
      setExpiresAt('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create invitation code",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied!",
      description: "Invitation code copied to clipboard",
    });
  };

  const handleDeactivate = async (id: string) => {
    try {
      await deactivateInvitation.mutateAsync(id);
      toast({
        title: "Success",
        description: "Invitation code deactivated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to deactivate invitation",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <KeyRound className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Instructor Invitation Manager</h1>
          <p className="text-gray-600">Create and manage invitation codes for instructor access</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create New Invitation</CardTitle>
            <CardDescription>Generate a new invitation code for instructor registration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateInvitation} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="instructor@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-sm text-gray-500">Leave empty to allow any email to use this code</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expires">Expires At (Optional)</Label>
                <Input
                  id="expires"
                  type="datetime-local"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                />
                <p className="text-sm text-gray-500">Leave empty for no expiration</p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={createInvitation.isPending}
              >
                <Plus className="h-4 w-4 mr-2" />
                {createInvitation.isPending ? 'Creating...' : 'Create Invitation Code'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Existing Invitations</CardTitle>
            <CardDescription>Manage existing invitation codes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invitations?.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No invitation codes created yet</p>
              ) : (
                invitations?.map((invitation) => (
                  <div key={invitation.id} className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                          {invitation.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(invitation.code)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        {invitation.email && <span>Email: {invitation.email}</span>}
                        {invitation.expires_at && (
                          <span>Expires: {new Date(invitation.expires_at).toLocaleDateString()}</span>
                        )}
                        {invitation.used_at ? (
                          <Badge variant="secondary">Used</Badge>
                        ) : invitation.is_active ? (
                          <Badge variant="default">Active</Badge>
                        ) : (
                          <Badge variant="destructive">Inactive</Badge>
                        )}
                      </div>
                    </div>
                    {!invitation.used_at && invitation.is_active && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeactivate(invitation.id)}
                        disabled={deactivateInvitation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
