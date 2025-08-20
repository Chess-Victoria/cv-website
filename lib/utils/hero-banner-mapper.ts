import { HeroBannerData } from '@/components/sections/home1/HeroBanner';
import { renderRichText } from '@/lib/utils/rich-text';
import { formatEventDateTime } from '@/lib/utils/date-formatter';

// Removed hardcoded fallback hero banner data for production cleanliness

import { PromotionBanner } from '@/lib/types/promotion-banner';

/**
 * Map Contentful hero banner fields to HeroBannerData
 */
export function mapHeroBannerData(homePageFields: any): HeroBannerData {
  // Check if we have enough hero banner data to use
  const hasHeroData = homePageFields.heroTitle || homePageFields.heroTagline;
  
  if (!hasHeroData) {
    // Return minimal empty-safe structure to avoid render errors
    return {
      tagline: { icon: "/assets/img/icons/sub-logo1.svg", text: "" },
      title: "",
      description: "",
      buttons: { primary: { text: "", url: "#" }, secondary: { text: "", url: "#" } },
      eventInfo: { title: "", date: "", location: "", description: "" },
      backgroundImage: "/assets/img/bg/header-bg2.png",
      heroImage: "/assets/img/all-images/hero/hero-img1.png",
      showCountdown: false,
      eventDateTime: undefined
    };
  }

  return {
    tagline: {
      icon: homePageFields.heroTaglineIcon?.fields?.file?.url || "/assets/img/icons/sub-logo1.svg",
      text: homePageFields.heroTagline || ""
    },
    title: homePageFields.heroTitle || "",
    description: homePageFields.heroDescription || "",
    buttons: {
      primary: {
        text: homePageFields.heroPrimaryButtonText || "",
        url: homePageFields.heroPrimaryButtonUrl || "#"
      },
      secondary: {
        text: homePageFields.heroSecondaryButtonText || "",
        url: homePageFields.heroSecondaryButtonUrl || "#"
      }
    },
    eventInfo: {
      title: homePageFields.heroEventTitle || "",
      date: homePageFields.heroEventDate || "",
      location: homePageFields.heroEventLocation || "",
      description: homePageFields.heroEventDescription || ""
    },
    backgroundImage: homePageFields.heroBackgroundImage?.fields?.file?.url || "/assets/img/bg/header-bg2.png",
    heroImage: homePageFields.heroImage?.fields?.file?.url || "/assets/img/all-images/hero/hero-img1.png",
    showCountdown: homePageFields.heroShowCountdown !== undefined ? homePageFields.heroShowCountdown : false
  };
}

/**
 * Map PromotionBanner content type to HeroBannerData
 */
export function mapPromotionBannerToHeroBannerData(promotionBanner: PromotionBanner): HeroBannerData {

  return {
    tagline: {
      icon: "/assets/img/icons/sub-logo1.svg",
      text: promotionBanner.subTitle || ""
    },
    title: promotionBanner.title || "",
    description: promotionBanner.summary || "",
    buttons: {
      primary: {
        text: "Learn More",
        url: promotionBanner.url || "#"
      },
      secondary: {
        text: "Take Action",
        url: promotionBanner.actionUrl || "#"
      }
    },
          eventInfo: {
        title: promotionBanner.event?.fields?.name || "",
        date: promotionBanner.event?.fields?.datetime ? formatEventDateTime(promotionBanner.event.fields.datetime) : "",
        location: promotionBanner.event?.fields?.location || "",
        description: promotionBanner.event?.fields?.summary || ""
      },
          backgroundImage: promotionBanner.image?.fields?.file?.url || "/assets/img/bg/header-bg2.png",
      heroImage: promotionBanner.image?.fields?.file?.url || "/assets/img/all-images/hero/hero-img1.png",
      showCountdown: promotionBanner.event?.fields?.datetime ? true : false,
      eventDateTime: promotionBanner.event?.fields?.datetime || undefined
  };
}
