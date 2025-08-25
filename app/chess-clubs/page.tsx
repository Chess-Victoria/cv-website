
import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import ChessClubsPageDataFetcher from '@/components/sections/chess-clubs/ChessClubsPageDataFetcher'

export const metadata: Metadata = {
  title: "Chess Clubs in Victoria | Find Local Chess Clubs & Communities",
  description: "Discover chess clubs across Victoria. Find local chess communities, club locations, contact information, and join the vibrant chess scene in your area. From beginners to advanced players.",
  keywords: "chess clubs Victoria, local chess clubs, chess communities, chess Victoria clubs, chess club locations, join chess club, chess Victoria",
  openGraph: {
    title: "Chess Clubs in Victoria | Find Local Chess Clubs & Communities",
    description: "Discover chess clubs across Victoria. Find local chess communities, club locations, contact information, and join the vibrant chess scene in your area.",
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/chess-clubs`,
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'Chess Clubs in Victoria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chess Clubs in Victoria | Find Local Chess Clubs & Communities",
    description: "Discover chess clubs across Victoria. Find local chess communities, club locations, and join the vibrant chess scene.",
    images: ['/assets/img/logo/cvlogo.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/chess-clubs`,
  },
}

export default async function ChessClubsPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Chess Clubs in Victoria"
          backgroundImage="/assets/img/bg/header-bg10.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Chess Clubs", link: "/chess-clubs" }
          ]}
        />

        <Suspense fallback={<PageLoadingSkeleton />}>
          <ChessClubsPageDataFetcher />
        </Suspense>
      </div>
    </Layout>
  )
}