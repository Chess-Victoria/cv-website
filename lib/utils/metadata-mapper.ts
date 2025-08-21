import { PageMetadata, MetadataData, OpenGraphMetadata } from '@/lib/types/metadata';

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
 * Map Contentful PageMetadata entry to component data
 */
export function mapPageMetadataToData(metadata: PageMetadata): MetadataData {
  if (!metadata?.fields) {
    return {};
  }

  const fields = metadata.fields;
  
  return {
    pageTitle: fields.pageTitle || '',
    pageDescription: fields.pageDescription ? extractTextFromRichText(fields.pageDescription) : '',
    pageType: fields.pageType || '',
    pageUrl: fields.pageUrl || '',
    imageUrl: fields.imageUrl || '',
    imageAltText: fields.imageAltText || '',
    keywords: fields.keywords || [],
  };
}

/**
 * Generate Open Graph metadata from metadata data
 */
export function generateOpenGraphMetadata(metadataData: MetadataData, fallbackTitle?: string, fallbackDescription?: string): OpenGraphMetadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au';
  
  return {
    title: metadataData.pageTitle || fallbackTitle || 'Chess Victoria',
    description: metadataData.pageDescription || fallbackDescription || '',
    type: metadataData.pageType || 'website',
    url: metadataData.pageUrl || baseUrl,
    image: metadataData.imageUrl || '',
    imageAlt: metadataData.imageAltText || '',
    keywords: metadataData.keywords || [],
  };
}

/**
 * Merge default metadata with Contentful metadata
 */
export function mergeMetadata(defaultMetadata: OpenGraphMetadata, contentfulMetadata: MetadataData): OpenGraphMetadata {
  return {
    title: contentfulMetadata.pageTitle || defaultMetadata.title,
    description: contentfulMetadata.pageDescription || defaultMetadata.description,
    type: contentfulMetadata.pageType || defaultMetadata.type,
    url: contentfulMetadata.pageUrl || defaultMetadata.url,
    image: contentfulMetadata.imageUrl || defaultMetadata.image,
    imageAlt: contentfulMetadata.imageAltText || defaultMetadata.imageAlt,
    keywords: contentfulMetadata.keywords?.length ? contentfulMetadata.keywords : defaultMetadata.keywords,
  };
}
