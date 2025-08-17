
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getEventListData } from "@/lib/utils/event"
import EventCard from "@/components/sections/events/EventCard"
import { notFound } from "next/navigation"

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = params;

  // Fetch event list data
  const eventListData = await getEventListData(slug);

  if (!eventListData) {
    notFound();
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{eventListData.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/events">Events</Link> <i className="fa-solid fa-angle-right" /> <span>{eventListData.name}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/*===== HERO AREA ENDS =======*/}
        {/*===== EVENT AREA STARTS =======*/}
        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading2 text-center space-margin60">
                  <p>{eventListData.description || 'Events and Tournaments'}</p>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {eventListData.events.length > 0 ? (
                    eventListData.events.map((event, index) => (
                      <div key={event.id}>
                        <div className="row">
                          <EventCard event={event} index={index} />
                        </div>
                        {index < eventListData.events.length - 1 && (
                          <div className="space48" />
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="text-center">
                          <h3>No Events Available</h3>
                          <p>There are currently no events scheduled in {eventListData.name}.</p>
                          <p>Please check back later or contact us for more information.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Pagination - Simplified for now */}
                {eventListData.events.length > 0 && (
                  <>
                    <div className="space60" />
                    <div className="pagination-area">
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                          <li className="page-item">
                            <Link className="page-link" href="#" aria-label="Previous">
                              <i className="fa-solid fa-angle-left" />
                            </Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link active" href="#">1</Link>
                          </li>
                          <li className="page-item">
                            <Link className="page-link" href="#" aria-label="Next">
                              <i className="fa-solid fa-angle-right" />
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/*===== EVENT AREA ENDS =======*/}
        
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-block d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/events">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        View All Event Lists
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CTA AREA ENDS =======*/}
        
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-none d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/events">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        View All Event Lists
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}