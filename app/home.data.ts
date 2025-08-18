import { getSingleEntry } from '@/lib/contentful';
import { mapAnnouncementToPopupContent } from '@/lib/utils/announcement-mapper';
import { mapPromotionBannerToHeroBannerData, fallbackHeroBannerData } from '@/lib/utils/hero-banner-mapper';
import { mapEventListToEventListData } from '@/lib/utils/event-list-mapper';
import { mapCommitteeListToCommitteeListData } from '@/lib/utils/committee-list-mapper';
import { mapReferenceListToData } from '@/lib/utils/reference-list-mapper';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import { ImageGalleryData, ImageGalleryEntry } from '@/lib/types/image-gallery';
import { mapImageGallery } from '@/lib/utils/image-gallery-mapper';

import { PopupContent } from '@/lib/types/popup';
import { Announcement } from '@/lib/types/announcement';
import { PromotionBanner } from '@/lib/types/promotion-banner';
import { EventList } from '@/lib/types/event-list';
import { EventListData } from '@/lib/types/event-list';
import { CommitteeList } from '@/lib/types/committee-list';
import { CommitteeListData } from '@/lib/types/committee-list';
import { ReferenceList } from '@/lib/types/reference-list';
import { ReferenceListData } from '@/lib/types/reference-list';
import { HeroBannerData } from '@/components/sections/home1/HeroBanner';

// Interface for the homepage content type from Contentful
export interface HomePage {
  name?: string;
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
  heroBanner?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: PromotionBanner;
  };
  scheduledEvents?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: EventList;
  };
  currentCommittees?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: CommitteeList;
  };
  featuredClub?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: ReferenceList;
  };
  featuredGallery?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields: ImageGalleryEntry['fields'];
  };
  metadata?: {
    sys: {
      id: string;
      type: string;
      linkType: string;
    };
    fields?: any;
  };
}

// Interface for the complete homepage data with resolved references
export interface HomePageData {
  title?: string;
  description?: string;
  popupContent?: PopupContent;
  heroBanner?: HeroBannerData;
  eventList?: EventListData;
  committeeList?: CommitteeListData;
  featuredClubs?: ReferenceListData;
  featuredGallery?: ImageGalleryData;
}

/**
 * Load homepage data from Contentful with resolved announcement and promotionBanner references
 */
export const getHomePageData = unstable_cache(
  async (): Promise<HomePageData> => {
    try {
      // Load homepage with includes to resolve references (increased depth for eventList.events)
      const homePage = await getSingleEntry('homePage', 3);
      if (!homePage) {
        console.warn('No homepage found in Contentful');
        return {};
      }
      
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

      // Get heroBanner from resolved fields (maps to promotionBanner content type)
      let heroBanner: HeroBannerData | undefined;
      
      if (homePageFields.heroBanner?.fields) {
        heroBanner = mapPromotionBannerToHeroBannerData(homePageFields.heroBanner.fields);
      }

      // If no hero banner data, use fallback
      if (!heroBanner) {
        heroBanner = fallbackHeroBannerData;
      }

      // Get scheduledEvents from resolved fields
      let eventList: EventListData | undefined;
      
      
      if (homePageFields.scheduledEvents?.fields) {
        eventList = mapEventListToEventListData(homePageFields.scheduledEvents.fields);
      }

      // Get currentCommittees from resolved fields
      let committeeList: CommitteeListData | undefined;
      
      
      if (homePageFields.currentCommittees?.fields) {
        committeeList = mapCommitteeListToCommitteeListData(homePageFields.currentCommittees.fields);
      }

      // Get featuredClub from resolved fields
      let featuredClubs: ReferenceListData | undefined;
      let featuredGallery: ImageGalleryData | undefined;
      
      
      if (homePageFields.featuredClub?.fields) {
        featuredClubs = mapReferenceListToData(homePageFields.featuredClub.fields as unknown as ReferenceList);
      }

      if (homePageFields.featuredGallery?.fields) {
        try {
          const galleryEntry = { sys: { id: homePageFields.featuredGallery.sys.id }, fields: homePageFields.featuredGallery.fields } as unknown as ImageGalleryEntry;
          featuredGallery = mapImageGallery(galleryEntry);
        } catch (e) {
          console.error('Error mapping featuredGallery:', e);
        }
      }

      return {
        title: homePageFields.name,
        description: homePageFields.name, // Using name as description for now
        popupContent,
        heroBanner,
        eventList,
        committeeList,
        featuredClubs,
        featuredGallery,
      };
    } catch (error) {
      console.error('Error loading homepage data:', error);
      return {};
    }
  },
  ['homePage-data'],
  {
    tags: ['homepage', 'announcement', 'promotionBanner', 'eventList', 'committeeList', 'referenceList', 'image-gallery'],
    revalidate: getRevalidationTime('HOMEPAGE')
  }
);


