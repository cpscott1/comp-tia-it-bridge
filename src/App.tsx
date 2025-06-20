
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { InstructorProtectedRoute } from "@/components/InstructorProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import InstructorAuth from "./pages/InstructorAuth";
import InstructorDashboard from "./pages/InstructorDashboard";
import Practice from "./pages/Practice";
import Flashcards from "./pages/Flashcards";
import HelpDesk from "./pages/HelpDesk";
import JobReadiness from "./pages/JobReadiness";
import InvitationManager from "./pages/InvitationManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/instructor-auth" element={<InstructorAuth />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/practice" element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            } />
            <Route path="/flashcards" element={
              <ProtectedRoute>
                <Flashcards />
              </ProtectedRoute>
            } />
            <Route path="/help-desk" element={
              <ProtectedRoute>
                <HelpDesk />
              </ProtectedRoute>
            } />
            <Route path="/job-readiness" element={
              <ProtectedRoute>
                <JobReadiness />
              </ProtectedRoute>
            } />
            <Route path="/instructor-dashboard" element={
              <InstructorProtectedRoute>
                <InstructorDashboard />
              </InstructorProtectedRoute>
            } />
            <Route path="/invitation-manager" element={
              <ProtectedRoute>
                <InvitationManager />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
