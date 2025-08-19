import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getChessClubData } from "@/lib/utils/chess-club"
import { notFound } from "next/navigation"
import EventTabs from "@/components/sections/chess-club/EventTabs"
import { getContactImage, getClubImage, getEventImage } from "@/lib/constants"
import RichTextRenderer from "@/components/elements/RichTextRenderer"
import { unstable_cache } from 'next/cache'
import PageHeadContent from '@/components/elements/PageHeadContent'

// Cache the data fetching with tags for revalidation
const getCachedChessClub = unstable_cache(
  async (slug: string) => {
    return await getChessClubData(slug);
  },
  ['chess-club-data'],
  {
    tags: ['chess-club', 'clubDetail'],
    revalidate: 3600 // 1 hour
  }
);

interface ClubPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { slug } = await params
  
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
        <PageHeadContent
          title={clubData.name}
          backgroundImage="/assets/img/bg/header-bg9.png"
          breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Chess Clubs', link: '/chess-clubs' }, { name: clubData.name, link: `/chess-clubs/${slug}` }] as any}
        />

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
                        <p><strong>Club Slug:</strong> {slug}</p>
                        <p><strong>Has Content:</strong> {clubData.content ? 'Yes' : 'No'}</p>
                        <p><strong>Has Quick Intro:</strong> {clubData.quickIntro ? 'Yes' : 'No'}</p>
                        <p><strong>Content Type:</strong> {typeof clubData.content}</p>
                        <p><strong>Quick Intro Type:</strong> {typeof clubData.quickIntro}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="space32" />
                  
                  {/* Contact Information */}
                  {clubData.contact && (
                    <div className="contact-info">
                      <h4>Contact Information</h4>
                      <div className="space16" />
                      {clubData.contact.name && (
                        <div className="contact-item">
                          <i className="fa-solid fa-user"></i>
                          <span>{clubData.contact.name}</span>
                        </div>
                      )}
                      {clubData.contact.email && (
                        <div className="contact-item">
                          <i className="fa-solid fa-envelope"></i>
                          <span>{clubData.contact.email}</span>
                        </div>
                      )}
                      {clubData.website && (
                        <div className="contact-item">
                          <i className="fa-solid fa-globe"></i>
                          <a href={clubData.website} target="_blank" rel="noopener noreferrer">
                            {clubData.website}
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space32" />
                  
                  {/* Events Section */}
                  {featuredEvent && (
                    <div className="featured-event">
                      <h4>Featured Event</h4>
                      <div className="space16" />
                      <div className="event-card">
                        <h5>{featuredEvent.name}</h5>
                        <p>{featuredEvent.summary}</p>
                        {featuredEvent.datetime && (
                          <div className="event-date">
                            <i className="fa-solid fa-calendar"></i>
                            <span>{new Date(featuredEvent.datetime).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-lg-5">
                <div className="event-side-content">
                  <div className="event-side-widget">
                    <h4>Club Details</h4>
                    <div className="space16" />
                    <ul>
                      <li>
                        <i className="fa-solid fa-chess-board"></i>
                        <span><strong>Club Name:</strong> {clubData.name}</span>
                      </li>
                      {clubData.location && (
                        <li>
                          <i className="fa-solid fa-map-marker-alt"></i>
                          <span><strong>Location:</strong> Latitude: {clubData.location.lat}, Longitude: {clubData.location.lon}</span>
                        </li>
                      )}
                      {clubData.website && (
                        <li>
                          <i className="fa-solid fa-globe"></i>
                          <span><strong>Website:</strong> <a href={clubData.website} target="_blank" rel="noopener noreferrer">{clubData.website}</a></span>
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="space32" />
                  
                  {/* Events Tabs */}
                  {clubData.currentEvents && clubData.currentEvents.events && clubData.currentEvents.events.length > 0 && (
                    <EventTabs events={clubData.currentEvents.events} />
                  )}
                  
                  <div className="space32" />
                  
                  {/* Contact Button */}
                  <div className="contact-button">
                    <Link href="/contact" className="btn btn-primary">
                      Contact This Club
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== EVENT AREA ENDS =======*/}
      </div>
    </Layout>
  )
}