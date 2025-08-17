import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getChessClubData } from "@/lib/utils/chess-club"
import { notFound } from "next/navigation"
import EventTabs from "@/components/sections/chess-club/EventTabs"
import { getContactImage, getClubImage, getEventImage } from "@/lib/constants"
import RichTextRenderer from "@/components/elements/RichTextRenderer"
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'

// Cache the data fetching with tags for revalidation
const getCachedChessClub = unstable_cache(
  async (slug: string) => {
    return await getChessClubData(slug);
  },
  ['chess-club-data'],
  {
    tags: ['chess-club', 'clubDetail'],
    revalidate: getRevalidationTime('CHESS_CLUB')
  }
);

interface ClubPageProps {
  params: {
    slug: string
  }
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = params
  
  console.log(`🏠 Chess club page rendering for slug: ${slug}`);
  
  // Fetch chess club data from Contentful
  const clubData = await getCachedChessClub(slug)
  
  console.log(`📊 Club data received:`, clubData);
  console.log(`📊 Club content:`, clubData?.content);
  console.log(`📊 Club quickIntro:`, clubData?.quickIntro);
  console.log(`📊 Club name:`, clubData?.name);
  
  // If no club found, show 404
  if (!clubData) {
    console.log(`❌ No club data found, showing 404`);
    notFound()
  }

  // Get featured event (first event or null)
  const featuredEvent = clubData.currentEvents?.events?.[0] || null
  
  console.log(`🎯 Featured event:`, featuredEvent);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg9.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{clubData.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>{clubData.name}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*===== EVENT AREA STARTS =======*/}
        <div className="event-sidepage-section-area sp8">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <div className="event-side-images">
                  <div className="img1">
                    {clubData.images && clubData.images.length > 0 ? (
                      <img src={clubData.images[0].url} alt={clubData.images[0].alt || clubData.name} />
                    ) : (
                      <img src={getClubImage()} alt={clubData.name} />
                    )}
                  </div>
                  <div className="space32" />
                  <h3>{clubData.name}</h3>
                  <div className="space16" />
                  {clubData.content ? (
                    <div className="club-content">
                      <RichTextRenderer content={clubData.content} />
                    </div>
                  ) : clubData.quickIntro ? (
                    <div className="club-content">
                      <RichTextRenderer content={clubData.quickIntro} />
                    </div>
                  ) : (
                    <div>
                      <p>Welcome to {clubData.name}. Join us for exciting chess activities and events.</p>
                      
                      {/* Debug section - remove this after debugging */}
                      <div style={{ 
                        marginTop: '20px', 
                        padding: '15px', 
                        backgroundColor: '#f0f0f0', 
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                      }}>
                        <h4>🔍 Debug Info:</h4>
                        <p><strong>Club Name:</strong> {clubData.name}</p>
                        <p><strong>Content exists:</strong> {clubData.content ? 'Yes' : 'No'}</p>
                        <p><strong>QuickIntro exists:</strong> {clubData.quickIntro ? 'Yes' : 'No'}</p>
                        <p><strong>Content type:</strong> {typeof clubData.content}</p>
                        <p><strong>QuickIntro type:</strong> {typeof clubData.quickIntro}</p>
                        {clubData.content && (
                          <div>
                            <p><strong>Content structure:</strong></p>
                            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                              {JSON.stringify(clubData.content, null, 2)}
                            </pre>
                          </div>
                        )}
                        {clubData.quickIntro && (
                          <div>
                            <p><strong>QuickIntro structure:</strong></p>
                            <pre style={{ fontSize: '12px', overflow: 'auto' }}>
                              {JSON.stringify(clubData.quickIntro, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="space40" />
                  
                  {/* Event Speakers/Contact Information */}
                  {clubData.contact && (
                    <>
                      <h4>Club Contact</h4>
                      <div className="row">
                        <div className="col-lg-4 col-md-6">
                          <div className="our-team-boxarea">
                            <div className="team-widget-area">
                              <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
                              <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
                              <div className="img1">
                                <img 
                                  src={getContactImage(clubData.contact?.image?.url)} 
                                  alt={clubData.contact?.image?.alt || clubData.contact?.name || ""} 
                                  className="team-img4" 
                                />
                                <div className="share">
                                  <Link href={`mailto:${clubData.contact.email}`}>
                                    <img src="/assets/img/icons/share1.svg" alt="" />
                                  </Link>
                                </div>
                                <ul>
                                  <li>
                                    <Link href={`mailto:${clubData.contact.email}`} className="icon1">
                                      <i className="fa-solid fa-envelope" />
                                    </Link>
                                  </li>
                                  {clubData.website && (
                                    <li>
                                      <Link href={clubData.website} target="_blank" rel="noopener noreferrer" className="icon2">
                                        <i className="fa-solid fa-globe" />
                                      </Link>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="space28" />
                            <div className="content-area">
                              <Link href={`mailto:${clubData.contact.email}`}>{clubData.contact.name}</Link>
                              <div className="space16" />
                              <p>{clubData.contact.title || 'Club Contact'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-lg-5">
                <div className="shedule-listarea">
                  <div className="content-area">
                    <ul>
                      {featuredEvent && (
                        <>
                          <li>
                            <Link href={featuredEvent.url || '#'}>
                              <img src="/assets/img/icons/clock1.svg" alt="" />
                              {new Date(featuredEvent.datetime).toLocaleDateString()} - {new Date(featuredEvent.datetime).toLocaleTimeString()}
                              <span> | </span>
                            </Link>
                          </li>
                          <li>
                            <Link href={featuredEvent.url || '#'}>
                              <img src="/assets/img/icons/location1.svg" alt="" />
                              {featuredEvent.location}
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                    <div className="space20" />
                    {featuredEvent ? (
                      <Link href={featuredEvent.url || '#'} className="head">{featuredEvent.name}</Link>
                    ) : (
                      <div className="head">No upcoming events</div>
                    )}
                    <div className="space24" />
                    
                    {/* Event Contact Information */}
                    {featuredEvent?.contact && featuredEvent.contact.length > 0 && (
                      <div className="author-area">
                        {featuredEvent.contact.map((contact, index) => (
                          <div key={index} className="autho-name-area" style={index > 0 ? { padding: '0 0 0 12px', border: 'none' } : {}}>
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
                      {featuredEvent?.url ? (
                        <Link href={featuredEvent.url} className="vl-btn1">
                          <span className="demo">Register for Event</span>
                        </Link>
                      ) : (
                        <Link href="/contact" className="vl-btn1">
                          <span className="demo">Contact Club</span>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="space30" />
                  <div className="mapouter">
                    <div className="gmap_canvas">
                      {clubData.location ? (
                        <iframe 
                          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${clubData.location.lat},${clubData.location.lon}`}
                          width={600} 
                          height={450} 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade" 
                        />
                      ) : (
                        <div style={{ width: 600, height: 450, backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
        {/*===== EVENT AREA ENDS =======*/}

        {/*===== EVENT TABS AREA STARTS =======*/}
        {clubData.currentEvents && clubData.currentEvents.events.length > 0 && (
          <EventTabs events={clubData.currentEvents.events} />
        )}
        {/*===== EVENT TABS AREA ENDS =======*/}

        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-block d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <div className="btn-area1">
                      <Link href="/chess-clubs" className="vl-btn1">Find More Clubs</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/events">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Check our upcoming events
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/contact">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Contact Chess Victoria
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CTA AREA ENDS =======*/}
      </div>
    </Layout>
  )
}