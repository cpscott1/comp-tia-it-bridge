
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

// Hardcoded Week 2 Help Desk Scenarios flashcards
const week2HelpDeskFlashcards: Flashcard[] = [
  {
    id: 'hd-w2-scenario-1',
    front: 'Customer says: "My computer won\'t turn on at all. I was working yesterday and everything was fine, but this morning when I press the power button, nothing happens. No lights, no fans, completely dead." What should you recommend?',
    back: 'Ask them to check power connections and try a different outlet. When a system shows no signs of power, first check the most basic power-related issues before diagnosing component failures.',
    category: 'Week 2 Help Desk Scenarios',
    difficulty: 'Easy',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 2,
  },
  {
    id: 'hd-w2-scenario-2',
    front: 'Customer says: "My computer keeps shutting down randomly, especially when I\'m playing games or using video editing software. It works fine for basic tasks like web browsing and email." What should you suggest?',
    back: 'Recommend checking cooling system and cleaning dust. Random shutdowns during intensive tasks typically indicate overheating. The thermal protection system shuts down to prevent damage.',
    category: 'Week 2 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 2,
  },
  {
    id: 'hd-w2-scenario-3',
    front: 'Customer says: "I just installed new RAM in my computer, but now it won\'t boot. The fans spin up but I don\'t get any display, and I hear three short beeps when I turn it on." What should you recommend?',
    back: 'Ask them to reseat the RAM and check compatibility. Three beeps typically indicate memory issues. The RAM may not be seated properly or may be incompatible with the system.',
    category: 'Week 2 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 2,
  },
  {
    id: 'hd-w2-scenario-4',
    front: 'Customer says: "I installed a new SSD in my computer, but it\'s not showing up in Windows. The old hard drive still works fine, but the computer doesn\'t seem to recognize the new SSD at all." What should you guide them to do?',
    back: 'Guide them to check BIOS settings and disk management. New drives often need to be initialized in Disk Management, and BIOS/UEFI settings may need adjustment to detect the drive.',
    category: 'Week 2 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 2,
  },
  {
    id: 'hd-w2-scenario-5',
    front: 'Customer says: "I\'m building my first computer and I think I may have installed the CPU wrong. The system powers on, all the fans spin, but I don\'t get any display and I hear one long beep followed by two short beeps." What should you suggest?',
    back: 'Suggest they check CPU installation and seating. One long beep followed by two short beeps typically indicates CPU issues. The processor may not be properly seated or installed correctly.',
    category: 'Week 2 Help Desk Scenarios',
    difficulty: 'Hard',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 2,
  },
];

// Hardcoded Week 3 Help Desk Scenarios flashcards
const week3HelpDeskFlashcards: Flashcard[] = [
  {
    id: 'hd-w3-scenario-1',
    front: 'Customer says: "I was trying to improve my computer\'s performance and went into the BIOS to change some settings. Now my computer won\'t boot at all - it just shows a black screen with a blinking cursor. I can get into BIOS setup, but I don\'t remember what I changed." What should you recommend?',
    back: 'Guide them to reset BIOS to default settings. BIOS changes can prevent boot. Resetting to defaults (Load Setup Defaults or similar option) usually resolves configuration-related boot issues.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-2',
    front: 'Customer says: "My computer has been getting really slow lately, and yesterday it shut down by itself while I was working on a presentation. When I touched the case, it felt very hot. It\'s been making more noise than usual too." What should you suggest?',
    back: 'Suggest checking cooling system, cleaning dust, and verifying fan operation. Symptoms indicate overheating: performance degradation, automatic shutdown, excessive heat and noise. Cooling system maintenance is needed.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Medium',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-3',
    front: 'Customer says: "My computer is making weird clicking sounds, especially when I try to open files. Sometimes programs freeze, and this morning I got an error message saying \'disk read error.\' I\'m worried about losing my important documents." What should you recommend?',
    back: 'Recommend immediately backing up data and replacing the drive. Clicking sounds with read errors indicate imminent hard drive failure. Data backup is critical before complete failure occurs.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Hard',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-4',
    front: 'Customer says: "My monitor suddenly went black in the middle of working, but I can still hear sounds from the computer like email notifications. I checked that the monitor is plugged in and turned on, but it just shows \'No Signal\' now." What should you guide them to do?',
    back: 'Guide them to check video cable connections and try a different cable. "No Signal" with working audio suggests video connection issues. Check cable connections, try different cables, and verify correct input source.',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Easy',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 3,
  },
  {
    id: 'hd-w3-scenario-5',
    front: 'Customer says: "My computer has been acting really strange lately. Programs keep crashing randomly, sometimes I get blue screens with lots of text, and occasionally the computer restarts by itself. It seems to happen more when I\'m running multiple programs." What should you suggest?',
    back: 'Suggest testing memory (RAM) and checking for overheating. Random crashes, blue screens, and application failures often indicate memory problems or overheating, especially under load (multiple programs).',
    category: 'Week 3 Help Desk Scenarios',
    difficulty: 'Hard',
    topicId: '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
    weekNumber: 3,
  },
];

export const useFlashcards = (topicId?: string, weekNumber?: number) => {
  return useQuery({
    queryKey: ['flashcards', topicId, weekNumber],
    queryFn: async () => {
      // If requesting Help Desk Scenarios, return hardcoded flashcards for the specific week
      if (topicId === '71c04cd6-3deb-4f89-a549-ca8d0737c2f0') {
        console.log('Returning Help Desk flashcards for topicId:', topicId, 'weekNumber:', weekNumber);
        
        if (weekNumber === 2) {
          return week2HelpDeskFlashcards;
        } else if (weekNumber === 3) {
          return week3HelpDeskFlashcards;
        } else {
          // Return both weeks if no specific week is requested
          return [...week2HelpDeskFlashcards, ...week3HelpDeskFlashcards];
        }
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
