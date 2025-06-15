
-- Insert Week 2 topic
INSERT INTO public.quiz_topics (name, description, color) VALUES 
('Installing System Devices', 'Week 2: Power Supplies, Storage, Memory, CPU Installation, Cooling, and BIOS/UEFI (CompTIA A+ Objectives 3.2, 3.3, 3.4, 3.5)', 'green');

-- Insert Week 2 questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the recommended standard wattage for a PSU according to CompTIA?',
  '["300 watts", "450 watts", "500 watts", "650 watts"]'::jsonb,
  2,
  'CompTIA recommends 500 watts as the standard PSU wattage for typical desktop systems.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the main advantage of a modular power supply?',
  '["Higher efficiency ratings", "Lower cost than non-modular", "Only attach cables that are needed", "Provides more wattage output"]'::jsonb,
  2,
  'Modular PSUs allow you to connect only required cables, reducing clutter and improving airflow.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which power supply form factor is used with Mini-ITX motherboards?',
  '["ATX", "SFX", "TFX", "EPS"]'::jsonb,
  1,
  'SFX (Small Form Factor) power supplies are designed for Mini-ITX and smaller form factor cases.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What voltage does a modern ATX motherboard main power connector provide?',
  '["20-pin only", "24-pin only", "Either 20-pin or 24-pin with adapter", "28-pin"]'::jsonb,
  1,
  'Modern ATX motherboards use 24-pin main power connectors, though older 20-pin can work with adapters.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which PSU output voltage is primarily used for the CPU and other high-power components?',
  '["+3.3V", "+5V", "+12V", "-12V"]'::jsonb,
  2,
  'The +12V rail provides power for CPUs, graphics cards, fans, and other high-power components.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What does NVMe stand for?',
  '["Non-volatile Memory Express", "Network Virtual Memory Express", "New Virtual Memory Express", "Non-variable Memory Express"]'::jsonb,
  0,
  'NVMe stands for Non-volatile Memory Express, a high-speed interface for SSDs connecting via PCIe.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which storage interface typically provides the fastest data transfer rates?',
  '["SATA III", "IDE", "NVMe", "SCSI"]'::jsonb,
  2,
  'NVMe provides the fastest storage performance by connecting directly to the PCIe bus.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the standard rotation speed for a typical desktop hard drive?',
  '["5,400 RPM", "7,200 RPM", "10,000 RPM", "15,000 RPM"]'::jsonb,
  1,
  '7,200 RPM is the standard speed for desktop HDDs, balancing performance and cost.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which RAID level provides data redundancy through mirroring?',
  '["RAID 0", "RAID 1", "RAID 5", "RAID 10"]'::jsonb,
  1,
  'RAID 1 creates an exact mirror of data across two drives, providing redundancy.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What form factor is commonly used by M.2 SSDs?',
  '["2.5-inch", "3.5-inch", "22mm wide with varying lengths", "15mm wide standard"]'::jsonb,
  2,
  'M.2 SSDs are 22mm wide with common lengths of 42mm, 60mm, and 80mm (2242, 2260, 2280).',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which memory type is NOT compatible with other DDR types?',
  '["DDR3 and DDR4 are interchangeable", "All DDR types are compatible", "DDR types are completely incompatible with each other", "Only DDR4 and DDR5 are compatible"]'::jsonb,
  2,
  'Different DDR types (DDR3, DDR4, DDR5) have different pin configurations and are not interchangeable.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What does SODIMM stand for?',
  '["Small Outline Dual Inline Memory Module", "Standard Outline Dual Inline Memory Module", "Solid Outline Dual Inline Memory Module", "Secure Outline Dual Inline Memory Module"]'::jsonb,
  0,
  'SODIMM is the smaller form factor memory used in laptops and compact systems.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the benefit of dual-channel memory configuration?',
  '["Doubles memory capacity", "Reduces power consumption", "Improves memory bandwidth", "Increases memory reliability"]'::jsonb,
  2,
  'Dual-channel allows the memory controller to access two modules simultaneously, increasing bandwidth.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which type of RAM includes error detection and correction capabilities?',
  '["Registered RAM", "ECC RAM", "Buffered RAM", "Unbuffered RAM"]'::jsonb,
  1,
  'ECC (Error Checking and Correcting) RAM can detect and fix memory errors, improving system stability.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What determines the maximum RAM capacity and type supported?',
  '["The operating system", "The CPU and chipset", "The power supply wattage", "The case size"]'::jsonb,
  1,
  'The CPU and motherboard chipset determine supported RAM types, speeds, and maximum capacity.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which CPU architecture is commonly found in mobile devices and emphasizes power efficiency?',
  '["x86", "x64", "ARM", "RISC-V"]'::jsonb,
  2,
  'ARM (Advanced RISC Machine) processors are designed for power efficiency and commonly used in mobile devices.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the difference between single-core and multicore processors?',
  '["Clock speed only", "Number of processing units on the chip", "Memory capacity", "Power consumption only"]'::jsonb,
  1,
  'Multicore processors have multiple processing cores on a single chip, allowing parallel processing.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which CPU socket type is manufactured by Intel?',
  '["AM4", "LGA 1700", "TR4", "FM2+"]'::jsonb,
  1,
  'LGA (Land Grid Array) sockets are Intel''s design, while AM4, TR4, and FM2+ are AMD sockets.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What does multithreading allow a CPU to do?',
  '["Run at higher clock speeds", "Execute multiple instruction streams per core", "Use more memory", "Connect to more devices"]'::jsonb,
  1,
  'Multithreading allows each CPU core to handle multiple threads simultaneously, improving efficiency.',
  'Hard',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What must be applied between a CPU and heat sink during installation?',
  '["Electrical tape", "Thermal paste", "Adhesive glue", "Rubber padding"]'::jsonb,
  1,
  'Thermal paste fills microscopic gaps between CPU and heat sink for efficient heat transfer.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which cooling method is most effective for high-performance CPUs?',
  '["Passive heat sink only", "Air cooling with fan", "Liquid cooling", "Case fans only"]'::jsonb,
  2,
  'Liquid cooling systems provide superior heat dissipation for high-performance processors.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What should you do immediately if a CPU fan fails?',
  '["Continue normal operation", "Shut down the system immediately", "Increase case fan speed", "Remove the heat sink"]'::jsonb,
  1,
  'A failed CPU fan can cause rapid overheating and permanent processor damage.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is the primary purpose of thermal paste?',
  '["Electrical insulation", "Fill microscopic gaps for heat transfer", "Prevent corrosion", "Make removal easier"]'::jsonb,
  1,
  'Thermal paste eliminates air gaps between CPU and heat sink surfaces, improving heat conduction.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Where should intake fans typically be positioned for optimal airflow?',
  '["Rear and top", "Front and bottom", "Left and right sides", "Random positioning"]'::jsonb,
  1,
  'Optimal airflow brings cool air in at front/bottom and exhausts warm air at rear/top.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What temperature range should most CPUs operate within under normal conditions?',
  '["20-40°C", "40-70°C", "70-90°C", "80-100°C"]'::jsonb,
  1,
  'Most CPUs operate safely between 40-70°C under normal loads, with throttling around 70-80°C.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What does UEFI stand for?',
  '["Universal Extensible Firmware Interface", "Unified Extensible Firmware Interface", "Universal Extended Firmware Interface", "Unified Extended Firmware Interface"]'::jsonb,
  1,
  'UEFI is the modern replacement for traditional BIOS firmware.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What is a key advantage of UEFI over traditional BIOS?',
  '["Uses less power", "Supports mouse and keyboard interaction", "Requires less memory", "Works with older hardware only"]'::jsonb,
  1,
  'UEFI provides a graphical interface that supports both mouse and keyboard, unlike BIOS which only supports keyboard.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What does TPM stand for?',
  '["Trusted Platform Module", "Total Performance Module", "Thermal Protection Module", "Transmission Protocol Module"]'::jsonb,
  0,
  'TPM is a hardware encryption chip that stores cryptographic keys for security features.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'Which battery type typically powers the CMOS to maintain settings?',
  '["AA alkaline", "CR2032 coin cell", "9V battery", "Rechargeable lithium"]'::jsonb,
  1,
  'CR2032 coin cell batteries provide power to maintain CMOS settings when the system is off.',
  'Easy',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Installing System Devices'),
  'What happens when the CMOS battery dies or is removed?',
  '["The system won''t boot", "CMOS resets to default settings", "The hard drive is erased", "The CPU stops working"]'::jsonb,
  1,
  'Without battery power, volatile CMOS memory loses all custom settings and reverts to defaults.',
  'Easy',
  2;

-- Insert Help Desk Scenarios topic
INSERT INTO public.quiz_topics (name, description, color) VALUES 
('Help Desk Scenarios', 'Week 2: Real-world troubleshooting scenarios for power, cooling, memory, storage, and CPU issues', 'purple');

-- Insert Help Desk Scenario questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) 
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'Customer Issue: "My computer won''t turn on at all. I was working yesterday and everything was fine, but this morning when I press the power button, nothing happens. No lights, no fans, completely dead." What should you recommend first?',
  '["Recommend immediately buying a new computer", "Ask them to check power connections and try a different outlet", "Tell them it''s definitely a motherboard failure", "Suggest they wait a few hours for it to \"rest\""]'::jsonb,
  1,
  'When a system shows no signs of power, first check the most basic power-related issues before diagnosing component failures.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'Customer Issue: "My computer keeps shutting down randomly, especially when I''m playing games or using video editing software. It works fine for basic tasks like web browsing and email." What should you suggest?',
  '["Tell them to stop using demanding software", "Suggest the issue is caused by viruses", "Recommend checking cooling system and cleaning dust", "Advise purchasing a new graphics card immediately"]'::jsonb,
  2,
  'Random shutdowns during intensive tasks typically indicate overheating. The thermal protection system shuts down to prevent damage.',
  'Medium',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'Customer Issue: "I just installed new RAM in my computer, but now it won''t boot. The fans spin up but I don''t get any display, and I hear three short beeps when I turn it on." What should you recommend?',
  '["Tell them the motherboard is dead", "Suggest they return the RAM as defective", "Ask them to reseat the RAM and check compatibility", "Recommend formatting the hard drive"]'::jsonb,
  2,
  'Three beeps typically indicate memory issues. The RAM may not be seated properly or may be incompatible with the system.',
  'Hard',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'Customer Issue: "I installed a new SSD in my computer, but it''s not showing up in Windows. The old hard drive still works fine, but the computer doesn''t seem to recognize the new SSD at all." What should you guide them to do?',
  '["Tell them SSDs don''t work with their computer", "Guide them to check BIOS settings and disk management", "Suggest the SSD is broken and needs replacement", "Recommend reinstalling Windows completely"]'::jsonb,
  1,
  'New drives often need to be initialized in Disk Management, and BIOS/UEFI settings may need adjustment to detect the drive.',
  'Hard',
  2
UNION ALL
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Help Desk Scenarios'),
  'Customer Issue: "I''m building my first computer and I think I may have installed the CPU wrong. The system powers on, all the fans spin, but I don''t get any display and I hear one long beep followed by two short beeps." What should you suggest?',
  '["Tell them to immediately order a new CPU", "Suggest they check CPU installation and seating", "Recommend they start over with all components", "Advise that the power supply is insufficient"]'::jsonb,
  1,
  'One long beep followed by two short beeps typically indicates CPU issues. The processor may not be properly seated or installed correctly.',
  'Hard',
  2;
