import Link from "next/link";
import { EventData } from "@/lib/types/event";
import { getEventImage } from "@/lib/constants";

interface EventCardProps {
  event: EventData;
  index: number;
}

export default function EventCard({ event, index }: EventCardProps) {
  const imageUrl = getEventImage();
  const eventDate = new Date(event.datetime);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  const formattedDateTime = `${formattedDate} at ${formattedTime}`;

  return (
    <div className="col-lg-10 m-auto">
      <div className="event2-boxarea box1">
        <h1 className="active">{(index + 1).toString().padStart(2, '0')}</h1>
        <div className="row align-items-center">
          <div className="col-lg-5">
            <div className="img1">
              <img src={imageUrl} alt={event.name} />
            </div>
          </div>
          <div className="col-lg-1" />
          <div className="col-lg-6">
            <div className="content-area">
              <ul>
                <li>
                  <Link href={event.url || '#'}>
                    <img src="/assets/img/icons/clock1.svg" alt="" />
                    {formattedDateTime} <span> | </span>
                  </Link>
                </li>
                {event.location && (
                  <li>
                    <Link href={event.url || '#'}>
                      <img src="/assets/img/icons/location1.svg" alt="" />
                      {event.location}
                    </Link>
                  </li>
                )}
              </ul>
              <div className="space20" />
              <Link href={event.slug ? `/event/${event.slug}` : (event.url || '#')} className="head">{event.name}</Link>
              {event.summary && (
                <>
                  <div className="space16" />
                  <p>{event.summary}</p>
                </>
              )}
              <div className="space24" />
              
              {/* Event Contacts */}
              {event.contact && event.contact.length > 0 && (
                <div className="author-area">
                  {event.contact.map((contact, contactIndex) => (
                    <div key={contact.id} className="autho-name-area" style={contactIndex > 0 ? { padding: '0 0 0 12px', border: 'none' } : {}}>
                      <div className="img1">
                        <img 
                          src={contact.image?.url || getEventImage()} 
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
                {event.url ? (
                  <Link href={event.url} className="vl-btn1">
                    <span className="demo">Register for Event</span>
                  </Link>
                ) : (
                  <Link href="/contact" className="vl-btn1">
                    <span className="demo">Contact Organizer</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
