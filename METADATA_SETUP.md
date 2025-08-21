# Metadata System Setup

This document explains how the metadata system works for the Chess Victoria website, allowing you to manage metadata through Contentful while providing sensible defaults.

## Overview

The metadata system allows you to:
1. Define default metadata in code for fallback
2. Override metadata through Contentful's `pageMetadata` content type
3. Automatically merge Contentful metadata with defaults
4. Generate proper Open Graph and Twitter metadata

## Contentful Setup

### PageMetadata Content Type

The `pageMetadata` content type in Contentful includes these fields:

- **Page Title** (Text): The main title for the page
- **Page Description** (RichText): Description of the page content
- **Page Type** (Symbol): Type of page (e.g., "website", "article")
- **Page URL** (Symbol): Canonical URL for the page
- **Image URL** (Symbol): URL for the Open Graph image
- **Image Alt Text** (Text): Alt text for the image
- **Keywords** (Array of Symbols): SEO keywords

### Linking to Pages

To use metadata on a page, link the `pageMetadata` content type to the page's metadata field. For example:

- Homepage: Link `pageMetadata` to the `metadata` field in the `homePage` content type
- Other pages: Link `pageMetadata` to the `metadata` field in their respective content types

## Implementation

### 1. Metadata Types (`lib/types/metadata.ts`)

Defines TypeScript interfaces for:
- `PageMetadata`: Contentful entry structure
- `MetadataData`: Mapped data for components
- `OpenGraphMetadata`: Final metadata structure

### 2. Metadata Mapper (`lib/utils/metadata-mapper.ts`)

Provides utilities for:
- `mapPageMetadataToData()`: Maps Contentful metadata to component data
- `generateOpenGraphMetadata()`: Generates Open Graph metadata
- `mergeMetadata()`: Merges Contentful metadata with defaults

### 3. Page-Specific Metadata Files

Each page can have its own metadata file (e.g., `app/metadata.ts` for homepage) that:
- Defines default metadata
- Provides a function to generate final metadata
- Handles merging with Contentful data

### 4. Page Implementation

Pages use the `generateMetadata()` function to:
- Fetch page data including metadata
- Generate final metadata using the page-specific function
- Return properly formatted Next.js metadata

## Example: Homepage Implementation

```typescript
// app/metadata.ts
export const defaultHomeMetadata: OpenGraphMetadata = {
  title: "Chess Victoria | Home - Promoting Chess Growth, Inclusion & Excellence",
  description: "Welcome to Chess Victoria...",
  // ... other defaults
};

export function generateHomeMetadata(contentfulMetadata?: any): Metadata {
  const finalMetadata = contentfulMetadata ? 
    mergeMetadata(defaultHomeMetadata, contentfulMetadata) : 
    defaultHomeMetadata;
  
  return {
    metadataBase: new URL(baseUrl),
    title: finalMetadata.title,
    // ... rest of metadata
  };
}

// app/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  const homePageData = await getHomePageData()
  return generateHomeMetadata(homePageData.metadata)
}
```

## Benefits

1. **Content Management**: Non-technical users can update metadata through Contentful
2. **Fallback Safety**: Default metadata ensures pages always have proper SEO
3. **Consistency**: Standardized metadata structure across all pages
4. **Flexibility**: Easy to override specific fields while keeping others as defaults
5. **ISR Compatible**: Works with Next.js Incremental Static Regeneration

## Adding to New Pages

1. Create a metadata file for the page (e.g., `app/about/metadata.ts`)
2. Define default metadata
3. Create a `generateMetadata()` function
4. Update the page data fetching to include metadata mapping
5. Link a `pageMetadata` entry in Contentful to the page

## Troubleshooting

- **Build Errors**: Check that all imports are correct and types match
- **Metadata Not Updating**: Ensure the `pageMetadata` entry is published in Contentful
- **ISR Issues**: Verify that metadata is included in the cache tags for revalidation
