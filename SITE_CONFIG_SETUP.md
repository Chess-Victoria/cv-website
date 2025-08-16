# Site Configuration Setup Guide

This guide explains how to use the SiteConfiguration content type from Contentful with caching and React integration.

## Overview

The site configuration system provides:
- **5-minute caching** for performance
- **TypeScript interfaces** for type safety
- **React hooks** for client components
- **Server utilities** for server components and API routes
- **Error handling** with fallback to cached data

## Contentful Setup

### 1. Create SiteConfiguration Content Type

In your Contentful space, create a content type called `siteConfiguration` with the following fields:

#### Basic Fields
- `siteName` (Short text)
- `siteDescription` (Long text)
- `logo` (Media - Single asset)
- `contactEmail` (Short text)
- `contactPhone` (Short text)
- `address` (Long text)
- `footerText` (Long text)

#### Social Media Fields
- `socialMedia` (Object) with fields:
  - `facebook` (Short text)
  - `twitter` (Short text)
  - `instagram` (Short text)
  - `linkedin` (Short text)

#### Navigation Fields
- `headerLinks` (Array) with items:
  - `title` (Short text)
  - `url` (Short text)
- `footerLinks` (Array) with items:
  - `title` (Short text)
  - `url` (Short text)

### 2. Create Site Configuration Entry

Create a single entry of type `siteConfiguration` and fill in your site's information.

## Usage Examples

### 1. Client Components (React Hooks)

```tsx
'use client'

import { useSiteConfig } from '@/lib/hooks/useSiteConfig';

export default function Header() {
  const { siteName, logo, headerLinks, loading, error } = useSiteConfig();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <header>
      <div className="logo">
        {logo && <img src={logo.fields.file.url} alt={siteName} />}
        <h1>{siteName}</h1>
      </div>
      <nav>
        {headerLinks.map((link, index) => (
          <a key={index} href={link.url}>{link.title}</a>
        ))}
      </nav>
    </header>
  );
}
```

### 2. Server Components

```tsx
import { getServerSiteConfig } from '@/lib/server/site-config';

export default async function Footer() {
  const config = await getServerSiteConfig();
  
  return (
    <footer>
      <p>{config.footerText}</p>
      <div className="contact">
        <p>Email: {config.contactEmail}</p>
        <p>Phone: {config.contactPhone}</p>
      </div>
      <div className="social">
        {config.socialMedia?.facebook && (
          <a href={config.socialMedia.facebook}>Facebook</a>
        )}
        {/* Add other social media links */}
      </div>
    </footer>
  );
}
```

### 3. API Routes

```tsx
import { NextRequest, NextResponse } from 'next/server';
import { getServerContactInfo } from '@/lib/server/site-config';

export async function GET(request: NextRequest) {
  const contactInfo = await getServerContactInfo();
  
  return NextResponse.json(contactInfo);
}
```

### 4. Utility Functions

```tsx
import { 
  getSiteConfiguration, 
  getContactInfo, 
  getSocialMediaLinks,
  getNavigationLinks,
  clearSiteConfigurationCache 
} from '@/lib/site-config';

// Get full configuration
const config = await getSiteConfiguration();

// Get specific data
const contact = await getContactInfo();
const social = await getSocialMediaLinks();
const nav = await getNavigationLinks();

// Clear cache (useful for development)
clearSiteConfigurationCache();
```

## Available Functions

### Core Functions (`lib/site-config.ts`)
- `getSiteConfiguration()` - Get full site configuration
- `getSiteConfigField(field)` - Get specific field
- `getContactInfo()` - Get contact information
- `getSocialMediaLinks()` - Get social media links
- `getNavigationLinks()` - Get navigation links
- `clearSiteConfigurationCache()` - Clear cache

### Server Functions (`lib/server/site-config.ts`)
- `getServerSiteConfig()` - Server-side config loading
- `getServerContactInfo()` - Server-side contact info
- `getServerSocialMediaLinks()` - Server-side social links
- `getServerNavigationLinks()` - Server-side navigation
- `getServerLogoUrl()` - Server-side logo URL

### React Hook (`lib/hooks/useSiteConfig.ts`)
- `useSiteConfig()` - React hook with loading/error states

## Caching Behavior

- **Cache Duration**: 5 minutes
- **Fallback**: Uses expired cache if API fails
- **Development**: Call `clearSiteConfigurationCache()` to force refresh

## TypeScript Interface

```tsx
interface SiteConfiguration {
  siteName?: string;
  siteDescription?: string;
  logo?: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  footerText?: string;
  headerLinks?: Array<{
    title: string;
    url: string;
  }>;
  footerLinks?: Array<{
    title: string;
    url: string;
  }>;
}
```

## Environment Variables

Ensure these are set in your `.env.local`:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## Testing

Use the example component to test your configuration:

```tsx
import SiteConfigExample from '@/components/examples/SiteConfigExample';

// Add to any page to see the configuration
<SiteConfigExample />
```

## Best Practices

1. **Single Entry**: Create only one `siteConfiguration` entry
2. **Required Fields**: Make essential fields required in Contentful
3. **Fallbacks**: Always provide fallback values in components
4. **Error Handling**: Handle loading and error states
5. **Cache Management**: Clear cache when updating content
