import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import Layout from "@/components/layout/Layout"
import { getEventListsForNavigation } from "@/lib/utils/event"
import PageHeadContent from '@/components/elements/PageHeadContent'
import EventListsGrid from '@/components/sections/events/EventListsGrid'

export const revalidate = 86400; // 24 hours

export default async function EventsPage() {
  // Fetch all event lists for the cards (only those with events)
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
        <EventListsGrid 
          eventLists={eventLists}
          eyebrow="Events"
          heading="Chess Events and Tournaments"
          ctaLabel="View Events"
        />
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
