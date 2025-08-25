import { getACFPlayersData, getPlayersByCategory, Player } from "@/lib/utils/acf-ratings"
import { getFideRatingMap } from '@/lib/utils/fide-ratings'
import PlayersDataTable from './PlayersDataTable'

interface PlayersDataFetcherProps {
  categorySlug: string;
  categoryName: string;
  isActivePage?: boolean;
}

export default async function PlayersDataFetcher({ 
  categorySlug, 
  categoryName, 
  isActivePage = false 
}: PlayersDataFetcherProps) {
  let filteredPlayers: Player[] = [];
  let fideMap: Record<string, { rating?: number; ratingMonth?: string }> = {}
  let error: string | null = null;

  try {
    if (isActivePage) {
      // For active page, get all players and filter for active ones
      const allPlayers = await getACFPlayersData();

      // Build category filter (replicates logic from ratings util)
      const categoryFilters: Record<string, (player: Player) => boolean> = {
        'all': (player: Player) => true,
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

      const categoryFilter = categoryFilters[categorySlug] || (() => true);

      filteredPlayers = allPlayers
        .filter(categoryFilter)
        .filter(p => p.active)
        .filter(p => p.nationalRating > 0)
        .sort((a, b) => b.nationalRating - a.nationalRating)
        .slice(0, 100);
    } else {
      // For regular page, use the existing function
      filteredPlayers = await getPlayersByCategory(categorySlug);
    }

    fideMap = await getFideRatingMap();
  } catch (err) {
    console.error('Error fetching players:', err);
    error = err instanceof Error ? err.message : 'Failed to load player data';
  }

  return (
    <div className="event-widget-area">
      <PlayersDataTable
        players={filteredPlayers}
        fideMap={fideMap}
        error={error}
        categorySlug={categorySlug}
        categoryName={categoryName}
        isActivePage={isActivePage}
      />
    </div>
  );
}
