// Case Files - Complete Cases Data with Audio
// This file contains all case data stored locally

// Audio configuration for ambient sounds
const AMBIENT_AUDIO = {
    office: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
    outdoor: 'https://assets.mixkit.co/active_storage/sfx/1210/1210-preview.mp3',
    rain: 'https://assets.mixkit.co/active_storage/sfx/2515/2515-preview.mp3',
    lab: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
    sirens: 'https://assets.mixkit.co/active_storage/sfx/1624/1624-preview.mp3',
    interrogation: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3',
    courtroom: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    tense: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'
};

// Sound effects
const SOUND_EFFECTS = {
    click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
    success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    error: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
    clue_found: 'https://assets.mixkit.co/active_storage/sfx/2574/2574-preview.mp3',
    warning: 'https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3',
    case_closed: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
    typing: 'https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3',
    door: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3'
};

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
        ambient_audio: "office",
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
                ambient_audio: "sirens",
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
                ambient_audio: "lab",
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
                ambient_audio: "interrogation",
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
                ambient_audio: "office",
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
                ambient_audio: "outdoor",
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
                ambient_audio: "outdoor",
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
                ambient_audio: "courtroom",
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
        ambient_audio: "lab",
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
                ambient_audio: "lab",
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
                ambient_audio: "lab",
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
                ambient_audio: "interrogation",
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
                ambient_audio: "courtroom",
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
    },
    // === NEW CASE 3: KIDNAPPING ===
    {
        id: "case-003",
        case_id: "FBI-KID-24-003",
        case_type: "KID",
        title: "The Vanishing Act",
        location_county: "Miami-Dade",
        location_state: "Florida",
        victim_overview: "Sophie Martinez, 8, daughter of real estate mogul Carlos Martinez, vanished from her private school's playground. A ransom demand of $5 million arrived within hours.",
        summary: "A child has been taken. The clock is ticking. Every decision you make could mean the difference between life and death. Navigate the complex web of suspects while racing against time.",
        difficulty: 5,
        time_limit_minutes: 15,
        tags: ["kidnapping", "ransom", "time-critical"],
        threat_level: "critical",
        crime_classification: "Kidnapping",
        conviction_threshold: 65,
        max_procedural_violations: 2,
        is_free: false,
        ambient_audio: "tense",
        suspects: [
            {
                id: "suspect-201",
                name: "Ricardo Vega",
                age: 35,
                role: "Former Employee",
                motive_angle: "Fired by Carlos Martinez last year after embezzlement allegations. Lost everything - home, family, reputation.",
                alibi_summary: "Claims he was at a job interview across town. The company confirms the interview but timing is tight.",
                risk_notes: "Desperate and bitter. Has knowledge of the family's routine and security protocols.",
                is_guilty: true,
                personality_type: "hostile",
                breaking_point: 3,
                lawyer_threshold: 2,
                cooperation_level: 25
            },
            {
                id: "suspect-202",
                name: "Isabella Martinez",
                age: 34,
                role: "Stepmother",
                motive_angle: "Prenup gives her nothing in divorce. Sophie's disappearance devastates Carlos, potentially keeping the marriage intact.",
                alibi_summary: "At a spa appointment. Staff confirms her presence but she stepped out for 'a phone call' for 20 minutes.",
                risk_notes: "Cold and calculating. Genuinely seems distraught but something feels off.",
                is_guilty: false,
                personality_type: "calculating",
                breaking_point: 4,
                lawyer_threshold: 1,
                cooperation_level: 45
            },
            {
                id: "suspect-203",
                name: "Marcus Webb",
                age: 42,
                role: "School Security Guard",
                motive_angle: "Gambling debts totaling $200,000. Has access to school grounds and knows all blind spots.",
                alibi_summary: "Was on duty but 'took a bathroom break' during the window of disappearance.",
                risk_notes: "Nervous and evasive. Quick to blame others.",
                is_guilty: false,
                personality_type: "defensive",
                breaking_point: 2,
                lawyer_threshold: 3,
                cooperation_level: 55
            }
        ],
        scenes: [
            {
                id: "S0",
                order: 0,
                title: "The Empty Playground",
                narration: "Palm trees sway in the humid Miami breeze as you duck under the yellow crime scene tape. Pinecrest Academy's playground sits eerily empty - swings creaking in the wind.\n\nAgent Torres from the Miami Field Office briefs you: 'Sophie Martinez, age 8, was last seen on these swings at 3:15 PM. Teacher turned away for two minutes. When she looked back - gone.'\n\nHe hands you a phone showing the ransom message: '$5 MILLION. 48 HOURS. NO COPS OR SHE DIES.'\n\nYour phone shows 47 hours, 23 minutes remaining.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "crime_scene",
                ambient_audio: "outdoor",
                choices: [
                    {
                        id: "choice-201",
                        text: "Review security camera footage immediately",
                        score_delta: 15,
                        add_clues: ["clue-201"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 10,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-202",
                        text: "Interview the teacher who was supervising",
                        score_delta: 10,
                        add_clues: ["clue-202"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-203",
                        text: "Set up an unauthorized wire tap on the Martinez home",
                        score_delta: 20,
                        add_clues: ["clue-203"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "high",
                        conviction_delta: -15,
                        evidence_strength_delta: 20,
                        procedural_violation: "illegal_search"
                    }
                ],
                media_urls: []
            },
            {
                id: "S1",
                order: 1,
                title: "Following the Trail",
                narration: "The security footage reveals a dark van parked near the school's rear gate - a blind spot the security guard conveniently missed. The van's plates are obscured but your tech team enhances the footage.\n\n'Got it,' Agent Torres announces. 'Van's registered to a rental company. Cash payment, fake ID, but...' He pauses. 'The name used was Robert Vega. Ricardo Vega's brother died ten years ago.'\n\nSimultaneously, your financial team reports that the school security guard, Marcus Webb, made a large cash deposit yesterday. And Isabella Martinez's phone records show a burner phone number she's been calling for weeks.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "briefing",
                ambient_audio: "office",
                choices: [
                    {
                        id: "choice-204",
                        text: "Bring in Ricardo Vega for questioning - the alias is too coincidental",
                        score_delta: 20,
                        add_clues: ["clue-204"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-205",
                        text: "Investigate Marcus Webb's suspicious deposit",
                        score_delta: 10,
                        add_clues: ["clue-205"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 5,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-206",
                        text: "Confront Isabella about the burner phone",
                        score_delta: 15,
                        add_clues: ["clue-206"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "low",
                        conviction_delta: 10,
                        evidence_strength_delta: 10
                    }
                ],
                media_urls: []
            },
            {
                id: "S2",
                order: 2,
                title: "The Interrogation",
                narration: "Ricardo Vega sits in the interrogation room, sweat beading on his forehead. He's fidgeting, eyes darting to the door.\n\n'I didn't do anything,' he says before you even ask a question. 'Carlos ruined my life, sure. But I'd never hurt a kid. Never.'\n\nHis alibi checks out for the exact moment of abduction, but there's a two-hour window unaccounted for. When you mention the rental van, his face goes pale.\n\n'I... I need a lawyer.'",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                ambient_audio: "interrogation",
                choices: [
                    {
                        id: "choice-207",
                        text: "Press harder - a child's life is at stake",
                        score_delta: 25,
                        add_clues: ["clue-207"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "medium",
                        conviction_delta: 25,
                        evidence_strength_delta: 20
                    },
                    {
                        id: "choice-208",
                        text: "Get a warrant to search his residence",
                        score_delta: 20,
                        add_clues: ["clue-208"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 25,
                        legal_requirement: "warrant"
                    },
                    {
                        id: "choice-209",
                        text: "Search his car without waiting for warrant - time is critical",
                        score_delta: 15,
                        add_clues: ["clue-209"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "high",
                        conviction_delta: -20,
                        evidence_strength_delta: 15,
                        procedural_violation: "illegal_search"
                    }
                ],
                media_urls: []
            },
            {
                id: "S3",
                order: 3,
                title: "The Breakthrough",
                narration: "The search warrant pays off. In Ricardo Vega's apartment, agents find Sophie's school backpack hidden in a closet. More damning - a prepaid phone with messages coordinating the pickup.\n\nBut the best evidence comes from the phone's GPS history: it pinged a warehouse in Hialeah just two hours ago.\n\nYou have enough to make your accusation, but Sophie is still missing. Every minute counts.",
                is_interview_scene: false,
                is_accusation_scene: true,
                scene_type: "briefing",
                ambient_audio: "tense",
                choices: [
                    {
                        id: "choice-210",
                        text: "Make your accusation and coordinate the rescue",
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
                id: "clue-201",
                label: "Security Footage",
                description: "Dark van with obscured plates near the school's rear gate - a known blind spot.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "photograph",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            },
            {
                id: "clue-202",
                label: "Teacher's Account",
                description: "Sophie mentioned a 'nice man' who waved at her from outside the fence the day before.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "witness",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 10
            },
            {
                id: "clue-203",
                label: "Wiretap Recording (Suppressed)",
                description: "Recording of Carlos Martinez discussing the ransom. May be inadmissible.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: false,
                legally_obtained: false,
                evidence_strength: 15
            },
            {
                id: "clue-204",
                label: "Van Registration",
                description: "Van rented with fake ID using the name 'Robert Vega' - Ricardo's deceased brother.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-205",
                label: "Webb's Cash Deposit",
                description: "$10,000 cash deposit day before kidnapping. Claims it's gambling winnings.",
                load_bearing: false,
                misdirection: true,
                evidence_category: "financial",
                evidence_type: "transaction",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 5
            },
            {
                id: "clue-206",
                label: "Isabella's Burner",
                description: "Isabella has been calling a divorce lawyer secretly. Motive seems unrelated.",
                load_bearing: false,
                misdirection: true,
                evidence_category: "digital",
                evidence_type: "metadata",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 5
            },
            {
                id: "clue-207",
                label: "Vega's Breakdown",
                description: "Under pressure, Vega revealed he 'only wanted to scare Carlos' and mentioned a warehouse.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-208",
                label: "Sophie's Backpack",
                description: "Found hidden in Vega's apartment closet along with the ransom demands.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-209",
                label: "Car Evidence (Suppressed)",
                description: "Sophie's hair ribbon found in Vega's car. Obtained without warrant.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: false,
                legally_obtained: false,
                evidence_strength: 15
            }
        ],
        endings: [
            {
                id: "ending-201",
                type: "CLOSED",
                title: "Sophie Found Alive",
                narration: "The tactical team breached the Hialeah warehouse at 0347 hours. Sophie Martinez was found unharmed, scared but alive, in a makeshift bedroom on the second floor.\n\nRicardo Vega's plan had been simple: ransom money to start over somewhere far away. He never intended to hurt the child, but the law doesn't distinguish between intentions.\n\nVega received 25 years. Carlos Martinez's testimony about his treatment of employees led to reforms in his company.\n\nSophie is home. That's what matters.",
                cp_base: 50,
                min_conviction_probability: 65,
                max_procedural_risk: "medium"
            },
            {
                id: "ending-202",
                type: "DISMISSED",
                title: "Case Collapsed",
                narration: "The evidence wasn't enough. Defense attorneys tore apart the circumstantial case, and key evidence was suppressed due to procedural issues.\n\nVega walked free. Sophie was eventually found, traumatized, in an abandoned building three days later - released when Vega realized he couldn't escape.\n\nThe kidnapper is free. A child is scarred for life. The system failed.",
                cp_base: 5,
                min_conviction_probability: 0,
                max_procedural_risk: "critical"
            },
            {
                id: "ending-203",
                type: "ESCALATED",
                title: "Task Force Recognition",
                narration: "Your work on the Martinez case was exemplary. Not only did you rescue Sophie within 24 hours, but your investigation uncovered a network of for-hire kidnappers operating across three states.\n\nThe Bureau has created a special task force to pursue these cases, and you've been chosen to lead it. Your quick thinking and adherence to procedure saved a life and will save many more.\n\nExceptional work, Agent.",
                cp_base: 60,
                min_conviction_probability: 85,
                max_procedural_risk: "low"
            }
        ]
    },
    // === NEW CASE 4: FINANCIAL CRIMES ===
    {
        id: "case-004",
        case_id: "FBI-FIN-24-004",
        case_type: "FIN",
        title: "The Ponzi Prince",
        location_county: "Manhattan",
        location_state: "New York",
        victim_overview: "Thousands of investors have lost their life savings in Meridian Capital, a hedge fund that promised 20% annual returns. Total losses exceed $800 million.",
        summary: "A sophisticated financial scheme has devastated thousands. The mastermind hides behind layers of corporate entities and offshore accounts. Follow the money to bring down Wall Street's biggest fraud.",
        difficulty: 4,
        time_limit_minutes: 25,
        tags: ["financial", "fraud", "white-collar"],
        threat_level: "high",
        crime_classification: "Financial Crimes",
        conviction_threshold: 75,
        max_procedural_violations: 3,
        is_free: false,
        ambient_audio: "office",
        suspects: [
            {
                id: "suspect-301",
                name: "Jonathan Pierce",
                age: 52,
                role: "Fund Manager & CEO",
                motive_angle: "Lifestyle far exceeds legitimate income. Three estates, yacht, private jet. The math doesn't add up.",
                alibi_summary: "Currently cooperating with investigators. Has hired a team of lawyers.",
                risk_notes: "Charming and persuasive. Built his career on trust. Will use every legal trick available.",
                is_guilty: true,
                personality_type: "calculating",
                breaking_point: 5,
                lawyer_threshold: 1,
                cooperation_level: 40
            },
            {
                id: "suspect-302",
                name: "Amanda Pierce",
                age: 48,
                role: "CFO & Wife",
                motive_angle: "Signed off on all financial statements. Either complicit or willfully blind.",
                alibi_summary: "Claims she trusted her husband and rubber-stamped documents.",
                risk_notes: "Potentially a victim herself. May flip if offered immunity.",
                is_guilty: false,
                personality_type: "cooperative",
                breaking_point: 2,
                lawyer_threshold: 2,
                cooperation_level: 60
            },
            {
                id: "suspect-303",
                name: "David Reinholt",
                age: 38,
                role: "Chief Accountant",
                motive_angle: "Received $2 million in unexplained bonuses over five years. Managed the books.",
                alibi_summary: "Claims he was 'just following orders' and didn't understand the full picture.",
                risk_notes: "Nervous. Has young family. Might cooperate to avoid prison.",
                is_guilty: false,
                personality_type: "defensive",
                breaking_point: 2,
                lawyer_threshold: 3,
                cooperation_level: 55
            }
        ],
        scenes: [
            {
                id: "S0",
                order: 0,
                title: "The Glass Tower",
                narration: "Meridian Capital's headquarters occupy the top three floors of a Manhattan skyscraper. Floor-to-ceiling windows offer views of Central Park that most New Yorkers will never see.\n\nYour team has been granted access after the SEC's emergency freeze. Forensic accountants are already poring over files, but you know the real story lies in what's been hidden.\n\nJonathan Pierce himself greets you at the elevator. 'Agent, I want to assure you of our full cooperation. This is all a misunderstanding - a few bad trades, some accounting errors. Nothing more.'\n\nHis smile doesn't reach his eyes.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "crime_scene",
                ambient_audio: "office",
                choices: [
                    {
                        id: "choice-301",
                        text: "Examine the trading records and financial statements",
                        score_delta: 15,
                        add_clues: ["clue-301"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 10,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-302",
                        text: "Interview David Reinholt separately - accountants know where bodies are buried",
                        score_delta: 10,
                        add_clues: ["clue-302"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 8,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-303",
                        text: "Seize Pierce's personal computer without warrant - the evidence might disappear",
                        score_delta: 20,
                        add_clues: ["clue-303"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "high",
                        conviction_delta: -20,
                        evidence_strength_delta: 20,
                        procedural_violation: "illegal_search"
                    }
                ],
                media_urls: []
            },
            {
                id: "S1",
                order: 1,
                title: "The Paper Trail",
                narration: "The forensic accounting team has found something significant. The trading records show a pattern: actual trades were minimal, yet investor statements showed consistent gains.\n\n'Classic Ponzi structure,' your analyst explains. 'New investor money paid returns to old investors. There was never any real investment strategy.'\n\nThe offshore accounts are more interesting. Shell companies in the Caymans, Luxembourg, and Singapore - all leading back to a single trust. A trust with one beneficiary: Jonathan Pierce.\n\nDavid Reinholt has requested to speak with you. He says he 'has information that will change everything.'",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "evidence_lab",
                ambient_audio: "office",
                choices: [
                    {
                        id: "choice-304",
                        text: "Meet with David Reinholt",
                        score_delta: 20,
                        add_clues: ["clue-304"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 15,
                        evidence_strength_delta: 20
                    },
                    {
                        id: "choice-305",
                        text: "Subpoena the offshore bank records",
                        score_delta: 15,
                        add_clues: ["clue-305"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 25,
                        legal_requirement: "warrant"
                    },
                    {
                        id: "choice-306",
                        text: "Confront Jonathan Pierce directly with the evidence",
                        score_delta: 10,
                        add_clues: ["clue-306"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "low",
                        conviction_delta: 10,
                        evidence_strength_delta: 10
                    }
                ],
                media_urls: []
            },
            {
                id: "S2",
                order: 2,
                title: "The Whistleblower",
                narration: "David Reinholt meets you in a conference room, looking like he hasn't slept in days. His lawyer sits beside him, ready to negotiate.\n\n'I have emails,' David says, pulling out a USB drive. 'Jonathan knew from the beginning. He instructed me to create false trading records. Amanda signed off on everything, but I'm not sure she understood.'\n\nThe emails are damning. Instructions to 'smooth the numbers,' 'create investor confidence,' and most critically: 'the returns don't need to be real, they just need to look real.'\n\n'I want immunity,' David says. 'Full cooperation for immunity.'",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                ambient_audio: "office",
                choices: [
                    {
                        id: "choice-307",
                        text: "Recommend immunity deal - his testimony is crucial",
                        score_delta: 25,
                        add_clues: ["clue-307"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 25,
                        evidence_strength_delta: 25
                    },
                    {
                        id: "choice-308",
                        text: "Take the evidence without promising immunity",
                        score_delta: 15,
                        add_clues: ["clue-308"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "low",
                        conviction_delta: 15,
                        evidence_strength_delta: 15
                    }
                ],
                media_urls: []
            },
            {
                id: "S3",
                order: 3,
                title: "The Reckoning",
                narration: "The case is ready. You have:\n\n- Trading records proving no legitimate investment activity\n- Offshore accounts showing $200 million in stolen funds\n- A cooperating witness with incriminating emails\n- Bank records tracing money to Pierce's personal trust\n\nJonathan Pierce sits in the interview room, his $3,000 suit a stark contrast to the institutional gray walls. His lawyers flank him like guard dogs.\n\n'Agent, my client maintains his innocence. This was a legitimate business that suffered unfortunate losses. Unless you're prepared to make an arrest, we'll be leaving.'\n\nIt's time to make your move.",
                is_interview_scene: false,
                is_accusation_scene: true,
                scene_type: "courtroom",
                ambient_audio: "courtroom",
                choices: [
                    {
                        id: "choice-309",
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
                id: "clue-301",
                label: "Trading Records",
                description: "Actual trades were minimal. Returns were fabricated through accounting manipulation.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-302",
                label: "Reinholt's Concerns",
                description: "Accountant admits he was instructed to 'make the numbers work.'",
                load_bearing: false,
                misdirection: false,
                evidence_category: "witness",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 10
            },
            {
                id: "clue-303",
                label: "Pierce's Computer (Suppressed)",
                description: "Contains deleted files showing fund transfers. Seized improperly.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: false,
                legally_obtained: false,
                evidence_strength: 20
            },
            {
                id: "clue-304",
                label: "Incriminating Emails",
                description: "Jonathan Pierce explicitly instructed creation of false trading records.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-305",
                label: "Offshore Records",
                description: "$200 million traced through shell companies to Pierce's personal trust.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "transaction",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-306",
                label: "Pierce's Denial",
                description: "When confronted, Pierce blamed 'rogue employees' and 'market conditions.'",
                load_bearing: false,
                misdirection: false,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 5
            },
            {
                id: "clue-307",
                label: "Cooperating Witness",
                description: "David Reinholt has agreed to testify against Pierce in exchange for immunity.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "witness",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-308",
                label: "Documentary Evidence",
                description: "USB drive containing emails, without formal cooperation agreement.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            }
        ],
        endings: [
            {
                id: "ending-301",
                type: "CLOSED",
                title: "The King Falls",
                narration: "Jonathan Pierce's empire crumbled in spectacular fashion. The trial lasted three months, but the outcome was never in doubt. The evidence was overwhelming.\n\nPierce received 150 years - effectively a life sentence. The court ordered forfeiture of all assets, which will be distributed to victims. It won't make them whole, but it's something.\n\nThe Meridian case is now taught in FBI training as a textbook example of financial crime investigation.\n\nJustice, in this case, was served.",
                cp_base: 45,
                min_conviction_probability: 75,
                max_procedural_risk: "medium"
            },
            {
                id: "ending-302",
                type: "DISMISSED",
                title: "Walking Away",
                narration: "Pierce's legal team earned their fees. They challenged every piece of evidence, questioned every witness, and exploited every procedural misstep.\n\nThe jury couldn't reach a verdict. The judge declared a mistrial.\n\nJonathan Pierce walked out of the courthouse a free man, though his reputation was destroyed. He now lives in a country without extradition treaties, still wealthy from hidden accounts.\n\n$800 million stolen. Thousands of lives ruined. And the mastermind walks free.",
                cp_base: 5,
                min_conviction_probability: 0,
                max_procedural_risk: "critical"
            },
            {
                id: "ending-303",
                type: "ESCALATED",
                title: "The Network Exposed",
                narration: "The Pierce investigation was just the beginning. Your meticulous work uncovered a network of financial criminals across Wall Street - a web of fraud touching dozens of funds and billions of dollars.\n\nThe Bureau has established a special Financial Crimes Task Force, and you've been named lead investigator. The skills you demonstrated here will be crucial in cleaning up the darkest corners of American finance.\n\nExceptional work, Agent. This is just the start.",
                cp_base: 55,
                min_conviction_probability: 85,
                max_procedural_risk: "low"
            }
        ]
    },
    // === NEW CASE 5: DOMESTIC TERRORISM ===
    {
        id: "case-005",
        case_id: "FBI-TER-24-005",
        case_type: "TER",
        title: "Countdown",
        location_county: "Hennepin",
        location_state: "Minnesota",
        victim_overview: "A credible threat has been received targeting the Minneapolis Convention Center during the National Tech Summit. 15,000 attendees. 48 hours until the event.",
        summary: "A domestic terror cell is planning an attack. Intelligence suggests multiple operatives and a complex plot. Race against time to identify the threat and prevent catastrophe.",
        difficulty: 5,
        time_limit_minutes: 18,
        tags: ["terrorism", "time-critical", "prevention"],
        threat_level: "critical",
        crime_classification: "Domestic Terrorism",
        conviction_threshold: 60,
        max_procedural_violations: 2,
        is_free: false,
        ambient_audio: "tense",
        suspects: [
            {
                id: "suspect-401",
                name: "Thomas Greene",
                age: 44,
                role: "Militia Leader",
                motive_angle: "Leader of 'True Patriots' militia. Anti-government rhetoric has escalated to calls for 'direct action.'",
                alibi_summary: "Claims to be planning a 'peaceful demonstration' outside the event.",
                risk_notes: "Charismatic and ideologically committed. Followers are fiercely loyal.",
                is_guilty: true,
                personality_type: "hostile",
                breaking_point: 5,
                lawyer_threshold: 1,
                cooperation_level: 15
            },
            {
                id: "suspect-402",
                name: "Sarah Mitchell",
                age: 31,
                role: "Recent Convert",
                motive_angle: "Former tech worker laid off during automation wave. Joined militia six months ago.",
                alibi_summary: "Has access to the convention center as a former contractor. Security badge may still be active.",
                risk_notes: "Recent radicalization. May still have doubts. Potential to flip.",
                is_guilty: false,
                personality_type: "cooperative",
                breaking_point: 2,
                lawyer_threshold: 3,
                cooperation_level: 50
            },
            {
                id: "suspect-403",
                name: "Michael Torres",
                age: 38,
                role: "Explosives Expert",
                motive_angle: "Former military demolitions specialist. Discharged under unclear circumstances.",
                alibi_summary: "Surveillance shows him purchasing large quantities of fertilizer.",
                risk_notes: "Technical expertise makes him extremely dangerous. Quiet and methodical.",
                is_guilty: true,
                personality_type: "calculating",
                breaking_point: 4,
                lawyer_threshold: 2,
                cooperation_level: 25
            }
        ],
        scenes: [
            {
                id: "S0",
                order: 0,
                title: "The Threat",
                narration: "The message arrived at 0347 hours: 'The National Tech Summit celebrates everything wrong with America. Technology that steals jobs. Elites who profit from suffering. In 48 hours, we send our message. True Patriots.'\n\nThe Joint Terrorism Task Force has been mobilized. Every available agent is working this case.\n\nSurveillance has identified three persons of interest with connections to the 'True Patriots' militia. Each presents a different threat vector.\n\nThe clock shows 47:12:33 remaining.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "briefing",
                ambient_audio: "tense",
                choices: [
                    {
                        id: "choice-401",
                        text: "Focus on Thomas Greene - the leader is the key",
                        score_delta: 15,
                        add_clues: ["clue-401"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 10,
                        evidence_strength_delta: 10
                    },
                    {
                        id: "choice-402",
                        text: "Investigate Sarah Mitchell's convention center access",
                        score_delta: 20,
                        add_clues: ["clue-402"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 15,
                        evidence_strength_delta: 15
                    },
                    {
                        id: "choice-403",
                        text: "Track Michael Torres's fertilizer purchases",
                        score_delta: 25,
                        add_clues: ["clue-403"],
                        require_clues: [],
                        next_scene_id: "S1",
                        risk_flag: "none",
                        conviction_delta: 20,
                        evidence_strength_delta: 20
                    }
                ],
                media_urls: []
            },
            {
                id: "S1",
                order: 1,
                title: "The Compound",
                narration: "Aerial surveillance of the True Patriots compound reveals increased activity. Vehicles coming and going at odd hours. A large shed that wasn't there two months ago.\n\nSarah Mitchell was spotted leaving the compound yesterday. She looked nervous, kept looking over her shoulder.\n\nMeanwhile, your team has tracked Torres's fertilizer to a storage unit on the outskirts of the city. Enough material for a significant explosive device.\n\nThe clock reads 36:45:21.",
                is_interview_scene: false,
                is_accusation_scene: false,
                scene_type: "investigation",
                ambient_audio: "outdoor",
                choices: [
                    {
                        id: "choice-404",
                        text: "Approach Sarah Mitchell as potential informant",
                        score_delta: 25,
                        add_clues: ["clue-404"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "low",
                        conviction_delta: 20,
                        evidence_strength_delta: 20
                    },
                    {
                        id: "choice-405",
                        text: "Get warrant to search the storage unit",
                        score_delta: 20,
                        add_clues: ["clue-405"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "none",
                        conviction_delta: 25,
                        evidence_strength_delta: 25,
                        legal_requirement: "warrant"
                    },
                    {
                        id: "choice-406",
                        text: "Raid the compound immediately - can't risk waiting",
                        score_delta: 10,
                        add_clues: ["clue-406"],
                        require_clues: [],
                        next_scene_id: "S2",
                        risk_flag: "high",
                        conviction_delta: -15,
                        evidence_strength_delta: 10,
                        procedural_violation: "premature_arrest"
                    }
                ],
                media_urls: []
            },
            {
                id: "S2",
                order: 2,
                title: "The Informant",
                narration: "Sarah Mitchell agreed to meet at a secure location. She's terrified but resolute.\n\n'They're planning something big,' she says. 'I joined because I was angry about losing my job. But this... this isn't protest. This is murder.'\n\nShe provides details: Torres has built a vehicle-borne device. Greene plans to drive it into the convention center's underground parking garage during the keynote speech.\n\n'The attack is planned for tomorrow. 10 AM. When the keynote starts.'\n\nYou have enough for arrests, but you need to find the device.",
                is_interview_scene: true,
                is_accusation_scene: false,
                scene_type: "interrogation",
                ambient_audio: "office",
                choices: [
                    {
                        id: "choice-407",
                        text: "Coordinate with SWAT for compound raid while securing the storage unit",
                        score_delta: 30,
                        add_clues: ["clue-407"],
                        require_clues: [],
                        next_scene_id: "S3",
                        risk_flag: "none",
                        conviction_delta: 30,
                        evidence_strength_delta: 30
                    },
                    {
                        id: "choice-408",
                        text: "Arrest Greene immediately to prevent the attack",
                        score_delta: 20,
                        add_clues: ["clue-408"],
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
                title: "The Takedown",
                narration: "The operation unfolds at dawn. SWAT teams hit the compound and storage unit simultaneously. Thomas Greene is taken into custody without incident - he wasn't expecting the raid.\n\nThe storage unit yields the evidence you need: a van packed with explosives, detailed plans of the convention center, and Torres's fingerprints everywhere.\n\nMichael Torres was arrested at a motel three miles away. The attack has been prevented.\n\nNow it's time to ensure these men never see freedom again.",
                is_interview_scene: false,
                is_accusation_scene: true,
                scene_type: "courtroom",
                ambient_audio: "courtroom",
                choices: [
                    {
                        id: "choice-409",
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
                id: "clue-401",
                label: "Greene's Manifesto",
                description: "Online posts calling for 'decisive action against the tech elite.'",
                load_bearing: false,
                misdirection: false,
                evidence_category: "digital",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 10
            },
            {
                id: "clue-402",
                label: "Mitchell's Badge",
                description: "Sarah's contractor badge was still active - potential access point identified.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "document",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            },
            {
                id: "clue-403",
                label: "Fertilizer Trail",
                description: "Torres purchased 500 lbs of ammonium nitrate - consistent with explosive manufacturing.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "financial",
                evidence_type: "transaction",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 20
            },
            {
                id: "clue-404",
                label: "Mitchell's Testimony",
                description: "Detailed account of attack plans, timeline, and Greene's leadership role.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "witness",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-405",
                label: "Storage Unit Evidence",
                description: "Explosive device components, convention center blueprints, Torres's DNA.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 25
            },
            {
                id: "clue-406",
                label: "Premature Raid Evidence (Challenged)",
                description: "Evidence from compound raid may be suppressed due to procedural issues.",
                load_bearing: false,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "generic",
                chain_of_custody: false,
                legally_obtained: false,
                evidence_strength: 10
            },
            {
                id: "clue-407",
                label: "Complete Evidence Package",
                description: "Full documentary and physical evidence from coordinated operation.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "physical",
                evidence_type: "dna",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 30
            },
            {
                id: "clue-408",
                label: "Greene's Arrest",
                description: "Greene in custody, but device location initially unknown.",
                load_bearing: true,
                misdirection: false,
                evidence_category: "behavioral",
                evidence_type: "statement",
                chain_of_custody: true,
                legally_obtained: true,
                evidence_strength: 15
            }
        ],
        endings: [
            {
                id: "ending-401",
                type: "CLOSED",
                title: "Attack Prevented",
                narration: "The National Tech Summit proceeded without incident. 15,000 people went home safely, never knowing how close they came to tragedy.\n\nThomas Greene and Michael Torres were convicted on multiple counts of conspiracy to commit terrorism and weapons of mass destruction charges. They will spend the rest of their lives in federal prison.\n\nSarah Mitchell testified against them and entered witness protection. She saved thousands of lives.\n\nYour vigilance protected the innocent. Well done, Agent.",
                cp_base: 55,
                min_conviction_probability: 60,
                max_procedural_risk: "medium"
            },
            {
                id: "ending-402",
                type: "COMPROMISED",
                title: "Partial Success",
                narration: "The attack was prevented, but procedural violations meant the prosecution's case was weakened. Greene received a reduced sentence on lesser charges and will be eligible for parole in fifteen years.\n\nTorres, the bomb maker, received the full sentence, but Greene's followers see him as a martyr.\n\nThe threat was neutralized, but justice was incomplete.",
                cp_base: 20,
                min_conviction_probability: 0,
                max_procedural_risk: "low"
            },
            {
                id: "ending-403",
                type: "ESCALATED",
                title: "Counterterrorism Honor",
                narration: "Your work on the True Patriots case has been recognized at the highest levels. Not only did you prevent a mass casualty attack, but your investigation exposed a nationwide network of extremist cells.\n\nYou've been awarded the FBI Star and offered a position at the National Counterterrorism Center. Your expertise will help protect the nation for years to come.\n\nExceptional work, Agent. The nation owes you a debt it can never repay.",
                cp_base: 65,
                min_conviction_probability: 85,
                max_procedural_risk: "low"
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

// Get ambient audio URL
function getAmbientAudio(type) {
    return AMBIENT_AUDIO[type] || AMBIENT_AUDIO.office;
}

// Get sound effect URL
function getSoundEffect(type) {
    return SOUND_EFFECTS[type] || null;
}
