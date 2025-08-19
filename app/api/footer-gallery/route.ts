import { NextResponse } from 'next/server';
import { getImageGalleryBySlugWithTags } from '@/lib/utils/image-gallery';

// Static revalidate value for Next.js 15
export const revalidate = 3600; // 1 hour

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
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
      }
    });
  } catch (error) {
    console.error('Error fetching footer gallery:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
