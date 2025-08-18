import { ImageGalleryData, ImageGalleryEntry, ImageGalleryImageData } from '@/lib/types/image-gallery';
import { renderRichText } from '@/lib/utils/rich-text';

function mapAssetToImageData(asset: any): ImageGalleryImageData | undefined {
  const url: string | undefined = asset?.fields?.file?.url;
  if (!url) return undefined;
  return {
    src: url,
    alt: asset?.fields?.title || asset?.fields?.description,
    width: asset?.fields?.file?.details?.image?.width,
    height: asset?.fields?.file?.details?.image?.height,
  };
}

export function mapImageGallery(entry: ImageGalleryEntry): ImageGalleryData {
  const slug = entry.fields.slug;
  const title = entry.fields.title || entry.fields.name || 'Image Gallery';
  const descriptionHtml = entry.fields.description ? renderRichText(entry.fields.description) : undefined;

  // Build reference link if referenceItem exists (prefer DocumentLink.url)
  let referenceLink: string | undefined;
  const ref: any = (entry.fields as any).referenceItem;
  if (ref?.fields) {
    const url: string | undefined = ref.fields.url;
    const type: string | undefined = ref.fields.type;
    const slug: string | undefined = ref.fields.slug;
    if (url) {
      referenceLink = url;
    } else if (type === 'event' && slug) {
      referenceLink = `/events/${slug}`;
    } else if (type === 'club' && slug) {
      referenceLink = `/chess-clubs/${slug}`;
    }
  }

  const fromAssets: ImageGalleryImageData[] = (entry.fields.images || [])
    .map(mapAssetToImageData)
    .filter((img): img is ImageGalleryImageData => Boolean(img));

  const singleAsset = mapAssetToImageData((entry.fields as any).image);
  if (singleAsset) fromAssets.unshift(singleAsset);

  const rawUrls: string[] = (
    entry.fields.imageUrls || entry.fields.imagesUrl || (entry.fields.imageUrl ? [entry.fields.imageUrl] : [])
  ) as string[];
  const fromUrls: ImageGalleryImageData[] = rawUrls
    .filter(Boolean)
    .map((url) => ({ src: url }));

  // Append photos JSON: array of strings or array of { url, name }
  const rawPhotos: any = (entry.fields as any).photos;
  const localizedPhotos = Array.isArray(rawPhotos)
    ? rawPhotos
    : (rawPhotos && typeof rawPhotos === 'object' && Array.isArray(rawPhotos['en-US']) ? rawPhotos['en-US'] : []);
  const fromPhotos: ImageGalleryImageData[] = localizedPhotos
    .map((p: any) => (typeof p === 'string' ? { src: p } : (p && typeof p.url === 'string' ? { src: p.url, alt: p.name } : undefined)))
    .filter((img: any): img is ImageGalleryImageData => Boolean(img));

  const proxied = (img: ImageGalleryImageData): ImageGalleryImageData => {
    // Only proxy absolute external URLs; leave Contentful //images.ctfassets.net and relative URLs as-is
    if (typeof img.src === 'string' && /^https?:\/\//i.test(img.src) && !/images\.ctfassets\.net/.test(img.src)) {
      const encoded = encodeURIComponent(img.src);
      return { ...img, src: `/api/image-proxy?url=${encoded}` };
    }
    return img;
  };

  const images: ImageGalleryImageData[] = [...fromAssets, ...fromUrls, ...fromPhotos].map(proxied);

  return {
    id: entry.sys.id,
    slug,
    title,
    descriptionHtml,
    images,
    referenceLink,
  };
}


