
-- First, let's create the PC Hardware Troubleshooting topic if it doesn't exist
INSERT INTO public.quiz_topics (name, description, color)
SELECT 'PC Hardware Troubleshooting', 'Week 3: Hardware Troubleshooting, BIOS/UEFI, Power Issues, Storage, Display, and Performance (CompTIA A+ Objectives 3.4, 5.1, 5.2, 5.3, 5.4)', 'red'
WHERE NOT EXISTS (
  SELECT 1 FROM public.quiz_topics WHERE name = 'PC Hardware Troubleshooting'
);

-- Insert all 30 Week 3 questions, avoiding duplicates
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number)
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'PC Hardware Troubleshooting'),
  question_data.question,
  question_data.options::jsonb,
  question_data.correct_answer,
  question_data.explanation,
  question_data.difficulty,
  3
FROM (VALUES
  ('What key is commonly pressed during boot to access the BIOS/UEFI setup utility?', '["F1", "F2 or Delete", "F8", "F12"]', 1, 'F2 and Delete are the most common keys to access BIOS/UEFI setup, though it varies by manufacturer.', 'Easy'),
  ('What does UEFI stand for?', '["Universal Extensible Firmware Interface", "Unified Extensible Firmware Interface", "Universal Extended Firmware Interface", "Unified Extended Firmware Interface"]', 1, 'UEFI is the modern replacement for traditional BIOS with enhanced features and capabilities.', 'Easy'),
  ('Which UEFI feature prevents untrusted code from running during boot?', '["Fast Boot", "Secure Boot", "Boot Guard", "Trusted Boot"]', 1, 'Secure Boot uses cryptographic keys to verify that boot code is trusted and hasn''t been tampered with.', 'Medium'),
  ('What type of battery typically powers the CMOS to maintain BIOS settings?', '["AAA alkaline", "CR2032 coin cell", "9V battery", "Rechargeable lithium"]', 1, 'CR2032 coin cell batteries provide power to maintain CMOS settings when the system is powered off.', 'Easy'),
  ('What happens when the CMOS battery dies?', '["The computer won''t boot", "CMOS settings reset to defaults", "The hard drive is erased", "The operating system becomes corrupt"]', 1, 'Without battery power, volatile CMOS memory loses custom settings and reverts to factory defaults.', 'Easy'),
  ('A computer shows no signs of power when the power button is pressed. What should you check FIRST?', '["The motherboard", "The CPU", "Power connections and outlet", "The RAM"]', 2, 'Always start with the most basic checks: power cord connections, outlet functionality, and PSU switch position.', 'Easy'),
  ('What does a burning smell from a computer case typically indicate?', '["Normal operation", "Power supply failure", "Hard drive failure", "RAM overheating"]', 1, 'A burning smell usually indicates electrical component failure, most commonly the power supply unit.', 'Medium'),
  ('What should you do immediately if you smell something burning from a computer?', '["Continue working but open windows", "Shut down and unplug the system immediately", "Increase fan speeds", "Apply thermal paste"]', 1, 'A burning smell indicates potential fire hazard - immediately power down and disconnect to prevent damage or injury.', 'Easy'),
  ('A computer randomly shuts down during intensive tasks but works fine for basic operations. What is the most likely cause?', '["Virus infection", "Bad RAM", "Overheating", "Network issues"]', 2, 'Random shutdowns during high-load tasks typically indicate thermal protection engaging due to overheating.', 'Medium'),
  ('What does intermittent shutdown usually indicate?', '["Perfect system health", "Heat issues or failing components", "Software updates needed", "Normal power saving mode"]', 1, 'Intermittent shutdowns often result from overheating, failing memory, or power supply instability.', 'Medium'),
  ('What do clicking sounds from inside a computer case typically indicate?', '["Normal hard drive operation", "Failing or dead hard drive", "CPU fan issues", "Power supply problems"]', 1, 'Clicking sounds usually indicate mechanical failure in hard drives - immediate data backup is critical.', 'Medium'),
  ('What does S.M.A.R.T. stand for?', '["System Monitoring and Reporting Technology", "Self-Monitoring, Analysis, and Reporting Technology", "Smart Monitoring and Recovery Technology", "System Management and Recovery Technology"]', 1, 'S.M.A.R.T. monitors drive health and can predict imminent failures before they occur.', 'Easy'),
  ('What should you do if you hear grinding noises from a computer?', '["Ignore it - it''s normal", "Identify the source (fan or drive) and replace if necessary", "Increase system volume", "Install sound dampening"]', 1, 'Grinding noises indicate mechanical failure in fans or hard drives requiring immediate attention.', 'Medium'),
  ('A system displays "Bootable device not found." What are the possible causes?', '["Monitor failure only", "BIOS boot order, dead drive, or corrupt OS", "Network connectivity issues", "RAM failure only"]', 1, 'This error occurs when the system can''t find a valid boot device due to configuration, hardware failure, or software corruption.', 'Medium'),
  ('What do amber/orange LED indicators on RAID systems typically mean?', '["Normal operation", "Drive failure or degraded array", "High performance mode", "Power saving mode"]', 1, 'Amber/orange LEDs on RAID systems indicate failed drives or degraded arrays requiring attention.', 'Medium'),
  ('A monitor displays nothing but you can hear the computer boot up. What should you check FIRST?', '["Replace the graphics card", "Video cable connections and input source", "Install new drivers", "Replace the motherboard"]', 1, 'Start with simple checks: cable connections, monitor power, and correct input source selection.', 'Easy'),
  ('What should you check if a projector display appears dim?', '["Network connectivity", "Bulb life and brightness settings", "Audio settings", "Printer drivers"]', 1, 'Dim projector images usually result from aging bulbs or incorrect brightness settings.', 'Easy'),
  ('A monitor displays the wrong colors (everything appears red). What is the most likely cause?', '["Power supply failure", "Defective video cable or loose connection", "RAM failure", "CPU overheating"]', 1, 'Color display issues often result from damaged cables or loose connections affecting specific color channels.', 'Medium'),
  ('What causes screen burn-in on displays?', '["Too much brightness", "Static images displayed for extended periods", "Electrical surges", "Network interference"]', 1, 'Burn-in occurs when static images are displayed too long, permanently damaging the display phosphors or pixels.', 'Easy'),
  ('A projector randomly shuts down during presentations. What should you check?', '["Network settings", "Overheating and ventilation", "Audio levels", "Keyboard batteries"]', 1, 'Random projector shutdowns often result from overheating due to dust buildup or blocked ventilation.', 'Medium'),
  ('What typically causes sluggish computer performance?', '["Too much RAM", "Insufficient memory, slow storage, or malware", "Fast internet connection", "New hardware installation"]', 1, 'Slow performance results from hardware limitations (RAM, storage) or software issues (malware, corruption).', 'Medium'),
  ('What does a blue screen of death (BSOD) typically indicate?', '["Normal shutdown process", "Hardware failure or driver issues", "Successful software installation", "Network connectivity problems"]', 1, 'BSODs usually indicate serious hardware problems (RAM, CPU) or incompatible/corrupt device drivers.', 'Medium'),
  ('If applications crash randomly, what component should you suspect FIRST?', '["Network card", "Sound card", "RAM (memory)", "Optical drive"]', 2, 'Random application crashes often indicate memory errors that corrupt running programs.', 'Medium'),
  ('What can cause capacitor swelling on a motherboard?', '["Normal operation", "Age, heat, or electrical stress", "Software updates", "Network traffic"]', 1, 'Capacitor swelling results from age, excessive heat, or electrical stress, often requiring motherboard replacement.', 'Hard'),
  ('If the system date and time are consistently incorrect, what should you replace?', '["Power supply", "CMOS battery", "RAM modules", "Hard drive"]', 1, 'Incorrect system time typically indicates a dead CMOS battery that can no longer maintain real-time clock settings.', 'Easy'),
  ('What does POST stand for?', '["Power-On Self-Test", "Peripheral Operating System Test", "Primary Output System Test", "Power Output Safety Test"]', 0, 'POST checks internal hardware for compatibility and proper connection before starting the boot process.', 'Easy'),
  ('What does a single beep during POST typically indicate?', '["Memory failure", "System passed POST successfully", "Power supply failure", "Keyboard error"]', 1, 'A single beep (if enabled) usually indicates successful POST completion and normal boot continuation.', 'Easy'),
  ('What do three short beeps during POST typically indicate?', '["CPU failure", "Memory (RAM) problems", "Power supply failure", "Normal operation"]', 1, 'Three short beeps commonly indicate memory-related issues such as failed or improperly seated RAM.', 'Medium'),
  ('If a system powers on but displays nothing, what should you check?', '["Only the monitor", "RAM seating, video connections, and POST beep codes", "Only network connections", "Only keyboard connections"]', 1, 'No display with power can indicate RAM issues, video problems, or other hardware failures indicated by beep codes.', 'Medium'),
  ('What can cause a system to show power (fans spinning) but not boot?', '["Perfect system health", "Failed POST due to hardware issues", "Software updates", "Network disconnection"]', 1, 'Power without boot indicates failed POST, commonly from RAM, CPU, motherboard, or other critical hardware problems.', 'Medium')
) AS question_data(question, options, correct_answer, explanation, difficulty)
WHERE NOT EXISTS (
  SELECT 1 FROM public.practice_questions p 
  WHERE p.question = question_data.question 
  AND p.topic_id = (SELECT id FROM public.quiz_topics WHERE name = 'PC Hardware Troubleshooting')
  AND p.week_number = 3
);
