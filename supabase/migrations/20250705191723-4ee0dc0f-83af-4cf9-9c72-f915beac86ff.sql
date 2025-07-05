
-- Insert Week 4 Help Desk networking scenarios
INSERT INTO public.practice_questions (topic_id, question, options, correct_answer, explanation, difficulty, week_number) VALUES

-- Network Connectivity Issues
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Network Connectivity Issues: "I can''t connect to the internet from my office computer. The network icon shows I''m connected to the network, but web pages won''t load. Other computers in the office are working fine. I tried restarting my computer but that didn''t help."',
  '["Tell them their computer is broken and needs replacement", "Guide them to check IP configuration and try ipconfig /release /renew", "Recommend buying a new network cable immediately", "Suggest the problem is with their internet service provider"]',
  1,
  'Local network connection with no internet suggests IP configuration issues. Releasing and renewing the IP address often resolves DHCP-related connectivity problems.',
  'Medium',
  4
),

-- Slow Wireless Performance
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Slow Wireless Performance: "My WiFi has been really slow lately, especially in the afternoon. I''m getting less than 1 Mbps when I usually get around 50 Mbps. The connection doesn''t drop, it''s just incredibly slow. My neighbor mentioned they just got new WiFi too."',
  '["Tell them WiFi is always slow and they should use wired connections", "Suggest checking for interference and trying a different wireless channel", "Recommend they stop using the internet in the afternoon", "Advise that slow speeds are normal for wireless networks"]',
  1,
  'Sudden slowdowns, especially at specific times, often indicate interference from neighboring networks. Changing wireless channels can resolve conflicts.',
  'Medium',
  4
),

-- Cable Connection Problem
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Cable Connection Problem: "I was moving furniture in my office and accidentally pulled on some cables. Now my computer says ''network cable unplugged'' even though I plugged everything back in. The cable looks fine to me, but I can''t get online."',
  '["Tell them to buy a completely new computer", "Guide them to check cable connections and test with a known-good cable", "Suggest the issue is with their wireless router", "Recommend calling their internet service provider immediately"]',
  1,
  'Physical cable damage from pulling is common. The cable may look fine externally but have internal damage. Testing with a known-good cable confirms if cable replacement is needed.',
  'Medium',
  4
),

-- Wireless Security Configuration
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Wireless Security Configuration: "I just got a new wireless router and I can connect to it, but I''m worried about security. Right now anyone can connect to it without a password. How do I secure it so only my family can use it?"',
  '["Tell them wireless networks can''t be secured", "Guide them to access router settings and configure WPA3 or WPA2 security", "Suggest they return the router since it''s not secure", "Recommend they only use wired connections"]',
  1,
  'Wireless security is essential. Guide them to access the router''s web interface and configure WPA3 (or WPA2 if WPA3 isn''t available) with a strong password.',
  'Medium',
  4
),

-- Network Printer Access Issues
(
  '71c04cd6-3deb-4f89-a549-ca8d0737c2f0',
  'Network Printer Access Issues: "We have a network printer that everyone in the office used to be able to print to, but now only some computers can reach it. The printer shows up as online on some computers but shows as offline on others. The printer itself seems fine."',
  '["Tell them to buy individual printers for each computer", "Check network connectivity, IP settings, and printer drivers on affected computers", "Suggest the printer is broken and needs replacement", "Recommend they restart all computers multiple times"]',
  1,
  'Inconsistent printer access suggests network connectivity issues, IP conflicts, or driver problems on specific computers. Systematic troubleshooting of affected systems is needed.',
  'Hard',
  4
);
