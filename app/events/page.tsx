import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import EventsPageDataFetcher from '@/components/sections/events/EventsPageDataFetcher'

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
        
        <Suspense fallback={<PageLoadingSkeleton />}>
          <EventsPageDataFetcher />
        </Suspense>
      </div>
    </Layout>
  )
}
