import { Document } from '@contentful/rich-text-types';

/**
 * TypeScript interfaces for Committee content types and related data structures
 */

// Contentful Committee List entry structure
export interface CommitteeList {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    members?: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
    year?: number;
    isCurrent?: boolean;
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

// Contentful Committee Member entry structure
export interface CommitteeMember {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    slug: string;
    role: string;
    about?: Document; // Rich text field from committee member
    personal: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    image?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    avatarImage?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
  };
}

// Contentful Person entry structure
export interface Person {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    email?: string;
    phone?: string;
    jobTitle?: string;
    image?: {
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    };
    about?: string; // Text field from person
  };
}

// Mapped data structures for components
export interface PersonData {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  about?: string; // Text field from person
  image?: {
    url: string;
    alt: string;
  };
}

export interface CommitteeMemberData {
  id: string;
  slug: string;
  role: string;
  about?: Document; // Rich text field from committee member
  person: PersonData;
  image?: {
    url: string;
    alt: string;
  };
  avatarImage?: {
    url: string;
    alt: string;
  };
}

// Mapped data for committee list display
export interface CommitteeListData {
  id: string;
  name: string;
  year?: number;
  isCurrent: boolean;
  members: CommitteeMemberData[];
  tags?: string[];
}

// Committee page data structure
export interface CommitteePageData {
  executiveMembers: CommitteeMemberData[];
  nonExecutiveMembers: CommitteeMemberData[];
}
