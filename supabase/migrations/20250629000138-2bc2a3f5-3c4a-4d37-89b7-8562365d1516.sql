
-- Insert Week 2 Help Desk Scenario flashcards into the database
INSERT INTO public.flashcards (topic_id, front, back, difficulty, week_number) VALUES
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Customer says: "My computer won''t turn on at all. I was working yesterday and everything was fine, but this morning when I press the power button, nothing happens. No lights, no fans, completely dead." What should you recommend?',
  'Ask them to check power connections and try a different outlet. When a system shows no signs of power, first check the most basic power-related issues before diagnosing component failures.',
  'Easy',
  2
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Customer says: "My computer keeps shutting down randomly, especially when I''m playing games or using video editing software. It works fine for basic tasks like web browsing and email." What should you suggest?',
  'Recommend checking cooling system and cleaning dust. Random shutdowns during intensive tasks typically indicate overheating. The thermal protection system shuts down to prevent damage.',
  'Medium',
  2
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Customer says: "I just installed new RAM in my computer, but now it won''t boot. The fans spin up but I don''t get any display, and I hear three short beeps when I turn it on." What should you recommend?',
  'Ask them to reseat the RAM and check compatibility. Three beeps typically indicate memory issues. The RAM may not be seated properly or may be incompatible with the system.',
  'Medium',
  2
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Customer says: "I installed a new SSD in my computer, but it''s not showing up in Windows. The old hard drive still works fine, but the computer doesn''t seem to recognize the new SSD at all." What should you guide them to do?',
  'Guide them to check BIOS settings and disk management. New drives often need to be initialized in Disk Management, and BIOS/UEFI settings may need adjustment to detect the drive.',
  'Medium',
  2
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Customer says: "I''m building my first computer and I think I may have installed the CPU wrong. The system powers on, all the fans spin, but I don''t get any display and I hear one long beep followed by two short beeps." What should you suggest?',
  'Suggest they check CPU installation and seating. One long beep followed by two short beeps typically indicates CPU issues. The processor may not be properly seated or installed correctly.',
  'Hard',
  2
);
