import { getEventListsForNavigation } from "@/lib/utils/event"
import EventListsGrid from './EventListsGrid'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

export default async function EventsPageDataFetcher() {
  // Fetch all event lists for the cards (only those with events)
  const eventLists = await getEventListsForNavigation();

  return (
    <>
      <EventListsGrid 
        eventLists={eventLists}
        eyebrow="Events"
        heading="Chess Events and Tournaments"
        ctaLabel="View Events"
      />
      
      <CTAWithCountdown
        buttonLabel="Contact Us"
        buttonHref="/contact"
        links={[
          { name: 'Organize an Event', href: '/contact', icon: '/assets/img/icons/calender1.svg' },
          { name: 'Victoria, Australia', href: '/#', icon: '/assets/img/icons/location1.svg' },
        ]}
        useFeaturedEvent
      />
    </>
  )
}
