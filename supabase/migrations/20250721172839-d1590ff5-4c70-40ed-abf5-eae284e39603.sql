
-- Check if the "Supporting Network Services" topic exists and get its ID
SELECT id, name FROM quiz_topics WHERE name = 'Supporting Network Services';

-- Check if there are any Week 6 questions and what topic_id they have
SELECT DISTINCT topic_id, week_number FROM practice_questions WHERE week_number = 6;

-- Check if the topic_id in Week 6 questions matches any existing topic
SELECT 
  pq.topic_id as question_topic_id,
  qt.id as topic_table_id,
  qt.name as topic_name,
  COUNT(pq.id) as question_count
FROM practice_questions pq
LEFT JOIN quiz_topics qt ON pq.topic_id = qt.id
WHERE pq.week_number = 6
GROUP BY pq.topic_id, qt.id, qt.name;
