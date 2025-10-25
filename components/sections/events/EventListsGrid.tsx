'use client'
import Link from 'next/link'

interface EventListItem {
  id: string
  name: string
  slug: string
  description?: string
  eventCount: number
}

interface EventListsGridProps {
  eventLists?: EventListItem[]
  eyebrow?: string
  heading?: string
  ctaLabel?: string
}

export default function EventListsGrid({ 
  eventLists, 
  eyebrow = 'Events', 
  heading = 'Chess Events and Tournaments', 
  ctaLabel = 'View Events' 
}: EventListsGridProps) {
  // If no event lists data, show a message
  if (!eventLists || eventLists.length === 0) {
    return (
      <div className="choose-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 m-auto">
              <div className="heading2 text-center space-margin60">
                <h5>{eyebrow}</h5>
                <div className="space18" />
                <h2>{heading}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p>No event lists available at the moment. Check back soon for updates!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="choose-section-area sp2">
      <div className="container">
        <div className="row">
          <div className="col-lg-7 m-auto">
            <div className="heading2 text-center space-margin60">
              <h5>{eyebrow}</h5>
              <div className="space18" />
              <h2>{heading}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {eventLists.map((eventList, index) => (
            <div key={eventList.id || index} className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <img src="/assets/img/icons/calender1.svg" alt="" />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href={`/events/${eventList.slug}`}>
                    {eventList.name || 'Untitled Event List'}
                  </Link>
                  <div className="space16" />
                  <p>
                    {eventList.description || 'Discover exciting chess events and tournaments.'}
                  </p>
                  <div className="space16" />
                  <span className="badge bg-primary mb-3">
                    {eventList.eventCount} event{eventList.eventCount !== 1 ? 's' : ''}
                  </span>
                  <div className="space24" />
                  <Link 
                    href={`/events/${eventList.slug}`} 
                    className="readmore"
                  >
                    {ctaLabel} <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
