import { getEntries, getEntryBySlug } from '@/lib/contentful';
import { Page, PageData, OpenGraphMetadata } from '@/lib/types/page';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import { isPreviewMode, isPreviewModeFromUrl } from '@/lib/preview';

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
 * Fetch all pages from Contentful with caching
 */
export async function getAllPages(): Promise<PageData[]> {
  // In preview mode, bypass cache to get fresh draft content
  if (await isPreviewMode()) {
    try {
      const response = await getEntries('page', 2);
      const pages = (response as unknown as Page[]).map(mapPageToData);
      return pages.filter(page => page.slug); // Only return pages with slugs
    } catch (error) {
      console.error('Error fetching all pages:', error);
      return [];
    }
  }
  
  // In production mode, use cache
  return unstable_cache(
    async (): Promise<PageData[]> => {
      try {
        const response = await getEntries('page', 2);
        const pages = (response as unknown as Page[]).map(mapPageToData);
        return pages.filter(page => page.slug); // Only return pages with slugs
      } catch (error) {
        console.error('Error fetching all pages:', error);
        return [];
      }
    },
    ['all-pages'],
    {
      tags: ['pages'],
      revalidate: getRevalidationTime('DEFAULT')
    }
  )();
}

/**
 * Fetch page by slug with caching
 */
export async function getPageBySlug(slug: string, searchParams?: URLSearchParams): Promise<PageData | null> {
  // Check for preview mode via cookies or URL parameters
  const isPreviewModeResult = await isPreviewMode();
  const isPreviewFromUrl = searchParams ? isPreviewModeFromUrl(searchParams) : false;
  const isPreview = isPreviewModeResult || isPreviewFromUrl;
  
  // In preview mode, bypass cache to get fresh draft content
  if (isPreview) {
    try {
      const page = await getEntryBySlug('page', slug);
      if (!page) return null;
      return mapPageToData(page as unknown as Page);
    } catch (error) {
      console.error(`Error fetching page with slug ${slug}:`, error);
      return null;
    }
  }
  
  // In production mode, use cache
  return unstable_cache(
    async (): Promise<PageData | null> => {
      try {
        const page = await getEntryBySlug('page', slug);
        if (!page) return null;
        return mapPageToData(page as unknown as Page);
      } catch (error) {
        console.error(`Error fetching page with slug ${slug}:`, error);
        return null;
      }
    },
    ['page-by-slug', slug],
    {
      tags: ['pages', `page:${slug}`],
      revalidate: getRevalidationTime('DEFAULT')
    }
  )();
}

/**
 * Map Contentful page entry to component data
 */
function mapPageToData(page: Page): PageData {
  const metadata = page.fields.metadata?.fields;
  
  return {
    id: page.sys.id,
    slug: page.fields.slug || '',
    title: page.fields.title || '',
    summary: page.fields.summary || '',
    content: page.fields.content || null, // RichText content
    metadata: metadata ? {
      pageTitle: metadata.pageTitle || '',
      pageDescription: metadata.pageDescription ? extractTextFromRichText(metadata.pageDescription) : '',
      pageType: metadata.pageType || '',
      pageUrl: metadata.pageUrl || '',
      pageImage: metadata.pageImage?.fields?.file?.url || '',
    } : undefined,
    createdAt: page.sys.createdAt,
    updatedAt: page.sys.updatedAt,
  };
}

/**
 * Generate Open Graph metadata from page data
 */
export function generateOpenGraphMetadata(pageData: PageData): OpenGraphMetadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au';
  
  return {
    title: pageData.metadata?.pageTitle || pageData.title,
    description: pageData.metadata?.pageDescription || pageData.summary || '',
    type: pageData.metadata?.pageType || 'website',
    url: pageData.metadata?.pageUrl || `${baseUrl}/pages/${pageData.slug}`,
    image: pageData.metadata?.pageImage || '',
  };
}
