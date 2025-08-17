export interface ChessClub {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    slug: string;
    name: string;
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
    quickIntro?: any; // RichText content
    content?: any; // RichText content
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
  };
}

export interface ChessClubContact {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    name: string;
    title?: string;
    email?: string;
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
  };
  location?: {
    lat: number;
    lon: number;
  };
  website?: string;
  quickIntro?: React.ReactNode;
  content?: React.ReactNode;
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
      description?: React.ReactNode;
      contact?: Array<{
        name: string;
        title?: string;
        email?: string;
      }>;
    }>;
  };
}

export interface ChessClubListData {
  title: string;
  subtitle: string;
  clubs: ChessClubData[];
}
