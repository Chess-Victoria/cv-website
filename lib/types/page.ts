/**
 * TypeScript interfaces for Page content type and related data structures
 */

// Contentful Page entry structure
export interface Page {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    slug: string;
    title: string;
    summary?: string;
    content?: any; // RichText
    metadata?: {
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
        pageImage?: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
  };
}

// Mapped data for the page component
export interface PageData {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  content?: any | null; // RichText
  metadata?: {
    pageTitle?: string;
    pageDescription?: string;
    pageType?: string;
    pageUrl?: string;
    pageImage?: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Open Graph metadata structure
export interface OpenGraphMetadata {
  title: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
}
