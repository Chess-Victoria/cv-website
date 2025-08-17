import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getEventListsForNavigation } from "@/lib/utils/event"

export default async function EventsPage() {
  // Fetch all event lists for the table (only those with events)
  const eventLists = await getEventListsForNavigation();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>Events & Tournaments</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Events</span></Link>
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
                  <h2>Chess Events and Tournaments</h2>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {eventLists.length > 0 ? (
                    <div className="schedule-section-area">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-11 m-auto">
                            <div className="schedule">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Event List Name</th>
                                    <th>Description</th>
                                    <th>Events Count</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {eventLists.map((eventList, index) => (
                                    <tr key={eventList.id}>
                                      <td>
                                        <strong>{eventList.name}</strong>
                                      </td>
                                      <td>
                                        {eventList.description || 'No description available'}
                                      </td>
                                      <td>
                                        <span className="badge bg-primary">{eventList.eventCount} event{eventList.eventCount !== 1 ? 's' : ''}</span>
                                      </td>
                                      <td>
                                        <Link href={`/events/${eventList.slug}`} className="btn btn-sm btn-primary">
                                          View Events
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="text-center">
                          <h3>No Event Lists Available</h3>
                          <p>There are currently no event lists with scheduled events.</p>
                          <p>Please check back later or contact us for more information.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Organize an Event
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
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Organize an Event
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
