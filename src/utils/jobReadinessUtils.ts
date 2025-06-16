
import { GraduationCap, Network, FileText, Briefcase, User, ExternalLink, CheckCircle } from "lucide-react";

export const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'technical': return GraduationCap;
    case 'professional': return Network;
    case 'resume': return FileText;
    case 'skills': return Briefcase;
    case 'interview': return User;
    case 'application': return ExternalLink;
    case 'certification': return CheckCircle;
    default: return CheckCircle;
  }
};

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'bg-red-100 text-red-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'technical': return 'bg-blue-100 text-blue-800';
    case 'professional': return 'bg-purple-100 text-purple-800';
    case 'resume': return 'bg-indigo-100 text-indigo-800';
    case 'skills': return 'bg-green-100 text-green-800';
    case 'interview': return 'bg-orange-100 text-orange-800';
    case 'application': return 'bg-pink-100 text-pink-800';
    case 'certification': return 'bg-emerald-100 text-emerald-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
