import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import FAQPageDataFetcher from "@/components/sections/faq/FAQPageDataFetcher"

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Chess Victoria',
  description: 'Find answers to common questions about Chess Victoria events, registration, and more.',
}

export const revalidate = 604800; // 7 days

export default async function FAQPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <Suspense fallback={<PageLoadingSkeleton />}>
        <FAQPageDataFetcher />
      </Suspense>
    </Layout>
  )
}