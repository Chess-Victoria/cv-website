import { getSingleEntry } from '@/lib/contentful';
import { mapAnnouncementToPopupContent } from '@/lib/utils/announcement-mapper';
import { mapPromotionBannerToHeroBannerData, fallbackHeroBannerData } from '@/lib/utils/hero-banner-mapper';
import { mapEventListToEventListData } from '@/lib/utils/event-list-mapper';
import { mapCommitteeListToCommitteeListData } from '@/lib/utils/committee-list-mapper';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

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
      
      
      if (homePageFields.featuredClub?.fields) {
        // For now, use fallback data until we implement proper mapping
        featuredClubs = {
          title: "Featured Chess Clubs",
          subtitle: "The most popular chess clubs in Victoria",
          items: [
            {
              id: "club-1",
              name: "Melbourne Chess Club",
              shortName: "MCC",
              image: {
                src: "/assets/img/all-images/team/team-img1.png",
                alt: "Melbourne Chess Club"
              },
              title: "Historic Club",
              description: "Established 1866",
              url: "/clubs/mcc"
            }
          ]
        };
      }

      return {
        title: homePageFields.name,
        description: homePageFields.name, // Using name as description for now
        popupContent,
        heroBanner,
        eventList,
        committeeList,
        featuredClubs,
      };
    } catch (error) {
      console.error('Error loading homepage data:', error);
      return {};
    }
  },
  ['homePage-data'],
  {
    tags: ['homepage', 'announcement', 'promotionBanner', 'eventList', 'committeeList', 'referenceList'],
    revalidate: getRevalidationTime('HOMEPAGE')
  }
);


