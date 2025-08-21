import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import Link from "next/link"
import { notFound } from 'next/navigation'
import { getEventDataBySlug } from '@/lib/utils/event'
import { EventData } from '@/lib/types/event'
import { getEventImage, getContactImage } from '@/lib/constants'
import RichTextRenderer from '@/components/elements/RichTextRenderer'

interface EventSingleProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: EventSingleProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventDataBySlug(slug);
  
  if (!event) {
    return {
      title: 'Event Not Found - Chess Victoria',
      description: 'The event you are looking for does not exist.',
    };
  }

  const formattedDate = new Date(event.datetime).toLocaleDateString('en-AU', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const formattedTime = new Date(event.datetime).toLocaleTimeString('en-AU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const title = `${event.name} | Chess Victoria Event`;
  const description = event.summary 
    ? `${event.summary} Join us on ${formattedDate} at ${formattedTime}${event.location ? ` at ${event.location}` : ''}.`
    : `Join us for ${event.name} on ${formattedDate} at ${formattedTime}${event.location ? ` at ${event.location}` : ''}.`;

  return {
    title,
    description,
    keywords: `chess event, ${event.name}, chess tournament, chess Victoria, chess competition, ${event.location || 'chess event'}`,
    openGraph: {
      title,
      description,
      type: 'website',
      		url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/event/${slug}`,
      images: [
        {
          url: '/assets/img/logo/cvlogo.png',
          width: 1200,
          height: 630,
          alt: event.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/img/logo/cvlogo.png'],
    },
    	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/event/${slug}`,
	},
  };
}

export default async function EventSingle({ params }: EventSingleProps) {
  const { slug } = await params
  const event: EventData | null = await getEventDataBySlug(slug)
  if (!event) {
    notFound()
  }

  const formattedDate = new Date(event.datetime).toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
  const formattedTime = new Date(event.datetime).toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })

  const mapSrc = event.location && process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    ? `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(event.location)}`
    : undefined

  const descriptionContent = event.description ? (
    <RichTextRenderer content={event.description} className="event-description" />
  ) : null;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        {/* Header area (template style) */}
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg9.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{event.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Event</span> <i className="fa-solid fa-angle-right" /> <span>{event.name}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event main area (template) */}
        <div className="event-sidepage-section-area sp8">
          <div className="container" style={{ paddingBottom: '3rem' }}>
            <div className="row">
              <div className="col-lg-7">
                <div className="event-side-images">
                  <div className="img1">
                    <img src={getEventImage()} alt={event.name} />
                  </div>
                  <div className="space32" />
                  <h3>{event.name}</h3>
                  <div className="space16" />
                  {event.summary && <p>{event.summary}</p>}
                  {descriptionContent && (
                    <>
                      <div className="space24" />
                      <div className="event-description">
                        {descriptionContent}
                      </div>
                    </>
                  )}

                  {/* Event Contacts */}
                  {event.contact && event.contact.length > 0 && (
                    <>
                      <div className="space40" />
                      <h4>Event Contacts</h4>
                      <div className="row">
                        {event.contact.map((c, i) => (
                          <div className="col-lg-4 col-md-6" key={c.id || i}>
                            <div className="our-team-boxarea">
                              <div className="team-widget-area">
                                <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
                                <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
                                <div className="img1">
                                  <img src={c.image?.url || getContactImage()} alt={c.image?.alt || c.name || ''} className="team-img4" />
                                  <div className="share">
                                    {c.email ? (
                                      <Link href={`mailto:${c.email}`}><img src="/assets/img/icons/share1.svg" alt="" /></Link>
                                    ) : (
                                      <span />
                                    )}
                                  </div>
                                  <ul>
                                    {c.email && (
                                      <li>
                                        <Link href={`mailto:${c.email}`} className="icon1"><i className="fa-solid fa-envelope" /></Link>
                                      </li>
                                    )}
                                    {c.phone && (
                                      <li>
                                        <Link href={`tel:${c.phone}`} className="icon2"><i className="fa-solid fa-phone" /></Link>
                                      </li>
                                    )}
                                  </ul>
                                </div>
                              </div>
                              <div className="space28" />
                              <div className="content-area">
                                {c.email ? (
                                  <Link href={`mailto:${c.email}`}>{c.name}</Link>
                                ) : (
                                  <span>{c.name}</span>
                                )}
                                <div className="space16" />
                                <p>{c.title || 'Event Organizer'}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="shedule-listarea">
                  <div className="content-area">
                    <ul>
                      <li>
                        <img src="/assets/img/icons/clock1.svg" alt="" />
                        {formattedDate} - {formattedTime}
                      </li>
                      {event.location && (
                        <li>
                          <img src="/assets/img/icons/location1.svg" alt="" />
                          {event.location}
                        </li>
                      )}
                    </ul>
                    <div className="space20" />
                    <div className="btn-area1">
                      {event.url ? (
                        <Link href={event.url} className="vl-btn1">
                          <span className="demo">View Details</span>
                        </Link>
                      ) : (
                        <Link href="/contact" className="vl-btn1">
                          <span className="demo">Contact Organizer</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="space30" />
                  <div className="mapouter">
                    <div className="gmap_canvas">
                      {mapSrc ? (
                        <iframe
                          src={mapSrc}
                          width={600}
                          height={450}
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      ) : (
                        <div style={{ 
                          width: '100%', 
                          height: '450px', 
                          backgroundColor: '#f0f0f0', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}>
                          <p>Location map not available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CTAWithCountdown 
          buttonLabel="Contact Us" 
          buttonHref="/contact" 
          useFeaturedEvent 
        />
      </div>
    </Layout>
  )
}
