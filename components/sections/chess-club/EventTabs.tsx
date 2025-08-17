'use client'

import Link from "next/link"
import { useState } from "react"
import { getContactImage, getEventImage } from "@/lib/constants"
import { Document } from '@contentful/rich-text-types';

interface EventContact {
  name: string;
  title?: string;
  email?: string;
  image?: {
    url: string;
    alt?: string;
  };
}

interface Event {
  id: string;
  name: string;
  datetime: string;
  location: string;
  url?: string;
  summary?: string;
  description?: any; // Raw Contentful response
  contact?: EventContact[];
}

interface EventTabsProps {
  events: Event[];
}

export default function EventTabs({ events }: EventTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  if (!events || events.length === 0) {
    return null;
  }

  const displayEvents = events.slice(0, 3);

  return (
    <div className="event-single-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="event2-header heading2 text-center">
              <h2 className="text-anime-style-3">Club Events ({events.length} events)</h2>
            </div>
          </div>
          <div className="space32" />
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
            <div className="tabs-button space-margin60">
              <ul className="nav nav-pills" id="pills-tab" role="tablist">
                {displayEvents.map((event, index) => (
                  <li key={event.id} className="nav-item">
                    <button 
                      className={activeTab === index ? "nav-link active" : "nav-link"} 
                      id={`pills-${index}-tab`} 
                      type="button" 
                      role="tab" 
                      aria-controls={`pills-${index}`} 
                      aria-selected={activeTab === index}
                      onClick={() => handleTabClick(index)}
                    >
                      <span className="calender">
                        <img src="/assets/img/icons/calender2.svg" alt="" />
                      </span>
                      <span className="pl-8">
                        <span className="day">Event {index + 1}</span>
                        <span className="date">{new Date(event.datetime).toLocaleDateString()}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tab-content" id="pills-tabContent">
              {displayEvents.map((event, index) => (
                <div 
                  key={event.id}
                  className={activeTab === index ? "tab-pane fade show active" : "tab-pane fade"} 
                  id={`pills-${index}`} 
                  role="tabpanel" 
                  aria-labelledby={`pills-${index}-tab`} 
                  tabIndex={0}
                >
                  <div className="event-widget-area">
                    <div className="row">
                      <div className="col-lg-1" />
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <h1 className="active">0{index + 1}</h1>
                          <div className="row align-items-center">
                            <div className="col-lg-5">
                                                          <div className="img1">
                              <img src={getEventImage()} alt="" />
                            </div>
                            </div>
                            <div className="col-lg-1" />
                            <div className="col-lg-6">
                              <div className="content-area">
                                <ul>
                                  <li>
                                    <Link href={event.url || '#'}>
                                      <img src="/assets/img/icons/clock1.svg" alt="" />
                                      {new Date(event.datetime).toLocaleTimeString()}
                                      <span> | </span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href={event.url || '#'}>
                                      <img src="/assets/img/icons/location1.svg" alt="" />
                                      {event.location}
                                    </Link>
                                  </li>
                                </ul>
                                <div className="space20" />
                                <Link href={event.url || '#'} className="head">{event.name}</Link>
                                <div className="space24" />
                                {event.contact && event.contact.length > 0 && (
                                  <div className="author-area">
                                    {event.contact.map((contact, contactIndex) => (
                                      <div key={contactIndex} className="autho-name-area" style={contactIndex > 0 ? { padding: '0 0 0 12px', border: 'none' } : {}}>
                                        <div className="img1">
                                          <img 
                                            src={getContactImage(contact.image?.url)} 
                                            alt={contact.image?.alt || contact.name || ""} 
                                          />
                                        </div>
                                        <div className="text">
                                          <Link href={`mailto:${contact.email}`}>{contact.name}</Link>
                                          <div className="space8" />
                                          <p>{contact.title || 'Event Contact'}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                <div className="space24" />
                                <div className="btn-area1">
                                  <Link href={event.url || '/contact'} className="vl-btn1">
                                    <span className="demo">Register for Event</span>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
