import React from 'react';

// Interface for the PromotionBanner content type from Contentful
export interface PromotionBanner {
  title?: string; // RichText
  subTitle?: string;
  summary?: string;
  url?: string;
  actionUrl?: string;
  event?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields?: any; // Event fields when resolved
  };
  image?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields?: {
      title?: string;
      description?: string;
      file?: {
        url?: string;
        fileName?: string;
        contentType?: string;
        details?: {
          size?: number;
          image?: {
            width?: number;
            height?: number;
          };
        };
      };
    };
  };
}

// Interface for the resolved PromotionBanner data
export interface PromotionBannerData {
  title?: React.ReactNode; // Rendered rich text
  subTitle?: string;
  summary?: string;
  url?: string;
  actionUrl?: string;
  event?: any; // Event data when resolved
  image?: {
    url?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}
