
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Practice from "./pages/Practice";
import Flashcards from "./pages/Flashcards";
import Auth from "./pages/Auth";
import InstructorAuth from "./pages/InstructorAuth";
import InstructorDashboard from "./pages/InstructorDashboard";
import InvitationManager from "./pages/InvitationManager";
import JobReadiness from "./pages/JobReadiness";
import Downloads from "./pages/Downloads";
import HelpDesk from "./pages/HelpDesk";
import CalendarBooking from "./pages/CalendarBooking";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { InstructorProtectedRoute } from "./components/InstructorProtectedRoute";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/practice" element={<ProtectedRoute><Practice /></ProtectedRoute>} />
              <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
              <Route path="/job-readiness" element={<ProtectedRoute><JobReadiness /></ProtectedRoute>} />
              <Route path="/downloads" element={<ProtectedRoute><Downloads /></ProtectedRoute>} />
              <Route path="/help" element={<ProtectedRoute><HelpDesk /></ProtectedRoute>} />
              <Route path="/calendar" element={<ProtectedRoute><CalendarBooking /></ProtectedRoute>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/instructor/auth" element={<InstructorAuth />} />
              <Route path="/instructor/dashboard" element={<InstructorProtectedRoute><InstructorDashboard /></InstructorProtectedRoute>} />
              <Route path="/instructor/invitations" element={<InstructorProtectedRoute><InvitationManager /></InstructorProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
