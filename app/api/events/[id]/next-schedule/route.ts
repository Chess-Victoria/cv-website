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
  console.log(`🔍 Parsing schedule string: "${schedule}"`)

  const direct = new Date(schedule)
  if (isValidDate(direct)) {
    console.log(`✅ Direct parsing successful: ${direct.toISOString()}`)
    return direct
  }

  const patterns = [
    /(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/,
    /([A-Za-z]{3,})\s+(\d{1,2}),\s*(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/,
    /Round\s+(\d+)\s+as\s+(\d{1,2})\s+([A-Za-z]{3,})/i, // "Round X as DD MMM"
    /(\d{1,2})\s+([A-Za-z]{3,})/,  // "DD MMM"
    /R(\d+)\s+on\s+(\d{1,2})\s+([A-Za-z]{3,})/i  // "R5 on 6 sept"
  ]

  for (let i = 0; i < patterns.length; i++) {
    const p = patterns[i]
    const m = schedule.match(p)
    if (m) {
      console.log(`🔍 Pattern ${i + 1} match found: ${m.join(', ')}`)
      try {
        let year: number = fallbackYear || new Date().getFullYear()
        let monthStr: string = ''
        let day: number = 0
        let hour = 0
        let minute = 0

        if (i === 0) { // "DD MMM YYYY"
          day = parseInt(m[1], 10)
          monthStr = m[2]
          year = parseInt(m[3], 10)
          if (m[4] && m[5]) { hour = parseInt(m[4], 10); minute = parseInt(m[5], 10) }
        } else if (i === 1) { // "MMM DD, YYYY"
          monthStr = m[1]
          day = parseInt(m[2], 10)
          year = parseInt(m[3], 10)
          if (m[4] && m[5]) { hour = parseInt(m[4], 10); minute = parseInt(m[5], 10) }
        } else if (i === 2) { // "Round X as DD MMM"
          day = parseInt(m[2], 10)
          monthStr = m[3]
          console.log(`🔍 Using fallback year: ${year}`)
        } else if (i === 3) { // "DD MMM"
          day = parseInt(m[1], 10)
          monthStr = m[2]
          console.log(`🔍 Using fallback year: ${year}`)
        } else if (i === 4) { // "R5 on 6 sept"
          day = parseInt(m[2], 10)
          monthStr = m[3]
          console.log(`🔍 Using fallback year: ${year}`)
        }

        const month = new Date(`${monthStr} 1, ${year}`).getMonth()
        const d = new Date(Date.UTC(year, month, day, hour, minute))
        if (isValidDate(d)) {
          console.log(`✅ Pattern ${i + 1} parsing successful: ${d.toISOString()}`)
          return d
        } else {
          console.log(`❌ Pattern ${i + 1} parsing failed - invalid date`)
        }
      } catch (error) {
        console.log(`❌ Pattern ${i + 1} parsing failed: ${error}`)
      }
    }
  }
  console.log(`❌ No valid date found for schedule: "${schedule}"`)
  return null
}

export async function GET(req: Request, { params }: any) {
  try {
    const eventId = params.id
    console.log(`🚀 Starting next-schedule API for event ID: ${eventId}`)
    
    const entry = await client.getEntry(eventId, { include: 4 } as any)
    if (!entry) {
      console.log(`❌ Event not found: ${eventId}`)
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const fields: any = entry.fields || {}
    console.log(`📋 Event fields:`, Object.keys(fields))
    console.log(`📅 Main event datetime:`, fields.datetime)
    
    const now = new Date()
    console.log(`⏰ Current time: ${now.toISOString()}`)
    
    // Determine the base year for parsing schedules
    let baseYear = now.getFullYear()
    if (fields.datetime) {
      const eventDate = new Date(fields.datetime)
      if (isValidDate(eventDate)) {
        baseYear = eventDate.getFullYear()
        console.log(`📅 Using event year as base: ${baseYear}`)
      }
    }
    
    type Candidate = { date: Date; source: 'event' | 'schedule'; schedule?: any }
    const candidates: Candidate[] = []

    // Main event datetime
    if (fields.datetime) {
      const d = new Date(fields.datetime)
      if (isValidDate(d)) {
        console.log(`✅ Main event datetime valid: ${d.toISOString()}`)
        candidates.push({ date: d, source: 'event' })
      } else {
        console.log(`❌ Main event datetime invalid: ${fields.datetime}`)
      }
    }

    // Schedules: pick from linked entries that include datetime
    if (Array.isArray(fields.schedules)) {
      console.log(`📋 Found ${fields.schedules.length} schedules`)
      
      for (let i = 0; i < fields.schedules.length; i++) {
        const s = fields.schedules[i]
        console.log(`\n🔍 Processing schedule ${i + 1}:`, s)
        
        if (s && typeof s === 'object' && 'fields' in s) {
          const scheduleFields: any = (s as any).fields
          console.log(`📋 Schedule fields:`, Object.keys(scheduleFields))
          console.log(`📅 Schedule datetime:`, scheduleFields?.datetime)
          console.log(`🏷️ Schedule round:`, scheduleFields?.round)
          console.log(`📝 Schedule name:`, scheduleFields?.name)
          
          if (scheduleFields?.datetime) {
            const d = new Date(scheduleFields.datetime)
            if (isValidDate(d)) {
              console.log(`✅ Schedule datetime valid: ${d.toISOString()}`)
              candidates.push({ date: d, source: 'schedule', schedule: scheduleFields })
            } else {
              console.log(`❌ Schedule datetime invalid: ${scheduleFields.datetime}`)
            }
          } else {
            console.log(`⚠️ Schedule has no datetime field`)
          }
        } else if (typeof s === 'string' && s.trim()) {
          console.log(`📝 Processing string schedule: "${s}"`)
          // Backward compatibility: string schedules
          const d = parseScheduleString(s, baseYear)
          if (d && isValidDate(d)) {
            console.log(`✅ String schedule parsed: ${d.toISOString()}`)
            candidates.push({ date: d, source: 'schedule', schedule: { name: s } })
          } else {
            console.log(`❌ String schedule parsing failed`)
          }
        } else {
          console.log(`⚠️ Schedule is neither object nor string:`, typeof s)
        }
      }
    } else {
      console.log(`⚠️ No schedules array found or not an array`)
    }

    console.log(`\n📊 All candidates:`, candidates.map(c => ({
      date: c.date.toISOString(),
      source: c.source,
      schedule: c.schedule
    })))

    // Choose the next upcoming datetime
    const future = candidates.filter(c => c.date.getTime() > now.getTime()).sort((a, b) => a.date.getTime() - b.date.getTime())
    console.log(`\n🔮 Future candidates:`, future.map(c => ({
      date: c.date.toISOString(),
      source: c.source,
      schedule: c.schedule
    })))
    
    const next = future[0] || null
    console.log(`\n🎯 Selected next:`, next ? {
      date: next.date.toISOString(),
      source: next.source,
      schedule: next.schedule
    } : 'null')

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

    console.log(`\n📝 Final title:`, title)

    const payload: NextScheduleResponse = {
      eventId,
      eventUrl: fields.url,
      location: fields.location,
      nextDateTime: next ? next.date.toISOString() : undefined,
      ended,
      title
    }

    console.log(`\n📤 Final payload:`, payload)

    // Compute cache TTL: until next schedule if available, otherwise default revalidate
    const defaultTtl = 300
    let sMaxAge = defaultTtl
    if (next) {
      const secondsUntilNext = Math.max(30, Math.floor((next.date.getTime() - now.getTime()) / 1000))
      sMaxAge = secondsUntilNext
      console.log(`⏱️ Cache TTL: ${sMaxAge} seconds`)
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        'Cache-Control': `public, s-maxage=${sMaxAge}, stale-while-revalidate=${defaultTtl}`
      }
    })
  } catch (error) {
    console.error('❌ Error in next-schedule API:', error)
    return NextResponse.json({ error: 'Failed to compute next schedule' }, { status: 500 })
  }
}


