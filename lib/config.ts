/**
 * Application configuration
 */

// Revalidation settings
export const REVALIDATION_CONFIG = {
  // Default revalidation time in seconds (1 hour)
  DEFAULT: parseInt(process.env.REVALIDATE_DEFAULT || '3600'),
  
  // Development revalidation time in seconds (10 seconds for quick updates)
  DEVELOPMENT: parseInt(process.env.REVALIDATE_DEVELOPMENT || '10'),
  
  // Specific content type revalidation times
  HOMEPAGE: parseInt(process.env.REVALIDATE_HOMEPAGE || '3600'),
  CHESS_CLUB: parseInt(process.env.REVALIDATE_CHESS_CLUB || '3600'),
  COMMITTEE: parseInt(process.env.REVALIDATE_COMMITTEE || '3600'),
  FAQ: parseInt(process.env.REVALIDATE_FAQ || '3600'),
  CHAMPION: parseInt(process.env.REVALIDATE_CHAMPION || '3600'),
  CLUB_PAGE: parseInt(process.env.REVALIDATE_CLUB_PAGE || '3600'),
  EVENT: parseInt(process.env.REVALIDATE_EVENT || '3600'),
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
