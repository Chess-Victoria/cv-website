/**
 * TypeScript interfaces for PageMetadata content type and related data structures
 */

// Contentful PageMetadata entry structure
export interface PageMetadata {
  sys: {
    id: string;
    type: string;
    linkType: string;
  };
  fields: {
    pageTitle?: string;
    pageDescription?: any; // RichText
    pageType?: string;
    pageUrl?: string;
    imageUrl?: string;
    imageAltText?: string;
    keywords?: string[];
  };
}

// Mapped metadata data for components
export interface MetadataData {
  pageTitle?: string;
  pageDescription?: string;
  pageType?: string;
  pageUrl?: string;
  imageUrl?: string;
  imageAltText?: string;
  keywords?: string[];
}

// Open Graph metadata structure
export interface OpenGraphMetadata {
  title: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  keywords?: string[];
}
