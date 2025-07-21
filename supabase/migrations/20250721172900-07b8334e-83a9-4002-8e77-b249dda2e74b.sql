
-- First, ensure the "Supporting Network Services" topic exists
INSERT INTO quiz_topics (name, description, color) 
VALUES ('Supporting Network Services', 'Server roles, AAA services, network appliances, and virtual networks', 'purple')
ON CONFLICT (name) DO NOTHING;

-- Get the correct topic ID and update any orphaned Week 6 questions
WITH correct_topic AS (
  SELECT id FROM quiz_topics WHERE name = 'Supporting Network Services'
)
UPDATE practice_questions 
SET topic_id = (SELECT id FROM correct_topic)
WHERE week_number = 6 
AND topic_id NOT IN (SELECT id FROM quiz_topics);

-- If there are no Week 6 questions at all, let's verify by checking the count
SELECT COUNT(*) as week_6_question_count FROM practice_questions WHERE week_number = 6;

-- Also check if the topic now has the correct questions
SELECT 
  qt.name as topic_name,
  COUNT(pq.id) as question_count
FROM quiz_topics qt
LEFT JOIN practice_questions pq ON qt.id = pq.topic_id AND pq.week_number = 6
WHERE qt.name = 'Supporting Network Services'
GROUP BY qt.name;
