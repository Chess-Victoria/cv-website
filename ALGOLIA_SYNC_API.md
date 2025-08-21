# Algolia Sync API

This API endpoint syncs ACF player data to Algolia search index using ACF ID as the object key. The synced data powers the client-side search on `/players/search`.

## Environment Variables Required

Add these to your `.env.local` file:

```env
ALGOLIA_APP_ID=your_algolia_app_id
ALGOLIA_ADMIN_API_KEY=your_algolia_admin_api_key
ALGOLIA_SYNC_SECRET_KEY=your_secret_key_here  # Required for API authentication
ALGOLIA_PLAYERS_INDEX_NAME=players  # Optional, defaults to 'players'
```

## API Endpoints

### POST `/api/algolia-sync`

Syncs all ACF players to Algolia index.

**Authentication:**
- Requires `x-secret-key` header with the value from `ALGOLIA_SYNC_SECRET_KEY`

**Features:**
- Gets fresh data (no cache) from ACF ratings
- Uses ACF ID as object key for replacement
- Batch processing (1000 objects per batch) for faster injection
- Clears existing index and replaces with new data
- Configures searchable attributes and ranking
- Includes FIDE ratings data

**Response:**
```json
{
  "success": true,
  "message": "Algolia sync completed successfully",
  "stats": {
    "totalPlayers": 1234,
    "batchesProcessed": 2,
    "indexName": "players",
    "lastUpdated": "2024-01-15T10:30:00.000Z"
  }
}
```

### GET `/api/algolia-sync`

Check sync status and configuration.

**Authentication:**
- Requires `x-secret-key` header with the value from `ALGOLIA_SYNC_SECRET_KEY`

**Response:**
```json
{
  "status": "ready",
  "acfPlayersCount": 1234,
  "algoliaIndexName": "players",
  "algoliaIndexSettings": {
    "searchableAttributes": ["name", "state", "title", "fideId", "nationalId"],
    "attributesForFaceting": ["state", "gender", "title", "searchable(fideRating)", "birthYear"],
    "customRanking": ["desc(nationalRating)", "desc(fideRating)"]
  }
}
```

## Usage Examples

### Sync Data to Algolia
```bash
curl -X POST http://localhost:3000/api/algolia-sync \
  -H "x-secret-key: your_secret_key_here"
```

### Check Sync Status
```bash
curl http://localhost:3000/api/algolia-sync \
  -H "x-secret-key: your_secret_key_here"
```

## Data Structure

Each player object in Algolia includes:

```typescript
interface AlgoliaPlayerObject {
  objectID: string;           // ACF ID as object key
  name: string;               // Player name
  state: string;              // State (VIC)
  dateOfBirth: string;        // Date of birth
  birthYear?: number;         // Derived from dateOfBirth (YYYY) for filtering/faceting
  gender: string;             // Gender
  title: string;              // Chess title
  fideId: string;             // FIDE ID
  nationalId: string;         // ACF ID
  nationalRating: number;     // ACF rating
  nationalElo: number;        // ACF Elo
  age: number;                // Calculated age
  fideRating?: number;        // FIDE rating (if available)
  fideRatingMonth?: string;   // FIDE rating month
  lastUpdated: string;        // Sync timestamp
}
```

## Search Configuration

The API automatically configures Algolia with:

- **Searchable Attributes**: name, state, title, fideId, nationalId
- **Facets**: state, gender, title, fideRating, birthYear
- **Custom Ranking**: By national rating (desc), then FIDE rating (desc)

## Security Notes

- **Authentication Required**: All endpoints require the `x-secret-key` header
- **Secret Key**: Must match the `ALGOLIA_SYNC_SECRET_KEY` environment variable
- **Unauthorized Access**: Returns 401 status for invalid or missing secret key
- **Server Security**: Returns 500 status if secret key is not configured

## Data Notes

- The API clears the entire index before syncing new data
- Uses batch processing for optimal performance
- Only VIC players are included (as per existing ACF data filtering)
- FIDE ratings are merged from the existing FIDE ratings API
- Object keys use ACF ID for easy replacement on subsequent runs

## Client-Side Search

The synced data is used by the client-side search implementation:

- **Search Page**: `/players/search` uses Algolia client-side search
- **Performance**: Real-time search with instant results
- **Features**: Highlighted search terms, pagination, responsive design
- **Documentation**: See `ALGOLIA_CLIENT_SEARCH.md` for implementation details
