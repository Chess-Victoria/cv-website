'use client'
import Link from 'next/link'
import { useState, useMemo, useEffect } from "react"
import { EventListData } from '@/lib/types/event-list'
import RichTextRenderer from '@/components/elements/RichTextRenderer'

interface EventListProps {
  data: EventListData;
  hideCompleted?: boolean;
}

export default function EventList({ data, hideCompleted = false }: EventListProps) {
  const [isTab, setIsTab] = useState(1)
  
  const handleTab = (i: number) => {
    setIsTab(i)
  }

  // Filter out completed days/events if hideCompleted is true
  const filteredData = useMemo(() => {
    if (!hideCompleted) {
      return data;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of today

    const monthMap: { [key: string]: number } = {
      'JAN': 0, 'FEB': 1, 'MAR': 2, 'APR': 3, 'MAY': 4, 'JUN': 5,
      'JUL': 6, 'AUG': 7, 'SEP': 8, 'OCT': 9, 'NOV': 10, 'DEC': 11
    };

    const filteredDays = data.days.filter((day) => {
      const monthIndex = monthMap[day.month.toUpperCase()];
      if (monthIndex === undefined) {
        return true; // Keep if we can't parse the month
      }

      const dayDate = new Date(
        parseInt(day.year),
        monthIndex,
        parseInt(day.date)
      );
      dayDate.setHours(0, 0, 0, 0);

      // Keep days that are on or after today
      return dayDate >= today;
    });

    return {
      ...data,
      days: filteredDays
    };
  }, [data, hideCompleted]);

  // Reset tab to first tab when filtered data changes
  useEffect(() => {
    if (filteredData.days.length > 0) {
      setIsTab(1);
    }
  }, [filteredData.days.length]);

  const hasNoEvents = filteredData.days.length === 0;

  return (
    <div className="event1-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="event-header heading2 space-margin60 text-center">
              <h5 data-aos="fade-left" data-aos-duration={800}>{filteredData.subtitle}</h5>
              <div className="space16" />
              <h2 className="text-anime-style-3">{filteredData.title}</h2>
            </div>
          </div>
        </div>
        {hasNoEvents ? (
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center space-margin60" data-aos="fade-up" data-aos-duration={900}>
                <p className="text-muted" style={{ fontSize: '18px', marginBottom: '24px' }}>
                  No upcoming events
                </p>
                <Link href="/events/our-events-scheduled" className="vl-btn1">
                  View Past Events
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-lg-12">
              <div data-aos="fade-up" data-aos-duration={900}>
                <ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
                  {filteredData.days.map((day, index) => (
                  <li key={`day-${day.id}-${index}`} className="nav-item" onClick={() => handleTab(index + 1)}>
                    <button 
                      className={isTab === index + 1 ? "nav-link active" : "nav-link"} 
                      id={`pills-${day.id}-tab`} 
                      data-bs-toggle="pill" 
                      data-bs-target={`#pills-${day.id}`} 
                      type="button" 
                      role="tab" 
                      aria-controls={`pills-${day.id}`} 
                      aria-selected={isTab === index + 1}
                    >
                      <span className="day">Event {day.dayNumber}</span>
                      <span className="vl-flex">
                        <span className="cal">{day.date}</span>
                        <span className="date">{day.month} <br />{day.year}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              </div>
              <div className="tab-content" id="pills-tabContent">
                {filteredData.days.map((day, dayIndex) => (
                <div 
                  key={`tab-${day.id}-${dayIndex}`}
                  className={isTab === dayIndex + 1 ? "tab-pane fade show active" : "tab-pane fade"} 
                  id={`pills-${day.id}`} 
                  role="tabpanel" 
                  aria-labelledby={`pills-${day.id}-tab`} 
                  tabIndex={0}
                >
                  {day.events.map((event, eventIndex) => (
                    <div key={`event-${event.id}-${dayIndex}-${eventIndex}`}>
                      {eventIndex > 0 && <div className="space30" />}
                      <div 
                        className="tabs-widget-boxarea" 
                        data-aos="fade-up" 
                        data-aos-duration={800 + (eventIndex * 200)}
                      >
                        <div className="row align-items-center">
                          <div className="col-lg-4">
                            <div className="img1">
                              <img src={event.image.src} alt={event.image.alt} />
                            </div>
                          </div>
                          <div className="col-lg-8">
                            <div className="content-area">
                              <ul>
                                <li>
                                  <Link href="/#">
                                    <img src="/assets/img/icons/clock1.svg" alt="" /> 
                                    {event.time} <span> | </span>
                                  </Link>
                                </li>
                                <li>
                                  <Link href="/#">
                                    <img src="/assets/img/icons/location1.svg" alt="" /> 
                                    {event.location}
                                  </Link>
                                </li>
                              </ul>
                              <div className="space20" />
                              <Link href={event.buttonUrl?.startsWith('/event/') ? event.buttonUrl : '/event-single'} className="head">{event.title}</Link>
                              <div className="space16" />
                              {typeof event.description === 'string' ? (
                                <p>{event.description}</p>
                              ) : (
                                <div className="rich-text-content">
                                  <RichTextRenderer content={event.description as any} />
                                </div>
                              )}
                              <div className="space32" />
                              <div className="btn-area1">
                                <Link href={event.buttonUrl} className="vl-btn1">{event.buttonText}</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
