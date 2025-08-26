"use client"
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Interface for HeroBanner data
export interface HeroBannerData {
  tagline: {
    icon: string;
    text: string;
  };
  title: string;
  description: string;
  buttons: {
    primary: {
      text: string;
      url: string;
    };
    secondary: {
      text: string;
      url: string;
    };
  };
  eventInfo: {
    title: string;
    date: string;
    location: string;
    description: string;
  };
  backgroundImage: string;
  heroImage: string;
  showCountdown?: boolean;
  eventDateTime?: string; // ISO datetime string for countdown
}

interface HeroBannerProps {
  data: HeroBannerData;
  useDynamicCountdown?: boolean; // New prop to enable dynamic countdown
}

export default function HeroBanner({ data, useDynamicCountdown = false }: HeroBannerProps) {
  const [dynamicEventDateTime, setDynamicEventDateTime] = useState<string | undefined>(data.eventDateTime)
  const [dynamicEventInfo, setDynamicEventInfo] = useState(data.eventInfo)

  useEffect(() => {
    if (!useDynamicCountdown) return

    let cancelled = false
    async function loadDynamicCountdown() {
      try {
        const res = await fetch('/api/featured-event/next-schedule', { next: { revalidate: 0 } })
        if (!res.ok) return
        const scheduleData = await res.json()
        if (cancelled) return
        
        if (scheduleData?.nextDateTime) {
          setDynamicEventDateTime(scheduleData.nextDateTime)
          
          // Update event info with dynamic data
          const updatedEventInfo = { ...data.eventInfo }
          if (scheduleData.title) {
            updatedEventInfo.title = scheduleData.title
          }
          if (scheduleData.location) {
            updatedEventInfo.location = scheduleData.location
          }
          if (scheduleData.nextDateTime) {
            try {
              const d = new Date(scheduleData.nextDateTime)
              updatedEventInfo.date = d.toLocaleString('en-AU', {
                day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit'
              })
            } catch {}
          }
          setDynamicEventInfo(updatedEventInfo)
        }
      } catch (e) {
        // silent fail - fallback to static data
      }
    }

    loadDynamicCountdown()
    return () => { cancelled = true }
  }, [useDynamicCountdown, data.eventInfo])

  // Use dynamic data if available, otherwise fall back to static data
  const eventDateTime = dynamicEventDateTime || data.eventDateTime
  const eventInfo = dynamicEventInfo

  return (
    <>
      <div className="hero1-section-area">
        <div className="bg1">
          <img src="/assets/img/bg/header-bg2.png" alt="" className="header-bg1" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero1-header heading1">
                <h5 data-aos="fade-left" data-aos-duration={800}>
                  <img src={data.tagline.icon} alt="" />
                  {data.tagline.text}
                </h5>
                <div className="space16" />
                <h1 className="text-anime-style-3">
                  {data.title}
                </h1>
                <div className="space16" />
                <p data-aos="fade-left" data-aos-duration={900}>
                  {data.description}
                </p>
                <div className="space32" />
                <div className="btn-area1" data-aos="fade-left" data-aos-duration={1100}>
                  <Link href={data.buttons.primary.url} className="vl-btn1">
                    {data.buttons.primary.text}
                  </Link>
                  <Link href={data.buttons.secondary.url} className="vl-btn2">
                    {data.buttons.secondary.text}
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="header-images">
                <div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
                  <img src={data.heroImage} alt="" />
                </div>
                <div className="images-content-area" data-aos="fade-up" data-aos-duration={900}>
                  <h3>{eventInfo.title}</h3>
                  <div className="space12" />
                  <Link href="/#">{eventInfo.date}</Link>
                  <div className="space12" />
                  <Link href="/#">{eventInfo.location}</Link>
                  <div className="space16" />
                  <p>{eventInfo.description}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-1">
              {data.showCountdown && eventDateTime && (
                <Countdown targetDate={eventDateTime} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
