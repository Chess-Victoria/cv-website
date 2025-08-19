import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getEventListsForNavigation } from "@/lib/utils/event"
import PageHeadContent from '@/components/elements/PageHeadContent'

export default async function EventsPage() {
  // Fetch all event lists for the table (only those with events)
  const eventLists = await getEventListsForNavigation();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Events & Tournaments"
          backgroundImage="/assets/img/bg/header-bg8.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Events", link: "/events" }
          ]}
        />
        
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
        
        {/*===== CTA AREA =======*/}
        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          links={[
            { name: 'Organize an Event', href: '/contact', icon: '/assets/img/icons/calender1.svg' },
            { name: 'Victoria, Australia', href: '/#', icon: '/assets/img/icons/location1.svg' },
          ]}
          useFeaturedEvent
        />
        </div>
 		</Layout>
 	  )
 }
