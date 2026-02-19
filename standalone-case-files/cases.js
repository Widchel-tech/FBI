// Case Files - Sample Cases Data
// This file contains all case data stored locally

const CASES_DATA = [
    {
        id: "case-001",
        case_id: "FBI-HOM-24-001",
        case_type: "HOM",
        title: "The Riverside Conspiracy",
        location_county: "Cook",
        location_state: "Illinois",
        victim_overview: "Marcus Chen, 45, tech entrepreneur found dead in his luxury penthouse. Initial findings suggest poisoning, but the crime scene tells a more complex story.",
        summary: "A prominent tech CEO is found dead under mysterious circumstances. Multiple suspects with varying motives. The investigation will test your ability to separate truth from deception.",
        difficulty: 3,
        time_limit_minutes: 20,
        tags: ["homicide", "corporate", "poisoning"],
        threat_level: "high",
        crime_classification: "Homicide",
        conviction_threshold: 70,
        max_procedural_violations: 3,
        is_free: true,
        suspects: [
            {
                id: "suspect-001",
                name: "Victoria Chen",
                age: 42,
                role: "Ex-Wife",
                motive_angle: "Bitter divorce proceedings. Was to receive nothing due to prenup, but stands to inherit millions as next of kin if no will is found.",
                alibi_summary: "Claims she was at a charity gala from 7 PM to midnight. Multiple witnesses but had a 45-minute gap around 9 PM.",
                risk_notes: "Highly intelligent, has legal background. Will not break easily under pressure.",
                is_guilty: false,
                personality_type: "calculating",
                breaking_point: 4,
                lawyer_threshold: 2,
                cooperation_level: 40
            },
            {
                id: "suspect-002",
                name: "Derek Hoffman",
                age: 38,
                role: "Business Partner",
                motive_angle: "Company buyout clause worth $50 million triggers on Marcus's death. Recently discovered Marcus was planning to force him out.",
                alibi_summary: "Says he was working late at the office. Security logs show him leaving at 8:30 PM, but his car was seen near Marcus's building at 9:15 PM.",
                risk_notes: "Nervous disposition. Has a gambling debt of $2 million he's been hiding.",
                is_guilty: true,
                personality_type: "defensive",
                breaking_point: 3,
                lawyer_threshold: 3,
                cooperation_level: 60
            },
            {
                id: "suspect-003",
                name: "Elena Vasquez",
                age: 29,
                role: "Personal Assistant",
                motive_angle: "Had an affair with Marcus that ended badly. He threatened to destroy her career when she tried to end it.",
                alibi_summary: "Claims she was home alone watching Netflix. No witnesses, but phone GPS confirms her location.",
                risk_notes: "Emotionally volatile. May provide useful information about other suspects if approached sympathetically.",
                is_guilty: false,
                personality_type: "cooperative",
                breaking_point: 2,
                lawyer_threshold: 4,
                cooperation_level: 70
            }
        ],
        scenes: [
            {
                id: "S0",
                order: 0,
                title: "The Crime Scene",
                narration: "You arrive at the Lakeshore Towers penthouse at 6:47 AM. The morning sun casts long shadows through floor-to-ceiling windows. Marcus Chen lies sprawled across his Italian leather sofa, skin pale with a bluish tint. No signs of forced entry.\n\nCSI has already secured the perimeter. Detective Morrison briefs you: 'Preliminary says cardiac arrest, but the M.E. found foam residue around his mouth. Toxicology is being rushed.'\n\nYou note a half-empty whiskey glass on the coffee table, an open laptop showing financial documents, and a burner phone partially hidden under a cushion.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "crime_scene",
                choices: [
                    {
                        id: "choice-001",
                        text: "Examine the whiskey glass and send it for immediate analysis",
                        score_delta: 10,
                        add_clues: ["clue-001"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 5
                    },
                    {
                        id: "choice-002",
                        text: "Check the victim's laptop for recent activity",
                        score_delta: 5,
                        add_clues: ["clue-002"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 3,
                        evidence_strength_delta: 3
                    },
                    {
                        id: "choice-003",
                        text: "Investigate the burner phone without proper documentation",
                        score_delta: 15,
                        add_clues: ["clue-003"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "high",
                        conviction_delta: -5,
                        evidence_strength_delta: 8,
                        procedural_violation: "illegal_search"
                    }
                ],
                media_urls: []
            },
            {
                id: "S1",
                order: 1,
                title: "The Lab Results",
                narration: "Three hours later, you're at the FBI forensics lab. Dr. Sarah Park, chief toxicologist, calls you over to her workstation.\n\n'Agent, we've got something interesting. The whiskey contained traces of potassium chloride - enough to trigger cardiac arrest in someone with a weakened heart. Marcus had an undisclosed heart condition.'\n\nShe pulls up her computer screen. 'The concentration suggests it was added within the past 48 hours. Someone knew about his condition and exploited it.'\n\nYour phone buzzes - Derek Hoffman is asking to speak with you. Meanwhile, Victoria Chen's lawyer has already called twice.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "evidence_lab",
                choices: [
                    {
                        id: "choice-004",
                        text: "Interview Derek Hoffman immediately - his eagerness is suspicious",
                        score_delta: 10,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 0
                    },
                    {
                        id: "choice-005",
                        text: "Pull financial records on all three suspects",
                        score_delta: 8,
                        add_clues: ["clue-004"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "low",
                        conviction_delta: 8,
                        evidence_strength_delta: 10,
                        legal_requirement: "warrant"
                    },
                    {
                        id: "choice-006",
                        text: "Request Victoria Chen's phone records without a warrant",
                        score_delta: 5,
                        add_clues: ["clue-005"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "high",
                        conviction_delta: -10,
                        evidence_strength_delta: 5,
                        procedural_violation: "illegal_search"
                    }
                ],
                media_urls: []
            },
            {
                id: "S2",
                order: 2,
                title: "Interview Room A",
                narration: "Derek Hoffman sits across from you in the stark interview room. His expensive suit is rumpled, and there are dark circles under his eyes. He keeps checking his watch.\n\n'Look, I want to help,' he says, running a hand through his thinning hair. 'Marcus was my friend, my partner for fifteen years. But I have to tell you - he wasn't the saint everyone thinks he was.'\n\nHe leans forward conspiratorially. 'Check into his dealings with Nexus Capital. There were... irregularities. I was going to confront him about it this week.'\n\nYou notice his left hand trembling slightly.",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                choices: [
                    {
                        id: "choice-007",
                        text: "Press him about his gambling debts",
                        score_delta: 15,
                        add_clues: ["clue-006"],
                        require_clues: ["clue-004"],
                        next_scene_id: "S3",
                        risk_flag: "medium",
                        conviction_delta: 15,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-008",
                        text: "Ask about the Nexus Capital irregularities",
                        score_delta: 10,
                        add_clues: ["clue-007"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 5
                    },
                    {
                        id: "choice-009",
                        text: "Confront him about his car being near Marcus's building",
                        score_delta: 20,
                        add_clues: ["clue-008"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "low",
                        conviction_delta: 20,
                        evidence_strength_delta: 15
                    }
                ],
                media_urls: []
            },
            {
                id: "S3",
                order: 3,
                title: "The Security Footage",
                narration: "Your tech analyst, Agent Brooks, waves you over to his workstation. 'Got something, boss. I pulled traffic cam footage from the night of the murder.'\n\nThe grainy video shows Derek Hoffman's silver Mercedes pulling into the parking garage of Marcus's building at 9:12 PM - directly contradicting his alibi.\n\n'There's more,' Brooks continues. 'I found a receipt in our financial dig. Derek purchased potassium chloride from a medical supply company three weeks ago. Listed it as a company expense for their lab division.'\n\nYour phone rings - Elena Vasquez wants to talk. She says she has information that 'changes everything.'",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "briefing",
                choices: [
                    {
                        id: "choice-010",
                        text: "Get a warrant to search Derek's home and office",
                        score_delta: 15,
                        add_clues: ["clue-009"],
                        require_clues: [],
                        next_scene_id: "S4",
                        risk_flag: "none",
                        conviction_delta: 15,
                        evidence_strength_delta: 15,
                        legal_requirement: "warrant"
                    },
                    {
                        id: "choice-011",
                        text: "Interview Elena first - her timing is suspicious",
                        score_delta: 10,
                        add_clues: ["clue-010"],
                        require_clues: [],
                        next_scene_id: "S5",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 5
                    },
                    {
                        id: "choice-012",
                        text: "Arrest Derek immediately based on current evidence",
                        score_delta: -10,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S6",
                        risk_flag: "high",
                        conviction_delta: -20,
                        evidence_strength_delta: 0,
                        procedural_violation: "premature_arrest"
                    }
                ],
                media_urls: []
            },
            {
                id: "S4",
                order: 4,
                title: "The Search",
                narration: "With warrant in hand, your team descends on Derek Hoffman's Northbrook estate. The search is methodical, professional.\n\nIn his home office, hidden in a false bottom drawer, you find a vial containing trace amounts of white powder. Field testing confirms potassium chloride.\n\nMore damning: his laptop browser history shows searches for 'potassium chloride lethal dose' and 'heart conditions that mask poisoning' - all dated two weeks before Marcus's death.\n\nDerek's attorney is already on the phone when you emerge from the house.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "investigation",
                choices: [
                    {
                        id: "choice-013",
                        text: "Proceed to interrogate Derek with the new evidence",
                        score_delta: 15,
                        add_clues: ["clue-011"],
                        require_clues: [],
                        next_scene_id: "S6",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 20
                    },
                    {
                        id: "choice-014",
                        text: "Interview Elena first to corroborate the evidence",
                        score_delta: 10,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S5",
                        risk_flag: "none",
                        conviction_delta: 10,
                        evidence_strength_delta: 5
                    }
                ],
                media_urls: []
            },
            {
                id: "S5",
                order: 5,
                title: "Elena's Confession",
                narration: "Elena Vasquez meets you at a quiet coffee shop. She's nervous, constantly looking over her shoulder.\n\n'I know who did it,' she whispers. 'Derek. He came to me three weeks ago, asking about Marcus's health. He knew about the heart condition because I... I told him. During pillow talk. We had a brief thing.'\n\nShe produces her phone. 'He texted me the night Marcus died. Look - he asked if Marcus was home, if he was alone. I didn't think anything of it then.'\n\nThe texts are timestamped 8:45 PM - just before the security footage shows Derek arriving at the building.",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                choices: [
                    {
                        id: "choice-015",
                        text: "Secure Elena as a witness and get her official statement",
                        score_delta: 20,
                        add_clues: ["clue-012"],
                        require_clues: [],
                        next_scene_id: "S6",
                        risk_flag: "none",
                        conviction_delta: 25,
                        evidence_strength_delta: 20
                    },
                    {
                        id: "choice-016",
                        text: "Confront Derek immediately with this new evidence",
                        score_delta: 15,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S6",
                        risk_flag: "low",
                        conviction_delta: 15,
                        evidence_strength_delta: 10
                    }
                ],
                media_urls: []
            },
            {
                id: "S6",
                order: 6,
                title: "The Final Confrontation",
                narration: "Derek Hoffman sits in the interrogation room, this time with his attorney present. The evidence is spread before you: the vial, the browser history, the security footage, and now Elena's testimony.\n\nHis lawyer whispers urgently in his ear. Derek's face has gone pale.\n\n'My client has nothing to say,' the attorney announces.\n\nBut you see it in Derek's eyes - the fear, the guilt. He knows the walls are closing in. This is your moment to either close the case or let a murderer walk free.\n\nYou have gathered enough evidence. It's time to make your accusation.",
                is_interview_scene: false,
                is_accusation_scene: true,
                scene_type: "courtroom",
                choices: [
                    {
                        id: "choice-017",
                        text: "Make your accusation",
                        score_delta: 0,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S6",
                        risk_flag: "none",
                        conviction_delta: 0,
                        evidence_strength_delta: 0
                    }
                ],
                media_urls: []
            }
        ],
        clues: [
            {
                id: "clue-001",
                label: "Poisoned Whiskey Glass",
                description: "The whiskey glass contained traces of potassium chloride, a compound that can trigger cardiac arrest.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-002",
                label: "Financial Documents",
                description: "Marcus's laptop showed he was about to force Derek out of the company, triggering a $50 million buyout clause.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            },
            {
                id: "clue-003",
                label: "Burner Phone",
                description: "A burner phone with texts to an unknown number. May be inadmissible if seized improperly.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: false,
                legally_obtained: false,
                evidence_strength: 10
            },
            {
                id: "clue-004",
                label: "Financial Records",
                description: "Derek Hoffman has a $2 million gambling debt. He purchased potassium chloride three weeks before the murder.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "transaction",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-005",
                label: "Phone Records (Suppressed)",
                description: "Victoria's phone records show she was on a call during the murder. However, obtained without warrant.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: false,
                evidence_strength: 10
            },
            {
                id: "clue-006",
                label: "Gambling Debt Admission",
                description: "Derek admitted to the $2 million gambling debt when confronted. Shows financial desperation.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            },
            {
                id: "clue-007",
                label: "Nexus Capital Lead",
                description: "Derek claims Marcus was involved in financial irregularities. Potential misdirection.",
                load_bearing: false,
                misdirection: true,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 5
            },
            {
                id: "clue-008",
                label: "Location Contradiction",
                description: "Derek's car was seen near Marcus's building at 9:15 PM, contradicting his alibi.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "photograph",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-009",
                label: "Potassium Chloride Vial",
                description: "Found in Derek's home office. Contains traces matching the poison used.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-010",
                label: "Elena's Initial Statement",
                description: "Elena Vasquez claims Derek asked about Marcus's health weeks before the murder.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "witness",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 10
            },
            {
                id: "clue-011",
                label: "Browser History",
                description: "Derek's laptop shows searches for 'potassium chloride lethal dose' dated two weeks before the murder.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-012",
                label: "Incriminating Texts",
                description: "Elena provided texts showing Derek asked about Marcus's location the night of the murder.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            }
        ],
        endings: [
            {
                id: "ending-001",
                type: "CLOSED",
                title: "Case Closed",
                narration: "The evidence was overwhelming. Derek Hoffman broke down in the interrogation room, confessing to poisoning Marcus Chen. His motive: desperation. The gambling debts, the fear of being ousted from the company he helped build - it all drove him to murder.\n\nThe prosecution's case was airtight, built on legally obtained evidence and proper procedure. Derek Hoffman was sentenced to life without parole.\n\nJustice was served.",
                cp_base: 35,
                min_conviction_probability: 70,
                max_procedural_risk: "medium"
            },
            {
                id: "ending-002",
                type: "DISMISSED",
                title: "Case Dismissed",
                narration: "Despite your efforts, the case fell apart. Key evidence was either insufficient or improperly obtained. The defense team systematically dismantled the prosecution's case.\n\nDerek Hoffman walked free, a smug smile on his face as he left the courthouse. Marcus Chen's family watched in disbelief.\n\nSomewhere, justice weeps.",
                cp_base: 5,
                min_conviction_probability: 0,
                max_procedural_risk: "critical"
            },
            {
                id: "ending-003",
                type: "COMPROMISED",
                title: "Case Compromised",
                narration: "Your aggressive tactics backfired. Critical evidence was suppressed due to procedural violations. The defense filed motion after motion, and the judge had no choice but to exclude key pieces of evidence.\n\nDerek Hoffman's lawyer delivered a masterful closing argument. 'Reasonable doubt,' he said. The jury agreed.\n\nNot guilty.",
                cp_base: 10,
                min_conviction_probability: 0,
                max_procedural_risk: "low"
            },
            {
                id: "ending-004",
                type: "ESCALATED",
                title: "Federal Task Force",
                narration: "Your exceptional work on this case caught the attention of the Bureau's leadership. Not only did you secure a conviction against Derek Hoffman, but your investigation uncovered a larger conspiracy involving corporate espionage and financial crimes.\n\nYou've been recommended for the Federal Organized Crime Task Force. This is just the beginning.\n\nOutstanding work, Agent.",
                cp_base: 50,
                min_conviction_probability: 85,
                max_procedural_risk: "low"
            }
        ]
    },
    {
        id: "case-002",
        case_id: "FBI-CYB-24-002",
        case_type: "CYB",
        title: "Digital Ghost",
        location_county: "Santa Clara",
        location_state: "California",
        victim_overview: "TechVault Inc., a cloud security company, has been breached. Sensitive data of 2 million users is at risk. The breach originated from inside the company.",
        summary: "A sophisticated cyber attack threatens millions of users. The perpetrator is someone with inside access. Follow the digital breadcrumbs to unmask the Digital Ghost.",
        difficulty: 4,
        time_limit_minutes: 25,
        tags: ["cybercrime", "corporate", "insider"],
        threat_level: "critical",
        crime_classification: "Cybercrime",
        conviction_threshold: 75,
        max_procedural_violations: 2,
        is_free: false,
        suspects: [
            {
                id: "suspect-101",
                name: "Kevin Zhang",
                age: 31,
                role: "Senior Developer",
                motive_angle: "Passed over for promotion three times. Recently started consulting for a competitor.",
                alibi_summary: "Working from home during the breach. VPN logs show his connection was active.",
                risk_notes: "Technical genius. Will try to outmaneuver investigators with jargon.",
                is_guilty: true,
                personality_type: "calculating",
                breaking_point: 4,
                lawyer_threshold: 2,
                cooperation_level: 35
            },
            {
                id: "suspect-102",
                name: "Dr. Priya Sharma",
                age: 45,
                role: "Chief Security Officer",
                motive_angle: "Under pressure from the board. A cover-up might save her career.",
                alibi_summary: "In a board meeting during the initial breach window. Verified by multiple executives.",
                risk_notes: "Intelligent and composed. May have knowledge of security gaps.",
                is_guilty: false,
                personality_type: "defensive",
                breaking_point: 3,
                lawyer_threshold: 3,
                cooperation_level: 55
            }
        ],
        scenes: [
            {
                id: "S0",
                order: 0,
                title: "The Server Room",
                narration: "The fluorescent lights of TechVault's server room hum overhead as you survey the scene. Rows of blinking servers stretch into the distance, each one potentially holding the key to this investigation.\n\nDr. Sharma meets you at the entrance. 'The breach happened 48 hours ago. We've contained the damage, but whoever did this had root access to our systems.'\n\nShe hands you a tablet showing system logs. 'Three people had the access level required: myself, Kevin Zhang, and our former CTO who left six months ago.'",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "crime_scene",
                choices: [
                    {
                        id: "choice-101",
                        text: "Examine the system access logs in detail",
                        score_delta: 10,
                        add_clues: ["clue-101"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 10,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-102",
                        text: "Interview Kevin Zhang first",
                        score_delta: 5,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 0
                    }
                ],
                media_urls: []
            },
            {
                id: "S1",
                order: 1,
                title: "The Digital Trail",
                narration: "Hours of log analysis reveal a pattern. The breach was executed using Kevin Zhang's credentials, but the activity timestamps show something strange - some actions occurred simultaneously from two different locations.\n\nEither Kevin has a clone, or someone spoofed his credentials. You dig deeper and find that the attacker used a custom script to mask their true origin. The code style is elegant, almost artistic.\n\n'That coding style,' Dr. Sharma says, looking over your shoulder. 'That's Kevin's signature. No one else writes code like that.'",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "evidence_lab",
                choices: [
                    {
                        id: "choice-103",
                        text: "Confront Kevin with the code analysis",
                        score_delta: 15,
                        add_clues: ["clue-102"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "low",
                        conviction_delta: 15,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-104",
                        text: "Request a warrant for Kevin's personal devices",
                        score_delta: 20,
                        add_clues: ["clue-103"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 20,
                        legal_requirement: "warrant"
                    }
                ],
                media_urls: []
            },
            {
                id: "S2",
                order: 2,
                title: "The Interrogation",
                narration: "Kevin Zhang sits across from you, arms crossed. His confidence borders on arrogance.\n\n'Look, I know what you're thinking. My credentials were used. But I've been saying for months that our security has holes. Anyone with basic skills could have stolen my access.'\n\nHe leans forward. 'Have you checked Dr. Sharma's access patterns? She's been acting strange lately. Lots of late-night server room visits.'\n\nYou notice his leg bouncing nervously under the table.",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                choices: [
                    {
                        id: "choice-105",
                        text: "Present the code analysis evidence",
                        score_delta: 20,
                        add_clues: ["clue-104"],
                        require_clues: ["clue-102"],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 25,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-106",
                        text: "Ask about his consulting work with competitors",
                        score_delta: 15,
                        add_clues: ["clue-105"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "low",
                        conviction_delta: 15,
                        evidence_strength_delta: 10
                    }
                ],
                media_urls: []
            },
            {
                id: "S3",
                order: 3,
                title: "The Final Evidence",
                narration: "The warrant comes through. Kevin's personal laptop reveals everything: the attack scripts, communications with a competitor, and a payment trail of cryptocurrency worth $2 million.\n\nHe was selling TechVault's user data to the highest bidder. His ego was his downfall - he couldn't resist signing his code with his distinctive style.\n\nYou have everything you need.",
                is_interview_scene: false,
                is_accusation_scene: true,
                scene_type: "courtroom",
                choices: [
                    {
                        id: "choice-107",
                        text: "Make your accusation",
                        score_delta: 0,
                        add_clues: [],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 0,
                        evidence_strength_delta: 0
                    }
                ],
                media_urls: []
            }
        ],
        clues: [
            {
                id: "clue-101",
                label: "Access Log Anomalies",
                description: "Kevin's credentials were used from two locations simultaneously during the breach.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            },
            {
                id: "clue-102",
                label: "Code Signature",
                description: "The attack script matches Kevin Zhang's distinctive coding style.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-103",
                label: "Laptop Contents",
                description: "Kevin's personal laptop contains attack scripts and cryptocurrency payment records.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-104",
                label: "Confession Under Pressure",
                description: "Kevin's demeanor changed when presented with the code analysis - visible nervousness.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 10
            },
            {
                id: "clue-105",
                label: "Competitor Connection",
                description: "Kevin admitted to consulting work but claimed it was 'just technical advice.'",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "transaction",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            }
        ],
        endings: [
            {
                id: "ending-101",
                type: "CLOSED",
                title: "Case Closed",
                narration: "Kevin Zhang's digital empire crumbled. The cryptocurrency trail led to a network of corporate espionage that spanned three continents. His 'consulting work' was actually selling stolen data to the highest bidder.\n\nThe evidence was ironclad. Kevin received 15 years for corporate espionage and data theft.\n\nTechVault's 2 million users can sleep easier tonight.",
                cp_base: 40,
                min_conviction_probability: 75,
                max_procedural_risk: "medium"
            },
            {
                id: "ending-102",
                type: "DISMISSED",
                title: "Insufficient Evidence",
                narration: "Without the digital forensics to back up your case, Kevin Zhang's lawyers had a field day. 'Circumstantial,' they argued. 'Speculation.'\n\nThe jury wasn't convinced beyond reasonable doubt. Kevin walked free, and somewhere in the dark web, 2 million people's data was up for sale.",
                cp_base: 5,
                min_conviction_probability: 0,
                max_procedural_risk: "critical"
            }
        ]
    }
];

// Career Rank System
const CAREER_RANKS = {
    1: { title: "ANALYST", min_cp: 0 },
    2: { title: "FIELD AGENT", min_cp: 100 },
    3: { title: "SENIOR AGENT", min_cp: 300 },
    4: { title: "SUPERVISOR", min_cp: 600 },
    5: { title: "TASK FORCE LEAD", min_cp: 1000 }
};

// Get all cases
function getCases() {
    return CASES_DATA;
}

// Get case by ID
function getCaseById(id) {
    return CASES_DATA.find(c => c.id === id);
}

// Calculate rank from career points
function getRank(cp) {
    let rank = 1;
    let title = "ANALYST";
    
    for (const [level, info] of Object.entries(CAREER_RANKS).reverse()) {
        if (cp >= info.min_cp) {
            rank = parseInt(level);
            title = info.title;
            break;
        }
    }
    
    return { rank, title };
}
