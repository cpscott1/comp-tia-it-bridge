
import { supabase } from '@/integrations/supabase/client';

export const restoreWeek3QuizQuestions = async () => {
  // Get the troubleshooting topic ID
  const { data: topic } = await supabase
    .from('quiz_topics')
    .select('id')
    .eq('name', 'PC Hardware Troubleshooting')
    .single();

  if (!topic) {
    throw new Error('Troubleshooting topic not found');
  }

  // Check existing questions to avoid duplicates
  const { data: existingQuestions } = await supabase
    .from('practice_questions')
    .select('question')
    .eq('topic_id', topic.id)
    .eq('week_number', 3);

  const existingQuestionTexts = existingQuestions?.map(q => q.question) || [];

  // All 30 original questions
  const allQuestions = [
    // BIOS/UEFI Configuration Questions (1-5)
    {
      question: 'What key is commonly pressed during boot to access the BIOS/UEFI setup utility?',
      options: ['F1', 'F2 or Delete', 'F8', 'F12'],
      correct_answer: 1,
      explanation: 'F2 and Delete are the most common keys to access BIOS/UEFI setup, though it varies by manufacturer.',
      difficulty: 'Easy'
    },
    {
      question: 'What does UEFI stand for?',
      options: ['Universal Extensible Firmware Interface', 'Unified Extensible Firmware Interface', 'Universal Extended Firmware Interface', 'Unified Extended Firmware Interface'],
      correct_answer: 1,
      explanation: 'UEFI is the modern replacement for traditional BIOS with enhanced features and capabilities.',
      difficulty: 'Easy'
    },
    {
      question: 'Which UEFI feature prevents untrusted code from running during boot?',
      options: ['Fast Boot', 'Secure Boot', 'Boot Guard', 'Trusted Boot'],
      correct_answer: 1,
      explanation: 'Secure Boot uses cryptographic keys to verify that boot code is trusted and hasn\'t been tampered with.',
      difficulty: 'Medium'
    },
    {
      question: 'What type of battery typically powers the CMOS to maintain BIOS settings?',
      options: ['AAA alkaline', 'CR2032 coin cell', '9V battery', 'Rechargeable lithium'],
      correct_answer: 1,
      explanation: 'CR2032 coin cell batteries provide power to maintain CMOS settings when the system is powered off.',
      difficulty: 'Easy'
    },
    {
      question: 'What happens when the CMOS battery dies?',
      options: ['The computer won\'t boot', 'CMOS settings reset to defaults', 'The hard drive is erased', 'The operating system becomes corrupt'],
      correct_answer: 1,
      explanation: 'Without battery power, volatile CMOS memory loses custom settings and reverts to factory defaults.',
      difficulty: 'Medium'
    },
    // Power Issues Troubleshooting Questions (6-10)
    {
      question: 'A computer shows no signs of power when the power button is pressed. What should you check FIRST?',
      options: ['The motherboard', 'The CPU', 'Power connections and outlet', 'The RAM'],
      correct_answer: 2,
      explanation: 'Always start with the most basic checks: power cord connections, outlet functionality, and PSU switch position.',
      difficulty: 'Easy'
    },
    {
      question: 'What does a burning smell from a computer case typically indicate?',
      options: ['Normal operation', 'Power supply failure', 'Hard drive failure', 'RAM overheating'],
      correct_answer: 1,
      explanation: 'A burning smell usually indicates electrical component failure, most commonly the power supply unit.',
      difficulty: 'Medium'
    },
    {
      question: 'What should you do immediately if you smell something burning from a computer?',
      options: ['Continue working but open windows', 'Shut down and unplug the system immediately', 'Increase fan speeds', 'Apply thermal paste'],
      correct_answer: 1,
      explanation: 'A burning smell indicates potential fire hazard - immediately power down and disconnect to prevent damage or injury.',
      difficulty: 'Easy'
    },
    {
      question: 'A computer randomly shuts down during intensive tasks but works fine for basic operations. What is the most likely cause?',
      options: ['Virus infection', 'Bad RAM', 'Overheating', 'Network issues'],
      correct_answer: 2,
      explanation: 'Random shutdowns during high-load tasks typically indicate thermal protection engaging due to overheating.',
      difficulty: 'Medium'
    },
    {
      question: 'What does intermittent shutdown usually indicate?',
      options: ['Perfect system health', 'Heat issues or failing components', 'Software updates needed', 'Normal power saving mode'],
      correct_answer: 1,
      explanation: 'Intermittent shutdowns often result from overheating, failing memory, or power supply instability.',
      difficulty: 'Medium'
    },
    // Storage Device Troubleshooting Questions (11-15)
    {
      question: 'What do clicking sounds from inside a computer case typically indicate?',
      options: ['Normal hard drive operation', 'Failing or dead hard drive', 'CPU fan issues', 'Power supply problems'],
      correct_answer: 1,
      explanation: 'Clicking sounds usually indicate mechanical failure in hard drives - immediate data backup is critical.',
      difficulty: 'Medium'
    },
    {
      question: 'What does S.M.A.R.T. stand for?',
      options: ['System Monitoring and Reporting Technology', 'Self-Monitoring, Analysis, and Reporting Technology', 'Smart Monitoring and Recovery Technology', 'System Management and Recovery Technology'],
      correct_answer: 1,
      explanation: 'S.M.A.R.T. monitors drive health and can predict imminent failures before they occur.',
      difficulty: 'Easy'
    },
    {
      question: 'What should you do if you hear grinding noises from a computer?',
      options: ['Ignore it - it\'s normal', 'Identify the source (fan or drive) and replace if necessary', 'Increase system volume', 'Install sound dampening'],
      correct_answer: 1,
      explanation: 'Grinding noises indicate mechanical failure in fans or hard drives requiring immediate attention.',
      difficulty: 'Easy'
    },
    {
      question: 'A system displays "Bootable device not found." What are the possible causes?',
      options: ['Monitor failure only', 'BIOS boot order, dead drive, or corrupt OS', 'Network connectivity issues', 'RAM failure only'],
      correct_answer: 1,
      explanation: 'This error occurs when the system can\'t find a valid boot device due to configuration, hardware failure, or software corruption.',
      difficulty: 'Medium'
    },
    {
      question: 'What do amber/orange LED indicators on RAID systems typically mean?',
      options: ['Normal operation', 'Drive failure or degraded array', 'High performance mode', 'Power saving mode'],
      correct_answer: 1,
      explanation: 'Amber/orange LEDs on RAID systems indicate failed drives or degraded arrays requiring attention.',
      difficulty: 'Medium'
    },
    // Display and Video Issues Questions (16-20)
    {
      question: 'A monitor displays nothing but you can hear the computer boot up. What should you check FIRST?',
      options: ['Replace the graphics card', 'Video cable connections and input source', 'Install new drivers', 'Replace the motherboard'],
      correct_answer: 1,
      explanation: 'Start with simple checks: cable connections, monitor power, and correct input source selection.',
      difficulty: 'Easy'
    },
    {
      question: 'What should you check if a projector display appears dim?',
      options: ['Network connectivity', 'Bulb life and brightness settings', 'Audio settings', 'Printer drivers'],
      correct_answer: 1,
      explanation: 'Dim projector images usually result from aging bulbs or incorrect brightness settings.',
      difficulty: 'Easy'
    },
    {
      question: 'A monitor displays the wrong colors (everything appears red). What is the most likely cause?',
      options: ['Power supply failure', 'Defective video cable or loose connection', 'RAM failure', 'CPU overheating'],
      correct_answer: 1,
      explanation: 'Color display issues often result from damaged cables or loose connections affecting specific color channels.',
      difficulty: 'Medium'
    },
    {
      question: 'What causes screen burn-in on displays?',
      options: ['Too much brightness', 'Static images displayed for extended periods', 'Electrical surges', 'Network interference'],
      correct_answer: 1,
      explanation: 'Burn-in occurs when static images are displayed too long, permanently damaging the display phosphors or pixels.',
      difficulty: 'Easy'
    },
    {
      question: 'A projector randomly shuts down during presentations. What should you check?',
      options: ['Network settings', 'Overheating and ventilation', 'Audio levels', 'Keyboard batteries'],
      correct_answer: 1,
      explanation: 'Random projector shutdowns often result from overheating due to dust buildup or blocked ventilation.',
      difficulty: 'Medium'
    },
    // System Performance Issues Questions (21-25)
    {
      question: 'What typically causes sluggish computer performance?',
      options: ['Too much RAM', 'Insufficient memory, slow storage, or malware', 'Fast internet connection', 'New hardware installation'],
      correct_answer: 1,
      explanation: 'Slow performance results from hardware limitations (RAM, storage) or software issues (malware, corruption).',
      difficulty: 'Easy'
    },
    {
      question: 'What does a blue screen of death (BSOD) typically indicate?',
      options: ['Normal shutdown process', 'Hardware failure or driver issues', 'Successful software installation', 'Network connectivity problems'],
      correct_answer: 1,
      explanation: 'BSODs usually indicate serious hardware problems (RAM, CPU) or incompatible/corrupt device drivers.',
      difficulty: 'Medium'
    },
    {
      question: 'If applications crash randomly, what component should you suspect FIRST?',
      options: ['Network card', 'Sound card', 'RAM (memory)', 'Optical drive'],
      correct_answer: 2,
      explanation: 'Random application crashes often indicate memory errors that corrupt running programs.',
      difficulty: 'Medium'
    },
    {
      question: 'What can cause capacitor swelling on a motherboard?',
      options: ['Normal operation', 'Age, heat, or electrical stress', 'Software updates', 'Network traffic'],
      correct_answer: 1,
      explanation: 'Capacitor swelling results from age, excessive heat, or electrical stress, often requiring motherboard replacement.',
      difficulty: 'Medium'
    },
    {
      question: 'If the system date and time are consistently incorrect, what should you replace?',
      options: ['Power supply', 'CMOS battery', 'RAM modules', 'Hard drive'],
      correct_answer: 1,
      explanation: 'Incorrect system time typically indicates a dead CMOS battery that can no longer maintain real-time clock settings.',
      difficulty: 'Easy'
    },
    // POST and Boot Issues Questions (26-30)
    {
      question: 'What does POST stand for?',
      options: ['Power-On Self-Test', 'Peripheral Operating System Test', 'Primary Output System Test', 'Power Output Safety Test'],
      correct_answer: 0,
      explanation: 'POST checks internal hardware for compatibility and proper connection before starting the boot process.',
      difficulty: 'Easy'
    },
    {
      question: 'What does a single beep during POST typically indicate?',
      options: ['Memory failure', 'System passed POST successfully', 'Power supply failure', 'Keyboard error'],
      correct_answer: 1,
      explanation: 'A single beep (if enabled) usually indicates successful POST completion and normal boot continuation.',
      difficulty: 'Easy'
    },
    {
      question: 'What do three short beeps during POST typically indicate?',
      options: ['CPU failure', 'Memory (RAM) problems', 'Power supply failure', 'Normal operation'],
      correct_answer: 1,
      explanation: 'Three short beeps commonly indicate memory-related issues such as failed or improperly seated RAM.',
      difficulty: 'Medium'
    },
    {
      question: 'If a system powers on but displays nothing, what should you check?',
      options: ['Only the monitor', 'RAM seating, video connections, and POST beep codes', 'Only network connections', 'Only keyboard connections'],
      correct_answer: 1,
      explanation: 'No display with power can indicate RAM issues, video problems, or other hardware failures indicated by beep codes.',
      difficulty: 'Medium'
    },
    {
      question: 'What can cause a system to show power (fans spinning) but not boot?',
      options: ['Perfect system health', 'Failed POST due to hardware issues', 'Software updates', 'Network disconnection'],
      correct_answer: 1,
      explanation: 'Power without boot indicates failed POST, commonly from RAM, CPU, motherboard, or other critical hardware problems.',
      difficulty: 'Medium'
    }
  ];

  // Filter out questions that already exist
  const questionsToInsert = allQuestions.filter(q => 
    !existingQuestionTexts.includes(q.question)
  ).map(q => ({
    topic_id: topic.id,
    question: q.question,
    options: q.options,
    correct_answer: q.correct_answer,
    explanation: q.explanation,
    difficulty: q.difficulty,
    week_number: 3
  }));

  if (questionsToInsert.length === 0) {
    console.log('All questions already exist');
    return { success: true, message: 'All questions already exist' };
  }

  // Insert the missing questions
  const { error } = await supabase
    .from('practice_questions')
    .insert(questionsToInsert);

  if (error) {
    throw error;
  }

  console.log(`Added ${questionsToInsert.length} missing questions`);
  return { success: true, message: `Added ${questionsToInsert.length} questions` };
};
