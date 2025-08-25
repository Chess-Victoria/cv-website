import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import AboutPageDataFetcher from '@/components/sections/about/AboutPageDataFetcher'

export const metadata: Metadata = {
  title: "About Chess Victoria | Our Mission, Vision & Chess Community",
  description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria. Discover our history, values, and commitment to fostering a vibrant chess community.",
  keywords: "about chess Victoria, chess Victoria mission, chess Victoria vision, chess community Victoria, chess organization Australia",
  openGraph: {
    title: "About Chess Victoria | Our Mission, Vision & Chess Community",
    description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria. Discover our history, values, and commitment to fostering a vibrant chess community.",
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/about`,
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'About Chess Victoria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Chess Victoria | Our Mission, Vision & Chess Community",
    description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria.",
    images: ['/assets/img/logo/cvlogo.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/about`,
  },
}

export const revalidate = 604800 // 7 days

export default async function About() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="About Chess Victoria"
          backgroundImage="/assets/img/bg/header-bg5.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "About Us", link: "/about" }
          ]}
        />
        
        <Suspense fallback={<PageLoadingSkeleton />}>
          <AboutPageDataFetcher />
        </Suspense>
      </div>
    </Layout>
  )
}