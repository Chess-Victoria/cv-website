import { NextResponse } from 'next/server';
import { getImageGalleryBySlugWithTags } from '@/lib/utils/image-gallery';

// Use static revalidation time for API routes (7 days = 604800 seconds)
export const revalidate = 604800;

export async function GET() {
  try {
    const gallery = await getImageGalleryBySlugWithTags('chess-victoria-photo-gallery');
    
    if (!gallery || !gallery.images) {
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    // Get the latest 6 images (assuming they are in chronological order)
    const latestImages = gallery.images.slice(0, 6);

    return NextResponse.json({ 
      images: latestImages,
      total: gallery.images.length 
    }, { 
      status: 200,
      headers: {
        // Optimized cache headers for best performance
        // max-age: browser cache time (7 days)
        // s-maxage: CDN cache time (7 days) 
        // stale-while-revalidate: serve stale content while revalidating (7 days)
        'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=604800',
      }
    });
  } catch (error) {
    console.error('Error fetching footer gallery:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
