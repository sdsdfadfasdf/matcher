export type MatchCategory = "airline" | "hotel" | "auto" | "cruise"

export type EligibleSource = {
  program: string
  tier?: string
  category: MatchCategory
}

export type Match = {
  id: string
  program: string
  category: MatchCategory
  matchRate: number
  cost: string
  difficulty: "easy" | "medium" | "hard"
  requirements: string[]
  eligibleFrom?: EligibleSource[]
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Diamond Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Choice Privileges", tier: "Diamond", category: "hotel" },
	      { program: "Radisson Rewards", tier: "VIP", category: "hotel" },
	      { program: "Accor ALL", tier: "Platinum", category: "hotel" },
	      { program: "Accor ALL", tier: "Diamond", category: "hotel" },
	      { program: "GHA DISCOVERY", tier: "Platinum", category: "hotel" },
	      { program: "GHA DISCOVERY", tier: "Black", category: "hotel" },
	      { program: "World of Hyatt", tier: "Explorist", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond Select", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Diamond Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Choice Privileges", tier: "Diamond", category: "hotel" },
	      { program: "Radisson Rewards", tier: "VIP", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Radisson Rewards", tier: "VIP", category: "hotel" },
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
      "Existing elite status from Marriott, IHG, Accor, Hyatt, Best Western, Choice, Wyndham, or Radisson",
      "Hilton Honors account",
      "Proof of a recent stay with the competing program (past 12-24 months)",
    ],
	    eligibleFrom: [
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Ambassador Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Diamond Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "Accor ALL", tier: "Platinum", category: "hotel" },
	      { program: "Accor ALL", tier: "Diamond", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond Select", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Choice Privileges", tier: "Diamond", category: "hotel" },
	      { program: "Radisson Rewards", tier: "VIP", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Gold Elite", category: "hotel" },
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
    tips: "Instant 90-day Gold trial upon approval. Stay 6 nights in 90 days = keep Gold through March 2028. Stay 12 nights = upgrade to Diamond through March 2028. Best hotel status match value in the industry.",
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Diamond Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "Accor ALL", tier: "Diamond", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Ambassador Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
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
	    eligibleFrom: [
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP Gold", category: "airline" },
	      { program: "Air France / KLM Flying Blue", tier: "Gold", category: "airline" },
	      { program: "Air France / KLM Flying Blue", tier: "Platinum", category: "airline" },
	      { program: "Lufthansa Miles & More", tier: "Senator", category: "airline" },
	      { program: "Qatar Airways Privilege Club", tier: "Gold", category: "airline" },
	      { program: "Qatar Airways Privilege Club", tier: "Platinum", category: "airline" },
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
	    eligibleFrom: [
	      { program: "any", tier: undefined, category: "airline" },
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
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Platinum Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP Gold", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Silver", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Gold", category: "airline" },
	      { program: "Virgin Atlantic Flying Club", tier: "Gold", category: "airline" },
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
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Platinum Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Silver", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Gold", category: "airline" },
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
	    eligibleFrom: [
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Lufthansa Miles & More", tier: "Senator", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
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
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP", category: "airline" },
	      { program: "Frontier Airlines FRONTIER Miles", tier: "Elite Gold", category: "airline" },
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
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "Frontier Airlines FRONTIER Miles", tier: "Elite Gold", category: "airline" },
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
	    eligibleFrom: [
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP", category: "airline" },
	      { program: "Spirit Airlines Free Spirit", tier: "Silver", category: "airline" },
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
    id: "qatar-airways",
    program: "Qatar Airways Privilege Club",
    category: "airline",
    matchRate: 80,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline OR hotel elite status (Accor, Hilton, Hyatt, IHG, Marriott)",
      "Privilege Club account",
      "Photo of physical membership card and mileage report",
    ],
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Diamond Elite", category: "hotel" },
	      { program: "Accor ALL", tier: "Platinum", category: "hotel" },
	      { program: "Accor ALL", tier: "Diamond", category: "hotel" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.qatarairways.com/privilege-club/status-match",
      template: `Subject: Privilege Club Status Match Request

Dear Qatar Airways Privilege Club Team,

I am requesting a status match for my Privilege Club account.

Name: {name}
Privilege Club Number: {memberId}
Current Status: {status}

I have attached a photo of my physical membership card and a mileage report.

Thank you,
{name}`,
    },
    tips: "Matches from hotel programs too (Accor, Hilton, Hyatt, IHG, Marriott). Gold = Oneworld Ruby, Platinum = Oneworld Sapphire (lounge access!). Can bridge to Accor ALL status via Qatar Airways match.",
    votes: 38,
  },
  {
    id: "accor-all",
    program: "Accor ALL (via Qatar Airways)",
    category: "hotel",
    matchRate: 75,
    cost: "Free (via Qatar Airways bridge)",
    difficulty: "medium",
    requirements: [
      "Qatar Airways Privilege Club Gold or Platinum status",
      "Accor ALL account",
      "Must link Qatar Airways and Accor accounts",
    ],
	    eligibleFrom: [
	      { program: "Qatar Airways Privilege Club", tier: "Gold", category: "airline" },
	      { program: "Qatar Airways Privilege Club", tier: "Platinum", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://all.accor.com/loyalty-program/status-match/",
      template: `Subject: Accor ALL Status Match Request

Dear Accor ALL Team,

I am requesting a status match via my Qatar Airways Privilege Club status.

Name: {name}
Accor ALL Number: {memberId}
Qatar Airways Privilege Club Status: {status}

My Qatar Airways and Accor accounts are linked.

Thank you,
{name}`,
    },
    tips: "Indirect match: Qatar Airways Privilege Club Gold = Accor Silver, Platinum = Accor Gold. No direct hotel-to-hotel match for Accor. Alternative: use legacy Fairmont/Raffles/Swissotel status for direct match.",
    votes: 22,
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
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "Spirit Airlines Free Spirit", tier: "Silver", category: "airline" },
	      { program: "Spirit Airlines Free Spirit", tier: "Gold", category: "airline" },
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
  {
    id: "delta-airlines",
    program: "Delta Air Lines Medallion Challenge",
    category: "airline",
    matchRate: 70,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing elite status from a major domestic or international airline",
      "Delta SkyMiles account",
      "At least 1 Delta flight (non-Basic) in past 3 years",
    ],
	    eligibleFrom: [
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "Alaska Airlines Mileage Plan", tier: "MVP Gold", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.delta.com/status-match",
      template: `Subject: Delta Medallion Status Match Challenge Request

Dear Delta SkyMiles Team,

I am requesting a Medallion Status Match Challenge.

Name: {name}
SkyMiles Number: {memberId}
Current Status: {status}

Proof of my current elite status with another airline is attached. I understand this is a challenge requiring qualifying activity within the trial period.

Thank you,
{name}`,
    },
    tips: "3-month trial with MQD-based challenge: Silver (1,250 MQDs), Gold (2,500 MQDs), Platinum (3,750 MQDs). Status earned in 2026 extends through Jan 2028. Cannot have participated 2023-2026.",
    votes: 95,
  },
  {
    id: "american-airlines",
    program: "American Airlines Instant Status Pass",
    category: "airline",
    matchRate: 75,
    cost: "Free",
    difficulty: "medium",
    requirements: [
      "Existing elite status from Delta, United, JetBlue, or Southwest",
      "AAdvantage account",
    ],
	    eligibleFrom: [
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "Southwest Airlines Rapid Rewards", tier: "A-List", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.aa.com/instant-status-pass",
      template: `Subject: Instant Status Pass Request

Dear AAdvantage Team,

I am requesting the Instant Status Pass challenge.

Name: {name}
AAdvantage Number: {memberId}
Current Status: {status}

I understand this is a 3-phase challenge over 12 months with Loyalty Point targets per phase.

Thank you,
{name}`,
    },
    tips: "12-month program in 3 phases. LPs can be earned via credit card spend and eShopping, not just flying. Can match up to Executive Platinum. Re-enroll every 2 years.",
    votes: 68,
  },
  {
    id: "virgin-atlantic",
    program: "Virgin Atlantic Flying Club",
    category: "airline",
    matchRate: 65,
    cost: "Free (booking required)",
    difficulty: "medium",
    requirements: [
      "Existing elite status from a non-SkyTeam airline",
      "Flying Club account",
      "Future paid Virgin Atlantic booking (any cabin for Silver, Premium/Upper for Gold)",
    ],
	    eligibleFrom: [
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Silver", category: "airline" },
	      { program: "British Airways Executive Club", tier: "Gold", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.virginatlantic.com/status-match",
      template: `Subject: Flying Club Status Match Request

Dear Virgin Atlantic Flying Club Team,

I am requesting a status match for my Flying Club account.

Name: {name}
Flying Club Number: {memberId}
Current Status: {status}

I have a future booking with Virgin Atlantic and am happy to provide those details.

Thank you,
{name}`,
    },
    tips: "Matches to Silver or Gold for 12 months. Silver extension needs 400 tier points, Gold needs 1,000. Not available to SkyTeam partner elite holders or those who matched in past 5 years.",
    votes: 32,
  },
  {
    id: "worldhotels",
    program: "WorldHotels Rewards",
    category: "hotel",
    matchRate: 100,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status from any competing program",
      "WorldHotels Rewards account",
      "Full name, address, email, phone",
    ],
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "Best Western Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Wyndham Rewards", tier: "Diamond", category: "hotel" },
	      { program: "Radisson Rewards", tier: "VIP", category: "hotel" },
	    ],
	    howToApply: {
      method: "email",
      email: "statusmatch@bwhhotelgroup.com",
      url: "https://www.worldhotels.com/en_US/rewards/status-match.html",
      template: `Subject: WorldHotels Rewards Status Match Request

Dear WorldHotels Rewards Team,

I am requesting a status match under your "Status Match...No Catch" program.

Name: {name}
Address: [Your Address]
Email: [Your Email]
Phone: [Your Phone]
WorldHotels Rewards Number: {memberId}
Current Elite Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "100% success rate via 'Status Match...No Catch' program. Matches to Gold, Platinum, Diamond, or Diamond Select. Valid through Dec 2027 for matches earned in 2026.",
    votes: 22,
  },
  {
    id: "gha-discovery",
    program: "GHA DISCOVERY",
    category: "hotel",
    matchRate: 80,
    cost: "Free (via Visa Infinite / World Elite MC)",
    difficulty: "easy",
    requirements: [
      "Existing hotel elite status OR Visa Infinite / World Elite Mastercard",
      "GHA DISCOVERY account",
    ],
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.ghadiscovery.com/status-match",
      template: `Subject: GHA DISCOVERY Status Match Request

Dear GHA DISCOVERY Team,

I am requesting a status match for my GHA DISCOVERY account.

Name: {name}
GHA DISCOVERY Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached. I also hold a Visa Infinite / World Elite Mastercard which qualifies for the free tier match.

Thank you,
{name}`,
    },
    tips: "Paid match costs $100-150 but is free via Visa Infinite or World Elite Mastercard. Covers luxury independent hotels like Kempinski, Pan Pacific, Anantara.",
    votes: 28,
  },
  {
    id: "club-avolta",
    program: "Club Avolta (Airport Shopping)",
    category: "hotel",
    matchRate: 90,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline or hotel elite status",
      "Club Avolta account (free signup)",
    ],
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.clubavolta.com/status-match",
      template: `Subject: Club Avolta Status Match Request

Dear Club Avolta Team,

I am requesting a status match to Platinum Elite.

Name: {name}
Club Avolta Member Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Unique perk program: matches airline/hotel elite to Platinum for up to 10% off airport shopping and 5% off food/drink at thousands of airport locations worldwide.",
    votes: 15,
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Gold", category: "airline" },
	      { program: "Hertz Gold Plus Rewards", tier: "Five Star", category: "auto" },
	      { program: "Hertz Gold Plus Rewards", tier: "President's Circle", category: "auto" },
	      { program: "Avis Preferred", tier: "Preferred Plus", category: "auto" },
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
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Hertz Gold Plus Rewards", tier: "Five Star", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive", category: "auto" },
	      { program: "Avis Preferred", tier: "Preferred Plus", category: "auto" },
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
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
	    eligibleFrom: [
	      { program: "Hertz Gold Plus Rewards", tier: "Five Star", category: "auto" },
	      { program: "Hertz Gold Plus Rewards", tier: "President's Circle", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive Elite", category: "auto" },
	      { program: "Avis Preferred", tier: "President's Club", category: "auto" },
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
	    eligibleFrom: [
	      { program: "Hertz Gold Plus Rewards", tier: "Five Star", category: "auto" },
	      { program: "Hertz Gold Plus Rewards", tier: "President's Circle", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive Elite", category: "auto" },
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
	    eligibleFrom: [
	      { program: "Avis Preferred", tier: "Preferred Plus", category: "auto" },
	      { program: "Avis Preferred", tier: "President's Club", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive", category: "auto" },
	      { program: "National Emerald Club", tier: "Executive Elite", category: "auto" },
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
  {
    id: "avelo-airlines",
    program: "Avelo Airlines (Spirit Elite Match)",
    category: "airline",
    matchRate: 95,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Previous Spirit Airlines Free Spirit elite status",
      "Spirit Saver$ Club membership",
      "Avelo account",
    ],
	    eligibleFrom: [
	      { program: "Spirit Airlines Free Spirit", tier: "Silver", category: "airline" },
	      { program: "Spirit Airlines Free Spirit", tier: "Gold", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.aveloair.com/status-match",
      template: `Subject: Avelo Plus Status Match Request

Dear Avelo Team,

I am a former Spirit Airlines elite member requesting the Avelo Plus status match.

Name: {name}
Former Spirit Free Spirit Status: {status}
Spirit Saver$ Club Member: Yes

Proof of my former Spirit elite status is attached.

Thank you,
{name}`,
    },
    tips: "Special match for displaced Spirit elites. Spirit ceased operations. Free match to Avelo Plus. Apply by May 31. Southwest and JetBlue also accept former Spirit elites for status matches.",
    votes: 8,
  },
  {
    id: "tap-portugal",
    program: "TAP Air Portugal Miles&Go",
    category: "airline",
    matchRate: 70,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing airline elite status from any Star Alliance or competitor program",
      "TAP Miles&Go account",
    ],
	    eligibleFrom: [
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Gold", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Silver Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "Lufthansa Miles & More", tier: "Frequent Traveller", category: "airline" },
	      { program: "Lufthansa Miles & More", tier: "Senator", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.flytap.com/en-us/miles-and-go/status-match",
      template: `Subject: TAP Miles&Go Status Match Request

Dear TAP Miles&Go Team,

I am requesting a status match for my Miles&Go account.

Name: {name}
Miles&Go Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Obrigado,
{name}`,
    },
    tips: "Star Alliance member. Ongoing status match. Status recognized across all Star Alliance airlines including United, Lufthansa, Singapore Airlines. Good redemption value for TAP flights to Europe and Africa.",
    votes: 25,
  },
  {
    id: "omni-hotels",
    program: "Omni Select Guest (via FoundersCard)",
    category: "hotel",
    matchRate: 90,
    cost: "Free (via JetBlue Mosaic bridge)",
    difficulty: "medium",
    requirements: [
      "JetBlue Mosaic status (free FoundersCard Blue included)",
      "OR direct FoundersCard membership",
      "Omni Select Guest account",
    ],
	    eligibleFrom: [
	      { program: "JetBlue TrueBlue", tier: "Mosaic 1", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 2", category: "airline" },
	      { program: "JetBlue TrueBlue", tier: "Mosaic 3", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.omnihotels.com/select-guest",
      template: `Subject: Omni Select Guest Status Match via FoundersCard

Dear Omni Select Guest Team,

I am requesting Champion status via my FoundersCard membership.

Name: {name}
Omni Select Guest Number: {memberId}
Current FoundersCard Membership: Active

Proof of FoundersCard membership is attached.

Thank you,
{name}`,
    },
    tips: "Creative chain: JetBlue Mosaic = free FoundersCard Blue = Omni Select Guest Champion for 1 year. Omni is a premium independent hotel chain with properties in major US cities. Free bottled water, Wi-Fi, and morning beverage delivery.",
    votes: 8,
  },
  {
    id: "km-malta-airlines",
    program: "KM Malta Airlines KM Rewards",
    category: "airline",
    matchRate: 85,
    cost: "Paid (via StatusMatch.com)",
    difficulty: "easy",
    requirements: [
      "Existing elite status from 45+ airlines OR 20+ hotel programs",
      "KM Rewards account",
    ],
    eligibleFrom: [
      { program: "any", category: "airline" },
      { program: "any", category: "hotel" },
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.km-maltairlines.com/status-match",
      template: `Subject: KM Rewards Status Match Request

Dear KM Malta Airlines KM Rewards Team,

I am requesting a status match for my KM Rewards account.

Name: {name}
KM Rewards Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Obscure Maltese carrier with surprisingly broad match: accepts 45+ airlines and 20+ hotel programs, including credit card travel rewards. Paid match via StatusMatch.com. One of the widest acceptance nets in the industry.",
    votes: 6,
  },
  {
    id: "lufthansa-miles-more",
    program: "Lufthansa Miles & More Status Match",
    category: "airline",
    matchRate: 90,
    cost: "Free (ITA) / €99 (BA, Iberia)",
    difficulty: "easy",
    requirements: [
      "ITA Airways Volare (any tier, FREE) OR British Airways/Iberia elite status (€99 fee)",
      "Lufthansa Miles & More account",
      "Must apply before February 28, 2027",
    ],
    eligibleFrom: [
      { program: "ITA Airways Volare", category: "airline" },
      { program: "British Airways Executive Club", tier: "Silver", category: "airline" },
      { program: "British Airways Executive Club", tier: "Gold", category: "airline" },
      { program: "British Airways Executive Club", tier: "Gold Guest List", category: "airline" },
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.miles-and-more.com/status-match",
      template: `Subject: Miles & More Status Match Request

Dear Miles & More Team,

I am requesting a status match for my Miles & More account.

Name: {name}
Miles & More Number: {memberId}
Current Status with Other Program: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Two paths: ITA Volare (any tier, FREE) or BA Silver+ / Iberia (EUR 99 fee). BA Gold = Senator (Star Alliance Gold), BA Silver = Frequent Traveller (Star Alliance Silver). Status valid through Feb 2027. Available to US, UK, Canada, EU residents.",
    votes: 25,
  },
  {
    id: "citizenm",
    program: "citizenM+ Membership",
    category: "hotel",
    matchRate: 85,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Existing elite status from any major hotel OR airline program",
      "citizenM+ account (free signup)",
    ],
    eligibleFrom: [
      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
      { program: "Marriott Bonvoy", tier: "Gold Elite", category: "hotel" },
      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.citizenm.com/status-match",
      template: `Subject: citizenM+ Status Match Request

Dear citizenM+ Team,

I am requesting a status match for my citizenM+ account.

Name: {name}
citizenM+ Member ID: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "Up-and-coming design-forward boutique hotel chain actively courting loyalty switchers. Accepts both hotel AND airline elite status. Under-reported in mainstream status match roundups. Properties in major European and US cities.",
    votes: 5,
  },
  {
    id: "kenya-airways",
    program: "Kenya Airways Asante Rewards",
    category: "airline",
    matchRate: 80,
    cost: "Paid (via StatusMatch.com)",
    difficulty: "easy",
    requirements: [
      "Existing elite status from 45+ airlines OR 20+ hotel programs",
      "Asante Rewards account",
    ],
    eligibleFrom: [
      { program: "any", category: "airline" },
      { program: "any", category: "hotel" },
    ],
    howToApply: {
      method: "web_form",
      url: "https://www.kenya-airways.com/status-match",
      template: `Subject: Asante Rewards Status Match Request

Dear Kenya Airways Asante Rewards Team,

I am requesting a status match for my Asante Rewards account.

Name: {name}
Asante Rewards Number: {memberId}
Current Status: {status}

Proof of my current elite status is attached.

Thank you,
{name}`,
    },
    tips: "SkyTeam member. One of few airline programs accepting hotel elite status directly as qualifying criteria. 45+ airline and 20+ hotel programs accepted. Paid match via StatusMatch.com. Gets you into SkyTeam through an African carrier.",
    votes: 8,
  },
  {
    id: "virgin-voyages",
    program: "Virgin Voyages Blue Extras",
    category: "cruise",
    matchRate: 95,
    cost: "Free",
    difficulty: "easy",
    requirements: [
      "Elite status from 35+ airline, hotel, or cruise programs",
      "Book a Virgin Voyages sailing by application deadline",
      "New booking only (not existing reservations)",
    ],
	    eligibleFrom: [
	      { program: "Hilton Honors", tier: "Gold", category: "hotel" },
	      { program: "Hilton Honors", tier: "Diamond", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Platinum Elite", category: "hotel" },
	      { program: "Marriott Bonvoy", tier: "Titanium Elite", category: "hotel" },
	      { program: "World of Hyatt", tier: "Discoverist", category: "hotel" },
	      { program: "World of Hyatt", tier: "Explorist", category: "hotel" },
	      { program: "World of Hyatt", tier: "Globalist", category: "hotel" },
	      { program: "IHG One Rewards", tier: "Platinum Elite", category: "hotel" },
	      { program: "Delta Air Lines SkyMiles", tier: "Gold Medallion", category: "airline" },
	      { program: "Delta Air Lines SkyMiles", tier: "Platinum Medallion", category: "airline" },
	      { program: "American Airlines AAdvantage", tier: "Platinum", category: "airline" },
	      { program: "United Airlines MileagePlus", tier: "Premier Silver", category: "airline" },
	      { program: "Virgin Atlantic Flying Club", tier: "Silver", category: "airline" },
	      { program: "Virgin Atlantic Flying Club", tier: "Gold", category: "airline" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.virginvoyages.com/status-match",
      template: `Subject: Virgin Voyages Status Match Request

Dear Virgin Voyages Sailor Services,

I am requesting the Blue Extras status match for my upcoming sailing.

Name: {name}
Current Status: {status}

I hold elite status with {status} and would like to receive Blue Extras perks on my next Virgin Voyages booking.

Thank you,
{name}`,
    },
    tips: "Massive status match accepting 35+ programs (Hilton Gold+, Marriott Platinum+, Delta Gold+, United Silver+, etc.). Perks: free specialty coffee daily, free laundry bag, exclusive cocktail event. Check for current application windows.",
    votes: 45,
  },
  {
    id: "ponant-cruises",
    program: "PONANT Yacht Club Status Match",
    category: "cruise",
    matchRate: 85,
    cost: "Free (with new booking)",
    difficulty: "easy",
    requirements: [
      "Elite status from any major cruise line",
      "New PONANT booking",
      "Book by May 31, 2026 (current window)",
    ],
	    eligibleFrom: [
	      { program: "Norwegian Cruise Line Latitudes", tier: "Platinum", category: "cruise" },
	      { program: "Norwegian Cruise Line Latitudes", tier: "Sapphire", category: "cruise" },
	      { program: "MSC Voyagers Club", tier: "Silver", category: "cruise" },
	      { program: "MSC Voyagers Club", tier: "Gold", category: "cruise" },
	      { program: "MSC Voyagers Club", tier: "Diamond", category: "cruise" },
	      { program: "Princess Cruises Captain's Circle", tier: "Platinum", category: "cruise" },
	      { program: "Princess Cruises Captain's Circle", tier: "Elite", category: "cruise" },
	      { program: "Celebrity Cruises Captain's Club", tier: "Elite", category: "cruise" },
	      { program: "Celebrity Cruises Captain's Club", tier: "Elite Plus", category: "cruise" },
	      { program: "Royal Caribbean Crown & Anchor", tier: "Diamond", category: "cruise" },
	      { program: "Royal Caribbean Crown & Anchor", tier: "Diamond Plus", category: "cruise" },
	      { program: "Holland America Mariner Society", tier: "3-Star", category: "cruise" },
	      { program: "Holland America Mariner Society", tier: "4-Star", category: "cruise" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://en.ponant.com/benefit-from-the-status-match",
      template: `Subject: PONANT Status Match Request

Dear PONANT Yacht Club Team,

I am requesting a status match for my upcoming PONANT sailing.

Name: {name}
Current Cruise Status: {status}

I hold elite status with another cruise line and would like to be matched to the appropriate PONANT tier (Major, Admiral, or Grand Admiral).

Thank you,
{name}`,
    },
    tips: "Matches from most major cruise lines to 3 tiers: Major (NCL Platinum, MSC Silver, Princess Gold, HAL 2-Star, RCI Diamond), Admiral (NCL Diamond, MSC Gold, Celebrity Elite Plus, HAL 3-Star), Grand Admiral (NCL Sapphire+, MSC Diamond, Princess Elite, Celebrity Zenith, RCI Pinnacle). Top Commodore tier not matchable.",
    votes: 12,
  },
  {
    id: "royal-caribbean-group",
    program: "Royal Caribbean Group Cross-Match",
    category: "cruise",
    matchRate: 100,
    cost: "Free (automatic)",
    difficulty: "easy",
    requirements: [
      "Elite status with Royal Caribbean, Celebrity, or Silversea",
      "Loyalty account on the target brand",
    ],
	    eligibleFrom: [
	      { program: "Royal Caribbean Crown & Anchor", tier: "Diamond", category: "cruise" },
	      { program: "Royal Caribbean Crown & Anchor", tier: "Diamond Plus", category: "cruise" },
	      { program: "Celebrity Cruises Captain's Club", tier: "Elite", category: "cruise" },
	      { program: "Celebrity Cruises Captain's Club", tier: "Elite Plus", category: "cruise" },
	    ],
	    howToApply: {
      method: "web_form",
      url: "https://www.royalcaribbean.com/loyalty/status-match",
      template: `Subject: Royal Caribbean Group Loyalty Status Match

Dear Crown & Anchor / Captain's Club / Venetian Society Team,

I am requesting a cross-brand status match.

Name: {name}
Current Brand and Status: {status}
Loyalty Number: {memberId}

I understand status is matched automatically across Royal Caribbean, Celebrity Cruises, and Silversea.

Thank you,
{name}`,
    },
    tips: "Automatic cross-brand status match between Royal Caribbean (Crown & Anchor), Celebrity (Captain's Club), and Silversea (Venetian Society). Diamond on Royal = Elite on Celebrity. Points Choice program lets you pool points across brands. No deadline, ongoing.",
    votes: 38,
  },
]

export const categories = [
  { id: "all" as const, label: "All Matches" },
  { id: "airline" as const, label: "Airlines" },
  { id: "hotel" as const, label: "Hotels" },
  { id: "auto" as const, label: "Auto Rentals" },
  { id: "cruise" as const, label: "Cruises" },
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
