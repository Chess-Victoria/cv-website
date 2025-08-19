import { NextResponse } from 'next/server'
import { getSingleEntry } from '@/lib/contentful'
import { getRevalidationTime } from '@/lib/config'
import client from '@/lib/contentful'

export const revalidate = 300

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime())
}

function parseScheduleString(schedule: string): Date | null {
  const direct = new Date(schedule)
  if (isValidDate(direct)) return direct

  const patterns = [
    /(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/,
    /([A-Za-z]{3,})\s+(\d{1,2}),\s*(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/
  ]

  for (const p of patterns) {
    const m = schedule.match(p)
    if (m) {
      try {
        let year: number, monthStr: string, day: number, hour = 0, minute = 0
        if (p === patterns[0]) {
          day = parseInt(m[1], 10)
          monthStr = m[2]
          year = parseInt(m[3], 10)
          if (m[4] && m[5]) { hour = parseInt(m[4], 10); minute = parseInt(m[5], 10) }
        } else {
          monthStr = m[1]
          day = parseInt(m[2], 10)
          year = parseInt(m[3], 10)
          if (m[4] && m[5]) { hour = parseInt(m[4], 10); minute = parseInt(m[5], 10) }
        }
        const month = new Date(`${monthStr} 1, ${year}`).getMonth()
        const d = new Date(Date.UTC(year, month, day, hour, minute))
        if (isValidDate(d)) return d
      } catch {}
    }
  }
  return null
}

export async function GET() {
  try {
    const home = await getSingleEntry('homePage', 4)
    if (!home) return NextResponse.json({ error: 'homePage not found' }, { status: 404 })
    const fields: any = home.fields || {}

    const promotion = fields.heroBanner || fields.promotionBanner || fields.hero || fields.promotion || fields.featuredBanner
    const eventRef = promotion?.fields?.event || promotion?.event
    const eventId: string | undefined = eventRef?.sys?.id

    if (!eventId) {
      return NextResponse.json({ error: 'No featured event configured' }, { status: 200 })
    }

    // Delegate to the specific event endpoint logic by fetching the entry directly
    const entry = await client.getEntry(eventId, { include: 4 } as any)
    if (!entry) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const now = new Date()
    const fieldsEvent: any = entry.fields || {}
    type Candidate = { date: Date; schedule?: any }
    const candidates: Candidate[] = []

    if (fieldsEvent.datetime) {
      const d = new Date(fieldsEvent.datetime)
      if (!isNaN(d.getTime())) candidates.push({ date: d })
    }
    if (Array.isArray(fieldsEvent.schedules)) {
      for (const s of fieldsEvent.schedules) {
        if (s && typeof s === 'object' && 'fields' in s) {
          const sf: any = (s as any).fields
          if (sf?.datetime) {
            const d = new Date(sf.datetime)
            if (isValidDate(d)) candidates.push({ date: d, schedule: sf })
          }
        } else if (typeof s === 'string' && s.trim()) {
          const dd = parseScheduleString(s)
          if (dd && isValidDate(dd)) candidates.push({ date: dd, schedule: { name: s } })
        }
      }
    }

    const future = candidates.filter(c => c.date.getTime() > now.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())
    const next = future[0] || null

    const defaultTtl = Math.max(60, getRevalidationTime('EVENT'))
    let sMaxAge = defaultTtl
    if (next) {
      const secondsUntilNext = Math.max(30, Math.floor((next.date.getTime() - now.getTime()) / 1000))
      sMaxAge = secondsUntilNext
    }

    return NextResponse.json({
      eventId,
      eventUrl: fieldsEvent.url,
      location: fieldsEvent.location,
      nextDateTime: next ? next.date.toISOString() : undefined,
      ended: !next,
      title: ((): string | undefined => {
        const eventName: string | undefined = fieldsEvent.name
        if (next?.schedule) {
          const round = next.schedule.round
          const schedName = next.schedule.name
          if (round) return `${eventName || ''} - ${round}`.trim()
          if (schedName) return `${eventName || ''} - ${schedName}`.trim()
        }
        return eventName
      })()
    }, {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${defaultTtl}`
      }
    })
  } catch (e) {
    console.error('Error in featured-event/next-schedule:', e)
    return NextResponse.json({ error: 'Failed to load featured event' }, { status: 500 })
  }
}


