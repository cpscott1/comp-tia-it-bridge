
-- Clear existing sample data
DELETE FROM public.practice_questions;
DELETE FROM public.quiz_topics;

-- Insert CompTIA A+ Week 1-2 topics
INSERT INTO public.quiz_topics (name, description, color) VALUES 
('Hardware Component Identification', 'CPU, RAM, motherboard, and basic component knowledge (3.4 Objective)', 'blue'),
('Troubleshooting Methodology', 'CompTIA troubleshooting steps and problem-solving approach (5.0 Objective)', 'green'),
('CPU and Memory', 'Processors, RAM types, and memory configurations (3.2, 3.4 Objectives)', 'purple'),
('Storage Devices', 'HDDs, SSDs, RAID, and storage interfaces (3.3 Objective)', 'orange'),
('Power Supplies', 'PSU components, efficiency ratings, and power management (3.5 Objective)', 'red'),
('Cooling Systems', 'Thermal management and cooling solutions (3.4 Objective)', 'cyan'),
('Help Desk Scenarios', 'Real-world troubleshooting scenarios and customer service', 'indigo');

-- Insert Hardware Component Identification questions (Questions 1-5)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Component Identification'),
  'Which component is considered the "brain" of the computer and executes instructions?',
  '["RAM", "CPU", "Motherboard", "Hard Drive"]'::jsonb,
  1,
  'The CPU (Central Processing Unit) is often called the "brain" of the computer as it executes instructions and performs calculations.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Component Identification'),
  'What does RAM stand for?',
  '["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Remote Access Memory"]'::jsonb,
  0,
  'RAM stands for Random Access Memory, which provides temporary storage for data and programs currently in use.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Component Identification'),
  'Which motherboard form factor is the largest and provides the most expansion slots?',
  '["Mini-ITX", "Micro-ATX", "ATX", "Nano-ITX"]'::jsonb,
  2,
  'ATX (Advanced Technology eXtended) is the largest standard motherboard form factor, providing the most expansion slots and ports.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Component Identification'),
  'What is the primary function of a motherboard chipset?',
  '["To provide power to components", "To define what features are supported by the motherboard", "To store the operating system", "To cool the CPU"]'::jsonb,
  1,
  'The motherboard chipset defines supported features like CPU models, RAM types, storage options, and expansion slot types.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Component Identification'),
  'Which expansion slot type is the oldest and slowest?',
  '["PCIe x16", "PCIe x1", "PCI", "AGP"]'::jsonb,
  2,
  'PCI (Peripheral Computer Interconnect) slots are the oldest expansion slots with a 32-bit bus allowing only 266 MB/s transfer rates.',
  'Medium';

-- Insert Troubleshooting Methodology questions (Questions 6-10)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Troubleshooting Methodology'),
  'What is the FIRST step in the CompTIA troubleshooting methodology?',
  '["Establish a theory of probable cause", "Test the theory", "Identify the problem", "Implement the solution"]'::jsonb,
  2,
  'The first step in troubleshooting is always to identify and understand the problem before taking any action.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Troubleshooting Methodology'),
  'After identifying a problem, what should be the next step?',
  '["Implement a solution immediately", "Establish a theory of probable cause", "Document findings", "Replace the suspected component"]'::jsonb,
  1,
  'After identifying the problem, you should establish a theory about what might be causing the issue.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Troubleshooting Methodology'),
  'A customer reports their computer won''t turn on. What should you ask FIRST?',
  '["When did you last update your antivirus?", "Have there been any recent changes to the system?", "How old is your computer?", "What operating system are you running?"]'::jsonb,
  1,
  'Always gather information about recent changes, as they are often the cause of new problems.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Troubleshooting Methodology'),
  'What should you do BEFORE opening a computer case to work on internal components?',
  '["Turn off the monitor", "Remove all cables", "Power down the system and unplug it", "Run a virus scan"]'::jsonb,
  2,
  'Always ensure the system is completely powered down and unplugged before working on internal components for safety.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Troubleshooting Methodology'),
  'If your initial theory about a problem is proven wrong during testing, what should you do next?',
  '["Implement the solution anyway", "Establish a new theory or escalate", "Document the failure", "Start over from the beginning"]'::jsonb,
  1,
  'If the theory is disproven, establish a new theory based on new information or escalate if needed.',
  'Medium';

-- Insert CPU and Memory questions (Questions 11-15)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'CPU and Memory'),
  'Which CPU architecture is commonly found in mobile devices and focuses on power efficiency?',
  '["x86", "x64", "ARM", "RISC-V"]'::jsonb,
  2,
  'ARM (Advanced RISC Machine) architecture is designed for power efficiency and is commonly used in mobile devices.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'CPU and Memory'),
  'What does DDR stand for in DDR4 RAM?',
  '["Dual Data Rate", "Double Data Rate", "Direct Data Rate", "Dynamic Data Rate"]'::jsonb,
  1,
  'DDR stands for Double Data Rate, which refers to the memory''s ability to transfer data on both the rising and falling edges of the clock signal.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'CPU and Memory'),
  'Which RAM form factor is typically used in laptops?',
  '["DIMM", "SODIMM", "RIMM", "SIMM"]'::jsonb,
  1,
  'SODIMM (Small Outline Dual Inline Memory Module) is the smaller form factor used in laptops and compact devices.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'CPU and Memory'),
  'What is the benefit of dual-channel memory configuration?',
  '["Uses less power", "Increases memory capacity", "Improves memory bandwidth", "Reduces heat generation"]'::jsonb,
  2,
  'Dual-channel memory configuration increases memory bandwidth by allowing the memory controller to access two memory modules simultaneously.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'CPU and Memory'),
  'Which CPU socket type is manufactured by Intel?',
  '["AM4", "LGA 1151", "TR4", "FM2+"]'::jsonb,
  1,
  'LGA (Land Grid Array) sockets are manufactured by Intel, while AM4, TR4, and FM2+ are AMD socket types.',
  'Medium';

-- Insert Storage Devices questions (Questions 16-20)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Storage Devices'),
  'Which storage interface provides the fastest data transfer rates for SSDs?',
  '["SATA", "IDE", "NVMe", "SCSI"]'::jsonb,
  2,
  'NVMe (Non-volatile Memory Express) provides the fastest data transfer rates by connecting directly to the PCIe bus.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Storage Devices'),
  'What is the standard rotation speed for a high-performance desktop hard drive?',
  '["5,400 RPM", "7,200 RPM", "10,000 RPM", "15,000 RPM"]'::jsonb,
  1,
  '7,200 RPM is the standard speed for desktop hard drives, offering a good balance of performance and cost.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Storage Devices'),
  'Which form factor is used by modern M.2 SSDs?',
  '["2.5-inch", "3.5-inch", "Card-based", "22mm wide"]'::jsonb,
  3,
  'M.2 SSDs use a standardized form factor that is 22mm wide, with varying lengths (2242, 2260, 2280).',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Storage Devices'),
  'What does RAID 1 provide?',
  '["Increased storage capacity", "Faster data access", "Data redundancy through mirroring", "Data striping across multiple drives"]'::jsonb,
  2,
  'RAID 1 creates an exact copy (mirror) of data on two drives, providing redundancy in case one drive fails.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Storage Devices'),
  'Which storage device type is most susceptible to physical shock damage?',
  '["SSD", "HDD", "NVMe", "Flash drive"]'::jsonb,
  1,
  'HDDs have moving mechanical parts (spinning platters and read/write heads) that make them more susceptible to physical shock damage.',
  'Easy';

-- Insert Power Supplies questions (Questions 21-25)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Power Supplies'),
  'What is the standard voltage output for powering most motherboard components?',
  '["3.3V", "5V", "12V", "24V"]'::jsonb,
  2,
  '12V is the primary voltage rail used to power most motherboard components, including the CPU and GPU.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Power Supplies'),
  'How many pins does a modern ATX motherboard power connector have?',
  '["20", "24", "28", "32"]'::jsonb,
  1,
  'Modern ATX motherboards use a 24-pin power connector, which replaced the older 20-pin standard.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Power Supplies'),
  'What is the main advantage of a modular power supply?',
  '["Higher efficiency ratings", "Lower cost", "Ability to connect only needed cables", "Smaller physical size"]'::jsonb,
  2,
  'Modular power supplies allow you to connect only the cables you need, improving airflow and reducing clutter.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Power Supplies'),
  'Which power supply efficiency rating is considered the highest standard?',
  '["80 Plus", "80 Plus Gold", "80 Plus Platinum", "80 Plus Titanium"]'::jsonb,
  3,
  '80 Plus Titanium is the highest efficiency rating, requiring 90% efficiency at 50% load.',
  'Hard'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Power Supplies'),
  'What happens if a power supply''s wattage rating is insufficient for the system''s needs?',
  '["The system will run more efficiently", "The system may be unstable or fail to boot", "The power supply will last longer", "The system will automatically reduce performance"]'::jsonb,
  1,
  'An underpowered PSU can cause system instability, random shutdowns, or prevent the system from booting properly.',
  'Medium';

-- Insert Cooling Systems questions (Questions 26-30)
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Cooling Systems'),
  'What is the primary purpose of thermal paste between a CPU and heat sink?',
  '["To provide electrical insulation", "To fill microscopic gaps for better heat transfer", "To prevent corrosion", "To make removal easier"]'::jsonb,
  1,
  'Thermal paste fills microscopic imperfections between the CPU and heat sink surfaces, improving heat transfer efficiency.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Cooling Systems'),
  'Which cooling method is most effective for high-performance CPUs?',
  '["Passive heat sink only", "Air cooling with fan", "Liquid cooling", "Case fans only"]'::jsonb,
  2,
  'Liquid cooling systems are most effective for high-performance CPUs as they can dissipate heat more efficiently than air cooling.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Cooling Systems'),
  'What should you do if a CPU fan fails?',
  '["Continue using the computer normally", "Immediately shut down the system to prevent overheating", "Remove the heat sink", "Increase case fan speed to compensate"]'::jsonb,
  1,
  'A failed CPU fan can cause rapid overheating and permanent damage to the processor.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Cooling Systems'),
  'Where should case fans be positioned for optimal airflow?',
  '["All fans as exhaust", "All fans as intake", "Front/bottom intake, rear/top exhaust", "Random positioning doesn''t matter"]'::jsonb,
  2,
  'Optimal airflow follows natural convection: cool air intake at front/bottom, warm air exhaust at rear/top.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Cooling Systems'),
  'What is the typical temperature range that most CPUs should operate within?',
  '["30-50°C", "40-70°C", "70-90°C", "80-100°C"]'::jsonb,
  1,
  'Most CPUs operate safely between 40-70°C under normal loads, with thermal throttling occurring around 70-80°C.',
  'Easy';

-- Insert Help Desk Scenarios questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'A customer calls saying their computer has become very slow over the past week. What would be your FIRST step in troubleshooting this issue?',
  '["Tell them to restart the computer", "Ask about recent changes or new software installations", "Recommend they buy more RAM", "Schedule a technician visit"]'::jsonb,
  1,
  'Always gather information first. Recent changes are often the cause of new problems. This follows proper troubleshooting methodology.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'A customer reports their computer won''t turn on at all. No lights, no fans, completely dead. What should you ask the customer to check FIRST?',
  '["Is the monitor plugged in?", "Is the power cable securely connected to both the computer and wall outlet?", "When was the last time they cleaned the computer?", "What antivirus software are they using?"]'::jsonb,
  1,
  'When a system shows no signs of power, checking power connections should be the first step.',
  'Easy'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'A customer says their computer randomly shuts down during gaming sessions but works fine for basic tasks. What is the most likely cause?',
  '["Virus infection", "Insufficient power supply", "Overheating under load", "Bad RAM"]'::jsonb,
  2,
  'Random shutdowns during intensive tasks like gaming typically indicate overheating, as the system thermal protection kicks in.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'A customer reports their computer displays random blue screens and application crashes. Which component should you suspect FIRST?',
  '["Hard drive", "RAM", "Power supply", "Network card"]'::jsonb,
  1,
  'Random blue screens and application crashes are classic symptoms of faulty RAM, as memory errors can cause system instability.',
  'Medium'
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'A customer says their computer boots very slowly and they hear clicking sounds from inside the case. What should you advise the customer to do IMMEDIATELY?',
  '["Continue using the computer but avoid heavy programs", "Backup important data immediately", "Run a disk defragmentation", "Clean the computer case"]'::jsonb,
  1,
  'Clicking sounds from inside the case often indicate a failing hard drive. Data should be backed up immediately before the drive fails completely.',
  'Hard';
