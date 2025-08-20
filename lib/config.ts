/**
 * Application configuration
 */

// Revalidation settings
export const REVALIDATION_CONFIG = {
  // Default revalidation time in seconds (24 hours)
  DEFAULT: parseInt(process.env.REVALIDATE_DEFAULT || '86400'),
  
  // Development revalidation time in seconds (10 seconds for quick updates)
  DEVELOPMENT: parseInt(process.env.REVALIDATE_DEVELOPMENT || '10'),
  
  // Specific content type revalidation times
  HOMEPAGE: parseInt(process.env.REVALIDATE_HOMEPAGE || '86400'), // 24 hours
  CHESS_CLUB: parseInt(process.env.REVALIDATE_CHESS_CLUB || '604800'), // 7 days
  COMMITTEE: parseInt(process.env.REVALIDATE_COMMITTEE || '604800'), // 7 days
  FAQ: parseInt(process.env.REVALIDATE_FAQ || '604800'), // 7 days
  CHAMPION: parseInt(process.env.REVALIDATE_CHAMPION || '604800'), // 7 days
  CLUB_PAGE: parseInt(process.env.REVALIDATE_CLUB_PAGE || '604800'), // 7 days
  EVENT: parseInt(process.env.REVALIDATE_EVENT || '86400'), // 24 hours (events change more frequently)
  IMAGE_GALLERY: parseInt(process.env.REVALIDATE_IMAGE_GALLERY || '604800'), // 7 days
  POST: parseInt(process.env.REVALIDATE_POST || '86400'), // 24 hours (news posts change more frequently)
  ACF_RATINGS: parseInt(process.env.REVALIDATE_ACF_RATINGS || '2592000'), // 30 days default
} as const;

// Helper function to get revalidation time based on environment
export function getRevalidationTime(contentType?: keyof typeof REVALIDATION_CONFIG): number {
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  if (isDevelopment) {
    return REVALIDATION_CONFIG.DEVELOPMENT;
  }
  
  if (contentType && contentType in REVALIDATION_CONFIG) {
    return REVALIDATION_CONFIG[contentType];
  }
  
  return REVALIDATION_CONFIG.DEFAULT;
}
