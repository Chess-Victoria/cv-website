"use client"
import Link from 'next/link'
import Countdown from '@/components/elements/Countdown'
import { useEffect, useState } from 'react'

export interface CTALinkItem {
  name: string
  href: string
  icon?: string
}

export interface CTAWithCountdownProps {
  className?: string
  buttonLabel?: string
  buttonHref?: string
  links?: CTALinkItem[]
  targetDate?: string
  eventId?: string
  useFeaturedEvent?: boolean
}

export default function CTAWithCountdown({
  className,
  buttonLabel = 'Contact Us',
  buttonHref = '/contact',
  links = [],
  targetDate,
  eventId,
  useFeaturedEvent,
}: CTAWithCountdownProps) {
  const [resolvedDate, setResolvedDate] = useState<string | undefined>(targetDate)
  const [resolvedLinks, setResolvedLinks] = useState<CTALinkItem[]>(links)
  const [resolvedHref, setResolvedHref] = useState<string>(buttonHref)
  const [resolvedTitle, setResolvedTitle] = useState<string | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (targetDate) {
        setResolvedDate(targetDate)
        // Build date link from provided targetDate
        try {
          const d = new Date(targetDate)
          const formatted = d.toLocaleString('en-AU', {
            day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'
          })
          const dateLink: CTALinkItem = { name: formatted, href: '/#', icon: '/assets/img/icons/calender1.svg' }
          setResolvedLinks([dateLink, ...links])
        } catch {
          setResolvedLinks(links)
        }
        return
      }
      try {
        const url = useFeaturedEvent
          ? '/api/featured-event/next-schedule'
          : (eventId ? `/api/events/${encodeURIComponent(eventId)}/next-schedule` : undefined)
        if (!url) return
        const res = await fetch(url, { next: { revalidate: 0 } })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        
        if (data?.nextDateTime) {
          setResolvedDate(data.nextDateTime)
        }
        if (data?.title) setResolvedTitle(data.title)
        const newLinks: CTALinkItem[] = []
        if (data?.nextDateTime) {
          try {
            const d = new Date(data.nextDateTime)
            const formatted = d.toLocaleString('en-AU', {
              day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'
            })
            newLinks.push({ name: formatted, href: data.eventUrl || '/#', icon: '/assets/img/icons/calender1.svg' })
          } catch {}
        }
        if (data?.location) {
          newLinks.push({ name: data.location, href: data.eventUrl || '/#', icon: '/assets/img/icons/location1.svg' })
        }
        // Append any provided links after dynamic ones
        if (links && links.length > 0) newLinks.push(...links)
        setResolvedLinks(newLinks.length > 0 ? newLinks : links)
        if (data?.eventUrl && !buttonHref) {
          setResolvedHref(data.eventUrl)
        }
      } catch (e) {
        // silent fail
      }
    }
    load()
    return () => { cancelled = true }
  }, [targetDate, eventId, useFeaturedEvent, JSON.stringify(links)])

  return (
    <div className={`cta1-section-area d-lg-block d-block ${className || ''}`.trim()}>
      <div className="container">
        <div className="row">
          <div className="col-lg-10 m-auto">
            <div className="cta1-main-boxarea">
            {resolvedTitle && (
                  <div className="mb-2" style={{ fontWeight: 600, fontSize: '1.8rem' }}>
                    {resolvedTitle}
                  </div>
                )}
              <div className="timer-btn-area">
               
                {resolvedDate && <Countdown targetDate={resolvedDate} />}
                <div className="btn-area1">
                  <Link href={resolvedHref} className="vl-btn1">{buttonLabel}</Link>
                </div>
              </div>
              {resolvedLinks.length > 0 && (
                <ul>
                  {resolvedLinks.map((l, idx) => (
                    <li key={idx} className={idx === resolvedLinks.length - 1 ? 'm-0' : ''}>
                      <Link href={l.href}>
                        {l.icon && <img src={l.icon} alt="" />}
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


