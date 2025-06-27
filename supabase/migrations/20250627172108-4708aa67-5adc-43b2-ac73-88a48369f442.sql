
-- Insert Week 3 Study Reference flashcards
-- Get the topic ID for troubleshooting (should exist from previous migration)
WITH troubleshooting_topic AS (
  SELECT id FROM quiz_topics WHERE name = 'PC Hardware Troubleshooting'
)

-- Insert Week 3 study reference flashcards
INSERT INTO practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) VALUES

-- Essential Acronyms
((SELECT id FROM troubleshooting_topic),
 'What does BIOS stand for?',
 '["Basic Input/Output System", "Binary Input/Output System", "Basic Integrated Operating System", "Binary Integrated Operating System"]'::jsonb,
 0,
 'BIOS stands for Basic Input/Output System - firmware that initializes hardware during boot process.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does UEFI stand for?',
 '["Universal Extensible Firmware Interface", "Unified Extensible Firmware Interface", "Universal Extended Firmware Interface", "Unified Extended Firmware Interface"]'::jsonb,
 1,
 'UEFI stands for Unified Extensible Firmware Interface - modern replacement for traditional BIOS.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does CMOS stand for?',
 '["Complementary Metal-Oxide Semiconductor", "Complex Metal-Oxide Semiconductor", "Complementary Memory-Oxide Semiconductor", "Complex Memory-Oxide Semiconductor"]'::jsonb,
 0,
 'CMOS stands for Complementary Metal-Oxide Semiconductor - low-power memory that stores BIOS settings.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does POST stand for?',
 '["Power-On Self-Test", "Peripheral Operating System Test", "Primary Output System Test", "Power Output Safety Test"]'::jsonb,
 0,
 'POST stands for Power-On Self-Test - diagnostic tests run during system startup.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does BSOD stand for?',
 '["Blue Screen of Death", "Basic System Operating Disorder", "Binary System Output Diagnostic", "Boot System Operation Delay"]'::jsonb,
 0,
 'BSOD stands for Blue Screen of Death - Windows error screen indicating serious system problems.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does S.M.A.R.T. stand for?',
 '["System Monitoring and Reporting Technology", "Self-Monitoring, Analysis, and Reporting Technology", "Smart Monitoring and Recovery Technology", "System Management and Recovery Technology"]'::jsonb,
 1,
 'S.M.A.R.T. stands for Self-Monitoring, Analysis, and Reporting Technology - monitors drive health.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does TPM stand for?',
 '["Trusted Platform Module", "Total Performance Monitor", "Thermal Protection Module", "Time Processing Module"]'::jsonb,
 0,
 'TPM stands for Trusted Platform Module - hardware security chip for encryption and authentication.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does RTC stand for?',
 '["Real-Time Clock", "Remote Terminal Control", "Rapid Transfer Control", "Random Time Counter"]'::jsonb,
 0,
 'RTC stands for Real-Time Clock - maintains system date and time when powered off.',
 'Easy',
 3),

-- BIOS/UEFI Settings
((SELECT id FROM troubleshooting_topic),
 'What does Boot Device Priority control in BIOS/UEFI?',
 '["Fan speeds", "Boot order sequence", "Memory timing", "CPU voltage"]'::jsonb,
 1,
 'Boot Device Priority controls the order in which the system attempts to boot from different devices.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What is the purpose of Secure Boot in UEFI?',
 '["Faster boot times", "Prevents unauthorized code execution", "Reduces power consumption", "Improves graphics performance"]'::jsonb,
 1,
 'Secure Boot prevents unauthorized or malicious code from running during the boot process.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does enabling Virtualization Support in BIOS/UEFI allow?',
 '["Faster internet speeds", "VM capabilities", "Better graphics", "Increased storage"]'::jsonb,
 1,
 'Virtualization Support enables the CPU features needed to run virtual machines effectively.',
 'Medium',
 3),

-- POST Beep Codes
((SELECT id FROM troubleshooting_topic),
 'What does 1 beep during POST typically indicate?',
 '["Memory failure", "Normal POST success", "Video card failure", "Power supply failure"]'::jsonb,
 1,
 'One beep during POST typically indicates normal, successful completion of Power-On Self-Test.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What do 3 beeps during POST commonly indicate?',
 '["Normal operation", "Memory failure", "CPU failure", "Hard drive failure"]'::jsonb,
 1,
 'Three beeps during POST commonly indicate memory (RAM) failure or configuration problems.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What does continuous beeping during POST indicate?',
 '["Normal operation", "Memory not detected", "CPU overheating", "Power supply failure"]'::jsonb,
 1,
 'Continuous beeping during POST typically indicates memory is not detected or properly seated.',
 'Medium',
 3),

-- Storage Troubleshooting
((SELECT id FROM troubleshooting_topic),
 'What do clicking sounds from a hard drive indicate?',
 '["Normal operation", "Mechanical failure", "Power saving mode", "Fast data transfer"]'::jsonb,
 1,
 'Clicking sounds from hard drives indicate mechanical failure and potential imminent drive failure.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What do amber/orange LEDs on RAID systems typically indicate?',
 '["Normal operation", "RAID array problems", "High performance", "Power saving mode"]'::jsonb,
 1,
 'Amber/orange LEDs on RAID systems typically indicate drive failures or degraded array status.',
 'Medium',
 3),

-- Temperature Monitoring
((SELECT id FROM troubleshooting_topic),
 'What is the normal CPU temperature range under load?',
 '["20-40°C", "40-70°C", "80-100°C", "100-120°C"]'::jsonb,
 1,
 'Normal CPU temperature under load is typically 40-70°C, varying by processor model.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'At what temperature does CPU thermal throttling typically begin?',
 '["60°C", "70°C", "80°C+", "90°C"]'::jsonb,
 2,
 'CPU thermal throttling typically begins around 80°C to protect the processor from damage.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'At what temperature range does thermal protection cause system shutdown?',
 '["70-80°C", "80-90°C", "90-100°C", "100-110°C"]'::jsonb,
 2,
 'Thermal protection typically causes system shutdown at 90-100°C to prevent permanent damage.',
 'Hard',
 3),

-- Power Issue Troubleshooting
((SELECT id FROM troubleshooting_topic),
 'What should you check FIRST when troubleshooting power issues?',
 '["Replace motherboard", "Power connections and outlet", "Install new RAM", "Update BIOS"]'::jsonb,
 1,
 'Always start with basic checks: power connections, outlet functionality, and PSU switch position.',
 'Easy',
 3),

-- Performance Problem Indicators
((SELECT id FROM troubleshooting_topic),
 'What commonly causes sluggish system response?',
 '["Too much storage", "RAM, storage, or malware issues", "Fast internet", "New hardware"]'::jsonb,
 1,
 'Sluggish response typically results from insufficient RAM, slow storage, or malware infections.',
 'Easy',
 3),

((SELECT id FROM troubleshooting_topic),
 'What do random application crashes typically indicate?',
 '["Normal operation", "Memory problems or overheating", "Fast performance", "Good cooling"]'::jsonb,
 1,
 'Random crashes typically indicate memory corruption, overheating, or hardware instability.',
 'Medium',
 3),

((SELECT id FROM troubleshooting_topic),
 'What causes automatic system shutdowns during intensive tasks?',
 '["Power saving mode", "Thermal protection or PSU issues", "Normal operation", "Software updates"]'::jsonb,
 1,
 'Automatic shutdowns during intensive tasks typically indicate thermal protection activation or PSU problems.',
 'Medium',
 3),

-- Display Issue Quick Checks
((SELECT id FROM troubleshooting_topic),
 'What should you check FIRST for display issues?',
 '["Replace graphics card", "Monitor power and cable connections", "Reinstall Windows", "Replace motherboard"]'::jsonb,
 1,
 'Start with basic checks: monitor power, cable connections, and correct input source selection.',
 'Easy',
 3);
