/**
 * Default image constants for consistent fallback images across the application
 */
export const DEFAULT_IMAGES = {
  // Contact and person images
  NO_PHOTO: '/assets/img/default/no-photo.png',
  
  // Club-related images
  CLUB: '/assets/img/default/generic-chess-club.png',
  
  // Event-related images
  EVENT: '/assets/img/default/generic-event.png',
  
  // Team and testimonial images
  TEAM: '/assets/img/all-images/team/team-img12.png',
  TESTIMONIAL: '/assets/img/all-images/testimonials/testimonial-img1.png',
  
  // Logo and branding images
  LOGO: '/assets/img/logo/cvlogo.png',
  
  // Placeholder images
  PLACEHOLDER: '/assets/img/default/placeholder.png',
} as const;

/**
 * Get default image with fallback
 * @param imageUrl - The primary image URL
 * @param fallbackType - The type of fallback image to use
 * @returns The image URL or fallback
 */
export function getDefaultImage(imageUrl?: string, fallbackType: keyof typeof DEFAULT_IMAGES = 'NO_PHOTO'): string {
  return imageUrl || DEFAULT_IMAGES[fallbackType];
}

/**
 * Get contact image with proper fallback
 * @param imageUrl - The contact image URL
 * @returns The image URL or no-photo fallback
 */
export function getContactImage(imageUrl?: string): string {
  return getDefaultImage(imageUrl, 'NO_PHOTO');
}

/**
 * Get club image with proper fallback
 * @param imageUrl - The club image URL
 * @returns The image URL or club fallback
 */
export function getClubImage(imageUrl?: string): string {
  return getDefaultImage(imageUrl, 'CLUB');
}

/**
 * Get event image with proper fallback
 * @param imageUrl - The event image URL
 * @returns The image URL or event fallback
 */
export function getEventImage(imageUrl?: string): string {
  return getDefaultImage(imageUrl, 'EVENT');
}
