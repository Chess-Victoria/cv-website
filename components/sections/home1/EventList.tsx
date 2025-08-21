'use client'
import Link from 'next/link'
import { useState } from "react"
import { EventListData } from '@/lib/types/event-list'
import RichTextRenderer from '@/components/elements/RichTextRenderer'

interface EventListProps {
  data: EventListData;
}

export default function EventList({ data }: EventListProps) {
  const [isTab, setIsTab] = useState(1)
  
  const handleTab = (i: number) => {
    setIsTab(i)
  }

  return (
    <div className="event1-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="event-header heading2 space-margin60 text-center">
              <h5 data-aos="fade-left" data-aos-duration={800}>{data.subtitle}</h5>
              <div className="space16" />
              <h2 className="text-anime-style-3">{data.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div data-aos="fade-up" data-aos-duration={900}>
              <ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
                {data.days.map((day, index) => (
                  <li key={day.id} className="nav-item" onClick={() => handleTab(index + 1)}>
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
              {data.days.map((day, dayIndex) => (
                <div 
                  key={day.id}
                  className={isTab === dayIndex + 1 ? "tab-pane fade show active" : "tab-pane fade"} 
                  id={`pills-${day.id}`} 
                  role="tabpanel" 
                  aria-labelledby={`pills-${day.id}-tab`} 
                  tabIndex={0}
                >
                  {day.events.map((event, eventIndex) => (
                    <div key={event.id}>
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
      </div>
    </div>
  )
}
