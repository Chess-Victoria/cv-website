export interface CommitteeMember {
  id: string;
  name: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
    email?: string;
  };
  profileUrl?: string;
}

export interface CommitteeListData {
  title: string;
  subtitle: string;
  members: CommitteeMember[];
}

// Contentful CommitteeList content type interface
export interface CommitteeList {
  name: string;
  members?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: CommitteeMemberFields; // Committee member fields when resolved
  }[];
}

// Contentful CommitteeMember fields interface
export interface CommitteeMemberFields {
  role: string;
  about?: any; // RichText
  personal?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: PersonFields; // Person fields when resolved
  };
  image?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: any; // Asset fields when resolved
  };
}

// Contentful Person fields interface
export interface PersonFields {
  name?: string;
  phone?: string;
  email?: string;
  jobTitle?: string;
  image?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: any; // Asset fields when resolved
  };
  linkedin?: string;
  facebook?: string;
}
