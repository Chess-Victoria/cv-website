import { getEntries } from '@/lib/contentful';
import { FAQ, FAQData, FAQListData } from '@/lib/types/faq';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

/**
 * Fetch all FAQ entries from Contentful
 */
export async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await getEntries('frequentlyAskedQuestion', 2);
    return response as unknown as FAQ[];
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

/**
 * Map FAQ entries to FAQData with rendered RichText
 */
export function mapFAQsToData(faqs: FAQ[]): FAQData[] {
  return faqs.map((faq) => ({
    id: faq.sys.id,
    question: faq.fields.question,
    answer: documentToReactComponents(faq.fields.answer) || null,
    tags: faq.metadata.tags.map(tag => tag.sys.id)
  }));
}

/**
 * Get all unique tags from FAQ entries
 */
export function getUniqueTags(faqs: FAQ[]): string[] {
  const allTags = faqs.flatMap(faq => 
    faq.metadata.tags.map(tag => tag.sys.id)
  );
  return [...new Set(allTags)].sort();
}

/**
 * Filter FAQs by tag
 */
export function filterFAQsByTag(faqs: FAQData[], tag: string | null): FAQData[] {
  if (!tag) return faqs;
  return faqs.filter(faq => faq.tags.includes(tag));
}

/**
 * Get complete FAQ data for the page
 */
export async function getFAQData(): Promise<FAQListData> {
  try {
    const faqs = await getFAQs();
    const faqData = mapFAQsToData(faqs);
    const availableTags = getUniqueTags(faqs);

    return {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about Chess Victoria",
      faqs: faqData,
      availableTags
    };
  } catch (error) {
    console.error('Error getting FAQ data:', error);
    return {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about Chess Victoria",
      faqs: [],
      availableTags: []
    };
  }
}
