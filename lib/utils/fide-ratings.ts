import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'
import AdmZip from 'adm-zip'

export interface FideRecord {
  idNumber: string
  name: string
  fed: string
  sex?: string
  title?: string
  rating?: number
  ratingMonth?: string
}

const FIDE_ZIP_URL = 'https://fide-fed-rating.truongthings.dev/AUS/standard/standard.json.zip'

async function fetchFideZipArrayBuffer(): Promise<ArrayBuffer> {
  const res = await fetch(FIDE_ZIP_URL, {
    // Monthly refresh
    next: { revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30 },
  })
  if (!res.ok) {
    throw new Error(`Failed to download FIDE data: ${res.status} ${res.statusText}`)
  }
  return await res.arrayBuffer()
}

function parseFideJsonFromZip(buffer: ArrayBuffer): FideRecord[] {
  const zip = new AdmZip(Buffer.from(buffer))
  const entries = zip.getEntries()
  if (!entries || entries.length === 0) {
    throw new Error('FIDE zip is empty')
  }
  // Find the first .json file
  const jsonEntry = entries.find((e: any) => e.entryName.toLowerCase().endsWith('.json')) || entries[0]
  const jsonText = jsonEntry.getData().toString('utf8')
  const raw = JSON.parse(jsonText) as any[]
  return raw.map((r: any) => ({
    idNumber: String(r['ID Number'] || ''),
    name: String(r['Name'] || ''),
    fed: String(r['Fed'] || ''),
    sex: r['Sex'] ? String(r['Sex']) : undefined,
    title: r['Title'] ? String(r['Title']) : undefined,
    rating: r['Rating'] != null && r['Rating'] !== '' ? Number(r['Rating']) : undefined,
    ratingMonth: r['RatingMonth'] ? String(r['RatingMonth']) : undefined,
  }))
}

export const getFideRatings = unstable_cache(
  async (): Promise<FideRecord[]> => {
    const buf = await fetchFideZipArrayBuffer()
    return parseFideJsonFromZip(buf)
  },
  ['fide-ratings-json'],
  {
    // FIDE data refreshes monthly; reuse ACF_RATINGS as monthly default
    revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30,
    tags: ['fide-ratings'],
  }
)

export const getFideRatingMap = unstable_cache(
  async (): Promise<Record<string, { rating?: number; ratingMonth?: string }>> => {
    const list = await getFideRatings()
    const map: Record<string, { rating?: number; ratingMonth?: string }> = {}
    for (const rec of list) {
      if (rec.idNumber) {
        map[rec.idNumber] = { rating: rec.rating, ratingMonth: rec.ratingMonth }
      }
    }
    return map
  },
  ['fide-ratings-map'],
  {
    revalidate: getRevalidationTime('ACF_RATINGS') || 86400 * 30,
    tags: ['fide-ratings'],
  }
)


