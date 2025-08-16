// Contentful Chess Club (clubDetail) content type interface
export interface ChessClub {
  name: string;
  contact?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: ContactFields; // Contact fields when resolved
  };
  location?: {
    lat: number;
    lon: number;
  };
  website?: string;
  quickIntro?: any; // RichText
  content?: any; // RichText
  images?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: any; // Asset fields when resolved
  }[];
}

// Contentful Contact fields interface
export interface ContactFields {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
}

// Contentful ReferenceList content type interface
export interface ReferenceList {
  title?: string;
  subTitle?: string;
  items?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: any; // Can be any content type fields when resolved
  }[];
}
