import { getSiteConfiguration, SiteConfiguration } from '../site-config';

/**
 * Server-side function to get site configuration
 * Use this in server components and API routes
 */
export async function getServerSiteConfig(): Promise<SiteConfiguration> {
  return await getSiteConfiguration();
}

/**
 * Server-side function to get contact information
 */
export async function getServerContactInfo() {
  const config = await getSiteConfiguration();
  return {
    email: config.contactEmail,
    phone: config.contactPhone,
    address: config.address,
  };
}

/**
 * Server-side function to get social media links
 */
export async function getServerSocialMediaLinks() {
  const config = await getSiteConfiguration();
  return {
    facebook: (config as any).facebookUrl,
    instagram: (config as any).instagramUrl,
    linkedin: (config as any).linkedinUrl,
    pinterest: (config as any).pinterestUrl,
    youtube: (config as any).youtubeUrl,
  };
}

/**
 * Server-side function to get navigation links
 */
export async function getServerNavigationLinks() {
  const config = await getSiteConfiguration();
  return {
    headerLinks: (config as any).headerLinks || [],
    footerLinks: (config as any).footerLinks || [],
  };
}

/**
 * Server-side function to get logo URL
 */
export async function getServerLogoUrl(): Promise<string | undefined> {
  const config = await getSiteConfiguration();
  return (config as any).logo;
}
