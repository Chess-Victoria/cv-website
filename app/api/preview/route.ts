import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');
  const contentType = searchParams.get('contentType');

  // Validate the secret token
  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  // Validate required parameters
  if (!slug) {
    return new Response('Missing required parameter: slug', { status: 400 });
  }

  if (!contentType) {
    return new Response('Missing required parameter: contentType', { status: 400 });
  }

  try {
    // Enable draft mode
    const draft = await draftMode();
    draft.enable();

    // Get the preview URL based on content type
    const previewUrl = getPreviewUrl(contentType, slug);
    
    // Create redirect response
    const response = NextResponse.redirect(new URL(previewUrl, request.url));
    
    // Set additional cookies for iframe compatibility
    // Use 'lax' for HTTP (localhost) and 'none' for HTTPS (production)
    const isHttps = process.env.NODE_ENV === 'production' || request.url.startsWith('https://');
    const sameSiteValue = isHttps ? 'none' : 'lax';
    
    response.cookies.set('__prerender_bypass', '1', {
      httpOnly: false, // Allow client-side access
      secure: isHttps, // Only secure in HTTPS
      sameSite: sameSiteValue,
      path: '/',
    });
    
    // Also set a custom preview cookie for additional detection
    response.cookies.set('contentful_preview', 'true', {
      httpOnly: false,
      secure: isHttps,
      sameSite: sameSiteValue,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Preview API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

/**
 * Generate the preview URL based on content type and slug
 */
function getPreviewUrl(contentType: string, slug: string): string {
  switch (contentType) {
    case 'post':
      return `/news/read/${slug}`;
    case 'page':
      return `/pages/${slug}`;
    default:
      // For unknown content types, default to pages
      return `/pages/${slug}`;
  }
}
