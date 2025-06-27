
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

  // The 3 missing questions that need to be added
  const missingQuestions = [
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
    }
  ];

  // Filter out questions that already exist
  const questionsToInsert = missingQuestions.filter(q => 
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
    console.log('All 30 questions already exist');
    return { success: true, message: 'All 30 questions already exist' };
  }

  // Insert the missing questions
  const { error } = await supabase
    .from('practice_questions')
    .insert(questionsToInsert);

  if (error) {
    console.error('Error inserting questions:', error);
    throw error;
  }

  console.log(`Added ${questionsToInsert.length} missing questions`);
  return { success: true, message: `Added ${questionsToInsert.length} questions` };
};
