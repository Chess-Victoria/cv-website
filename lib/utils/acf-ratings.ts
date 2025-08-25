import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import AdmZip from 'adm-zip';

export interface Player {
  name: string;
  state: string;
  dateOfBirth: string;
  gender: string;
  title: string;
  fideId: string;
  nationalId: string;
  nationalRating: number;
  nationalElo: number;
  age: number;
  active?: boolean;
}

// Function to download the ACF zip file
async function downloadACFZipFile(): Promise<string> {
  try {
    // First, fetch the ACF ratings page to find the current vegamast.zip link
    // Fetch ACF ratings page to find current download link
    
    const ratingsPageResponse = await fetch('https://auschess.org.au/rating-lists/', {
      next: { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30 }
    });

    if (!ratingsPageResponse.ok) {
      throw new Error(`Failed to fetch ACF ratings page: ${ratingsPageResponse.status} ${ratingsPageResponse.statusText}`);
    }

    const ratingsPageContent = await ratingsPageResponse.text();
    
    // Extract all vegamast.zip links from the page
    const vegamastRegex = /href="([^"]*vegamast\.zip[^"]*)"/gi;
    const matches = [...ratingsPageContent.matchAll(vegamastRegex)];
    
    if (matches.length === 0) {
      throw new Error('No vegamast.zip links found on the ACF ratings page');
    }
    
    // Get the first (most recent) vegamast.zip link
    const relativeUrl = matches[0][1];
    const zipUrl = relativeUrl.startsWith('http') ? relativeUrl : `https://auschess.org.au${relativeUrl}`;
    
    // Proceed to download zip data
    
    // Download the zip file
    const zipResponse = await fetch(zipUrl, {
      next: { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30 }
    });

    if (!zipResponse.ok) {
      throw new Error(`Failed to download ACF data: ${zipResponse.status} ${zipResponse.statusText}`);
    }

    // Get the zip file as ArrayBuffer and convert to base64
    const zipBuffer = await zipResponse.arrayBuffer();
    const base64String = Buffer.from(zipBuffer).toString('base64');
    
    // Zip file downloaded and converted to base64
    
    return base64String;
  } catch (error) {
    console.error('Error downloading ACF zip file:', error);
    throw error;
  }
}

// Fetch and parse the Active players list (act.txt) from the ACF ratings page
async function downloadActiveNames(): Promise<Set<string>> {
  try {
    const ratingsPageResponse = await fetch('https://auschess.org.au/rating-lists/', {
      next: { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30 }
    });

    if (!ratingsPageResponse.ok) {
      throw new Error(`Failed to fetch ACF ratings page for act.txt: ${ratingsPageResponse.status} ${ratingsPageResponse.statusText}`);
    }

    const ratingsPageContent = await ratingsPageResponse.text();

    // Look for act.txt link
    const actRegex = /href="([^"]*act\.txt[^"]*)"/i;
    const match = ratingsPageContent.match(actRegex);

    let relativeUrl = '';
    if (match && match[1]) {
      relativeUrl = match[1];
    } else {
      // Fallback: try any link that contains 'active' and ends with .txt
      const fallbackRegex = /href="([^"]*(active|act)[^"]*\.txt[^"]*)"/i;
      const fbMatch = ratingsPageContent.match(fallbackRegex);
      if (!fbMatch || !fbMatch[1]) {
        // If no file found, return empty set (no-one marked active)
        return new Set();
      }
      relativeUrl = fbMatch[1];
    }

    const actUrl = relativeUrl.startsWith('http') ? relativeUrl : `https://auschess.org.au${relativeUrl}`;

    const actResponse = await fetch(actUrl, {
      next: { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30 }
    });

    if (!actResponse.ok) {
      throw new Error(`Failed to download act.txt: ${actResponse.status} ${actResponse.statusText}`);
    }

    const text = await actResponse.text();
    const lines = text.split(/\r?\n/);

    const normalizeName = (name: string) =>
      name
        .replace(/\s+/g, '') // remove all whitespace
        .replace(/\./g, '') // remove all dots
        .toLowerCase();

    const activeNames = new Set<string>();

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      if (line.startsWith('*') || line.toLowerCase().startsWith('players active')) continue;

      // Try to extract names like "Lastname, Firstname [middles]"
      const nameMatch = line.match(/[A-Za-z][A-Za-z\-\'\s\.]+,\s*[A-Za-z][A-Za-z\-\'\s\.]*/);
      if (nameMatch) {
        const name = nameMatch[0];
        activeNames.add(normalizeName(name));
        continue;
      }

      // Fallback: if the line is tab/space separated, take the last token chunk as name
      const parts = line.split(/\s{2,}|\t/).filter(Boolean);
      const possibleName = parts[parts.length - 1];
      if (possibleName && /[,A-Za-z]/.test(possibleName)) {
        activeNames.add(normalizeName(possibleName));
      }
    }

    return activeNames;
  } catch (error) {
    console.error('Error fetching/parsing act.txt:', error);
    return new Set();
  }
}

const getActiveNames = unstable_cache(
  async (): Promise<string[]> => {
    const set = await downloadActiveNames();
    return Array.from(set);
  },
  ['acf-active-names'],
  {
    tags: ['acf-active-names'],
    revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30
  }
);

// Function to parse ACF data from base64 zip string
function parseACFDataFromBase64(base64String: string): Player[] {
  try {
    // Convert base64 back to ArrayBuffer
    const zipBuffer = Buffer.from(base64String, 'base64');
    
    // Extract the zip file
    const zip = new AdmZip(zipBuffer);
    
    // Get all entries in the zip file
    const entries = zip.getEntries();
    
    // Try to find any file that might contain the data (not just .vega)
    let dataEntry = null;
    
    // First try to find .veg file
    dataEntry = entries.find((entry: any) => entry.entryName.endsWith('.veg'));
    
    // If not found, try to find any file that might contain CSV data
    if (!dataEntry) {
      dataEntry = entries.find((entry: any) => {
        const name = entry.entryName.toLowerCase();
        return name.includes('veg') || name.includes('csv') || name.includes('data');
      });
    }
    
    // If still not found, try the first file that's not a directory
    if (!dataEntry) {
      dataEntry = entries.find((entry: any) => !entry.isDirectory);
    }
    
    if (!dataEntry) {
      throw new Error('No data file found in the zip');
    }
    
    // Use the first matching data file
    
    // Get the file content
    const fileContent = dataEntry.getData().toString('utf8');
    
    // Extracted ACF data, parsing content
    
    // Parse the content - try different line endings
    const lines = fileContent.split(/\r?\n/).filter((line: string) => line.trim());
    
    // Parsed lines count ready
    
    const currentYear = new Date().getFullYear();

    const allPlayers = lines.map((line: string) => {
      const parts = line.split(';');
      if (parts.length >= 11) {
        const name = parts[0];
        const state = parts[1];
        const dob = parts[2];
        const gender = parts[3];
        const title = parts[4] || '';
        const fideId = parts[5];
        const nationalId = parts[8];
        const nationalRating = parseInt(parts[9]) || 0;
        const nationalElo = parseInt(parts[10]) || 0;

        let age = 0;
        if (dob && dob !== '0000/00/00') {
          const [year, month, day] = dob.split('/').map(Number);
          if (year > 0 && month > 0 && day > 0) {
            const birthDate = new Date(year, month - 1, day);
            const currentDate = new Date(currentYear, 0, 1);
            age = currentDate.getFullYear() - birthDate.getFullYear();
            const monthDiff = currentDate.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())) {
              age--;
            }
          }
        }

        return { name, state, dateOfBirth: dob, gender, title, fideId, nationalId, nationalRating, nationalElo, age };
      }
      return null;
    }).filter((player: Player | null): player is Player => player !== null);

    // Parsed players count

    // Filter only VIC players to reduce cache size
    const vicPlayers = allPlayers.filter(player => player.state === 'VIC');

    // Enrich with Active flag by matching names against act.txt
    const normalizeName = (name: string) =>
      name
        .replace(/\s+/g, ' ')
        .replace(/\.+$/g, '')
        .trim()
        .toLowerCase();

    // We intentionally do not await here; active names are injected in getACFPlayersData to keep this parser pure
    return vicPlayers
      .map(p => ({ ...p }))
      .sort((a: Player, b: Player) => b.nationalRating - a.nationalRating);
  } catch (error) {
    console.error('Error parsing ACF data from base64 zip:', error);
    throw error;
  }
}

// Cache the zip file as base64 string (much smaller than parsed data)
export const getACFZipFile = unstable_cache(
  async (): Promise<string> => {
    return downloadACFZipFile();
  },
  ['acf-zip-file-base64'],
  {
    tags: ['acf-zip-base64'],
    revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30
  }
);

// In-memory cache for parsed players (avoids 2MB Next data cache limit)
let inMemoryPlayersCache: { key: string; data: Player[] } | null = null;

function buildZipKey(base64String: string): string {
  // Simple fingerprint using length and a small prefix
  const prefix = base64String.slice(0, 128);
  return `${base64String.length}:${prefix}`;
}

export async function getACFPlayersData(): Promise<Player[]> {
  const base64String = await getACFZipFile();
  const key = buildZipKey(base64String);
  if (inMemoryPlayersCache && inMemoryPlayersCache.key === key) {
    return inMemoryPlayersCache.data;
  }
  const parsed = parseACFDataFromBase64(base64String);
  const activeNamesArray = await getActiveNames();
  const activeNames = new Set(activeNamesArray);

  const normalizeName = (name: string) =>
    name
      .replace(/\s+/g, '') // remove all whitespace
      .replace(/\./g, '') // remove all dots
      .toLowerCase();

  const enriched = parsed.map(p => ({
    ...p,
    active: activeNames.has(normalizeName(p.name))
  }));

  inMemoryPlayersCache = { key, data: enriched };
  return enriched;
}

// Backward-compatible function name
export const getACFRatingData = async (): Promise<Player[]> => {
  try {
    return await getACFPlayersData();
  } catch (error) {
    console.error('Error getting ACF rating data:', error);
    throw error;
  }
};

export const getPlayersByCategory = async (category: string): Promise<Player[]> => {
  try {
    const allPlayers = await getACFPlayersData();

    const categoryFilters: Record<string, (player: Player) => boolean> = {
      'all': (player: Player) => true, // All VIC players already filtered
      'u8': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 8,
      'u10': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 10,
      'u12': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 12,
      'u14': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 14,
      'u16': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 16,
      'u18': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 18,
      'u20': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 20,
      'girls-u8': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 8,
      'girls-u10': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 10,
      'girls-u12': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 12,
      'girls-u14': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 14,
      'girls-u16': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 16,
      'girls-u18': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 18,
      'girls-u20': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 20,
      'top-female': (player: Player) => player.gender === 'f'
    };

    const filter = categoryFilters[category];
    if (!filter) {
      console.error('Invalid category:', category);
      return [];
    }

    const filteredPlayers = allPlayers
      .filter(filter)
      .slice(0, 100) // Already sorted by rating, just take top 100
      .filter(player => player.nationalRating > 0); // Filter out players with zero ratings

    return filteredPlayers;
  } catch (error) {
    console.error('Error fetching players by category:', error);
    throw error; // Re-throw the error - no fallback data
  }
};

export const getPlayersByTitle = async (title: string): Promise<Player[]> => {
  try {
    const allPlayers = await getACFPlayersData();
    
    // Filter players by title (case-insensitive, trim spaces)
    const filteredPlayers = allPlayers.filter(player => 
      player.title && player.title.trim().toUpperCase() === title.toUpperCase()
    );

    // Sort by national rating (descending)
    return filteredPlayers.sort((a, b) => b.nationalRating - a.nationalRating);
  } catch (error) {
    console.error('Error getting players by title:', error);
    return [];
  }
};

export const getTitleStatistics = async () => {
  try {
    const allPlayers = await getACFPlayersData();

    // Open titles (CM, FM, IM, GM)
    const openTitles = ['CM', 'FM', 'IM', 'GM'];
    const openStats = openTitles.map(title => ({
      title,
      count: allPlayers.filter(player => player.title && player.title.trim() === title).length
    }));

    // Female titles (WCM, WFM, WIM, WGM)
    const femaleTitles = ['WCM', 'WFM', 'WIM', 'WGM'];
    const femaleStats = femaleTitles.map(title => ({
      title,
      count: allPlayers.filter(player => player.title && player.title.trim() === title).length
    }));

    return {
      open: openStats,
      female: femaleStats
    };
  } catch (error) {
    console.error('Error getting title statistics:', error);
    return {
      open: [],
      female: []
    };
  }
};
