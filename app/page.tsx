import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import HomePageDataFetcher from '@/components/sections/home/HomePageDataFetcher'
import { generateHomeMetadata } from './metadata'

// Generate metadata using the new system
export async function generateMetadata(): Promise<Metadata> {
  const { getHomePageData } = await import('./home.data')
  const homePageData = await getHomePageData()
  return generateHomeMetadata(homePageData.metadata)
}

export default async function Home() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <HomePageDataFetcher />
      </Suspense>
    </Layout>
  )
}