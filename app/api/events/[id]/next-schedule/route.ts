import { NextResponse } from 'next/server'
import client from '@/lib/contentful'

export const revalidate = 300

interface NextScheduleResponse {
  eventId: string
  eventUrl?: string
  location?: string
  nextDateTime?: string
  ended: boolean
  title?: string
}

function isValidDate(d: Date) {
  return d instanceof Date && !isNaN(d.getTime())
}

function parseScheduleString(schedule: string, fallbackYear?: number): Date | null {
  // Try native Date parsing first
  const direct = new Date(schedule)
  if (isValidDate(direct)) return direct

  // Common patterns: "DD MMM YYYY HH:MM", "MMM DD, YYYY HH:MM"
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

  // If we only have weekday/time like "Thursday 7PM", we can't compute absolute without a base
  // Return null in that case
  return null
}

export async function GET(req: Request, { params }: any) {
  try {
    const eventId = params.id
    const entry = await client.getEntry(eventId, { include: 4 } as any)
    if (!entry) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const fields: any = entry.fields || {}
    const now = new Date()
    type Candidate = { date: Date; source: 'event' | 'schedule'; schedule?: any }
    const candidates: Candidate[] = []

    // Main event datetime
    if (fields.datetime) {
      const d = new Date(fields.datetime)
      if (isValidDate(d)) candidates.push({ date: d, source: 'event' })
    }

    // Schedules: pick from linked entries that include datetime
    if (Array.isArray(fields.schedules)) {
      for (const s of fields.schedules) {
        if (s && typeof s === 'object' && 'fields' in s) {
          const scheduleFields: any = (s as any).fields
          if (scheduleFields?.datetime) {
            const d = new Date(scheduleFields.datetime)
            if (isValidDate(d)) candidates.push({ date: d, source: 'schedule', schedule: scheduleFields })
          }
        } else if (typeof s === 'string' && s.trim()) {
          // Backward compatibility: string schedules
          const d = parseScheduleString(s)
          if (d && isValidDate(d)) candidates.push({ date: d, source: 'schedule', schedule: { name: s } })
        }
      }
    }

    // Choose the next upcoming datetime
    const future = candidates.filter(c => c.date.getTime() > now.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())
    const next = future[0] || null

    const ended = !next
    const eventName: string | undefined = fields.name
    let title: string | undefined
    if (next) {
      if (next.source === 'schedule' && next.schedule) {
        const round = next.schedule.round
        const schedName = next.schedule.name
        if (round) title = `${eventName || ''} - ${round}`.trim()
        else if (schedName) title = `${eventName || ''} - ${schedName}`.trim()
      }
      if (!title) title = eventName
    } else {
      title = eventName
    }

    const payload: NextScheduleResponse = {
      eventId,
      eventUrl: fields.url,
      location: fields.location,
      nextDateTime: next ? next.date.toISOString() : undefined,
      ended,
      title
    }

    // Compute cache TTL: until next schedule if available, otherwise default revalidate
    const defaultTtl = 300
    let sMaxAge = defaultTtl
    if (next) {
      const secondsUntilNext = Math.max(30, Math.floor((next.date.getTime() - now.getTime()) / 1000))
      sMaxAge = secondsUntilNext
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${defaultTtl}`
      }
    })
  } catch (error) {
    console.error('Error in next-schedule API:', error)
    return NextResponse.json({ error: 'Failed to compute next schedule' }, { status: 500 })
  }
}


