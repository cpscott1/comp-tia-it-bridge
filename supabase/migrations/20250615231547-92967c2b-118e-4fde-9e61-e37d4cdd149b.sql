
-- First, let's clear existing questions and topics to start fresh
DELETE FROM public.practice_questions;
DELETE FROM public.quiz_topics;

-- Add a week column to practice_questions table
ALTER TABLE public.practice_questions ADD COLUMN week_number integer DEFAULT 1;

-- Insert the Hardware Foundations topic for Week 1
INSERT INTO public.quiz_topics (name, description, color) VALUES 
('Hardware Foundations', 'Week 1: Motherboards, PCIe, Basic Components, Troubleshooting, and Safety (CompTIA A+ Objectives 3.4, 5.1)', 'blue');

-- Insert Week 1 questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which motherboard form factor is the largest and provides the most expansion slots?',
  '["Mini-ITX", "Micro-ATX", "ATX", "Nano-ITX"]'::jsonb,
  2,
  'ATX (Advanced Technology eXtended) is the largest standard motherboard form factor at 12" × 9.6", providing the most expansion slots and connectivity options.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the primary function of a motherboard chipset?',
  '["To provide power to all components", "To define what features and components are supported", "To store the BIOS firmware", "To cool the CPU"]'::jsonb,
  1,
  'The motherboard chipset determines supported CPU types, RAM specifications, storage interfaces, expansion slots, and other system capabilities.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which motherboard form factor measures 6.7" × 6.7"?',
  '["ATX", "Micro-ATX", "Mini-ITX", "E-ATX"]'::jsonb,
  2,
  'Mini-ITX is the smallest common motherboard form factor at 6.7" × 6.7" (170mm × 170mm), designed for compact systems.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does the chipset determine about RAM compatibility?',
  '["Only the brand of RAM that can be used", "The type, capacity, and speed of supported RAM", "Only the color of the RAM modules", "The price of compatible RAM"]'::jsonb,
  1,
  'The chipset defines which DDR type (DDR3, DDR4, DDR5), maximum capacity, and supported speeds for RAM.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which expansion slot type is the oldest and provides the slowest data transfer rates?',
  '["PCIe x16", "PCIe x1", "PCI", "AGP"]'::jsonb,
  2,
  'PCI (Peripheral Computer Interconnect) is the oldest slot type with a 32-bit bus providing only 266 MB/s transfer rates.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does PCIe stand for?',
  '["Peripheral Computer Interconnect Express", "Personal Computer Interface Express", "Peripheral Component Interconnect Express", "Personal Component Interface Express"]'::jsonb,
  2,
  'PCIe stands for Peripheral Component Interconnect Express, the modern standard for expansion slots.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which PCIe slot size is typically used for graphics cards?',
  '["PCIe x1", "PCIe x4", "PCIe x8", "PCIe x16"]'::jsonb,
  3,
  'PCIe x16 slots provide the most lanes (16) and bandwidth, making them ideal for high-performance graphics cards.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Can a smaller PCIe card be installed in a larger PCIe slot?',
  '["No, never", "Yes, always", "Only with an adapter", "Only if they are the same generation"]'::jsonb,
  1,
  'Smaller PCIe cards can always be installed in larger slots. A PCIe x1 card can work in a PCIe x16 slot.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is Mini PCIe commonly used for in laptops?',
  '["Graphics cards", "Sound cards", "WiFi adapters and SSD storage", "Network interface cards only"]'::jsonb,
  2,
  'Mini PCIe is primarily used for WiFi adapters and small SSD storage devices in laptops and compact systems.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'How many data transfer lanes does a PCIe x4 slot provide?',
  '["1 lane", "4 lanes", "8 lanes", "16 lanes"]'::jsonb,
  1,
  'The number after "x" indicates the number of lanes. PCIe x4 provides 4 lanes for data transfer.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does CPU stand for?',
  '["Computer Processing Unit", "Central Processing Unit", "Core Processing Unit", "Central Performance Unit"]'::jsonb,
  1,
  'CPU stands for Central Processing Unit, often called the "brain" of the computer.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does RAM stand for?',
  '["Random Access Memory", "Read Access Memory", "Rapid Access Memory", "Remote Access Memory"]'::jsonb,
  0,
  'RAM stands for Random Access Memory, providing temporary storage for data and programs currently in use.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which component connects all other components in a computer system?',
  '["CPU", "RAM", "Motherboard", "Power supply"]'::jsonb,
  2,
  'The motherboard is the main circuit board that connects and allows communication between all computer components.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the primary function of the power supply unit (PSU)?',
  '["To store electrical energy", "To convert AC power to DC power", "To generate electricity", "To regulate internet connectivity"]'::jsonb,
  1,
  'The PSU converts alternating current (AC) from the wall outlet to direct current (DC) that computer components require.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which component provides permanent data storage even when the computer is turned off?',
  '["RAM", "CPU cache", "Hard drive or SSD", "Graphics card memory"]'::jsonb,
  2,
  'Storage devices (HDDs and SSDs) provide non-volatile storage that retains data when power is removed.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the FIRST step in the CompTIA troubleshooting methodology?',
  '["Establish a theory of probable cause", "Test the theory", "Identify the problem", "Implement the solution"]'::jsonb,
  2,
  'The first step is always to identify and understand the problem by gathering information and identifying symptoms.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'After identifying the problem, what should be the next step?',
  '["Implement a solution immediately", "Establish a theory of probable cause", "Document findings", "Replace suspected components"]'::jsonb,
  1,
  'Step 2 is to establish a theory about what might be causing the identified problem.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What should you do if your initial theory about a problem is proven wrong during testing?',
  '["Implement the solution anyway", "Establish a new theory or escalate", "Start completely over", "Document the failure and stop"]'::jsonb,
  1,
  'If the theory is disproven, establish a new theory based on additional information or escalate if necessary.',
  'Hard',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which step comes immediately after implementing a solution?',
  '["Document findings", "Test the theory", "Verify full system functionality", "Establish a new theory"]'::jsonb,
  2,
  'After implementing a solution, you must verify that the system works properly and the problem is resolved.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What is the final step in the CompTIA troubleshooting methodology?',
  '["Test the solution", "Verify functionality", "Document findings, actions, and outcomes", "Implement preventive measures"]'::jsonb,
  2,
  'The final step is to document what was found, what actions were taken, and the outcomes for future reference.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What should you do BEFORE opening a computer case to work on internal components?',
  '["Remove the keyboard and mouse", "Power down the system and unplug it", "Update the operating system", "Run a virus scan"]'::jsonb,
  1,
  'Always ensure the system is completely powered down and unplugged before working on internal components for safety.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does POST stand for?',
  '["Power-On Self-Test", "Peripheral Operating System Test", "Primary Output System Test", "Power Output Safety Test"]'::jsonb,
  0,
  'POST (Power-On Self-Test) checks internal hardware for compatibility and connection before starting the boot process.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What typically happens if a computer passes the POST?',
  '["It displays an error message", "It produces multiple beep codes", "It may give a single beep and continue booting", "It automatically shuts down"]'::jsonb,
  2,
  'A successful POST typically results in a single beep (if enabled) and the system continues with the boot process.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What do multiple beep codes during startup typically indicate?',
  '["The system is working normally", "Hardware problems or failures", "Software updates are needed", "The system is in sleep mode"]'::jsonb,
  1,
  'Multiple or specific beep codes during POST indicate hardware problems such as RAM, CPU, or motherboard issues.',
  'Medium',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What should you do if you smell something burning from inside a computer case?',
  '["Continue working but open windows", "Immediately shut down and unplug the system", "Spray the case with compressed air", "Install additional fans"]'::jsonb,
  1,
  'A burning smell indicates potential fire hazard from overheating or electrical failure - immediately power down and disconnect.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does DDR stand for in DDR4 RAM?',
  '["Dual Data Rate", "Double Data Rate", "Direct Data Rate", "Dynamic Data Rate"]'::jsonb,
  1,
  'DDR stands for Double Data Rate, referring to memory''s ability to transfer data on both clock edges.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which RAM form factor is typically used in desktop computers?',
  '["SODIMM", "DIMM", "RIMM", "SIMM"]'::jsonb,
  1,
  'DIMM (Dual Inline Memory Module) is the standard form factor for desktop computer RAM.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does SSD stand for?',
  '["Solid State Drive", "Super Speed Drive", "System Storage Device", "Serial Storage Drive"]'::jsonb,
  0,
  'SSD stands for Solid State Drive, which uses flash memory instead of moving mechanical parts.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'Which storage device typically has moving mechanical parts?',
  '["SSD", "NVMe drive", "HDD", "Flash drive"]'::jsonb,
  2,
  'HDD (Hard Disk Drive) has moving mechanical parts including spinning platters and read/write heads.',
  'Easy',
  1
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Hardware Foundations'),
  'What does SATA stand for?',
  '["Serial Advanced Technology Attachment", "System Advanced Technology Access", "Serial Audio Technology Attachment", "System Audio Technology Access"]'::jsonb,
  0,
  'SATA stands for Serial Advanced Technology Attachment, a interface standard for connecting storage devices.',
  'Easy',
  1;
