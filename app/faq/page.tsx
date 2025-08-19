import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import { getFAQData } from "@/lib/utils/faq"
import FAQPageClient from "@/components/sections/faq/FAQPageClient"

export const metadata: Metadata = {
  title: 'Frequently Asked Questions - Chess Victoria',
  description: 'Find answers to common questions about Chess Victoria events, registration, and more.',
}

export default async function FAQPage() {
  const faqData = await getFAQData()

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <FAQPageClient data={faqData} />
    </Layout>
  )
}