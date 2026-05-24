export type MatchCategory = "airline" | "hotel" | "auto"

export type Match = {
  id: string
  program: string
  category: MatchCategory
  matchRate: number
  cost: string
  difficulty: "easy" | "medium" | "hard"
  requirements: string[]
  howToApply: {
    method: "email" | "web_form" | "both"
    email?: string
    url?: string
    template: string
  }
  tips: string
  votes: number
}

export const matches: Match[] = [
  // ── HOTELS ──────────────────────────────────────
  {
    id: "best-western",
    program: "Best Western Rewards",
    category: "hotel",
    matchRate: 96,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Enroll in Best Western Rewards (free)",
      "Screenshot of existing elite status from any hotel program",
      "Full name and BWR member number",
      "Phone number",
    ],
    howToApply: {
      method: "email",
      email: "statusmatch@bestwestern.com",
      url: "https://new.bestwestern.com/en_US/best-western-rewards/status-match.html",
      template: `Subject: Status Match Request

Dear Best Western Rewards Team,

I would like to request a status match for my Best Western Rewards account.

Name: {name}
BWR Member Number: {memberId}
Phone: [Your Phone Number]

I currently hold {status} elite status and have attached a screenshot as proof.

I would like to be matched to your Diamond/Diamond Select tier if possible.

Thank you for your consideration.

Best regards,
{name}`,
    },
    tips: "Response within 1 day. Very generous match policy. Many report same-day approval. Also try discoverasr.com/en/statusmatch for an alternative route.",
    votes: 108,
  },
  {
    id: "ascott",
    program: "Ascott The Residence",
    category: "hotel",
    matchRate: 100,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status",
      "ASCOTT member account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.discoverasr.com/en/statusmatch",
      template: `Subject: Status Match Request - Ascott The Residence

Dear Ascott Team,

I would like to request a status match for my Ascott The Residence account.

Name: {name}
Member ID: {memberId}
Current Status: {status}

Please find attached proof of my current elite status.

Thank you,
{name}`,
    },
    tips: "100% success rate in reported matches. Use the discoverASR status match portal for fastest processing.",
    votes: 15,
  },
  {
    id: "sonesta",
    program: "Sonesta Travel Pass",
    category: "hotel",
    matchRate: 100,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status proof",
      "Sonesta Travel Pass account",
    ],
    howToApply: {
      method: "email",
      email: "travelpass@sonesta.com",
      template: `Subject: Sonesta Travel Pass Status Match Request

Dear Sonesta Travel Pass Team,

I would like to request a status match.

Name: {name}
Travel Pass Member Number: {memberId}
Current Elite Status: {status}

I have attached proof of my current status. Thank you for your time.

Best regards,
{name}`,
    },
    tips: "Multiple reports of quick matches. Email with status proof to travelpass@sonesta.com.",
    votes: 8,
  },
  {
    id: "wyndham",
    program: "Wyndham Rewards",
    category: "hotel",
    matchRate: 74,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status (any major chain)",
      "Wyndham Rewards account",
      "Screenshot of current status card",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.wyndhamhotels.com/wyndham-rewards/status-match",
      template: `Subject: Wyndham Rewards Status Match

Dear Wyndham Rewards Team,

I am requesting a status match for my Wyndham Rewards account.

Name: {name}
Wyndham Rewards Number: {memberId}
Current Status: {status}

Screenshot of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Wyndham matches to Diamond tier. Use the dedicated status match page on their website.",
    votes: 45,
  },
  {
    id: "radisson-americas",
    program: "Radisson Rewards (Americas)",
    category: "hotel",
    matchRate: 79,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status",
      "Radisson Rewards account",
    ],
    howToApply: {
      method: "email",
      email: "statusmatch@radissonhotelsamericas.com",
      template: `Subject: Status Match Request

Dear Radisson Rewards Team,

I would like to request a status match for my Radisson Rewards account.

Name: {name}
Member Number: {memberId}
Current Elite Status: {status}

Proof of my current status is attached.

Thank you,
{name}`,
    },
    tips: "Americas region is more generous than global Radisson. Can match from Best Western, Hilton, IHG, Marriott.",
    votes: 38,
  },
  {
    id: "choice-hotels",
    program: "Choice Privileges",
    category: "hotel",
    matchRate: 79,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status",
      "Choice Privileges account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.choicehotels.com/choice-privileges/status-match",
      template: `Subject: Choice Privileges Status Match

Dear Choice Privileges Team,

I am writing to request a status match for my Choice Privileges account.

Name: {name}
Member Number: {memberId}
Current Status: {status}

Proof attached.

Best regards,
{name}`,
    },
    tips: "Includes Comfort, Quality, Clarion, Cambria, Ascend, Sleep Inn, EconoLodge, Rodeway Inn, MainStay, WoodSpring. Very broad portfolio.",
    votes: 32,
  },
  {
    id: "hilton",
    program: "Hilton Honors",
    category: "hotel",
    matchRate: 41,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing top-tier hotel status (Diamond from another chain)",
      "Hilton Honors account",
      "Status proof screenshot",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.hilton.com/en/hilton-honors/status-match/",
      template: `Subject: Hilton Honors Status Match Request

Dear Hilton Honors Team,

I would like to request a status match.

Name: {name}
Hilton Honors Number: {memberId}
Current Status: {status}

I have attached proof of my current elite status.

Thank you,
{name}`,
    },
    tips: "Hilton is selective. Higher success with top-tier status from Marriott, IHG, or Hyatt. May offer a challenge instead of instant match.",
    votes: 62,
  },
  {
    id: "marriott",
    program: "Marriott Bonvoy",
    category: "hotel",
    matchRate: 30,
    cost: "Free",
    difficulty: "hard",
    requirements: [
      "Top-tier status from competitor (Hilton Diamond, IHG Platinum Elite, etc.)",
      "Marriott Bonvoy account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://status-match.marriott.com/",
      template: `Subject: Marriott Bonvoy Status Match Request

Dear Marriott Bonvoy Team,

I would like to request a status match for my Bonvoy account.

Name: {name}
Bonvoy Number: {memberId}
Current Status: {status}

Proof of current status is attached.

Best regards,
{name}`,
    },
    tips: "Marriott has a formal status challenge program (16 nights in 90 days). Instant matches are rare. Look for seasonal status challenge promotions.",
    votes: 71,
  },
  {
    id: "hilton-garden-inn",
    program: "Hilton Garden Inn / DoubleTree",
    category: "hotel",
    matchRate: 41,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing hotel elite status",
      "Hilton Honors account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.hilton.com/en/hilton-honors/status-match/",
      template: `Subject: Hilton Honors Status Match

Dear Hilton Honors Team,

I am requesting a status match.

Name: {name}
Hilton Honors Number: {memberId}
Current Status: {status}

Proof attached. Thank you.

{name}`,
    },
    tips: "Same process as Hilton Honors. All Hilton brands (Waldorf, Conrad, DoubleTree, Hampton, Homewood, etc.) share the same status match system.",
    votes: 35,
  },
  {
    id: "ihg",
    program: "IHG One Rewards",
    category: "hotel",
    matchRate: 11,
    cost: "Free",
    difficulty: "hard",
    requirements: [
      "Top-tier status from major competitor",
      "IHG One Rewards account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.ihg.com/onerewards/status-match",
      template: `Subject: IHG One Rewards Status Match Request

Dear IHG Team,

I would like to request a status match for my IHG One Rewards account.

Name: {name}
Member Number: {memberId}
Current Status: {status}

Proof attached.

Thank you,
{name}`,
    },
    tips: "IHG rarely grants instant status matches. Look for their 'Status Match Challenge' promotions that run periodically.",
    votes: 55,
  },

  // ── AIRLINES ────────────────────────────────────
  {
    id: "turkish-airlines",
    program: "Turkish Airlines Miles & Smiles",
    category: "airline",
    matchRate: 53,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "At least 1 Turkish Airlines flight credited to account",
      "Passport photo/copy",
      "Screenshot of existing status card from another airline",
      "Recent flight activity (last 2 months)",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.turkishairlines.com/en-int/feedback/",
      template: `Subject: Miles & Smiles Status Match Request

Dear Turkish Airlines Miles & Smiles Team,

I would like to request a status match for my Miles & Smiles account.

Name: {name}
Miles & Smiles Number: {memberId}
Current Status: {status}

I have attached:
- Copy of my passport
- Screenshot of my current elite status card
- My recent flight activity

I have also credited a Turkish Airlines flight to my account as required.

I am requesting Elite / Elite Plus tier match.

Thank you for your consideration.

Best regards,
{name}`,
    },
    tips: "Must have at least 1 TK flight credited before applying. Use the TK feedback/contact form on their website. Lufthansa only matches at Senator level. 53% overall success.",
    votes: 205,
  },
  {
    id: "royal-jordanian",
    program: "Royal Jordanian Royal Club",
    category: "airline",
    matchRate: 86,
    cost: "€128",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Payment of €128",
    ],
    howToApply: {
      method: "web_form",
      url: "https://rj.statusmatch.com/",
      template: `Subject: Royal Club Status Match

I am applying for a Royal Jordanian Royal Club status match via the dedicated portal at https://rj.statusmatch.com/.

Name: {name}
Current Status: {status}

The processing fee of €128 has been paid.

Thank you,
{name}`,
    },
    tips: "Fastest paid match: approved within 8-10 hours typically. Maximum tier via match is Sapphire. Use rj.statusmatch.com directly.",
    votes: 48,
  },
  {
    id: "united-airlines",
    program: "United Airlines MileagePlus",
    category: "airline",
    matchRate: 61,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing airline elite status (any major carrier)",
      "MileagePlus account",
      "Screenshot of current status card",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.united.com/en/us/status-match",
      template: `Subject: MileagePlus Status Match Request

Dear United MileagePlus Team,

I am requesting a status match for my MileagePlus account.

Name: {name}
MileagePlus Number: {memberId}
Current Status: {status}

Screenshot of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Reports say it may take multiple attempts if initially rejected. Uploads of Virgin Gold screenshots have worked. Persistence pays off.",
    votes: 87,
  },
  {
    id: "air-france-klm",
    program: "Air France / KLM Flying Blue",
    category: "airline",
    matchRate: 78,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Flying Blue account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.flyingblue.com/en/status-match",
      template: `Subject: Flying Blue Status Match Request

Dear Flying Blue Team,

I would like to request a status match.

Name: {name}
Flying Blue Number: {memberId}
Current Status: {status}

Proof attached.

Merci,
{name}`,
    },
    tips: "Air France, KLM, and partners share Flying Blue. Good match rates at 78%. Transavia and other SkyTeam partners also accessible.",
    votes: 56,
  },
  {
    id: "singapore-airlines",
    program: "Singapore Airlines KrisFlyer",
    category: "airline",
    matchRate: 71,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing airline elite status",
      "KrisFlyer account",
      "Status proof screenshot",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.singaporeair.com/status-match",
      template: `Subject: KrisFlyer Status Match Request

Dear KrisFlyer Team,

I would like to request a status match for my KrisFlyer account.

Name: {name}
KrisFlyer Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Star Alliance member. Status match opens periodically. High value program with good redemption options.",
    votes: 42,
  },
  {
    id: "philippine-airlines",
    program: "Philippine Airlines Mabuhay Miles",
    category: "airline",
    matchRate: 88,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Mabuhay Miles account",
    ],
    howToApply: {
      method: "email",
      email: "mabuhaymiles@philippineairlines.com",
      template: `Subject: Mabuhay Miles Status Match Request

Dear Mabuhay Miles Team,

I am writing to request a status match.

Name: {name}
Mabuhay Miles Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you very much.

Best regards,
{name}`,
    },
    tips: "88% success rate. Email directly to mabuhaymiles@philippineairlines.com with your application and requirements.",
    votes: 18,
  },
  {
    id: "royal-air-maroc",
    program: "Royal Air Maroc Safar Flyer",
    category: "airline",
    matchRate: 85,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Safar Flyer account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.royalairmaroc.com/status-match",
      template: `Subject: Safar Flyer Status Match

Dear Safar Flyer Team,

I am requesting a status match.

Name: {name}
Safar Flyer Number: {memberId}
Current Status: {status}

Proof attached.

Thank you,
{name}`,
    },
    tips: "85% success rate. Oneworld Connect member - status recognized across Oneworld alliance.",
    votes: 22,
  },
  {
    id: "vietnam-airlines",
    program: "Vietnam Airlines Lotusmiles",
    category: "airline",
    matchRate: 87,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Lotusmiles account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.vietnamairlines.com/status-match",
      template: `Subject: Lotusmiles Status Match

Dear Lotusmiles Team,

I would like to request a status match for my Lotusmiles account.

Name: {name}
Lotusmiles Number: {memberId}
Current Status: {status}

Proof attached. Thank you.

{name}`,
    },
    tips: "87% success rate. SkyTeam member. Status recognized across all SkyTeam airlines.",
    votes: 16,
  },
  {
    id: "jetblue",
    program: "JetBlue TrueBlue Mosaic",
    category: "airline",
    matchRate: 77,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "TrueBlue account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.jetblue.com/status-match",
      template: `Subject: TrueBlue Mosaic Status Match

Dear JetBlue Team,

I would like to request a Mosaic status match.

Name: {name}
TrueBlue Number: {memberId}
Current Status: {status}

Proof attached. Thank you for your consideration.

{name}`,
    },
    tips: "77% success rate. Mosaic status provides valuable benefits on JetBlue including free changes, extra legroom, and priority boarding.",
    votes: 35,
  },
  {
    id: "alaska-airlines",
    program: "Alaska Airlines Mileage Plan",
    category: "airline",
    matchRate: 83,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "Mileage Plan account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.alaskaair.com/status-match",
      template: `Subject: Mileage Plan Status Match Request

Dear Alaska Mileage Plan Team,

I am requesting a status match for my Mileage Plan account.

Name: {name}
Mileage Plan Number: {memberId}
Current Status: {status}

Proof of status is attached.

Thank you,
{name}`,
    },
    tips: "83% success rate. Oneworld member. Status recognized across all Oneworld airlines including American Airlines, British Airways, Cathay Pacific.",
    votes: 40,
  },
  {
    id: "avianca",
    program: "Avianca LifeMiles",
    category: "airline",
    matchRate: 100,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "LifeMiles account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.lifemiles.com/status-match",
      template: `Subject: LifeMiles Status Match Request

Dear LifeMiles Team,

I would like to request a status match for my LifeMiles account.

Name: {name}
LifeMiles Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Gracias,
{name}`,
    },
    tips: "100% reported success rate. Star Alliance member. LifeMiles frequently sells miles at a discount and offers good redemption value.",
    votes: 14,
  },
  {
    id: "frontier-airlines",
    program: "Frontier Airlines FRONTIER Miles",
    category: "airline",
    matchRate: 78,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status",
      "FRONTIER Miles account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.flyfrontier.com/status-match",
      template: `Subject: FRONTIER Miles Status Match

Dear Frontier Team,

I am requesting a status match.

Name: {name}
FRONTIER Miles Number: {memberId}
Current Status: {status}

Proof attached. Thank you.

{name}`,
    },
    tips: "78% match rate. Budget carrier but elite status provides free carry-on, seat selection, and priority boarding. Good for domestic US travel.",
    votes: 28,
  },
  {
    id: "southwest-airlines",
    program: "Southwest Airlines Rapid Rewards",
    category: "airline",
    matchRate: 50,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing airline elite status",
      "Rapid Rewards account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.southwest.com/status-match",
      template: `Subject: Rapid Rewards Status Match Request

Dear Southwest Team,

I would like to request a status match for A-List / A-List Preferred.

Name: {name}
Rapid Rewards Number: {memberId}
Current Status: {status}

Proof attached.

Thank you,
{name}`,
    },
    tips: "Marked as 'M' (likely to match) on StatusMatcher. Southwest has no assigned seats but elite status provides priority boarding and bonus points.",
    votes: 24,
  },

  // ── AUTO RENTALS ───────────────────────────────
  {
    id: "national-emerald",
    program: "National Emerald Club",
    category: "auto",
    matchRate: 95,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing status from any hotel or airline program",
      "National Emerald Club account",
      "Screenshot of existing status",
    ],
    howToApply: {
      method: "web_form",
      url: "https://status.emeraldclub.com",
      template: `Subject: Emerald Club Status Match

I am requesting a status match for my National Emerald Club account.

Name: {name}
Emerald Club Number: {memberId}
Current Status: {status}

I have attached proof of my current elite status (I have also sent a screenshot of my Hilton/other status).

Thank you,
{name}`,
    },
    tips: "Two methods work: the status match page or email with a screenshot. Multiple reports of match to Executive Elite within hours. Use status.emeraldclub.com.",
    votes: 56,
  },
  {
    id: "sixt",
    program: "Sixt Diamond / Platinum",
    category: "auto",
    matchRate: 80,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing status from any hotel, airline, or competitor car rental program",
      "Sixt account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.sixt.com/status-match",
      template: `Subject: Sixt Status Match

Dear Sixt Team,

I am requesting a status match for my Sixt account.

Name: {name}
Sixt Customer Number: {memberId}
Current Status: {status}

Screenshot of my current status is attached.

Thank you,
{name}`,
    },
    tips: "Takes about 30 minutes via web link. Matches from hotel, airline, and other car rental programs all accepted.",
    votes: 32,
  },
  {
    id: "enterprise-plus",
    program: "Enterprise Plus",
    category: "auto",
    matchRate: 75,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing elite status (hotel, airline, or rental car)",
      "Enterprise Plus account",
    ],
    howToApply: {
      method: "email",
      email: "enterpriseplus@enterprise.com",
      template: `Subject: Enterprise Plus Status Match Request

Dear Enterprise Plus Team,

I am writing to request a status match.

Name: {name}
Enterprise Plus Number: {memberId}
Current Status: {status}

I have attached photos of my physical status cards as proof.

Thank you,
{name}`,
    },
    tips: "Reports of matching to Platinum within 48 hours. Send photos of physical status cards for better results.",
    votes: 18,
  },
  {
    id: "avis",
    program: "Avis Preferred Plus",
    category: "auto",
    matchRate: 65,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing elite status",
      "Avis Preferred account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.avis.com/en/status-match",
      template: `Subject: Avis Preferred Status Match

Dear Avis Team,

I am requesting a status match.

Name: {name}
Avis Preferred Number: {memberId}
Current Status: {status}

Proof of current status is attached.

Thank you,
{name}`,
    },
    tips: "Marked 'M' (likely to match) on StatusMatcher. More success with hotel status than airline status.",
    votes: 22,
  },
  {
    id: "hertz",
    program: "Hertz Gold Plus Rewards",
    category: "auto",
    matchRate: 40,
    cost: "Free",
    difficulty: "hard",
    requirements: [
      "Existing top-tier status",
      "Hertz Gold Plus account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.hertz.com/status-match",
      template: `Subject: Hertz Status Match Request

Dear Hertz Team,

I would like to request a status match.

Name: {name}
Hertz Gold Plus Number: {memberId}
Current Status: {status}

Proof attached.

Thank you,
{name}`,
    },
    tips: "Low success rate despite being marked 'M'. Reports of denials even when the website indicates Gold match. Consider National or Sixt instead for easy auto rental status.",
    votes: 19,
  },
  {
    id: "europcar",
    program: "Europcar Privilege",
    category: "auto",
    matchRate: 60,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing elite status",
      "Europcar Privilege account",
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.europcar.com/status-match",
      template: `Subject: Europcar Privilege Status Match

Dear Europcar Team,

I am requesting a status match.

Name: {name}
Privilege Number: {memberId}
Current Status: {status}

Proof attached. Thank you.

{name}`,
    },
    tips: "Marked 'M' on StatusMatcher. Better availability in Europe than US. Good for European travel.",
    votes: 12,
  },
]

export const categories = [
  { id: "all" as const, label: "All Matches" },
  { id: "airline" as const, label: "Airlines" },
  { id: "hotel" as const, label: "Hotels" },
  { id: "auto" as const, label: "Auto Rentals" },
]

export const difficulties = [
  { id: "all" as const, label: "All" },
  { id: "easy" as const, label: "Easy" },
  { id: "medium" as const, label: "Medium" },
  { id: "hard" as const, label: "Hard" },
]

export const sorts = [
  { id: "ease" as const, label: "Ease Score" },
  { id: "rate" as const, label: "Match Rate" },
  { id: "name" as const, label: "Name" },
  { id: "cost" as const, label: "Cost" },
]
