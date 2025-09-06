import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    // Disable draft mode
    const draft = await draftMode();
    draft.disable();

    // If a slug is provided, redirect to that page
    // Otherwise, redirect to homepage
    const redirectUrl = slug ? `/${slug}` : '/';
    
    // Create redirect response
    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    
    // Clear preview cookies
    response.cookies.delete('__prerender_bypass');
    response.cookies.delete('contentful_preview');
    
    return response;
  } catch (error) {
    console.error('Exit preview API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
