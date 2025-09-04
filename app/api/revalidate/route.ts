import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import contentfulClient from '@/lib/contentful';

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
        revalidatePath('/chess-clubs/other-chess-associations');
        revalidateTag('chess-clubs');
        revalidateTag('chess-association');
        revalidateTag('club-page');
        break;

      case 'clubDetail':
        // Revalidate individual club pages
        revalidatePath('/chess-clubs/[slug]', 'page');
        revalidateTag('chess-club');
        revalidateTag('club-detail');
        // Also revalidate the clubs listing page
        revalidatePath('/chess-clubs');
        revalidateTag('chess-clubs');
        break;

      case 'committeeList':
      case 'comitteeMember':
        // Revalidate committee pages
        revalidatePath('/committees');
        revalidatePath('/committees/[slug]', 'page');
        revalidateTag('committees');
        break;

      case 'event':
      case 'eventList':
        // Revalidate event pages
        revalidatePath('/events');
        revalidatePath('/events/[slug]', 'page');
        revalidatePath('/event');
        revalidatePath('/event/[slug]', 'page');
        revalidateTag('events');
        revalidateTag('event-lists');
        // Homepage consumes events/eventList widgets
        revalidatePath('/');
        revalidateTag('homepage');
        break;

      case 'frequentlyAskedQuestion':
        // Revalidate FAQ page
        revalidatePath('/faq');
        revalidateTag('faq');
        break;

      case 'champion':
      case 'championPage':
        // Revalidate champion pages
        revalidatePath('/victorian-champions/[slug]', 'page');
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

      case 'referenceList':
        // Revalidate homepage where ReferenceList is rendered
        revalidatePath('/');
        revalidateTag('referenceList');
        break;

      case 'page': {
        // Revalidate generic CMS pages
        revalidatePath('/pages');
        revalidateTag('pages');

        // Try to resolve slug from entryId for precise revalidation
        try {
          const entry: any = await contentfulClient.getEntry(entryId);
          const slug = entry?.fields?.slug as string | undefined;
          if (slug) {
            revalidatePath(`/pages/${slug}`);
            revalidatePath('/pages/[slug]', 'page');
            revalidateTag(`page:${slug}`);
          }
        } catch (e) {
          console.warn('Could not resolve page slug for revalidation', { entryId, e });
        }
        break;
      }

      case 'imageGallery':
        // Revalidate memories/gallery pages
        revalidatePath('/memories');
        revalidatePath('/galleries');
        revalidatePath('/galleries/[slug]', 'page');
        revalidateTag('image-gallery');
        revalidateTag('all-galleries');
        break;

      case 'post':
        // Revalidate news listing pages
        revalidatePath('/');
        revalidatePath('/news');
        revalidatePath('/news/[page]', 'page');
        revalidateTag('posts');
        revalidateTag('post-categories');
        break;

      default:
        // For unknown content types, revalidate all pages
        revalidatePath('/');
        revalidatePath('/chess-clubs');
        revalidatePath('/committees');
        revalidatePath('/event');
        revalidatePath('/faq');
        revalidatePath('/champions');
        revalidateTag('all');
        break;
    }



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
