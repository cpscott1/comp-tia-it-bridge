
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

  // Insert the missing quiz questions
  const { error } = await supabase
    .from('practice_questions')
    .insert([
      // BIOS/UEFI Configuration Questions
      {
        topic_id: topic.id,
        question: 'What key is commonly pressed during boot to access the BIOS/UEFI setup utility?',
        options: ['F1', 'F2 or Delete', 'F8', 'F12'],
        correct_answer: 1,
        explanation: 'F2 and Delete are the most common keys to access BIOS/UEFI setup, though it varies by manufacturer.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'Which UEFI feature prevents untrusted code from running during boot?',
        options: ['Fast Boot', 'Secure Boot', 'Boot Guard', 'Trusted Boot'],
        correct_answer: 1,
        explanation: 'Secure Boot uses cryptographic keys to verify that boot code is trusted and hasn\'t been tampered with.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What type of battery typically powers the CMOS to maintain BIOS settings?',
        options: ['AAA alkaline', 'CR2032 coin cell', '9V battery', 'Rechargeable lithium'],
        correct_answer: 1,
        explanation: 'CR2032 coin cell batteries provide power to maintain CMOS settings when the system is powered off.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What happens when the CMOS battery dies?',
        options: ['The computer won\'t boot', 'CMOS settings reset to defaults', 'The hard drive is erased', 'The operating system becomes corrupt'],
        correct_answer: 1,
        explanation: 'Without battery power, volatile CMOS memory loses custom settings and reverts to factory defaults.',
        difficulty: 'Medium',
        week_number: 3
      },
      // Power Issues Questions
      {
        topic_id: topic.id,
        question: 'What does a burning smell from a computer case typically indicate?',
        options: ['Normal operation', 'Power supply failure', 'Hard drive failure', 'RAM overheating'],
        correct_answer: 1,
        explanation: 'A burning smell usually indicates electrical component failure, most commonly the power supply unit.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What should you do immediately if you smell something burning from a computer?',
        options: ['Continue working but open windows', 'Shut down and unplug the system immediately', 'Increase fan speeds', 'Apply thermal paste'],
        correct_answer: 1,
        explanation: 'A burning smell indicates potential fire hazard - immediately power down and disconnect to prevent damage or injury.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What does intermittent shutdown usually indicate?',
        options: ['Perfect system health', 'Heat issues or failing components', 'Software updates needed', 'Normal power saving mode'],
        correct_answer: 1,
        explanation: 'Intermittent shutdowns often result from overheating, failing memory, or power supply instability.',
        difficulty: 'Medium',
        week_number: 3
      },
      // Storage Questions
      {
        topic_id: topic.id,
        question: 'What should you do if you hear grinding noises from a computer?',
        options: ['Ignore it - it\'s normal', 'Identify the source (fan or drive) and replace if necessary', 'Increase system volume', 'Install sound dampening'],
        correct_answer: 1,
        explanation: 'Grinding noises indicate mechanical failure in fans or hard drives requiring immediate attention.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'A system displays "Bootable device not found." What are the possible causes?',
        options: ['Monitor failure only', 'BIOS boot order, dead drive, or corrupt OS', 'Network connectivity issues', 'RAM failure only'],
        correct_answer: 1,
        explanation: 'This error occurs when the system can\'t find a valid boot device due to configuration, hardware failure, or software corruption.',
        difficulty: 'Medium',
        week_number: 3
      },
      // Display Questions
      {
        topic_id: topic.id,
        question: 'What should you check if a projector display appears dim?',
        options: ['Network connectivity', 'Bulb life and brightness settings', 'Audio settings', 'Printer drivers'],
        correct_answer: 1,
        explanation: 'Dim projector images usually result from aging bulbs or incorrect brightness settings.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'A monitor displays the wrong colors (everything appears red). What is the most likely cause?',
        options: ['Power supply failure', 'Defective video cable or loose connection', 'RAM failure', 'CPU overheating'],
        correct_answer: 1,
        explanation: 'Color display issues often result from damaged cables or loose connections affecting specific color channels.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What causes screen burn-in on displays?',
        options: ['Too much brightness', 'Static images displayed for extended periods', 'Electrical surges', 'Network interference'],
        correct_answer: 1,
        explanation: 'Burn-in occurs when static images are displayed too long, permanently damaging the display phosphors or pixels.',
        difficulty: 'Easy',
        week_number: 3
      },
      // Performance Questions
      {
        topic_id: topic.id,
        question: 'What does a blue screen of death (BSOD) typically indicate?',
        options: ['Normal shutdown process', 'Hardware failure or driver issues', 'Successful software installation', 'Network connectivity problems'],
        correct_answer: 1,
        explanation: 'BSODs usually indicate serious hardware problems (RAM, CPU) or incompatible/corrupt device drivers.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What can cause capacitor swelling on a motherboard?',
        options: ['Normal operation', 'Age, heat, or electrical stress', 'Software updates', 'Network traffic'],
        correct_answer: 1,
        explanation: 'Capacitor swelling results from age, excessive heat, or electrical stress, often requiring motherboard replacement.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'If the system date and time are consistently incorrect, what should you replace?',
        options: ['Power supply', 'CMOS battery', 'RAM modules', 'Hard drive'],
        correct_answer: 1,
        explanation: 'Incorrect system time typically indicates a dead CMOS battery that can no longer maintain real-time clock settings.',
        difficulty: 'Easy',
        week_number: 3
      },
      // POST Questions
      {
        topic_id: topic.id,
        question: 'What does a single beep during POST typically indicate?',
        options: ['Memory failure', 'System passed POST successfully', 'Power supply failure', 'Keyboard error'],
        correct_answer: 1,
        explanation: 'A single beep (if enabled) usually indicates successful POST completion and normal boot continuation.',
        difficulty: 'Easy',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What do three short beeps during POST typically indicate?',
        options: ['CPU failure', 'Memory (RAM) problems', 'Power supply failure', 'Normal operation'],
        correct_answer: 1,
        explanation: 'Three short beeps commonly indicate memory-related issues such as failed or improperly seated RAM.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'If a system powers on but displays nothing, what should you check?',
        options: ['Only the monitor', 'RAM seating, video connections, and POST beep codes', 'Only network connections', 'Only keyboard connections'],
        correct_answer: 1,
        explanation: 'No display with power can indicate RAM issues, video problems, or other hardware failures indicated by beep codes.',
        difficulty: 'Medium',
        week_number: 3
      },
      {
        topic_id: topic.id,
        question: 'What can cause a system to show power (fans spinning) but not boot?',
        options: ['Perfect system health', 'Failed POST due to hardware issues', 'Software updates', 'Network disconnection'],
        correct_answer: 1,
        explanation: 'Power without boot indicates failed POST, commonly from RAM, CPU, motherboard, or other critical hardware problems.',
        difficulty: 'Medium',
        week_number: 3
      }
    ]);

  if (error) {
    throw error;
  }

  return { success: true };
};
