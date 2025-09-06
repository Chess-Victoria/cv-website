import { createClient } from 'contentful';
import { draftMode } from 'next/headers';

/**
 * Create a Contentful client that supports both production and preview modes
 */
export async function createContentfulClient() {
  try {
    const draft = await draftMode();
    const isPreview = draft.isEnabled;
    
    // Also check cookies as a fallback since draft mode might not be working properly
    let cookiePreview = false;
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const previewCookie = cookieStore.get('contentful_preview');
      const bypassCookie = cookieStore.get('__prerender_bypass');
      cookiePreview = previewCookie?.value === 'true' || bypassCookie?.value === '1';
    } catch (cookieError) {
      // Cookie check failed, continue with draft mode only
    }
    
    const shouldUsePreview = isPreview || cookiePreview;
    
    if (shouldUsePreview) {
      // Use preview API for draft content
      return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
        host: 'preview.contentful.com',
      });
    } else {
      // Use production API for published content
      return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      });
    }
  } catch (error: any) {
    // If we're outside a request scope (like during generateStaticParams), use production client
    if (error.message?.includes('outside a request scope') || error.message?.includes('wrong-context')) {
      return createClient({
        space: process.env.CONTENTFUL_SPACE_ID!,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
      });
    }
    
    // Fallback to production client if draft mode is not available
    return createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    });
  }
}

/**
 * Check if we're currently in preview mode
 */
export async function isPreviewMode(): Promise<boolean> {
  try {
    const draft = await draftMode();
    const isEnabled = draft.isEnabled;
    
    // If draft mode is enabled, return true
    if (isEnabled) {
      return true;
    }
    
    // Even if draft mode is not enabled, check cookies as fallback
    // This helps with iframe scenarios where Next.js draft mode might not work
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const previewCookie = cookieStore.get('contentful_preview');
      const bypassCookie = cookieStore.get('__prerender_bypass');
      
      return previewCookie?.value === 'true' || bypassCookie?.value === '1';
    } catch (cookieError) {
      return false;
    }
  } catch (error: any) {
    // If we're outside a request scope (like during generateStaticParams), return false
    if (error.message?.includes('outside a request scope') || error.message?.includes('wrong-context')) {
      return false;
    }
    
    // If draftMode is not available, check for custom preview cookie as fallback
    // This helps with iframe scenarios where Next.js draft mode might not work
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      const previewCookie = cookieStore.get('contentful_preview');
      const bypassCookie = cookieStore.get('__prerender_bypass');
      
      return previewCookie?.value === 'true' || bypassCookie?.value === '1';
    } catch (cookieError) {
      return false;
    }
  }
}

/**
 * Check if we're in preview mode using URL parameters (for iframe fallback)
 */
export function isPreviewModeFromUrl(searchParams: URLSearchParams): boolean {
  const previewParam = searchParams.get('preview');
  const secretParam = searchParams.get('secret');
  
  // Check if preview=true and secret matches
  return previewParam === 'true' && secretParam === process.env.CONTENTFUL_PREVIEW_SECRET;
}

/**
 * Get the appropriate access token based on preview mode
 */
export async function getContentfulAccessToken(): Promise<string> {
  const isPreview = await isPreviewMode();
  
  if (isPreview) {
    return process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!;
  } else {
    return process.env.CONTENTFUL_ACCESS_TOKEN!;
  }
}

/**
 * Get the appropriate Contentful host based on preview mode
 */
export async function getContentfulHost(): Promise<string> {
  const isPreview = await isPreviewMode();
  
  if (isPreview) {
    return 'preview.contentful.com';
  } else {
    return 'cdn.contentful.com';
  }
}
