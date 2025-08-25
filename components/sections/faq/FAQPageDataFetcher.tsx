import { getFAQData } from "@/lib/utils/faq"
import FAQPageClient from "./FAQPageClient"

export default async function FAQPageDataFetcher() {
  const faqData = await getFAQData()

  return <FAQPageClient data={faqData} />
}
