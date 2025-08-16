import { getEntries } from './contentful';

// Define the SiteConfiguration interface based on your Contentful content type
export interface SiteConfigurationItem {
  name: string;
  value?: string;
  values?: Array<{
    title?: string;
    url?: string;
    text?: string;
    // Add more fields as needed for references
  }>;
}

// Dictionary type for easy access by name
export interface SiteConfiguration {
  [key: string]: string | Array<any> | undefined;
}

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
let siteConfigCache: {
  data: SiteConfiguration | null;
  timestamp: number;
} | null = null;


/**
 * Load site configuration from Contentful with caching
 * @returns Promise<SiteConfiguration>
 */
export async function getSiteConfiguration(): Promise<SiteConfiguration> {
  // Check if cache is valid
  if (siteConfigCache && Date.now() - siteConfigCache.timestamp < CACHE_DURATION) {
    return siteConfigCache.data!;
  }

  try {
    // Fetch all site configuration entries from Contentful
    const entries = await getEntries("siteConfiguration");

    if (entries.length === 0) {
      console.warn('No site configuration found in Contentful');
      return {};
    }

    // Build dictionary from name-value pairs
    const configDictionary: SiteConfiguration = {};

    entries.forEach((item) => {
      const fields = item.fields as any;
      const name = fields.name;

      if (name) {
        // If there's a single value, use it
        if (fields.value) {
          configDictionary[name] = fields.value;
        }
        // If there are multiple values (references), use them
        else if (fields.values && fields.values.length > 0) {
          configDictionary[name] = fields.values;
        }
      }
    });

    // Update cache
    siteConfigCache = {
      data: configDictionary,
      timestamp: Date.now(),
    };

    return configDictionary;
  } catch (error) {
    console.error('Error loading site configuration:', error);

    // Return cached data if available, even if expired
    if (siteConfigCache?.data) {
      console.warn('Using expired cache due to error');
      return siteConfigCache.data;
    }

    return {};
  }
}

/**
 * Clear the site configuration cache
 * Useful for development or when you need to force a refresh
 */
export function clearSiteConfigurationCache(): void {
  siteConfigCache = null;
}

/**
 * Get specific field from site configuration
 * @param field - The field name to retrieve
 * @returns Promise<T | undefined>
 */
export async function getSiteConfigField<T>(field: keyof SiteConfiguration): Promise<T | undefined> {
  const config = await getSiteConfiguration();
  return config[field] as T | undefined;
}

/**
 * Get contact information from site configuration
 * @returns Promise<{email?: string, phone?: string, address?: string}>
 */
export async function getContactInfo() {
  const config = await getSiteConfiguration();
  return {
    email: config.contactEmail,
    phone: config.contactPhone,
    address: config.address,
  };
}

/**
 * Get social media links from site configuration
 * @returns Promise<{facebook?: string, twitter?: string, instagram?: string, linkedin?: string}>
 */
export async function getSocialMediaLinks() {
  const config = await getSiteConfiguration();
  return config.socialMedia || {};
}

/**
 * Get navigation links from site configuration
 * @returns Promise<{headerLinks?: Array<{title: string, url: string}>, footerLinks?: Array<{title: string, url: string}>}>
 */
export async function getNavigationLinks() {
  const config = await getSiteConfiguration();
  return {
    headerLinks: config.headerLinks || [],
    footerLinks: config.footerLinks || [],
  };
}
