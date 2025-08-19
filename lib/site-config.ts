// Static site configuration (can be edited without CMS)
export interface SiteConfiguration {
  siteName?: string;
  siteDescription?: string;
  logo?: string;
  logoBlack?: string;
  footerText?: string;

  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  websiteUrl?: string;

  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  pinterestUrl?: string;
  youtubeUrl?: string;
}

// Prefill with current visible values; replace with valid ones later
export const SITE_CONFIG: SiteConfiguration = {
  siteName: 'Chess Victoria',
  siteDescription: 'Victorian chess community – collaborate, compete, and celebrate the game of chess.',
  logo: '/assets/img/logo/cvlogo1.png',
  logoBlack: '/assets/img/logo/cvlogo-black.png',
  footerText: 'We strive to create an environment where the Victorian chess community can collaborate, compete, and celebrate the game of chess.',

  contactEmail: 'admin@chessvictoria.com.au',
  contactPhone: '???? ??? ????)',
  address: 'Melbourne, Australia',
  websiteUrl: 'https://www.chessvictoria.org.au/',

  facebookUrl: 'https://www.facebook.com/ChessVictoria/',
  instagramUrl: '',
  linkedinUrl: '',
  pinterestUrl: '',
  youtubeUrl: '',
};

export async function getSiteConfiguration(): Promise<SiteConfiguration> {
  return SITE_CONFIG;
}

export async function getSiteConfigField<T>(field: keyof SiteConfiguration): Promise<T | undefined> {
  const config = await getSiteConfiguration();
  return config[field] as T | undefined;
}

export async function getContactInfo() {
  const config = await getSiteConfiguration();
  return {
    email: config.contactEmail,
    phone: config.contactPhone,
    address: config.address,
  };
}

export async function getSocialMediaLinks() {
  const config = await getSiteConfiguration();
  return {
    facebook: config.facebookUrl,
    instagram: config.instagramUrl,
    linkedin: config.linkedinUrl,
    pinterest: config.pinterestUrl,
    youtube: config.youtubeUrl,
  };
}
