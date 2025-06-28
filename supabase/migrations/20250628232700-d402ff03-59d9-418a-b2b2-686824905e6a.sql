
-- Insert Week 3 Help Desk Scenarios for PC Hardware Troubleshooting
INSERT INTO public.quiz_topics (name, description, color)
SELECT 'Week 3 Help Desk Scenarios', 'Week 3: Hardware Troubleshooting Help Desk Practice Scenarios', 'purple'
WHERE NOT EXISTS (
  SELECT 1 FROM public.quiz_topics WHERE name = 'Week 3 Help Desk Scenarios'
);

-- Insert Week 3 Help Desk scenario questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number)
SELECT 
  (SELECT id FROM public.quiz_topics WHERE name = 'Week 3 Help Desk Scenarios'),
  question_data.question,
  question_data.options::jsonb,
  question_data.correct_answer,
  question_data.explanation,
  question_data.difficulty,
  3
FROM (VALUES
  ('SCENARIO: A user calls saying their computer won''t turn on at all - no lights, no fans, nothing. What is your FIRST troubleshooting step?', '["Tell them to replace the motherboard", "Ask them to check power connections and try a different outlet", "Have them open the case immediately", "Schedule a technician visit"]', 1, 'Always start with the basics - verify power connections, wall outlet functionality, and PSU power switch before moving to complex diagnostics.', 'Easy'),
  
  ('SCENARIO: A customer reports their computer randomly shuts down only when playing games or video editing. What should you suspect?', '["Virus infection", "Hard drive failure", "Overheating issues", "Network problems"]', 2, 'Random shutdowns during intensive tasks typically indicate thermal protection engaging due to inadequate cooling or blocked vents.', 'Medium'),
  
  ('SCENARIO: User says they smell something burning from their computer. What is your immediate response?', '["Tell them to increase fan speeds", "Advise them to shut down and unplug immediately", "Have them continue working with windows open", "Ask them to spray compressed air inside"]', 1, 'A burning smell indicates potential fire hazard - immediate shutdown and disconnection is critical for safety.', 'Easy'),
  
  ('SCENARIO: Customer calls reporting clicking sounds from their computer. What should you tell them?', '["It''s normal hard drive operation", "Immediately backup important data and prepare for drive replacement", "Just ignore the sounds", "Increase system volume to mask the noise"]', 1, 'Clicking sounds typically indicate imminent hard drive failure - immediate data backup is critical before complete failure occurs.', 'Medium'),
  
  ('SCENARIO: A user reports their monitor shows nothing but they can hear Windows starting up. What''s your first troubleshooting step?', '["Replace the graphics card", "Check video cable connections and monitor input source", "Reinstall Windows", "Replace the monitor"]', 1, 'Start with simple checks - verify cable connections, monitor power, and correct input source selection before hardware replacement.', 'Easy'),
  
  ('SCENARIO: Customer says their computer screen looks very red/pink. What should you suspect?', '["CPU overheating", "RAM failure", "Video cable or connection issue", "Power supply failure"]', 2, 'Color display problems often result from damaged video cables or loose connections affecting specific color channels.', 'Medium'),
  
  ('SCENARIO: User reports their computer date and time keep resetting to wrong values. What component likely needs replacement?', '["Hard drive", "RAM memory", "CMOS battery", "Power supply"]', 2, 'Consistently incorrect system time typically indicates a dead CMOS battery that can no longer maintain real-time clock settings.', 'Easy'),
  
  ('SCENARIO: Customer calls about their computer beeping 3 times during startup and not booting. What should you suspect?', '["Normal operation", "Memory (RAM) problems", "Hard drive failure", "Power supply issues"]', 1, 'Three beeps during POST commonly indicate memory-related issues such as failed or improperly seated RAM modules.', 'Medium'),
  
  ('SCENARIO: User reports their computer starts (fans spin) but nothing appears on screen. What are the likely causes?', '["Only monitor problems", "RAM, video, or POST failure issues", "Only software problems", "Only network issues"]', 1, 'Power without display typically indicates RAM seating issues, video problems, or other hardware failures preventing successful POST.', 'Medium'),
  
  ('SCENARIO: Customer says applications keep crashing randomly on their computer. What component should you suspect first?', '["Network card", "Sound card", "RAM (memory)", "CD/DVD drive"]', 2, 'Random application crashes often indicate memory corruption or instability affecting running programs.', 'Medium'),
  
  ('SCENARIO: User cannot access BIOS setup on their new computer. What key should you tell them to try?', '["F8 only", "F2 or Delete key", "F12 only", "Ctrl+Alt+Del"]', 1, 'F2 and Delete are the most common keys for BIOS/UEFI access, though it varies by manufacturer.', 'Easy'),
  
  ('SCENARIO: Customer reports their projector keeps shutting down during presentations. What should you ask about?', '["Internet connection", "Ventilation and dust buildup", "Audio settings", "Keyboard batteries"]', 1, 'Random projector shutdowns often result from overheating due to dust accumulation or blocked ventilation.', 'Medium'),
  
  ('SCENARIO: User calls saying their computer is very slow and applications take forever to load. What are the most likely causes?', '["Too much storage space", "Insufficient RAM, slow storage, or malware", "Too fast internet", "New hardware"]', 1, 'Sluggish performance typically results from hardware limitations (RAM, storage) or software issues (malware, corruption).', 'Easy'),
  
  ('SCENARIO: Customer reports getting blue screen errors (BSOD) frequently. What should you suspect?', '["Normal Windows operation", "Hardware failure or driver issues", "Successful software installation", "Good system health"]', 1, 'Blue screens usually indicate serious hardware problems (memory, CPU) or incompatible/corrupt device drivers.', 'Medium'),
  
  ('SCENARIO: User says their computer won''t boot and shows "Bootable device not found." What should you check?', '["Only the monitor", "Boot order, drive health, or OS corruption", "Only network cables", "Only keyboard connection"]', 1, 'This error indicates the system cannot find a valid boot device due to configuration, hardware failure, or software corruption.', 'Medium')
) AS question_data(question, options, correct_answer, explanation, difficulty)
WHERE NOT EXISTS (
  SELECT 1 FROM public.practice_questions p 
  WHERE p.question = question_data.question 
  AND p.topic_id = (SELECT id FROM public.quiz_topics WHERE name = 'Week 3 Help Desk Scenarios')
  AND p.week_number = 3
);
