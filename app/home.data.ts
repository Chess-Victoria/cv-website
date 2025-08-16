import { getSingleEntry } from '@/lib/contentful';
import { mapAnnouncementToPopupContent } from '@/lib/utils/announcement-mapper';
import { PopupContent } from '@/lib/types/popup';
import { Announcement } from '@/lib/types/announcement';

// Interface for the homepage content type from Contentful
export interface HomePage {
  title?: string;
  description?: string;
  announcement?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: {
      title?: string;
      summary?: any;
      reference?: any;
      url?: string;
      items?: string[];
    };
  };
  // Add more homepage fields as needed
}

// Interface for the complete homepage data with resolved references
export interface HomePageData {
  title?: string;
  description?: string;
  popupContent?: PopupContent;
}

/**
 * Load homepage data from Contentful with resolved announcement reference
 */
export async function getHomePageData(): Promise<HomePageData> {
  try {
    // Load homepage with includes to resolve references
    const homePage = await getSingleEntry('homePage', 2);

    if (!homePage) {
      console.warn('No homepage found in Contentful');
      return {};
    }
    console.log("homePage", homePage)
    const homePageFields = homePage.fields as HomePage;

        // Get announcement from resolved fields
    let popupContent: PopupContent | undefined;
    
    if (homePageFields.announcement?.fields) {
      const announcementFields = homePageFields.announcement.fields;
      const announcement: Announcement = {
        title: announcementFields.title as string,
        summary: announcementFields.summary as any,
        reference: announcementFields.reference as any,
        url: announcementFields.url as string,
        items: announcementFields.items as string[],
      };
      popupContent = mapAnnouncementToPopupContent(announcement);
    }

    return {
      title: homePageFields.title,
      description: homePageFields.description,
      popupContent,
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    return {};
  }
}


