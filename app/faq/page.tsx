import Layout from "@/components/layout/Layout"
import FAQPageClient from "@/components/sections/faq/FAQPageClient"
import { getFAQData } from "@/lib/utils/faq"

export default async function Faq() {
  const faqData = await getFAQData();
	console.log("faqData", faqData.faqs)
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <FAQPageClient data={faqData} />
    </Layout>
  )
}