export interface EventItem {
  id: string;
  title: string;
  description: string;
  time: string;
  location: string;
  image: {
    src: string;
    alt: string;
  };
  buttonText: string;
  buttonUrl: string;
}

export interface EventDay {
  id: string;
  dayNumber: string;
  date: string;
  month: string;
  year: string;
  events: EventItem[];
}

export interface EventListData {
  title: string;
  subtitle: string;
  days: EventDay[];
}

// Contentful EventList content type interface
export interface EventList {
  name: string;
  slug: string;
  events?: {
    sys: { id: string; type: string; linkType: string; };
    fields?: any; // Event fields when resolved
  }[];
}
