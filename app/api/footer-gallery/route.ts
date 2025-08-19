import { NextResponse } from 'next/server';
import { getImageGalleryBySlugWithTags } from '@/lib/utils/image-gallery';
import { getRevalidationTime } from '@/lib/config';

export const revalidate = getRevalidationTime('IMAGE_GALLERY');

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
        'Cache-Control': `public, s-maxage=${getRevalidationTime('IMAGE_GALLERY')}, stale-while-revalidate`,
      }
    });
  } catch (error) {
    console.error('Error fetching footer gallery:', error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
