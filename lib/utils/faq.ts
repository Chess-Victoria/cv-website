import { getEntries } from '@/lib/contentful';
import { FAQ, FAQData, FAQListData } from '@/lib/types/faq';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

/**
 * Extract plain text from rich text content
 */
function extractTextFromRichText(content: any): string {
  if (!content || !content.content) return '';
  
  const extractText = (items: any[]): string => {
    return items.map(item => {
      if (item.content) {
        return extractText(item.content);
      }
      return item.value || '';
    }).join(' ');
  };
  
  return extractText(content.content);
}

/**
 * Fetch FAQ data from Contentful with caching
 */
export const getFAQData = unstable_cache(
  async (): Promise<FAQListData> => {
    try {
      const response = await getEntries('frequentlyAskedQuestion', 2);
      
      if (!response || response.length === 0) {
        return {
          title: "Frequently Asked Questions",
          subtitle: "Find answers to common questions about Chess Victoria",
          faqs: [],
          availableTags: []
        };
      }

      const faqs = response as unknown as FAQ[];
      const faqData: FAQData[] = faqs.map((faq) => ({
        id: faq.sys.id,
        question: faq.fields.question,
        answer: extractTextFromRichText(faq.fields.answer),
        tags: faq.metadata.tags.map(tag => tag.sys.id)
      }));

      // Extract unique tags
      const allTags = faqs.flatMap(faq => 
        faq.metadata.tags.map(tag => tag.sys.id)
      );
      const availableTags = [...new Set(allTags)].sort();

      return {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about Chess Victoria",
        faqs: faqData,
        availableTags
      };
    } catch (error) {
      console.error('Error fetching FAQ data:', error);
      return {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to common questions about Chess Victoria",
        faqs: [],
        availableTags: []
      };
    }
  },
  ['faq-data'],
  {
    tags: ['faq'],
    revalidate: getRevalidationTime('FAQ')
  }
);
