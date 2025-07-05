
-- Insert Week 4 CompTIA A+ Networking practice questions
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) VALUES

-- Network Cable Types (Questions 1-5)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which Ethernet cable category supports speeds up to 1 Gbps and is commonly used in modern networks?',
  '["Cat 5", "Cat 5e", "Cat 3", "Cat 4"]',
  1,
  'Cat 5e (Enhanced) supports up to 1 Gbps (1000 Mbps) and is the minimum standard for modern Gigabit Ethernet networks.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What connector type is used for Ethernet network cables?',
  '["RJ11", "RJ45", "DB9", "USB-C"]',
  1,
  'RJ45 is the 8-pin connector used for Ethernet network cables, while RJ11 is used for telephone lines.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which cable type provides the highest bandwidth and is immune to electromagnetic interference?',
  '["Cat 6a", "Coaxial", "Fiber optic", "Cat 5e"]',
  2,
  'Fiber optic cables use light instead of electrical signals, providing the highest bandwidth and complete immunity to EMI.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does UTP stand for in network cabling?',
  '["Unified Twisted Pair", "Unshielded Twisted Pair", "Universal Twisted Pair", "Ultra Twisted Pair"]',
  1,
  'UTP refers to Unshielded Twisted Pair cable, the most common type of Ethernet cable without additional shielding.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which wiring standard is most commonly used for Ethernet cable termination?',
  '["T568A only", "T568B only", "Either T568A or T568B (but both ends must match)", "T568C"]',
  2,
  'Both T568A and T568B standards work, but both ends of the cable must use the same standard for proper operation.',
  'Medium',
  4
),

-- Networking Hardware (Questions 6-10)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is the primary function of a network switch?',
  '["Connect networks together", "Provide internet access", "Connect devices within the same network segment", "Filter network traffic"]',
  2,
  'Switches operate at Layer 2 and connect devices within the same network segment, learning MAC addresses to forward traffic efficiently.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is the main difference between a managed and unmanaged switch?',
  '["Number of ports", "Configuration and monitoring capabilities", "Physical size", "Power consumption"]',
  1,
  'Managed switches allow configuration of VLANs, port settings, and monitoring, while unmanaged switches work with no configuration.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What device operates at Layer 3 and connects different networks together?',
  '["Switch", "Hub", "Router", "Access Point"]',
  2,
  'Routers operate at Layer 3 (Network layer) and route traffic between different networks using IP addresses.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does PoE stand for and what is its purpose?',
  '["Power over Ethernet - provides power through network cables", "Protocol over Ethernet - runs protocols over network cables", "Port over Ethernet - extends port functionality", "Performance over Ethernet - improves network speed"]',
  0,
  'PoE allows network cables to carry both data and electrical power, commonly used for IP phones, cameras, and access points.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which networking device is largely obsolete due to its collision domain limitations?',
  '["Switch", "Router", "Hub", "Access Point"]',
  2,
  'Hubs operate at the Physical layer and create one large collision domain, making them inefficient compared to switches.',
  'Easy',
  4
),

-- Wireless Networking (Questions 11-15)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which 802.11 standard is also known as WiFi 6?',
  '["802.11n", "802.11ac", "802.11ax", "802.11g"]',
  2,
  '802.11ax is the technical name for WiFi 6, the latest wireless standard offering improved speed and efficiency.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which frequency band typically provides better range but lower speeds?',
  '["2.4 GHz", "5 GHz", "6 GHz", "All bands are equal"]',
  0,
  '2.4 GHz provides better range and wall penetration but lower speeds due to more interference and fewer channels.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is the typical range for Bluetooth connections?',
  '["100 meters", "30 meters", "10 meters", "1 meter"]',
  2,
  'Standard Bluetooth typically has a range of approximately 10 meters (33 feet) for most devices.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does NFC stand for and what is its typical range?',
  '["Network File Controller - 10 meters", "Near Field Communication - 4 centimeters", "Network Frequency Control - 1 meter", "Network File Communication - 1 centimeter"]',
  1,
  'NFC (Near Field Communication) works at very close range (about 4cm) and is commonly used for payments and device pairing.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which 802.11 standard was the first to support both 2.4 GHz and 5 GHz frequencies?',
  '["802.11a", "802.11b", "802.11g", "802.11n"]',
  3,
  '802.11n was the first standard to support dual-band operation on both 2.4 GHz and 5 GHz frequencies.',
  'Hard',
  4
),

-- Network Types (Questions 16-20)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does LAN stand for?',
  '["Large Area Network", "Local Area Network", "Limited Area Network", "Logical Area Network"]',
  1,
  'LAN (Local Area Network) refers to a network that covers a small geographic area, typically within a building or campus.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which network type connects multiple LANs across large geographic distances?',
  '["PAN", "MAN", "WAN", "SAN"]',
  2,
  'WAN (Wide Area Network) connects networks across large geographic areas, often using public telecommunications infrastructure.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does PAN stand for in networking?',
  '["Public Area Network", "Personal Area Network", "Private Area Network", "Portable Area Network"]',
  1,
  'PAN (Personal Area Network) connects devices around an individual person, typically within a 10-meter range.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What type of network is specifically designed for high-speed storage access?',
  '["LAN", "WAN", "SAN", "MAN"]',
  2,
  'SAN (Storage Area Network) is a specialized network designed for high-speed access to storage devices.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does WLAN stand for?',
  '["Wide Local Area Network", "Wireless Local Area Network", "Web Local Area Network", "Working Local Area Network"]',
  1,
  'WLAN (Wireless Local Area Network) is a LAN that uses wireless communication instead of cables.',
  'Easy',
  4
),

-- Internet Connection Types (Questions 21-25)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which internet connection type typically offers the highest speeds?',
  '["DSL", "Cable", "Fiber", "Satellite"]',
  2,
  'Fiber optic internet typically provides the highest speeds, often supporting gigabit and multi-gigabit connections.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does DSL stand for?',
  '["Digital Service Line", "Direct Service Line", "Digital Subscriber Line", "Direct Subscriber Line"]',
  2,
  'DSL (Digital Subscriber Line) provides broadband internet over existing telephone lines.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Which internet connection type is described as FTTN (Fiber to the Node)?',
  '["DSL", "Cable", "Satellite", "Cellular"]',
  1,
  'Cable internet uses DOCSIS standard and is described as FTTN (Fiber to the Node) where fiber reaches a neighborhood node, then coax to homes.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is a major disadvantage of satellite internet?',
  '["Low bandwidth", "High latency", "Limited coverage", "Expensive equipment"]',
  1,
  'Satellite internet suffers from high latency due to the distance signals must travel to/from satellites, making it poor for real-time applications.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does WISP stand for?',
  '["Wireless Internet Service Provider", "Wide Internet Service Protocol", "Wireless Internet Security Protocol", "Wide Internet Service Provider"]',
  0,
  'WISP (Wireless Internet Service Provider) provides internet access using wireless technology, often serving rural areas.',
  'Medium',
  4
),

-- Networking Tools (Questions 26-30)
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What tool is used to attach RJ45 connectors to network cables?',
  '["Cable stripper", "Crimper", "Punch-down tool", "Cable tester"]',
  1,
  'A crimper is used to attach RJ45 and RJ11 connectors to twisted-pair cables by compressing the connector onto the wires.',
  'Easy',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is the purpose of a toner probe (tone generator)?',
  '["Test cable continuity", "Identify the other end of a cable", "Strip cable jackets", "Terminate cables on patch panels"]',
  1,
  'A toner probe consists of a tone generator that sends a signal through a cable and a probe that locates the other end by detecting the tone.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What tool is used to terminate twisted-pair cables on a 110 or 66 block?',
  '["Crimper", "Cable stripper", "Punch-down tool", "Wire cutter"]',
  2,
  'A punch-down tool is used to terminate twisted-pair wires into 110 blocks (patch panels) or 66 blocks (older phone systems).',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What is a WiFi analyzer used for?',
  '["Repairing wireless devices", "Analyzing wireless network signals and interference", "Installing wireless access points", "Configuring wireless security"]',
  1,
  'WiFi analyzers help identify wireless networks, signal strength, channel usage, and interference sources to optimize wireless performance.',
  'Medium',
  4
),
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'What does a cable tester verify?',
  '["Network traffic", "Cable termination and continuity", "Wireless signal strength", "Network security"]',
  1,
  'Cable testers verify that network cables are properly terminated and check for continuity, shorts, and proper pin-to-pin connections.',
  'Easy',
  4
);
