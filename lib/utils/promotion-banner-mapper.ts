import { PromotionBanner, PromotionBannerData } from '@/lib/types/promotion-banner';
import { renderRichText } from '@/lib/utils/rich-text';

/**
 * Map Contentful PromotionBanner to PromotionBannerData
 */
export function mapPromotionBannerToData(promotionBanner: PromotionBanner): PromotionBannerData {
  return {
    title: promotionBanner.title,
    subTitle: promotionBanner.subTitle,
    summary: promotionBanner.summary,
    url: promotionBanner.url,
    actionUrl: promotionBanner.actionUrl,
    event: promotionBanner.event?.fields,
    image: promotionBanner.image?.fields ? {
      url: promotionBanner.image.fields.file?.url,
      alt: promotionBanner.image.fields.title || promotionBanner.image.fields.description,
      width: promotionBanner.image.fields.file?.details?.image?.width,
      height: promotionBanner.image.fields.file?.details?.image?.height,
    } : undefined,
  };
}

/**
 * Map multiple PromotionBanner entries to PromotionBannerData array
 */
export function mapPromotionBannersToData(promotionBanners: PromotionBanner[]): PromotionBannerData[] {
  return promotionBanners.map(mapPromotionBannerToData);
}
