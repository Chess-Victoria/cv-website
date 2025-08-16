export interface ReferenceItem {
  id: string;
  name: string;
  shortName: string; // Abbreviated name (e.g., "MCC" for "Melbourne Chess Club")
  image: {
    src: string;
    alt: string;
  };
  // Optional fields for flexibility
  title?: string;
  description?: string;
  url?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    email?: string;
  };
}

export interface ReferenceListData {
  title: string;
  subtitle: string;
  items: ReferenceItem[];
}
