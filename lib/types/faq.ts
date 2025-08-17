export interface FAQ {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  fields: {
    question: string;
    answer: any; // RichText content
  };
  metadata: {
    tags: Array<{
      sys: {
        id: string;
        type: string;
        linkType: string;
      };
    }>;
  };
}

export interface FAQData {
  id: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface FAQListData {
  title: string;
  subtitle: string;
  faqs: FAQData[];
  availableTags: string[];
}
