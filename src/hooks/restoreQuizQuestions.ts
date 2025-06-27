
import { supabase } from '@/integrations/supabase/client';

export const restoreWeek3QuizQuestions = async () => {
  console.log('Starting Week 3 quiz questions restoration...');
  
  // Get the troubleshooting topic ID
  const { data: topic, error: topicError } = await supabase
    .from('quiz_topics')
    .select('id')
    .eq('name', 'PC Hardware Troubleshooting')
    .single();

  if (topicError || !topic) {
    console.error('Error finding troubleshooting topic:', topicError);
    throw new Error('Troubleshooting topic not found');
  }

  console.log('Found topic:', topic);

  // Check existing questions to avoid duplicates
  const { data: existingQuestions, error: existingError } = await supabase
    .from('practice_questions')
    .select('question')
    .eq('topic_id', topic.id)
    .eq('week_number', 3);

  if (existingError) {
    console.error('Error fetching existing questions:', existingError);
  }

  const existingQuestionTexts = existingQuestions?.map(q => q.question) || [];
  console.log('Found existing questions:', existingQuestionTexts.length);

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

  console.log('Questions to insert:', questionsToInsert.length);

  if (questionsToInsert.length === 0) {
    console.log('All questions already exist');
    return { success: true, message: 'All questions already exist' };
  }

  // Check current user session
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  console.log('Current user:', user?.id, 'Error:', userError);

  // Insert the missing questions
  const { data: insertedData, error: insertError } = await supabase
    .from('practice_questions')
    .insert(questionsToInsert)
    .select();

  if (insertError) {
    console.error('Error inserting questions:', insertError);
    throw insertError;
  }

  console.log(`Successfully added ${questionsToInsert.length} missing questions`);
  console.log('Inserted data:', insertedData);
  return { success: true, message: `Added ${questionsToInsert.length} questions` };
};
