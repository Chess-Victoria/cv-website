import type { Document } from '@contentful/rich-text-types';

// Minimal Contentful Asset typing used in this project
export interface ContentfulAsset {
  sys: { id: string };
  fields: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      details?: { image?: { width?: number; height?: number } };
    };
  };
}

export interface ImageGalleryEntry {
  sys: { id: string };
  fields: {
    slug: string;
    name?: string;
    title?: string;
    description?: Document;
    imageUrl?: string; // single URL
    image?: ContentfulAsset; // single asset
    images?: Array<ContentfulAsset>;
    imageUrls?: string[]; // preferred id
    imagesUrl?: string[]; // be tolerant to possible alternative id
    referenceItem?: any; // Link to Entry (documentLink or others)
    photos?: any; // JSON array of strings or objects { url, name }
  };
}

export interface ImageGalleryImageData {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface ImageGalleryData {
  id: string;
  slug: string;
  title: string;
  descriptionHtml?: string; // if we render rich text later
  images: ImageGalleryImageData[];
  referenceLink?: string;
}


