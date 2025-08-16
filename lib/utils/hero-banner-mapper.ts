import { HeroBannerData } from '@/components/sections/home1/HeroBanner';
import { renderRichText } from '@/lib/utils/rich-text';
import { formatEventDateTime } from '@/lib/utils/date-formatter';

// Fallback hero banner data
export const fallbackHeroBannerData: HeroBannerData = {
  tagline: {
    icon: "/assets/img/icons/sub-logo1.svg",
    text: "Lead Purpose, Innovate with Passion"
  },
  title: "Business Forward 2025 Strategies \nfor a New Era",
  description: "Welcome Innovate 2025 Shaping the Future of Business, \nwhere industry leaders, innovators, and visionaries come.",
  buttons: {
    primary: {
      text: "Reserve My Seat",
      url: "/event-schedule"
    },
    secondary: {
      text: "Learn More",
      url: "/about"
    }
  },
  eventInfo: {
    title: "THE INNOVATION SUMMIT",
    date: "January 15-16, 2025",
    location: "CITY CENTER CONVENTION CENTER, NEW YORK CITY",
    description: "Join us for an extraordinary two-day journey into the realm of innovation at The Innovation Summit."
  },
  backgroundImage: "/assets/img/bg/header-bg2.png",
  heroImage: "/assets/img/all-images/hero/hero-img1.png",
  showCountdown: true,
  eventDateTime: undefined
};

import { PromotionBanner } from '@/lib/types/promotion-banner';

/**
 * Map Contentful hero banner fields to HeroBannerData
 */
export function mapHeroBannerData(homePageFields: any): HeroBannerData {
  // Check if we have enough hero banner data to use
  const hasHeroData = homePageFields.heroTitle || homePageFields.heroTagline;
  
  if (!hasHeroData) {
    return fallbackHeroBannerData;
  }

  return {
    tagline: {
      icon: homePageFields.heroTaglineIcon?.fields?.file?.url || fallbackHeroBannerData.tagline.icon,
      text: homePageFields.heroTagline || fallbackHeroBannerData.tagline.text
    },
    title: homePageFields.heroTitle || fallbackHeroBannerData.title,
    description: homePageFields.heroDescription || fallbackHeroBannerData.description,
    buttons: {
      primary: {
        text: homePageFields.heroPrimaryButtonText || fallbackHeroBannerData.buttons.primary.text,
        url: homePageFields.heroPrimaryButtonUrl || fallbackHeroBannerData.buttons.primary.url
      },
      secondary: {
        text: homePageFields.heroSecondaryButtonText || fallbackHeroBannerData.buttons.secondary.text,
        url: homePageFields.heroSecondaryButtonUrl || fallbackHeroBannerData.buttons.secondary.url
      }
    },
    eventInfo: {
      title: homePageFields.heroEventTitle || fallbackHeroBannerData.eventInfo.title,
      date: homePageFields.heroEventDate || fallbackHeroBannerData.eventInfo.date,
      location: homePageFields.heroEventLocation || fallbackHeroBannerData.eventInfo.location,
      description: homePageFields.heroEventDescription || fallbackHeroBannerData.eventInfo.description
    },
    backgroundImage: homePageFields.heroBackgroundImage?.fields?.file?.url || fallbackHeroBannerData.backgroundImage,
    heroImage: homePageFields.heroImage?.fields?.file?.url || fallbackHeroBannerData.heroImage,
    showCountdown: homePageFields.heroShowCountdown !== undefined ? homePageFields.heroShowCountdown : fallbackHeroBannerData.showCountdown
  };
}

/**
 * Map PromotionBanner content type to HeroBannerData
 */
export function mapPromotionBannerToHeroBannerData(promotionBanner: PromotionBanner): HeroBannerData {

  return {
    tagline: {
      icon: "/assets/img/icons/sub-logo1.svg", //promotionBanner.image?.fields?.file?.url || fallbackHeroBannerData.tagline.icon,
      text: promotionBanner.subTitle || fallbackHeroBannerData.tagline.text
    },
    title: promotionBanner.title || fallbackHeroBannerData.title,
    description: promotionBanner.summary || fallbackHeroBannerData.description,
    buttons: {
      primary: {
        text: "Learn More",
        url: promotionBanner.url || fallbackHeroBannerData.buttons.primary.url
      },
      secondary: {
        text: "Take Action",
        url: promotionBanner.actionUrl || fallbackHeroBannerData.buttons.secondary.url
      }
    },
          eventInfo: {
        title: promotionBanner.event?.fields?.name || fallbackHeroBannerData.eventInfo.title,
        date: promotionBanner.event?.fields?.datetime ? formatEventDateTime(promotionBanner.event.fields.datetime) : fallbackHeroBannerData.eventInfo.date,
        location: promotionBanner.event?.fields?.location || fallbackHeroBannerData.eventInfo.location,
        description: promotionBanner.event?.fields?.summary || fallbackHeroBannerData.eventInfo.description
      },
          backgroundImage: promotionBanner.image?.fields?.file?.url || fallbackHeroBannerData.backgroundImage,
      heroImage: promotionBanner.image?.fields?.file?.url || fallbackHeroBannerData.heroImage,
      showCountdown: promotionBanner.event?.fields?.datetime ? true : fallbackHeroBannerData.showCountdown,
      eventDateTime: promotionBanner.event?.fields?.datetime || undefined
  };
}
