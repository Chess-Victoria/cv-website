import { Document } from '@contentful/rich-text-types';

// Contentful ChessClub entry structure
export interface ChessClub {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    slug: string;
    contact?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    location?: {
      lat: number;
      lon: number;
    };
    website?: string;
    quickIntro?: string;
    content?: Document;
    images?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
    currentEvents?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    schedules?: string[];
  };
}

export interface Person {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    jobTitle?: string;
    email?: string;
    phone?: string;
    image?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    linkedin?: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
    fide?: string;
    about?: string;
  };
}

export interface ChessClubData {
  id: string;
  slug: string;
  name: string;
  contact?: {
    name: string;
    title?: string;
    email?: string;
    image?: {
      url: string;
      alt?: string;
    };
  };
  location?: {
    lat: number;
    lon: number;
  };
  website?: string;
  quickIntro?: any; // Raw Contentful response
  content?: any; // Raw Contentful response
  images?: Array<{
    id: string;
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  }>;
  currentEvents?: {
    title?: string;
    subtitle?: string;
    events: Array<{
      id: string;
      name: string;
      datetime: string;
      location: string;
      url?: string;
      summary?: string;
      description?: any; // Raw Contentful response
      contact?: Array<{
        name: string;
        title?: string;
        email?: string;
        image?: {
          url: string;
          alt?: string;
        };
      }>;
    }>;
  };
}

export interface ChessClubListData {
  title: string;
  subtitle: string;
  clubs: ChessClubData[];
}
