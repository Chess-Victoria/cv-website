import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'
import { getACFPlayersData, Player } from '@/lib/utils/acf-ratings'
import { getFideRatingMap } from '@/lib/utils/fide-ratings'

interface PlayersApiResponseItem extends Player {
  fideRating?: number
  fideRatingMonth?: string
}

interface PlayersApiResponse {
  items: PlayersApiResponseItem[]
  total: number
  page: number
  perPage: number
  totalPages: number
  query: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') || '').trim()
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)
  const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get('perPage') || '50', 10) || 50))

  const key = `players:${q.toLowerCase()}:${page}:${perPage}`

  const dataFn = unstable_cache(
    async (): Promise<PlayersApiResponse> => {
      const [allPlayers, fideMap] = await Promise.all([
        getACFPlayersData(),
        getFideRatingMap(),
      ])

      const query = q.toLowerCase()
      const filtered = query
        ? allPlayers.filter(p => p.name.toLowerCase().includes(query))
        : allPlayers

      const total = filtered.length
      const totalPages = Math.max(1, Math.ceil(total / perPage))
      const start = (page - 1) * perPage
      const end = start + perPage
      const paged = filtered.slice(start, end)

      const items: PlayersApiResponseItem[] = paged.map(p => ({
        ...p,
        fideRating: p.fideId && fideMap[p.fideId]?.rating ? fideMap[p.fideId]?.rating : undefined,
        fideRatingMonth: p.fideId && fideMap[p.fideId]?.ratingMonth ? fideMap[p.fideId]?.ratingMonth : undefined,
      }))

      return { items, total, page, perPage, totalPages, query: q }
    },
    [key],
    { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30, tags: ['acf-players', 'fide-ratings'] }
  )

  try {
    const data = await dataFn()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error('Players API error:', error)
    return NextResponse.json({ items: [], total: 0, page, perPage, totalPages: 1, query: q }, { status: 500 })
  }
}


