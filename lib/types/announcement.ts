// Interface for the announcement content type from Contentful
export interface Announcement {
  title?: string;
  summary?: {
    content: Array<{
      content: Array<{
        value: string;
        marks?: Array<string>;
        data?: any;
      }>;
      data?: any;
      marks?: Array<string>;
      nodeType: string;
    }>;
    data?: any;
    nodeType: string;
  };
  reference?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
  };
  url?: string;
  items?: string[];
}

// Props interface for the Popup component
export interface PopupProps {
  announcement?: Announcement;
  isVisible?: boolean;
  onClose?: () => void;
  onNoThanks?: () => void;
  onAction?: () => void;
}

