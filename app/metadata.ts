import { Metadata } from 'next';
import { OpenGraphMetadata } from '@/lib/types/metadata';
import { mergeMetadata } from '@/lib/utils/metadata-mapper';

// Default metadata for the homepage
export const defaultHomeMetadata: OpenGraphMetadata = {
  title: "Chess Victoria | Home - Promoting Chess Growth, Inclusion & Excellence",
  description: "Welcome to Chess Victoria - the leading body promoting chess across Victoria. Discover tournaments, events, clubs, and join our vibrant chess community. Support players of all ages and abilities.",
  type: "website",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://chessvictoria.org.au",
  image: "/assets/img/logo/cvlogo.png",
  imageAlt: "Chess Victoria - Home",
  keywords: ["chess Victoria", "chess tournaments", "chess clubs", "chess events", "Australian chess", "chess community", "chess competitions", "chess Victoria home"],
};

/**
 * Generate metadata for the homepage
 * Merges default metadata with Contentful metadata if available
 */
export function generateHomeMetadata(contentfulMetadata?: any): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au';
  
  // If we have Contentful metadata, merge it with defaults
  const finalMetadata = contentfulMetadata ? 
    mergeMetadata(defaultHomeMetadata, contentfulMetadata) : 
    defaultHomeMetadata;

  return {
    metadataBase: new URL(baseUrl),
    title: finalMetadata.title,
    description: finalMetadata.description,
    keywords: finalMetadata.keywords?.join(', '),
    openGraph: {
      title: finalMetadata.title,
      description: finalMetadata.description,
      type: finalMetadata.type as 'website' | 'article',
      url: finalMetadata.url,
      images: finalMetadata.image ? [
        {
          url: finalMetadata.image.startsWith('http') ? finalMetadata.image : finalMetadata.image,
          width: 1200,
          height: 630,
          alt: finalMetadata.imageAlt || finalMetadata.title,
        },
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalMetadata.title,
      description: finalMetadata.description,
      images: finalMetadata.image ? [finalMetadata.image.startsWith('http') ? finalMetadata.image : finalMetadata.image] : [],
    },
    alternates: {
      canonical: finalMetadata.url,
    },
  };
}
