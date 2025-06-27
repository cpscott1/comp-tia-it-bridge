
-- Insert Week 3 troubleshooting questions for CompTIA A+
-- First, get the topic ID for troubleshooting (assuming it exists, or we'll create it)

-- Insert topic for Week 3 Troubleshooting if it doesn't exist
INSERT INTO quiz_topics (name, description, color) 
VALUES ('PC Hardware Troubleshooting', 'BIOS/UEFI, Power Issues, Storage, Display, and Performance Troubleshooting', 'red')
ON CONFLICT DO NOTHING;

-- Get the topic ID for troubleshooting
WITH troubleshooting_topic AS (
  SELECT id FROM quiz_topics WHERE name = 'PC Hardware Troubleshooting'
)

-- Insert all 30 Week 3 practice questions
INSERT INTO practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) VALUES

-- BIOS/UEFI Configuration Questions (1-5)
((SELECT id FROM troubleshooting_topic), 
 'What key is commonly pressed during boot to access the BIOS/UEFI setup utility?',
 '["F1", "F2 or Delete", "F8", "F12"]'::jsonb,
 1,
 'F2 and Delete are the most common keys to access BIOS/UEFI setup, though it varies by manufacturer.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does UEFI stand for?',
 '["Universal Extensible Firmware Interface", "Unified Extensible Firmware Interface", "Universal Extended Firmware Interface", "Unified Extended Firmware Interface"]'::jsonb,
 1,
 'UEFI is the modern replacement for traditional BIOS with enhanced features and capabilities.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'Which UEFI feature prevents untrusted code from running during boot?',
 '["Fast Boot", "Secure Boot", "Boot Guard", "Trusted Boot"]'::jsonb,
 1,
 'Secure Boot uses cryptographic keys to verify that boot code is trusted and hasn''t been tampered with.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What type of battery typically powers the CMOS to maintain BIOS settings?',
 '["AAA alkaline", "CR2032 coin cell", "9V battery", "Rechargeable lithium"]'::jsonb,
 1,
 'CR2032 coin cell batteries provide power to maintain CMOS settings when the system is powered off.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What happens when the CMOS battery dies?',
 '["The computer won''t boot", "CMOS settings reset to defaults", "The hard drive is erased", "The operating system becomes corrupt"]'::jsonb,
 1,
 'Without battery power, volatile CMOS memory loses custom settings and reverts to factory defaults.',
 'Medium',
 3),

-- Power Issues Troubleshooting Questions (6-10)
((SELECT id FROM troubleshooting_topic),
 'A computer shows no signs of power when the power button is pressed. What should you check FIRST?',
 '["The motherboard", "The CPU", "Power connections and outlet", "The RAM"]'::jsonb,
 2,
 'Always start with the most basic checks: power cord connections, outlet functionality, and PSU switch position.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does a burning smell from a computer case typically indicate?',
 '["Normal operation", "Power supply failure", "Hard drive failure", "RAM overheating"]'::jsonb,
 1,
 'A burning smell usually indicates electrical component failure, most commonly the power supply unit.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What should you do immediately if you smell something burning from a computer?',
 '["Continue working but open windows", "Shut down and unplug the system immediately", "Increase fan speeds", "Apply thermal paste"]'::jsonb,
 1,
 'A burning smell indicates potential fire hazard - immediately power down and disconnect to prevent damage or injury.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'A computer randomly shuts down during intensive tasks but works fine for basic operations. What is the most likely cause?',
 '["Virus infection", "Bad RAM", "Overheating", "Network issues"]'::jsonb,
 2,
 'Random shutdowns during high-load tasks typically indicate thermal protection engaging due to overheating.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does intermittent shutdown usually indicate?',
 '["Perfect system health", "Heat issues or failing components", "Software updates needed", "Normal power saving mode"]'::jsonb,
 1,
 'Intermittent shutdowns often result from overheating, failing memory, or power supply instability.',
 'Medium',
 3),

-- Storage Device Troubleshooting Questions (11-15)
((SELECT id FROM troubleshooting_topic),
 'What do clicking sounds from inside a computer case typically indicate?',
 '["Normal hard drive operation", "Failing or dead hard drive", "CPU fan issues", "Power supply problems"]'::jsonb,
 1,
 'Clicking sounds usually indicate mechanical failure in hard drives - immediate data backup is critical.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does S.M.A.R.T. stand for?',
 '["System Monitoring and Reporting Technology", "Self-Monitoring, Analysis, and Reporting Technology", "Smart Monitoring and Recovery Technology", "System Management and Recovery Technology"]'::jsonb,
 1,
 'S.M.A.R.T. monitors drive health and can predict imminent failures before they occur.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What should you do if you hear grinding noises from a computer?',
 '["Ignore it - it''s normal", "Identify the source (fan or drive) and replace if necessary", "Increase system volume", "Install sound dampening"]'::jsonb,
 1,
 'Grinding noises indicate mechanical failure in fans or hard drives requiring immediate attention.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'A system displays "Bootable device not found." What are the possible causes?',
 '["Monitor failure only", "BIOS boot order, dead drive, or corrupt OS", "Network connectivity issues", "RAM failure only"]'::jsonb,
 1,
 'This error occurs when the system can''t find a valid boot device due to configuration, hardware failure, or software corruption.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What do amber/orange LED indicators on RAID systems typically mean?',
 '["Normal operation", "Drive failure or degraded array", "High performance mode", "Power saving mode"]'::jsonb,
 1,
 'Amber/orange LEDs on RAID systems indicate failed drives or degraded arrays requiring attention.',
 'Medium',
 3),

-- Display and Video Issues Questions (16-20)
((SELECT id FROM troubleshooting_topic),
 'A monitor displays nothing but you can hear the computer boot up. What should you check FIRST?',
 '["Replace the graphics card", "Video cable connections and input source", "Install new drivers", "Replace the motherboard"]'::jsonb,
 1,
 'Start with simple checks: cable connections, monitor power, and correct input source selection.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What should you check if a projector display appears dim?',
 '["Network connectivity", "Bulb life and brightness settings", "Audio settings", "Printer drivers"]'::jsonb,
 1,
 'Dim projector images usually result from aging bulbs or incorrect brightness settings.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'A monitor displays the wrong colors (everything appears red). What is the most likely cause?',
 '["Power supply failure", "Defective video cable or loose connection", "RAM failure", "CPU overheating"]'::jsonb,
 1,
 'Color display issues often result from damaged cables or loose connections affecting specific color channels.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What causes screen burn-in on displays?',
 '["Too much brightness", "Static images displayed for extended periods", "Electrical surges", "Network interference"]'::jsonb,
 1,
 'Burn-in occurs when static images are displayed too long, permanently damaging the display phosphors or pixels.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'A projector randomly shuts down during presentations. What should you check?',
 '["Network settings", "Overheating and ventilation", "Audio levels", "Keyboard batteries"]'::jsonb,
 1,
 'Random projector shutdowns often result from overheating due to dust buildup or blocked ventilation.',
 'Medium',
 3),

-- System Performance Issues Questions (21-25)
((SELECT id FROM troubleshooting_topic),
 'What typically causes sluggish computer performance?',
 '["Too much RAM", "Insufficient memory, slow storage, or malware", "Fast internet connection", "New hardware installation"]'::jsonb,
 1,
 'Slow performance results from hardware limitations (RAM, storage) or software issues (malware, corruption).',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does a blue screen of death (BSOD) typically indicate?',
 '["Normal shutdown process", "Hardware failure or driver issues", "Successful software installation", "Network connectivity problems"]'::jsonb,
 1,
 'BSODs usually indicate serious hardware problems (RAM, CPU) or incompatible/corrupt device drivers.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'If applications crash randomly, what component should you suspect FIRST?',
 '["Network card", "Sound card", "RAM (memory)", "Optical drive"]'::jsonb,
 2,
 'Random application crashes often indicate memory errors that corrupt running programs.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What can cause capacitor swelling on a motherboard?',
 '["Normal operation", "Age, heat, or electrical stress", "Software updates", "Network traffic"]'::jsonb,
 1,
 'Capacitor swelling results from age, excessive heat, or electrical stress, often requiring motherboard replacement.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'If the system date and time are consistently incorrect, what should you replace?',
 '["Power supply", "CMOS battery", "RAM modules", "Hard drive"]'::jsonb,
 1,
 'Incorrect system time typically indicates a dead CMOS battery that can no longer maintain real-time clock settings.',
 'Easy',
 3),

-- POST and Boot Issues Questions (26-30)
((SELECT id FROM troubleshooting_topic),
 'What does POST stand for?',
 '["Power-On Self-Test", "Peripheral Operating System Test", "Primary Output System Test", "Power Output Safety Test"]'::jsonb,
 0,
 'POST checks internal hardware for compatibility and proper connection before starting the boot process.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does a single beep during POST typically indicate?',
 '["Memory failure", "System passed POST successfully", "Power supply failure", "Keyboard error"]'::jsonb,
 1,
 'A single beep (if enabled) usually indicates successful POST completion and normal boot continuation.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What do three short beeps during POST typically indicate?',
 '["CPU failure", "Memory (RAM) problems", "Power supply failure", "Normal operation"]'::jsonb,
 1,
 'Three short beeps commonly indicate memory-related issues such as failed or improperly seated RAM.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'If a system powers on but displays nothing, what should you check?',
 '["Only the monitor", "RAM seating, video connections, and POST beep codes", "Only network connections", "Only keyboard connections"]'::jsonb,
 1,
 'No display with power can indicate RAM issues, video problems, or other hardware failures indicated by beep codes.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What can cause a system to show power (fans spinning) but not boot?',
 '["Perfect system health", "Failed POST due to hardware issues", "Software updates", "Network disconnection"]'::jsonb,
 1,
 'Power without boot indicates failed POST, commonly from RAM, CPU, motherboard, or other critical hardware problems.',
 'Medium',
 3);
