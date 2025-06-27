
-- Create a separate table for flashcard-only content
CREATE TABLE public.flashcards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  topic_id UUID REFERENCES public.quiz_topics(id) NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Easy',
  week_number INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Move the 23 study reference items from practice_questions to flashcards table
-- Get the topic ID for troubleshooting
WITH troubleshooting_topic AS (
  SELECT id FROM quiz_topics WHERE name = 'PC Hardware Troubleshooting'
),
-- Insert the flashcard content
flashcard_inserts AS (
  INSERT INTO flashcards (topic_id, front, back, difficulty, week_number) VALUES
  ((SELECT id FROM troubleshooting_topic), 'What does BIOS stand for?', 'BIOS stands for Basic Input/Output System - firmware that initializes hardware during boot process.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does UEFI stand for?', 'UEFI stands for Unified Extensible Firmware Interface - modern replacement for traditional BIOS.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does CMOS stand for?', 'CMOS stands for Complementary Metal-Oxide Semiconductor - low-power memory that stores BIOS settings.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does POST stand for?', 'POST stands for Power-On Self-Test - diagnostic tests run during system startup.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does BSOD stand for?', 'BSOD stands for Blue Screen of Death - Windows error screen indicating serious system problems.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does S.M.A.R.T. stand for?', 'S.M.A.R.T. stands for Self-Monitoring, Analysis, and Reporting Technology - monitors drive health.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does TPM stand for?', 'TPM stands for Trusted Platform Module - hardware security chip for encryption and authentication.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does RTC stand for?', 'RTC stands for Real-Time Clock - maintains system date and time when powered off.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does Boot Device Priority control in BIOS/UEFI?', 'Boot Device Priority controls the order in which the system attempts to boot from different devices.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What is the purpose of Secure Boot in UEFI?', 'Secure Boot prevents unauthorized or malicious code from running during the boot process.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does enabling Virtualization Support in BIOS/UEFI allow?', 'Virtualization Support enables the CPU features needed to run virtual machines effectively.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does 1 beep during POST typically indicate?', 'One beep during POST typically indicates normal, successful completion of Power-On Self-Test.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What do 3 beeps during POST commonly indicate?', 'Three beeps during POST commonly indicate memory (RAM) failure or configuration problems.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What does continuous beeping during POST indicate?', 'Continuous beeping during POST typically indicates memory is not detected or properly seated.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What do clicking sounds from a hard drive indicate?', 'Clicking sounds from hard drives indicate mechanical failure and potential imminent drive failure.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What do amber/orange LEDs on RAID systems typically indicate?', 'Amber/orange LEDs on RAID systems typically indicate drive failures or degraded array status.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What is the normal CPU temperature range under load?', 'Normal CPU temperature under load is typically 40-70°C, varying by processor model.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'At what temperature does CPU thermal throttling typically begin?', 'CPU thermal throttling typically begins around 80°C to protect the processor from damage.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'At what temperature range does thermal protection cause system shutdown?', 'Thermal protection typically causes system shutdown at 90-100°C to prevent permanent damage.', 'Hard', 3),
  ((SELECT id FROM troubleshooting_topic), 'What should you check FIRST when troubleshooting power issues?', 'Always start with basic checks: power connections, outlet functionality, and PSU switch position.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What commonly causes sluggish system response?', 'Sluggish response typically results from insufficient RAM, slow storage, or malware infections.', 'Easy', 3),
  ((SELECT id FROM troubleshooting_topic), 'What do random application crashes typically indicate?', 'Random crashes typically indicate memory corruption, overheating, or hardware instability.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What causes automatic system shutdowns during intensive tasks?', 'Automatic shutdowns during intensive tasks typically indicate thermal protection activation or PSU problems.', 'Medium', 3),
  ((SELECT id FROM troubleshooting_topic), 'What should you check FIRST for display issues?', 'Start with basic checks: monitor power, cable connections, and correct input source selection.', 'Easy', 3)
  RETURNING id
)
-- Delete the corresponding questions from practice_questions that were just added
DELETE FROM practice_questions 
WHERE topic_id = (SELECT id FROM troubleshooting_topic)
  AND week_number = 3
  AND created_at > (now() - interval '1 hour')
  AND question IN (
    'What does BIOS stand for?',
    'What does UEFI stand for?',
    'What does CMOS stand for?',
    'What does POST stand for?',
    'What does BSOD stand for?',
    'What does S.M.A.R.T. stand for?',
    'What does TPM stand for?',
    'What does RTC stand for?',
    'What does Boot Device Priority control in BIOS/UEFI?',
    'What is the purpose of Secure Boot in UEFI?',
    'What does enabling Virtualization Support in BIOS/UEFI allow?',
    'What does 1 beep during POST typically indicate?',
    'What do 3 beeps during POST commonly indicate?',
    'What does continuous beeping during POST indicate?',
    'What do clicking sounds from a hard drive indicate?',
    'What do amber/orange LEDs on RAID systems typically indicate?',
    'What is the normal CPU temperature range under load?',
    'At what temperature does CPU thermal throttling typically begin?',
    'At what temperature range does thermal protection cause system shutdown?',
    'What should you check FIRST when troubleshooting power issues?',
    'What commonly causes sluggish system response?',
    'What do random application crashes typically indicate?',
    'What causes automatic system shutdowns during intensive tasks?',
    'What should you check FIRST for display issues?'
  );
