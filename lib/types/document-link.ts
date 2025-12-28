import { ContentfulAsset } from './image-gallery';

// Interface for the documentLink content type from Contentful
export interface DocumentLink {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    url?: string;
    type: string;
    document?: ContentfulAsset; // Reference to media/document file
  };
}

// Mapped document link data structure for components
export interface DocumentLinkData {
  id: string;
  name: string;
  url: string;
  type: string;
}

// Grouped document links by type
export interface GroupedDocumentLinks {
  [type: string]: DocumentLinkData[];
}
