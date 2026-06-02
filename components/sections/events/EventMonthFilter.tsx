'use client'

import { useMemo, useState } from 'react'
import EventCard from '@/components/sections/events/EventCard'
import { EventData } from '@/lib/types/event'
import { formatEventMonth } from '@/lib/utils/date-formatter'

interface EventMonthFilterProps {
    events: EventData[];
}

const MONTH_ORDER = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export default function EventMonthFilter({ events }: EventMonthFilterProps) {
    const [activeMonth, setActiveMonth] = useState<string>('ALL')

    const monthData = useMemo(() => {
        const monthCounts = new Map<string, number>()

        events.forEach((event) => {
            const month = formatEventMonth(event.datetime)
            monthCounts.set(month.label, (monthCounts.get(month.label) || 0) + 1)
        })

        return MONTH_ORDER.map((monthLabel) => {
            const count = monthCounts.get(monthLabel) || 0

            return {
                key: monthLabel,
                label: monthLabel,
                count,
                disabled: count === 0,
            }
        })
    }, [events])

    const filteredEvents = useMemo(() => {
        if (activeMonth === 'ALL') {
            return events
        }

        return events.filter((event) => formatEventMonth(event.datetime).label === activeMonth)
    }, [activeMonth, events])

    const activeMonthCount = activeMonth === 'ALL'
        ? events.length
        : filteredEvents.length

    return (
        <>
            <div className="space30" />
            <div className="month-filter-wrap">
                <div className="text-center" style={{ marginBottom: '16px' }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>
                        Showing {activeMonth === 'ALL' ? 'all months' : activeMonth} events ({activeMonthCount})
                    </p>
                </div>
                <div className="d-flex flex-wrap gap-2 justify-content-center">
                    <button
                        type="button"
                        className={activeMonth === 'ALL' ? 'vl-btn1 active' : 'vl-btn1'}
                        onClick={() => setActiveMonth('ALL')}
                    >
                        All ({events.length})
                    </button>
                    {monthData.map((month) => (
                        <button
                            key={month.key}
                            type="button"
                            className={activeMonth === month.key ? 'vl-btn1 active' : 'vl-btn1'}
                            onClick={() => setActiveMonth(month.key)}
                            disabled={month.disabled}
                            aria-pressed={activeMonth === month.key}
                            aria-disabled={month.disabled}
                            style={month.disabled ? { opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' } : undefined}
                        >
                            {month.label} ({month.count})
                        </button>
                    ))}
                </div>
            </div>

            <div className="space30" />

            <div className="event-widget-area">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
                        <div key={event.id}>
                            <div className="row">
                                <EventCard event={event} index={index} />
                            </div>
                            {index < filteredEvents.length - 1 && <div className="space48" />}
                        </div>
                    ))
                ) : (
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="text-center">
                                <h3>No Events Available</h3>
                                <p>There are currently no events scheduled for this month.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}