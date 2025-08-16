import React from 'react';

// Generic popup content interface - decoupled from Contentful
export interface PopupContent {
  title?: string;
  description?: string | React.ReactNode;
  items?: string[];
  actionButton?: {
    text: string;
    url?: string;
    onClick?: () => void;
  };
  logo?: {
    src: string;
    alt?: string;
  };
  showNoThanks?: boolean;
  noThanksText?: string;
}

// Props interface for the Popup component
export interface PopupProps {
  content?: PopupContent;
  isVisible?: boolean;
  onClose?: () => void;
  onNoThanks?: () => void;
  onAction?: () => void;
}

