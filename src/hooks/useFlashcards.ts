
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topicId: string;
  weekNumber: number;
}

// Hardcoded Week 3 Help Desk Scenarios flashcards
const week3HelpDeskFlashcards: Flashcard[] = [
  {
    id: 'hd-w3-scenario-1',
    front: 'Customer says: "I was trying to improve my computer\'s performance and went into the BIOS to change some settings. Now my computer won\'t boot at all - it just shows a black screen with a blinking cursor. I can get into BIOS setup, but I don\'t remember what I changed." What should you recommend?',
    back: 'Guide them to reset BIOS to default settings. BIOS changes can prevent boot. Resetting to defaults (Load Setup Defaults or similar option) usually resolves configuration-related boot issues.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: 'week3-helpdesk',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-2',
    front: 'Customer says: "My computer has been getting really slow lately, and yesterday it shut down by itself while I was working on a presentation. When I touched the case, it felt very hot. It\'s been making more noise than usual too." What should you suggest?',
    back: 'Suggest checking cooling system, cleaning dust, and verifying fan operation. Symptoms indicate overheating: performance degradation, automatic shutdown, excessive heat and noise. Cooling system maintenance is needed.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: 'week3-helpdesk',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-3',
    front: 'Customer says: "My computer is making weird clicking sounds, especially when I try to open files. Sometimes programs freeze, and this morning I got an error message saying \'disk read error.\' I\'m worried about losing my important documents." What should you recommend?',
    back: 'Recommend immediately backing up data and replacing the drive. Clicking sounds with read errors indicate imminent hard drive failure. Data backup is critical before complete failure occurs.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Hard',
    topicId: 'week3-helpdesk',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-4',
    front: 'Customer says: "My monitor suddenly went black in the middle of working, but I can still hear sounds from the computer like email notifications. I checked that the monitor is plugged in and turned on, but it just shows \'No Signal\' now." What should you guide them to do?',
    back: 'Guide them to check video cable connections and try a different cable. "No Signal" with working audio suggests video connection issues. Check cable connections, try different cables, and verify correct input source.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Easy',
    topicId: 'week3-helpdesk',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-5',
    front: 'Customer says: "My computer has been acting really strange lately. Programs keep crashing randomly, sometimes I get blue screens with lots of text, and occasionally the computer restarts by itself. It seems to happen more when I\'m running multiple programs." What should you suggest?',
    back: 'Suggest testing memory (RAM) and checking for overheating. Random crashes, blue screens, and application failures often indicate memory problems or overheating, especially under load (multiple programs).',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Hard',
    topicId: 'week3-helpdesk',
    weekNumber: 3,
  },
];

export const useFlashcards = (topicId?: string, weekNumber?: number) => {
  return useQuery({
    queryKey: ['flashcards', topicId, weekNumber],
    queryFn: async () => {
      // If requesting Week 3 Help Desk Scenarios, return hardcoded flashcards
      if (topicId === 'week3-helpdesk' || 
          (topicId && topicId.toLowerCase().includes('help desk')) ||
          (topicId && topicId.toLowerCase().includes('helpdesk'))) {
        console.log('Returning Week 3 Help Desk flashcards for topicId:', topicId);
        return week3HelpDeskFlashcards;
      }

      let query = supabase
        .from('flashcards')
        .select(`
          *,
          quiz_topics (
            name,
            description
          )
        `);
      
      if (topicId) {
        query = query.eq('topic_id', topicId);
      }
      
      if (weekNumber) {
        query = query.eq('week_number', weekNumber);
      }
      
      const { data, error } = await query.order('created_at');
      
      if (error) {
        console.error('Error fetching flashcards:', error);
        throw error;
      }
      
      // Convert flashcards to the expected format
      const flashcards: Flashcard[] = data.map((flashcard: any) => ({
        id: flashcard.id,
        front: flashcard.front,
        back: flashcard.back,
        category: flashcard.quiz_topics?.name || 'Unknown',
        difficulty: flashcard.difficulty as 'Easy' | 'Medium' | 'Hard',
        topicId: flashcard.topic_id,
        weekNumber: flashcard.week_number || 1,
      }));
      
      return flashcards;
    },
    enabled: true,
  });
};
