import { Metadata } from 'next'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import Layout from "@/components/layout/Layout"
import { getEventListsForNavigation } from "@/lib/utils/event"
import PageHeadContent from '@/components/elements/PageHeadContent'
import EventListsGrid from '@/components/sections/events/EventListsGrid'

export const metadata: Metadata = {
  title: "Events & Tournaments | Chess Victoria - Chess Competitions & Events",
  description: "Discover chess events and tournaments across Victoria. From local club tournaments to major championships, find upcoming chess competitions, schedules, and registration information.",
  keywords: "chess events Victoria, chess tournaments, chess competitions, chess Victoria events, chess tournament schedule, chess competitions Australia",
  openGraph: {
    title: "Events & Tournaments | Chess Victoria - Chess Competitions & Events",
    description: "Discover chess events and tournaments across Victoria. From local club tournaments to major championships, find upcoming chess competitions, schedules, and registration information.",
    type: 'website',
    		url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/events`,
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'Chess Victoria Events & Tournaments',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Events & Tournaments | Chess Victoria - Chess Competitions & Events",
    description: "Discover chess events and tournaments across Victoria. From local club tournaments to major championships.",
    images: ['/assets/img/logo/cvlogo.png'],
  },
  	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/events`,
	},
}

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
