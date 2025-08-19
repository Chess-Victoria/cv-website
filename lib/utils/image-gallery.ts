import { unstable_cache, revalidateTag } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import { getEntryBySlug, getEntries } from '@/lib/contentful';
import { ImageGalleryData, ImageGalleryEntry } from '@/lib/types/image-gallery';
import { mapImageGallery } from '@/lib/utils/image-gallery-mapper';

async function fetchImageGalleryUncached(slug: string): Promise<ImageGalleryData | null> {
  const entry = (await getEntryBySlug('imageGallery', slug)) as unknown as ImageGalleryEntry | null;
  if (!entry) return null;
  return mapImageGallery(entry);
}

export const getImageGalleryBySlug = unstable_cache(
  async (slug: string): Promise<ImageGalleryData | null> => {
    return await fetchImageGalleryUncached(slug);
  },
  ['image-gallery'],
  {
    revalidate: getRevalidationTime('IMAGE_GALLERY'),
    tags: ['image-gallery'],
  }
);

export async function getImageGalleryBySlugWithTags(slug: string): Promise<ImageGalleryData | null> {
  // Ensure a slug-specific tag is associated with the cache entry
  const dataFn = unstable_cache(
    async () => fetchImageGalleryUncached(slug),
    [`image-gallery:${slug}`],
    { revalidate: getRevalidationTime('IMAGE_GALLERY'), tags: ['image-gallery', `image-gallery:${slug}`] }
  );
  const data = await dataFn();
  return data;
}

async function fetchAllImageGalleriesUncached(): Promise<ImageGalleryData[]> {
  const entries = (await getEntries('imageGallery', 3)) as unknown as ImageGalleryEntry[];
  return entries.map(entry => mapImageGallery(entry));
}

export const getAllImageGalleries = unstable_cache(
  async (): Promise<ImageGalleryData[]> => {
    return await fetchAllImageGalleriesUncached();
  },
  ['all-image-galleries'],
  {
    revalidate: getRevalidationTime('IMAGE_GALLERY'),
    tags: ['image-gallery', 'all-galleries'],
  }
);


