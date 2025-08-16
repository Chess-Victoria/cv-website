import { Announcement } from '../types/announcement';
import { PopupContent } from '../types/popup';
import { renderRichText } from './rich-text';

/**
 * Map Contentful announcement to PopupContent
 */
export function mapAnnouncementToPopupContent(announcement: Announcement): PopupContent {
  return {
    title: announcement.title,
    description: announcement.summary ? renderRichText(announcement.summary) : undefined,
    items: announcement.items,
    actionButton: announcement.url ? {
      text: "Explore Now",
      url: announcement.url,
    } : undefined,
    logo: {
      src: "/assets/img/logo/popup-logo.png",
      alt: "Logo"
    },
    showNoThanks: true,
    noThanksText: "No thanks"
  };
}

/**
 * Map multiple announcements to PopupContent array
 */
export function mapAnnouncementsToPopupContent(announcements: Announcement[]): PopupContent[] {
  return announcements.map(mapAnnouncementToPopupContent);
}

