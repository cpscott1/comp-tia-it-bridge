
import { HelpDeskScenario } from "@/types/helpDesk";

export const helpDeskScenarios: HelpDeskScenario[] = [
  {
    id: "w2-scenario-1",
    title: "Power Supply Failure",
    description: "Computer completely unresponsive",
    ticket: "My computer won't turn on at all. I was working yesterday and everything was fine, but this morning when I press the power button, nothing happens. No lights, no fans, completely dead.",
    week: 2,
    difficulty: 'Easy',
    options: [
      "Recommend immediately buying a new computer",
      "Ask them to check power connections and try a different outlet",
      "Tell them it's definitely a motherboard failure",
      "Suggest they wait a few hours for it to 'rest'"
    ],
    correctAnswer: 1,
    rationale: "When a system shows no signs of power, first check the most basic power-related issues before diagnosing component failures."
  },
  {
    id: "w2-scenario-2",
    title: "Overheating Issues", 
    description: "System shutting down during intensive tasks",
    ticket: "My computer keeps shutting down randomly, especially when I'm playing games or using video editing software. It works fine for basic tasks like web browsing and email.",
    week: 2,
    difficulty: 'Medium',
    options: [
      "Tell them to stop using demanding software",
      "Suggest the issue is caused by viruses",
      "Recommend checking cooling system and cleaning dust",
      "Advise purchasing a new graphics card immediately"
    ],
    correctAnswer: 2,
    rationale: "Random shutdowns during intensive tasks typically indicate overheating. The thermal protection system shuts down to prevent damage."
  },
  {
    id: "w2-scenario-3",
    title: "Memory Installation Problem",
    description: "RAM installation causing boot issues",
    ticket: "I just installed new RAM in my computer, but now it won't boot. The fans spin up but I don't get any display, and I hear three short beeps when I turn it on.",
    week: 2,
    difficulty: 'Medium',
    options: [
      "Tell them the motherboard is dead",
      "Suggest they return the RAM as defective",
      "Ask them to reseat the RAM and check compatibility",
      "Recommend formatting the hard drive"
    ],
    correctAnswer: 2,
    rationale: "Three beeps typically indicate memory issues. The RAM may not be seated properly or may be incompatible with the system."
  },
  {
    id: "w2-scenario-4",
    title: "Storage Device Recognition",
    description: "New SSD not being detected",
    ticket: "I installed a new SSD in my computer, but it's not showing up in Windows. The old hard drive still works fine, but the computer doesn't seem to recognize the new SSD at all.",
    week: 2,
    difficulty: 'Medium',
    options: [
      "Tell them SSDs don't work with their computer",
      "Guide them to check BIOS settings and disk management",
      "Suggest the SSD is broken and needs replacement",
      "Recommend reinstalling Windows completely"
    ],
    correctAnswer: 1,
    rationale: "New drives often need to be initialized in Disk Management, and BIOS/UEFI settings may need adjustment to detect the drive."
  },
  {
    id: "w2-scenario-5",
    title: "CPU Installation Issue",
    description: "CPU installation problems during build",
    ticket: "I'm building my first computer and I think I may have installed the CPU wrong. The system powers on, all the fans spin, but I don't get any display and I hear one long beep followed by two short beeps.",
    week: 2,
    difficulty: 'Hard',
    options: [
      "Tell them to immediately order a new CPU",
      "Suggest they check CPU installation and seating",
      "Recommend they start over with all components",
      "Advise that the power supply is insufficient"
    ],
    correctAnswer: 1,
    rationale: "One long beep followed by two short beeps typically indicates CPU issues. The processor may not be properly seated or installed correctly."
  },
  {
    id: "w3-scenario-1",
    title: "BIOS Configuration Issue",
    description: "Boot failure after BIOS changes",
    ticket: "I was trying to improve my computer's performance and went into the BIOS to change some settings. Now my computer won't boot at all - it just shows a black screen with a blinking cursor. I can get into BIOS setup, but I don't remember what I changed.",
    week: 3,
    difficulty: 'Medium',
    options: [
      "Tell them to buy a new computer",
      "Guide them to reset BIOS to default settings",
      "Recommend a complete Windows reinstall",
      "Suggest they wait and try again tomorrow"
    ],
    correctAnswer: 1,
    rationale: "BIOS changes can prevent boot. Resetting to defaults (Load Setup Defaults or similar option) usually resolves configuration-related boot issues."
  },
  {
    id: "w3-scenario-2",
    title: "Overheating and Performance",
    description: "System overheating with performance issues",
    ticket: "My computer has been getting really slow lately, and yesterday it shut down by itself while I was working on a presentation. When I touched the case, it felt very hot. It's been making more noise than usual too.",
    week: 3,
    difficulty: 'Medium',
    options: [
      "Recommend they use the computer less frequently",
      "Suggest checking cooling system, cleaning dust, and verifying fan operation",
      "Tell them the noise is normal and ignore it",
      "Recommend immediately replacing the motherboard"
    ],
    correctAnswer: 1,
    rationale: "Symptoms indicate overheating: performance degradation, automatic shutdown, excessive heat and noise. Cooling system maintenance is needed."
  },
  {
    id: "w3-scenario-3",
    title: "Hard Drive Failure",
    description: "Drive making clicking sounds with errors",
    ticket: "My computer is making weird clicking sounds, especially when I try to open files. Sometimes programs freeze, and this morning I got an error message saying 'disk read error.' I'm worried about losing my important documents.",
    week: 3,
    difficulty: 'Hard',
    options: [
      "Tell them the clicking is normal hard drive operation",
      "Recommend immediately backing up data and replacing the drive",
      "Suggest defragmenting the hard drive to fix the sounds",
      "Advise running disk cleanup to solve the problem"
    ],
    correctAnswer: 1,
    rationale: "Clicking sounds with read errors indicate imminent hard drive failure. Data backup is critical before complete failure occurs."
  },
  {
    id: "w3-scenario-4",
    title: "Display Problems",
    description: "Monitor shows no signal during operation",
    ticket: "My monitor suddenly went black in the middle of working, but I can still hear sounds from the computer like email notifications. I checked that the monitor is plugged in and turned on, but it just shows 'No Signal' now.",
    week: 3,
    difficulty: 'Easy',
    options: [
      "Tell them to buy a new monitor immediately",
      "Guide them to check video cable connections and try a different cable",
      "Recommend restarting the computer 10 times",
      "Suggest it's a virus and run antivirus software"
    ],
    correctAnswer: 1,
    rationale: "'No Signal' with working audio suggests video connection issues. Check cable connections, try different cables, and verify correct input source."
  },
  {
    id: "w3-scenario-5",
    title: "Memory and Stability Issues",
    description: "Random crashes and blue screens",
    ticket: "My computer has been acting really strange lately. Programs keep crashing randomly, sometimes I get blue screens with lots of text, and occasionally the computer restarts by itself. It seems to happen more when I'm running multiple programs.",
    week: 3,
    difficulty: 'Hard',
    options: [
      "Tell them to only run one program at a time permanently",
      "Suggest testing memory (RAM) and checking for overheating",
      "Recommend never saving files to prevent crashes",
      "Advise that random crashes are normal for all computers"
    ],
    correctAnswer: 1,
    rationale: "Random crashes, blue screens, and application failures often indicate memory problems or overheating, especially under load (multiple programs)."
  },
  {
    id: "w4-scenario-1",
    title: "Network Connectivity Issues",
    description: "Network troubleshooting scenario",
    ticket: "I can't connect to the internet from my office computer. The network icon shows I'm connected to the network, but web pages won't load. Other computers in the office are working fine. I tried restarting my computer but that didn't help.",
    week: 4,
    difficulty: 'Medium',
    options: [
      "Tell them their computer is broken and needs replacement",
      "Guide them to check IP configuration and try ipconfig /release /renew",
      "Recommend buying a new network cable immediately",
      "Suggest the problem is with their internet service provider"
    ],
    correctAnswer: 1,
    rationale: "Local network connection with no internet suggests IP configuration issues. Releasing and renewing the IP address often resolves DHCP-related connectivity problems."
  },
  {
    id: "w4-scenario-2",
    title: "Slow Wireless Performance",
    description: "Network troubleshooting scenario",
    ticket: "My WiFi has been really slow lately, especially in the afternoon. I'm getting less than 1 Mbps when I usually get around 50 Mbps. The connection doesn't drop, it's just incredibly slow. My neighbor mentioned they just got new WiFi too.",
    week: 4,
    difficulty: 'Medium',
    options: [
      "Tell them WiFi is always slow and they should use wired connections",
      "Suggest checking for interference and trying a different wireless channel",
      "Recommend they stop using the internet in the afternoon",
      "Advise that slow speeds are normal for wireless networks"
    ],
    correctAnswer: 1,
    rationale: "Sudden slowdowns, especially at specific times, often indicate interference from neighboring networks. Changing wireless channels can resolve conflicts."
  },
  {
    id: "w4-scenario-3",
    title: "Cable Connection Problem",
    description: "Network troubleshooting scenario",
    ticket: "I was moving furniture in my office and accidentally pulled on some cables. Now my computer says 'network cable unplugged' even though I plugged everything back in. The cable looks fine to me, but I can't get online.",
    week: 4,
    difficulty: 'Easy',
    options: [
      "Tell them to buy a completely new computer",
      "Guide them to check cable connections and test with a known-good cable",
      "Suggest the issue is with their wireless router",
      "Recommend calling their internet service provider immediately"
    ],
    correctAnswer: 1,
    rationale: "Physical cable damage from pulling is common. The cable may look fine externally but have internal damage. Testing with a known-good cable confirms if cable replacement is needed."
  },
  {
    id: "w4-scenario-4",
    title: "Wireless Security Configuration",
    description: "Network troubleshooting scenario",
    ticket: "I just got a new wireless router and I can connect to it, but I'm worried about security. Right now anyone can connect to it without a password. How do I secure it so only my family can use it?",
    week: 4,
    difficulty: 'Easy',
    options: [
      "Tell them wireless networks can't be secured",
      "Guide them to access router settings and configure WPA3 or WPA2 security",
      "Suggest they return the router since it's not secure",
      "Recommend they only use wired connections"
    ],
    correctAnswer: 1,
    rationale: "Wireless security is essential. Guide them to access the router's web interface and configure WPA3 (or WPA2 if WPA3 isn't available) with a strong password."
  },
  {
    id: "w4-scenario-5",
    title: "Network Printer Access Issues",
    description: "Network troubleshooting scenario",
    ticket: "We have a network printer that everyone in the office used to be able to print to, but now only some computers can reach it. The printer shows up as online on some computers but shows as offline on others. The printer itself seems fine.",
    week: 4,
    difficulty: 'Hard',
    options: [
      "Tell them to buy individual printers for each computer",
      "Check network connectivity, IP settings, and printer drivers on affected computers",
      "Suggest the printer is broken and needs replacement",
      "Recommend they restart all computers multiple times"
    ],
    correctAnswer: 1,
    rationale: "Inconsistent printer access suggests network connectivity issues, IP conflicts, or driver problems on specific computers. Systematic troubleshooting of affected systems is needed."
  }
];
