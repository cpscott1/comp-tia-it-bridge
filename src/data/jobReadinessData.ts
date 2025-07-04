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
  {
    id: "tech-11",
    title: "Build Home Lab",
    description: "Set up a basic home lab to practice troubleshooting skills",
    category: 'technical',
    priority: 'medium',
    estimatedTime: "4-6 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  // Phase 2: Skill Development (Weeks 5-8) - Soft Skills
  {
    id: "skills-1",
    title: "Develop active listening techniques",
    description: "Practice listening skills to better understand user problems and concerns",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-2",
    title: "Practice explaining technical concepts simply",
    description: "Learn to communicate complex IT issues in user-friendly language",
    category: 'skills',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-3",
    title: "Learn conflict resolution basics",
    description: "Develop skills to handle frustrated users and difficult situations",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-4",
    title: "Improve written communication skills",
    description: "Practice writing professional emails and clear technical instructions",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "2-3 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-5",
    title: "Practice time management and prioritization",
    description: "Learn to manage multiple tickets and prioritize urgent vs non-urgent issues",
    category: 'skills',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 2: Skill Development (Weeks 5-8)"
  },
  {
    id: "skills-6",
    title: "Practice Technical Terminology",
    description: "Review and practice explaining common IT terms and concepts",
    category: 'skills',
    priority: 'high',
    estimatedTime: "1 hour",
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
  // Phase 3: Certification & Job Search (Weeks 9-12) - Resume & Application
  {
    id: "resume-1",
    title: "Create Technical Resume",
    description: "Build a resume highlighting your IT skills and CompTIA A+ knowledge using provided template",
    category: 'resume',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "resume-2",
    title: "Add CompTIA A+ Certification",
    description: "Include your certification status and expected completion date",
    category: 'resume',
    priority: 'high',
    estimatedTime: "15 minutes",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "application-1",
    title: "Write compelling cover letter template",
    description: "Develop a customizable cover letter template that highlights your IT skills and certification",
    category: 'application',
    priority: 'high',
    estimatedTime: "2-3 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "application-2",
    title: "Apply to 5-10 entry-level positions weekly",
    description: "Consistently apply to help desk, desktop support, and other entry-level IT positions",
    category: 'application',
    priority: 'high',
    estimatedTime: "2-3 hours weekly",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "application-3",
    title: "Research Target Companies",
    description: "Identify potential employers and learn about their IT environments",
    category: 'application',
    priority: 'medium',
    estimatedTime: "30 minutes per company",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  // Phase 3: Certification & Job Search (Weeks 9-12) - Interview Preparation
  {
    id: "interview-1",
    title: "Prepare for common interview questions",
    description: "Practice answers for typical help desk and entry-level IT interview questions",
    category: 'interview',
    priority: 'high',
    estimatedTime: "3-4 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "interview-2",
    title: "Practice Scenario Questions",
    description: "Prepare for technical troubleshooting scenarios in interviews",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1 hour",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  },
  {
    id: "interview-3",
    title: "Practice salary negotiation techniques",
    description: "Learn strategies for negotiating salary and benefits for entry-level IT positions",
    category: 'interview',
    priority: 'medium',
    estimatedTime: "1-2 hours",
    phase: "Phase 3: Certification & Job Search (Weeks 9-12)"
  }
];

export const RESUME_TEMPLATES = [
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

export const INTERVIEW_GUIDES = [
  {
    id: "interview-guide",
    title: "Interview Preparation Guide",
    description: "Common Help Desk Interview Questions & Answers",
    content: `Interview Preparation Guide
Common Help Desk Interview Questions & Answers

"Tell me about yourself."
Sample Answer: "I'm a recently certified CompTIA A+ professional with a strong passion for technology and helping others. I completed an intensive 12-week training program where I learned hardware troubleshooting, operating system support, and customer service techniques. I enjoy problem-solving and have experience explaining technical concepts to non-technical users. I'm looking for an opportunity to start my IT career in a help desk role where I can apply my certification knowledge while continuing to learn and grow."

"Why do you want to work in IT support?"
Sample Answer: "I've always been the person friends and family call when they have technology problems. I enjoy the challenge of diagnosing issues and the satisfaction of finding solutions. I earned my CompTIA A+ certification because I want to turn this natural ability into a professional career. Help desk work appeals to me because it combines technical problem-solving with helping people, and it provides a great foundation for growing in the IT field."

"How would you help a frustrated customer who can't access their email?"
Sample Answer: "First, I'd listen carefully and acknowledge their frustration to show I understand how important email access is to their work. Then I'd ask specific questions to gather information: when did the problem start, what error messages they're seeing, and what they were doing when it occurred. I'd walk them through basic troubleshooting steps like checking their internet connection and trying to access email from a different device. Throughout the process, I'd explain what we're doing and why, keeping them informed and involved in the solution."

"How would you handle a situation where a customer is not following your instructions?"
Sample Answer: "I'd first try to understand the customer's perspective and identify any misunderstandings. I'd then rephrase my instructions in a clear and concise manner, providing additional examples or clarifications if necessary. If the customer still doesn't follow my instructions, I'd escalate the issue to a supervisor or manager, but I'd make sure to document everything I've already tried to ensure the customer's issue is resolved."

"How do you stay current with technology?"
Sample Answer: "I follow several IT news websites and blogs, participate in online forums, and practice with home lab setups. I also plan to pursue additional certifications like Network+ or Security+ to expand my knowledge. I believe continuous learning is essential in IT since technology constantly evolves."`,
    downloadUrl: "#"
  },
  {
    id: "salary-negotiation-guide",
    title: "Salary Negotiation Guide",
    description: "Research strategies and negotiation tips for entry-level IT positions",
    content: `Salary Negotiation Guide

Research Phase
Before Any Interview:

Use Glassdoor, PayScale, and Indeed to research local salary ranges
Entry-level help desk: typically $35,000-$45,000 annually
Factor in location, company size, and industry
Consider total compensation: benefits, PTO, training opportunities

Negotiation Strategies
When Asked About Salary Expectations:

"Based on my research and the requirements of this position, I'm looking for a salary in the range of $X to $Y, but I'm open to discussing the complete compensation package."
Always give a range, not a specific number
Be prepared to justify your range with market research

If Offered Below Expectations:

"Thank you for the offer. I'm very excited about this opportunity. Based on my research and qualifications, I was hoping for something closer to $X. Is there flexibility in the salary range?"
Emphasize your value: certification, eagerness to learn, customer service skills

Non-Salary Negotiations:

Additional PTO days
Flexible work arrangements
Professional development/training budget
Earlier performance review for potential raise`,
    downloadUrl: "#"
  },
  {
    id: "job-search-strategy",
    title: "Job Search Strategy",
    description: "Comprehensive guide for finding and applying to entry-level IT positions",
    content: `Job Search Strategy

Target Job Titles to Search For:

Help Desk Technician
IT Support Specialist
Desktop Support Technician
Technical Support Representative
Field Service Technician
Computer Support Specialist
IT Helpdesk Analyst
Junior System Administrator

Where to Look:
Job Boards:

Indeed, LinkedIn Jobs, Glassdoor
Dice (IT-specific)
CompTIA Job Board
Local government websites
Company websites directly

Networking:

LinkedIn connections with local IT professionals
Local IT meetups and user groups
Career fairs and job expos
Alumni networks from training programs

Application Strategy:

Apply to 5-10 positions per week
Customize resume and cover letter for each application
Follow up after 1 week if no response
Track applications in a spreadsheet
Practice interviewing for positions you're less interested in first`,
    downloadUrl: "#"
  }
];
