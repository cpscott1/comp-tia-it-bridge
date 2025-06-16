
export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'professional' | 'resume' | 'skills' | 'interview' | 'application' | 'certification';
  priority: 'high' | 'medium' | 'low';
  estimatedTime: string;
  phase: string;
}

export const JOB_READINESS_CHECKLIST: ChecklistItem[] = [
  // Phase 1: Foundation Building (Weeks 1-4) - Technical Preparation
  {
    id: "tech-1",
    title: "Complete CompTIA A+ Core 1 study materials",
    description: "Finish all assigned reading and practice materials for Core 1 certification",
    category: 'technical',
    priority: 'high',
    estimatedTime: "20-30 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-2",
    title: "Practice hardware troubleshooting scenarios",
    description: "Work through various hardware problem-solving exercises and simulations",
    category: 'technical',
    priority: 'high',
    estimatedTime: "5-8 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-3",
    title: "Learn basic networking concepts",
    description: "Understand TCP/IP, subnetting, and common network protocols",
    category: 'technical',
    priority: 'high',
    estimatedTime: "4-6 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-4",
    title: "Understand computer components and functions",
    description: "Master identification and functionality of all major PC components",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "tech-5",
    title: "Practice customer service communication",
    description: "Develop skills for explaining technical concepts to non-technical users",
    category: 'technical',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  // Phase 1: Foundation Building (Weeks 1-4) - Professional Development
  {
    id: "prof-1",
    title: "Create professional email address",
    description: "Set up firstname.lastname@gmail.com for job applications",
    category: 'professional',
    priority: 'high',
    estimatedTime: "15 minutes",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-2",
    title: "Set up LinkedIn profile with professional photo",
    description: "Create comprehensive LinkedIn profile highlighting IT skills and goals",
    category: 'professional',
    priority: 'high',
    estimatedTime: "1-2 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-3",
    title: "Research local IT help desk job market",
    description: "Analyze job postings, salary ranges, and required skills in your area",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-4",
    title: "Identify 3-5 target companies",
    description: "Research specific companies where you'd like to work and their IT environments",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  {
    id: "prof-5",
    title: "Begin building technical vocabulary",
    description: "Create and study a glossary of common IT terms and acronyms",
    category: 'professional',
    priority: 'medium',
    estimatedTime: "30 minutes daily",
    phase: "Phase 1: Foundation Building (Weeks 1-4)"
  },
  // Phase 2: Skill Development (Weeks 5-8) - Technical Skills
  {
    id: "tech-6",
    title: "Complete CompTIA A+ Core 2 study materials",
    description: "Finish all assigned reading and practice materials for Core 2 certification",
    category: 'technical',
    priority: 'high',
    estimatedTime: "25-35 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-7",
    title: "Practice operating system troubleshooting",
    description: "Work through Windows, macOS, and Linux troubleshooting scenarios",
    category: 'technical',
    priority: 'high',
    estimatedTime: "8-10 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-8",
    title: "Learn ticketing system basics (ServiceNow, Zendesk)",
    description: "Understand how to create, update, and manage IT support tickets",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-9",
    title: "Understand remote support tools",
    description: "Learn to use remote desktop, VNC, and other remote assistance tools",
    category: 'technical',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "tech-10",
    title: "Practice documentation and reporting",
    description: "Learn to write clear, concise technical documentation and incident reports",
    category: 'technical',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  // Phase 2: Skill Development (Weeks 5-8) - Soft Skills
  {
    id: "skills-3",
    title: "Develop active listening techniques",
    description: "Practice listening skills to better understand user problems and concerns",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-4",
    title: "Practice explaining technical concepts simply",
    description: "Learn to communicate complex IT issues in user-friendly language",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-5",
    title: "Learn conflict resolution basics",
    description: "Develop skills to handle frustrated users and difficult situations",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-6",
    title: "Improve written communication skills",
    description: "Practice writing professional emails and clear technical instructions",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-7",
    title: "Practice time management and prioritization",
    description: "Learn to manage multiple tickets and prioritize urgent vs non-urgent issues",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  // Phase 3: Certification & Job Search (Weeks 9-12) - Certification
  {
    id: "cert-1",
    title: "Schedule CompTIA A+ Core 1 exam",
    description: "Book your CompTIA A+ Core 1 (220-1101) exam at a testing center",
    category: 'certification',
    priority: 'high',
    estimatedTime: "30 minutes",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "cert-2",
    title: "Schedule CompTIA A+ Core 2 exam",
    description: "Book your CompTIA A+ Core 2 (220-1102) exam at a testing center",
    category: 'certification',
    priority: 'high',
    estimatedTime: "30 minutes",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "cert-3",
    title: "Take practice exams until consistently scoring 80%+",
    description: "Complete multiple practice exams for both Core 1 and Core 2 until achieving consistent high scores",
    category: 'certification',
    priority: 'high',
    estimatedTime: "10-15 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "cert-4",
    title: "Review weak areas identified in practice tests",
    description: "Focus additional study time on topics where practice exam scores are lowest",
    category: 'certification',
    priority: 'high',
    estimatedTime: "5-8 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "cert-5",
    title: "Obtain CompTIA A+ certification",
    description: "Successfully pass both Core 1 and Core 2 exams to earn your CompTIA A+ certification",
    category: 'certification',
    priority: 'high',
    estimatedTime: "4-6 hours (exam time)",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  // Phase 3: Certification & Job Search (Weeks 9-12) - Job Search Preparation
  {
    id: "job-1",
    title: "Complete resume using provided template",
    description: "Create a polished, professional resume using one of the provided IT-focused templates",
    category: 'application',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "job-2",
    title: "Write compelling cover letter template",
    description: "Develop a customizable cover letter template that highlights your IT skills and certification",
    category: 'application',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "job-3",
    title: "Prepare for common interview questions",
    description: "Practice answers for typical help desk and entry-level IT interview questions",
    category: 'interview',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "job-4",
    title: "Practice salary negotiation techniques",
    description: "Learn strategies for negotiating salary and benefits for entry-level IT positions",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "job-5",
    title: "Apply to 5-10 entry-level positions weekly",
    description: "Consistently apply to help desk, desktop support, and other entry-level IT positions",
    category: 'application',
    priority: 'high',
    estimatedTime: "2-3 hours weekly",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  // Original items (keeping existing functionality)
  {
    id: "resume-1",
    title: "Create Technical Resume",
    description: "Build a resume highlighting your IT skills and CompTIA A+ knowledge",
    category: 'resume',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Resume & Application Phase"
  },
  {
    id: "resume-2",
    title: "Add CompTIA A+ Certification",
    description: "Include your certification status and expected completion date",
    category: 'resume',
    priority: 'high',
    estimatedTime: "15 minutes",
    phase: "Resume & Application Phase"
  },
  {
    id: "skills-1",
    title: "Practice Technical Terminology",
    description: "Review and practice explaining common IT terms and concepts",
    category: 'skills',
    priority: 'high',
    estimatedTime: "1 hour",
    phase: "Skills Development Phase"
  },
  {
    id: "skills-2",
    title: "Build Home Lab",
    description: "Set up a basic home lab to practice troubleshooting skills",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "4-6 hours",
    phase: "Skills Development Phase"
  },
  {
    id: "interview-1",
    title: "Prepare Common Interview Questions",
    description: "Practice answers for typical help desk and entry-level IT questions",
    category: 'interview',
    priority: 'high',
    estimatedTime: "2 hours",
    phase: "Interview Preparation Phase"
  },
  {
    id: "interview-2",
    title: "Practice Scenario Questions",
    description: "Prepare for technical troubleshooting scenarios in interviews",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1 hour",
    phase: "Interview Preparation Phase"
  },
  {
    id: "application-1",
    title: "Create Professional Profiles",
    description: "Set up LinkedIn and other professional networking profiles",
    category: 'application',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Application Phase"
  },
  {
    id: "application-2",
    title: "Research Target Companies",
    description: "Identify potential employers and learn about their IT environments",
    category: 'application',
    priority: 'medium',
    estimatedTime: "30 minutes per company",
    phase: "Application Phase"
  }
];

export const RESUME_TEMPLATES = [
  {
    id: "it-entry",
    title: "Entry-Level IT Resume",
    description: "Perfect for help desk and desktop support positions",
    downloadUrl: "#"
  },
  {
    id: "comptia-focused",
    title: "CompTIA A+ Focused Resume",
    description: "Highlights certification and technical skills",
    downloadUrl: "#"
  },
  {
    id: "help-desk-template",
    title: "Entry-Level IT Help Desk Resume Template",
    description: "Complete template with professional summary and technical skills",
    content: `[Your Name]
[Phone Number] | [Email Address] | [City, State] | [LinkedIn Profile]

PROFESSIONAL SUMMARY
Dedicated IT professional with CompTIA A+ certification and strong technical troubleshooting skills. Experienced in hardware/software installation, system maintenance, and customer service. Seeking to leverage technical knowledge and communication skills in a help desk support role to provide exceptional user assistance and contribute to organizational efficiency.

TECHNICAL SKILLS
- Operating Systems: Windows 10/11, macOS, Linux basics
- Hardware: PC assembly, component installation, troubleshooting
- Software: Microsoft Office Suite, remote support tools, ticketing systems
- Networking: TCP/IP basics, wireless configuration, network troubleshooting
- Customer Support: Technical communication, problem resolution, documentation

CERTIFICATIONS
- CompTIA A+ Core 1 (220-1101) - [Date]
- CompTIA A+ Core 2 (220-1102) - [Date]
- [Any additional certifications]

RELEVANT EXPERIENCE
[Job Title] | [Company Name] | [Dates]
- [Quantified achievement related to problem-solving or customer service]
- [Technical task you performed, even if not IT-related]
- [Example of helping others with technology]

[Previous Job Title] | [Company Name] | [Dates]
- [Customer service experience]
- [Any training or teaching experience]
- [Working with technology in any capacity]

PROJECTS & TECHNICAL EXPERIENCE
Personal Computer Build Project
- Researched components and assembled custom gaming PC within $1,200 budget
- Installed operating system and configured drivers for optimal performance
- Troubleshot compatibility issues and documented solutions

Home Network Setup
- Configured wireless router and set up secure home network for family
- Implemented network security protocols and parental controls
- Provided ongoing technical support for household devices

EDUCATION
[Degree] in [Field] | [School Name] | [Year]
- Relevant coursework: [Any IT, business, or communication courses]

CompTIA A+ Training Program | [Training Provider] | [Year]
- 12-week intensive program covering hardware, software, and troubleshooting
- Hands-on labs and real-world scenario practice`,
    downloadUrl: "#"
  },
  {
    id: "cover-letter-template",
    title: "Cover Letter Template",
    description: "Professional cover letter template for IT help desk positions",
    content: `[Date]

[Hiring Manager Name]
[Company Name]
[Address]

Dear Hiring Manager / Dear [Specific Name],

I am writing to express my strong interest in the Help Desk Technician position at [Company Name]. With my newly earned CompTIA A+ certification and passion for technology problem-solving, I am excited to contribute to your IT support team and help ensure seamless technology experiences for your users.

During my CompTIA A+ training, I developed comprehensive technical skills including:
- Hardware troubleshooting and component installation
- Windows and macOS operating system support
- Network connectivity and wireless configuration
- Customer service techniques for technical support

What sets me apart is my ability to communicate complex technical concepts in simple terms. In my [previous role/training], I successfully [specific example of helping someone with technology or solving a problem]. I understand that effective help desk support requires both technical expertise and excellent customer service skills.

I am particularly drawn to [Company Name] because [specific reason related to company - research them first]. Your commitment to [company value/mission] aligns with my goal of providing exceptional user support while continuing to grow my technical skills.

I would welcome the opportunity to discuss how my technical certification, problem-solving abilities, and dedication to customer service can contribute to your help desk team. Thank you for considering my application.

Sincerely,
[Your Name]`,
    downloadUrl: "#"
  }
];
