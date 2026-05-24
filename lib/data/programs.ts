import type { MatchCategory } from "./matches"

export type ProgramEntry = {
  program: string
  tiers: string[]
  category: MatchCategory
}

export const knownPrograms: ProgramEntry[] = [
  // Airlines
  { program: "Delta Air Lines SkyMiles", tiers: ["Silver Medallion", "Gold Medallion", "Platinum Medallion", "Diamond Medallion"], category: "airline" },
  { program: "American Airlines AAdvantage", tiers: ["Gold", "Platinum", "Platinum Pro", "Executive Platinum", "Concierge Key"], category: "airline" },
  { program: "United Airlines MileagePlus", tiers: ["Premier Silver", "Premier Gold", "Premier Platinum", "Premier 1K"], category: "airline" },
  { program: "Southwest Airlines Rapid Rewards", tiers: ["A-List", "A-List Preferred"], category: "airline" },
  { program: "Alaska Airlines Mileage Plan", tiers: ["MVP", "MVP Gold", "MVP Gold 75K", "MVP Gold 100K"], category: "airline" },
  { program: "JetBlue TrueBlue", tiers: ["Mosaic 1", "Mosaic 2", "Mosaic 3", "Mosaic 4"], category: "airline" },
  { program: "Frontier Airlines FRONTIER Miles", tiers: ["Elite Silver", "Elite Gold", "Elite Platinum", "Elite Diamond"], category: "airline" },
  { program: "Spirit Airlines Free Spirit", tiers: ["Silver", "Gold"], category: "airline" },
  { program: "British Airways Executive Club", tiers: ["Bronze", "Silver", "Gold", "Gold Guest List"], category: "airline" },
  { program: "Air France / KLM Flying Blue", tiers: ["Silver", "Gold", "Platinum"], category: "airline" },
  { program: "Lufthansa Miles & More", tiers: ["Frequent Traveller", "Senator", "HON Circle"], category: "airline" },
  { program: "Turkish Airlines Miles & Smiles", tiers: ["Classic Plus", "Elite", "Elite Plus"], category: "airline" },
  { program: "Singapore Airlines KrisFlyer", tiers: ["Silver", "Gold", "PPS Club", "Solitaire PPS"], category: "airline" },
  { program: "Emirates Skywards", tiers: ["Silver", "Gold", "Platinum"], category: "airline" },
  { program: "Qatar Airways Privilege Club", tiers: ["Burgundy", "Silver", "Gold", "Platinum"], category: "airline" },
  { program: "Virgin Atlantic Flying Club", tiers: ["Silver", "Gold"], category: "airline" },
  { program: "Avianca LifeMiles", tiers: ["Silver", "Gold", "Diamond"], category: "airline" },
  { program: "Copa Airlines ConnectMiles", tiers: ["Silver", "Gold", "Platinum"], category: "airline" },
  { program: "ITA Airways Volare", tiers: ["Smart", "Plus", "Premium", "Executive"], category: "airline" },
  { program: "SAS EuroBonus", tiers: ["Silver", "Gold", "Diamond"], category: "airline" },
  { program: "Finnair Plus", tiers: ["Silver", "Gold", "Platinum", "Platinum Lumo"], category: "airline" },
  { program: "LATAM Airlines LATAM Pass", tiers: ["Gold", "Platinum", "Black", "Black Signature"], category: "airline" },
  { program: "Hawaiian Airlines HawaiianMiles", tiers: ["Gold", "Platinum", "Pualani Platinum"], category: "airline" },

  // Hotels
  { program: "Hilton Honors", tiers: ["Silver", "Gold", "Diamond"], category: "hotel" },
  { program: "Marriott Bonvoy", tiers: ["Silver Elite", "Gold Elite", "Platinum Elite", "Titanium Elite", "Ambassador Elite"], category: "hotel" },
  { program: "IHG One Rewards", tiers: ["Silver Elite", "Gold Elite", "Platinum Elite", "Diamond Elite"], category: "hotel" },
  { program: "World of Hyatt", tiers: ["Discoverist", "Explorist", "Globalist"], category: "hotel" },
  { program: "Wyndham Rewards", tiers: ["Blue", "Gold", "Platinum", "Diamond"], category: "hotel" },
  { program: "Choice Privileges", tiers: ["Gold", "Platinum", "Diamond"], category: "hotel" },
  { program: "Best Western Rewards", tiers: ["Blue", "Gold", "Platinum", "Diamond", "Diamond Select"], category: "hotel" },
  { program: "Radisson Rewards", tiers: ["Club", "Premium", "VIP"], category: "hotel" },
  { program: "Accor ALL", tiers: ["Silver", "Gold", "Platinum", "Diamond"], category: "hotel" },
  { program: "GHA DISCOVERY", tiers: ["Silver", "Gold", "Platinum", "Black"], category: "hotel" },
  { program: "WorldHotels Rewards", tiers: ["Gold", "Platinum", "Diamond", "Diamond Select"], category: "hotel" },
  { program: "Sonesta Travel Pass", tiers: ["Silver", "Gold", "Platinum"], category: "hotel" },
  { program: "Omni Select Guest", tiers: ["Champion", "Black", "Platinum"], category: "hotel" },
  { program: "MGM Rewards", tiers: ["Sapphire", "Pearl", "Gold", "Platinum", "NOIR"], category: "hotel" },
  { program: "Caesars Rewards", tiers: ["Gold", "Platinum", "Diamond", "Diamond Plus", "Diamond Elite", "Seven Stars"], category: "hotel" },
  { program: "Club Avolta", tiers: ["Blue", "Silver", "Gold", "Platinum"], category: "hotel" },

  // Auto Rentals
  { program: "Hertz Gold Plus Rewards", tiers: ["Gold", "Five Star", "President's Circle"], category: "auto" },
  { program: "Avis Preferred", tiers: ["Preferred Plus", "President's Club"], category: "auto" },
  { program: "National Emerald Club", tiers: ["Executive", "Executive Elite"], category: "auto" },
  { program: "Enterprise Plus", tiers: ["Silver", "Gold", "Platinum"], category: "auto" },
  { program: "Sixt ONE", tiers: ["Gold", "Platinum", "Diamond"], category: "auto" },
  { program: "Europcar Privilege", tiers: ["Club", "Executive", "Elite"], category: "auto" },

  // Cruises
  { program: "Royal Caribbean Crown & Anchor", tiers: ["Gold", "Platinum", "Emerald", "Diamond", "Diamond Plus", "Pinnacle Club"], category: "cruise" },
  { program: "Celebrity Cruises Captain's Club", tiers: ["Classic", "Select", "Elite", "Elite Plus", "Zenith"], category: "cruise" },
  { program: "Norwegian Cruise Line Latitudes", tiers: ["Bronze", "Silver", "Gold", "Platinum", "Sapphire", "Diamond", "Ambassador"], category: "cruise" },
  { program: "MSC Voyagers Club", tiers: ["Classic", "Silver", "Gold", "Diamond", "Blue Diamond"], category: "cruise" },
  { program: "Princess Cruises Captain's Circle", tiers: ["Gold", "Ruby", "Platinum", "Elite"], category: "cruise" },
  { program: "Carnival VIFP Club", tiers: ["Blue", "Red", "Gold", "Platinum", "Diamond"], category: "cruise" },
  { program: "Holland America Mariner Society", tiers: ["1-Star", "2-Star", "3-Star", "4-Star", "5-Star"], category: "cruise" },
]
