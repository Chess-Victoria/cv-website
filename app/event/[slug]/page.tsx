import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import { notFound } from 'next/navigation'
import { getEventDataBySlug } from '@/lib/utils/event'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import EventSinglePageDataFetcher from '@/components/sections/events/EventSinglePageDataFetcher'

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
  const event = await getEventDataBySlug(slug)
  
  if (!event) {
    notFound()
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <EventSinglePageDataFetcher slug={slug} />
      </Suspense>
    </Layout>
  )
}
