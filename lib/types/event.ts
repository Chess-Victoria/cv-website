import { Document } from '@contentful/rich-text-types';

// Contentful Event entry structure
export interface Event {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug?: string;
    datetime: string;
    location?: string;
    url?: string;
    contact?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
    description?: Document;
    summary?: string;
  };
  metadata?: {
    tags?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
  };
}

// Contentful EventList entry structure
export interface EventList {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug: string;
    description?: string;
    events?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
  };
}

// Mapped event data structure for components
export interface EventData {
  id: string;
  name: string;
  slug?: string;
  datetime: string;
  location?: string;
  url?: string;
  description?: Document;
  summary?: string;
  contact?: Array<{
    id: string;
    name: string;
    email?: string;
    phone?: string;
    title?: string;
    image?: {
      url: string;
      alt: string;
    };
  }>;
  tags?: string[];
}

// Mapped event list data structure for components
export interface EventListData {
  id: string;
  name: string;
  slug: string;
  description?: string;
  events: EventData[];
}
