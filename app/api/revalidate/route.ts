import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    // Verify the request is from Contentful using the secret key
    const authHeader = request.headers.get('authorization');
    const expectedSecret = process.env.CONTENTFUL_REVALIDATE_SECRET;
    
    if (!expectedSecret) {
      console.error('CONTENTFUL_REVALIDATE_SECRET not configured');
      return NextResponse.json(
        { error: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    if (!authHeader || authHeader !== `Bearer ${expectedSecret}`) {
      console.error('Invalid revalidation secret');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const body = await request.json();
    console.log('Contentful webhook received:', JSON.stringify(body, null, 2));

    // Extract content type and entry ID from the webhook
    const contentType = body.sys?.contentType?.sys?.id;
    const entryId = body.sys?.id;
    const eventType = body.sys?.type; // 'Entry' for content updates

    if (!contentType || !entryId) {
      console.error('Invalid webhook payload - missing contentType or entryId');
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    console.log(`Revalidating content: ${contentType} (${entryId})`);

    // Revalidate based on content type
    switch (contentType) {
      case 'homePage':
        // Revalidate homepage and related pages
        revalidatePath('/');
        revalidateTag('homepage');
        break;

      case 'clubPage':
        // Revalidate chess clubs pages
        revalidatePath('/chess-clubs');
        revalidateTag('chess-clubs');
        break;

      case 'clubDetail':
        // Revalidate individual club pages
        revalidatePath('/chess-clubs/[slug]');
        revalidateTag('chess-club');
        // Also revalidate the clubs listing page
        revalidatePath('/chess-clubs');
        revalidateTag('chess-clubs');
        break;

      case 'committeeList':
      case 'comitteeMember':
        // Revalidate committee pages
        revalidatePath('/committees');
        revalidatePath('/committees/[slug]');
        revalidateTag('committees');
        break;

      case 'event':
      case 'eventList':
        // Revalidate event pages
        revalidatePath('/events');
        revalidatePath('/events/[slug]');
        revalidatePath('/event');
        revalidatePath('/event-schedule');
        revalidatePath('/event-single');
        revalidateTag('events');
        revalidateTag('event-lists');
        break;

      case 'frequentlyAskedQuestion':
        // Revalidate FAQ page
        revalidatePath('/faq');
        revalidateTag('faq');
        break;

      case 'champion':
      case 'championPage':
        // Revalidate champion pages
        revalidatePath('/champions/[slug]');
        revalidateTag('champions');
        break;

      case 'siteConfiguration':
        // Revalidate all pages that use site configuration
        revalidatePath('/');
        revalidatePath('/about');
        revalidatePath('/contact');
        revalidateTag('site-config');
        break;

      case 'announcement':
        // Revalidate homepage (where announcements are displayed)
        revalidatePath('/');
        revalidateTag('homepage');
        break;

      case 'imageGallery':
        // Revalidate memories/gallery pages
        revalidatePath('/memories');
        revalidateTag('image-gallery');
        break;

      case 'post':
        // Revalidate news listing pages
        revalidatePath('/news');
        revalidatePath('/news/[page]');
        revalidateTag('posts');
        break;

      default:
        // For unknown content types, revalidate all pages
        console.log(`Unknown content type: ${contentType}, revalidating all pages`);
        revalidatePath('/');
        revalidatePath('/chess-clubs');
        revalidatePath('/committees');
        revalidatePath('/event');
        revalidatePath('/faq');
        revalidatePath('/champions');
        revalidateTag('all');
        break;
    }

    console.log(`Successfully revalidated content for ${contentType} (${entryId})`);

    return NextResponse.json({
      revalidated: true,
      contentType,
      entryId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error during revalidation:', error);
    return NextResponse.json(
      { error: 'Error during revalidation' },
      { status: 500 }
    );
  }
}

// Optional: Add GET method for testing
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Revalidate API endpoint is working',
    timestamp: new Date().toISOString()
  });
}
