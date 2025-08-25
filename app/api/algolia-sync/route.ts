import { NextRequest, NextResponse } from 'next/server'
import { getACFPlayersData, Player } from '@/lib/utils/acf-ratings'
import { getFideRatingMap } from '@/lib/utils/fide-ratings'
import { algoliasearch } from 'algoliasearch'

interface AlgoliaPlayerObject extends Omit<Player, 'dateOfBirth'> {
  objectID: string // ACF ID as object key
  fideRating?: number
  fideRatingMonth?: string
  lastUpdated: string
  birthYear?: number
}

export async function POST(request: NextRequest) {
  try {
    // Check for secret key authentication
    const secretKey = request.headers.get('x-secret-key')
    const expectedSecretKey = process.env.ALGOLIA_SYNC_SECRET_KEY

    if (!expectedSecretKey) {
      console.error('❌ ALGOLIA_SYNC_SECRET_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!secretKey || secretKey !== expectedSecretKey) {
      console.error('❌ Invalid or missing secret key in request')
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret key' },
        { status: 401 }
      )
    }

    // Get Algolia configuration from environment variables
    const algoliaAppId = process.env.ALGOLIA_APP_ID
    const algoliaApiKey = process.env.ALGOLIA_ADMIN_API_KEY
    const algoliaIndexName = process.env.ALGOLIA_PLAYERS_INDEX_NAME || 'players'

    if (!algoliaAppId || !algoliaApiKey) {
      return NextResponse.json(
        { error: 'Algolia configuration missing. Please set ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY environment variables.' },
        { status: 500 }
      )
    }

    console.log('🔄 Starting Algolia sync for ACF players...')

    // Get fresh data (no cache)
    const [allPlayers, fideMap] = await Promise.all([
      getACFPlayersData(),
      getFideRatingMap(),
    ])

    console.log(`📊 Found ${allPlayers.length} ACF players`)

    // Transform data for Algolia
    const algoliaObjects: AlgoliaPlayerObject[] = allPlayers.map(player => {
      let birthYear: number | undefined = undefined
      if (player.dateOfBirth && player.dateOfBirth !== '0000/00/00') {
        const parts = player.dateOfBirth.split('/')
        const year = Number(parts[0])
        if (!Number.isNaN(year) && year > 0) {
          birthYear = year
        }
      }
      
      // Destructure to exclude dateOfBirth and add Algolia-specific fields
      const { dateOfBirth, ...playerWithoutDateOfBirth } = player
      
      return {
        ...playerWithoutDateOfBirth,
        objectID: player.nationalId || `acf_${player.name.replace(/\s+/g, '_')}_${player.state}`,
        fideRating: player.fideId && fideMap[player.fideId]?.rating ? fideMap[player.fideId]?.rating : undefined,
        fideRatingMonth: player.fideId && fideMap[player.fideId]?.ratingMonth ? fideMap[player.fideId]?.ratingMonth : undefined,
        lastUpdated: new Date().toISOString(),
        birthYear,
      }
    })

    console.log(`🔄 Preparing to sync ${algoliaObjects.length} objects to Algolia...`)

    // Initialize Algolia client
    const client = algoliasearch(algoliaAppId, algoliaApiKey)

    // Clear existing index and replace with new data
    console.log('🗑️ Clearing existing index...')
    await client.clearObjects({ indexName: algoliaIndexName })

    // Batch upload in chunks of 1000 (Algolia recommended batch size)
    const batchSize = 1000
    const batches = []
    
    for (let i = 0; i < algoliaObjects.length; i += batchSize) {
      batches.push(algoliaObjects.slice(i, i + batchSize))
    }

    console.log(`📦 Processing ${batches.length} batches...`)

    let totalProcessed = 0
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i]
      console.log(`📤 Uploading batch ${i + 1}/${batches.length} (${batch.length} objects)...`)
      
      await client.saveObjects({ indexName: algoliaIndexName, objects: batch as any[] })
      totalProcessed += batch.length
      
      console.log(`✅ Batch ${i + 1} completed. Total processed: ${totalProcessed}/${algoliaObjects.length}`)
    }

    // Configure searchable attributes and ranking
    console.log('⚙️ Configuring index settings...')
    await client.setSettings({ 
      indexName: algoliaIndexName, 
      indexSettings: {
        searchableAttributes: [
          'name',
          'state',
          'title',
          'fideId',
          'nationalId'
        ],
        attributesForFaceting: [
          'state',
          'gender',
          'title',
          'active',
          'searchable(fideRating)',
          'birthYear'
        ],
        ranking: [
          'typo',
          'geo',
          'words',
          'filters',
          'proximity',
          'attribute',
          'exact',
          'custom'
        ],
        customRanking: [
          'desc(nationalRating)',
          'desc(fideRating)'
        ]
      }
    })

    console.log('✅ Algolia sync completed successfully!')

    return NextResponse.json({
      success: true,
      message: 'Algolia sync completed successfully',
      stats: {
        totalPlayers: algoliaObjects.length,
        batchesProcessed: batches.length,
        indexName: algoliaIndexName,
        lastUpdated: new Date().toISOString()
      }
    }, { status: 200 })

  } catch (error) {
    console.error('❌ Algolia sync error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to sync data to Algolia',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// GET endpoint to check sync status
export async function GET(request: NextRequest) {
  try {
    // Check for secret key authentication
    const secretKey = request.headers.get('x-secret-key')
    const expectedSecretKey = process.env.ALGOLIA_SYNC_SECRET_KEY

    if (!expectedSecretKey) {
      console.error('❌ ALGOLIA_SYNC_SECRET_KEY environment variable not set')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (!secretKey || secretKey !== expectedSecretKey) {
      console.error('❌ Invalid or missing secret key in request')
      return NextResponse.json(
        { error: 'Unauthorized - Invalid secret key' },
        { status: 401 }
      )
    }

    const algoliaAppId = process.env.ALGOLIA_APP_ID
    const algoliaApiKey = process.env.ALGOLIA_ADMIN_API_KEY
    const algoliaIndexName = process.env.ALGOLIA_PLAYERS_INDEX_NAME || 'players'

    if (!algoliaAppId || !algoliaApiKey) {
      return NextResponse.json(
        { error: 'Algolia configuration missing' },
        { status: 500 }
      )
    }

    // Get current player count
    const allPlayers = await getACFPlayersData()
    
    // Get Algolia index info
    const client = algoliasearch(algoliaAppId, algoliaApiKey)
    
    const indexInfo = await client.getSettings({ indexName: algoliaIndexName })

    return NextResponse.json({
      status: 'ready',
      acfPlayersCount: allPlayers.length,
      algoliaIndexName,
      algoliaIndexSettings: {
        searchableAttributes: indexInfo.searchableAttributes,
        attributesForFaceting: indexInfo.attributesForFaceting,
        customRanking: indexInfo.customRanking
      }
    }, { status: 200 })

  } catch (error) {
    console.error('Error checking Algolia sync status:', error)
    return NextResponse.json(
      { error: 'Failed to check sync status' },
      { status: 500 }
    )
  }
}
