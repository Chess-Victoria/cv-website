# Environment Setup Guide

This document explains how to configure the Chess Victoria website for different environments (development, staging, production).

## Environment Variables

### Required Environment Variables

#### `NEXT_PUBLIC_SITE_URL`
The base URL for your website. This is used for:
- Metadata generation (Open Graph, Twitter cards)
- Canonical URLs
- Sitemap generation
- Internal links and redirects

**Examples:**
- Development: `http://localhost:3000`
- Staging: `https://staging.chessvictoria.org.au`
- Production: `https://chessvictoria.org.au`

### Setting Up Environment Variables

1. **Create `.env.local` file** in the root directory:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

2. **For different environments**, create appropriate `.env` files:
   - `.env.development` - Development environment
   - `.env.staging` - Staging environment  
   - `.env.production` - Production environment

### Environment-Specific Configuration

#### Development Environment
```bash
# .env.local
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

#### Staging Environment
```bash
# .env.staging
NEXT_PUBLIC_SITE_URL=https://staging.chessvictoria.org.au
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

#### Production Environment
```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://chessvictoria.org.au
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
```

## What's Been Updated

The following files have been updated to use `NEXT_PUBLIC_SITE_URL` instead of hardcoded URLs:

### Core Files
- `app/layout.tsx` - Root layout metadata
- `app/metadata.ts` - Homepage metadata defaults
- `lib/site-config.ts` - Site configuration

### Page Metadata
- `app/memories/page.tsx`
- `app/event/[slug]/page.tsx`
- `app/about/page.tsx`
- `app/chess-clubs/page.tsx`
- `app/events/page.tsx`
- `app/news/[page]/page.tsx`

### Utility Files
- `lib/utils/metadata-mapper.ts` - Metadata mapping utilities
- `lib/utils/page.ts` - Page utilities
- `app/sitemap.ts` - Sitemap generation

## Benefits

1. **Environment Flexibility**: Easy switching between development, staging, and production
2. **Local Testing**: Proper metadata generation for local development
3. **Consistency**: All URLs use the same base URL configuration
4. **SEO Friendly**: Correct canonical URLs and Open Graph metadata for each environment

## Testing

### Local Development
```bash
# Start with local environment
npm run dev
```

The website will use `http://localhost:3000` for all URLs and metadata.

### Production Build Test
```bash
# Test production build locally
npm run build
npm start
```

### Environment-Specific Builds
```bash
# Build for staging
npm run build:staging

# Build for production  
npm run build:production
```

## Troubleshooting

### Common Issues

1. **Metadata Warnings**: If you see metadataBase warnings, ensure `NEXT_PUBLIC_SITE_URL` is set correctly
2. **Broken Links**: Check that the environment variable is being read correctly
3. **Build Errors**: Verify all environment variables are properly set

### Verification

To verify the environment variable is working:

1. Check the browser's developer tools for metadata tags
2. Verify Open Graph URLs in social media testing tools
3. Check canonical URLs in page source
4. Test sitemap generation

## Deployment

### Vercel
Set environment variables in your Vercel project settings:
- `NEXT_PUBLIC_SITE_URL` for each environment (Preview, Production)

### Other Platforms
Configure environment variables according to your hosting platform's documentation.

## Notes

- `NEXT_PUBLIC_` prefix makes the variable available in the browser
- Changes to environment variables require a restart of the development server
- Production builds should always use the correct production URL
