/**
 * TypeScript interfaces for Club Page content type and related data structures
 */

// Contentful Club Page entry structure
export interface ClubPage {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    promotedClub?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
    clubs?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
  };
}

// Mapped data for the club page component
export interface ClubPageData {
  title: string;
  promotedClubs: ClubListItem[];
  allClubs: ClubListItem[];
}

// Individual club item for the listing
export interface ClubListItem {
  id: string;
  slug: string;
  name: string;
  location?: {
    lat: number;
    lon: number;
    address?: string;
  };
  contact?: {
    name: string;
    phone?: string;
    email?: string;
  };
  schedules?: string[]; // Weekly schedule as list of strings
  website?: string;
}
