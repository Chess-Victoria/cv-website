# Contentful Preview Setup Guide

This guide explains how to set up and use Contentful preview functionality for news and pages.

## Environment Variables

Add these environment variables to your `.env.local` file:

```env
# Existing variables
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token

# New preview variables
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_access_token
CONTENTFUL_PREVIEW_SECRET=your_preview_secret_key
```

### Getting Preview Access Token

1. Go to your Contentful space
2. Navigate to **Settings** → **API keys**
3. Click **Content delivery / preview tokens**
4. Click **Generate personal token**
5. Select **Preview API** scope
6. Copy the generated token to `CONTENTFUL_PREVIEW_ACCESS_TOKEN`

### Setting Preview Secret

Choose a strong, random secret key for `CONTENTFUL_PREVIEW_SECRET`. This will be used to authenticate preview requests.

## Contentful Preview URL Configuration

### For News/Posts

1. Go to **Settings** → **Content preview**
2. Click **Add content preview**
3. Configure:
   - **Name**: `News Preview`
   - **Content types**: Select `post`
   - **Preview URL**: 
     ```
     http://localhost:3000/api/preview?secret=YOUR_SECRET&contentType=post&slug={entry.fields.slug}
     ```
     (Replace `YOUR_SECRET` with your actual secret)

### For Pages

1. Create another content preview entry
2. Configure:
   - **Name**: `Pages Preview`
   - **Content types**: Select `page`
   - **Preview URL**:
     ```
     http://localhost:3000/api/preview?secret=YOUR_SECRET&contentType=page&slug={entry.fields.slug}
     ```

## Production URLs

For production, update the preview URLs to use your production domain:

```
https://chessvictoria.org.au/api/preview?secret=YOUR_SECRET&contentType=post&slug={entry.fields.slug}
https://chessvictoria.org.au/api/preview?secret=YOUR_SECRET&contentType=page&slug={entry.fields.slug}
```

## How to Use Preview

### For Content Editors

1. **Create or edit content** in Contentful
2. **Save as draft** (don't publish yet)
3. **Click "Open preview"** button in Contentful
4. **Review the content** on your website
5. **Make changes** if needed
6. **Publish** when ready

### For Developers

1. **Test preview locally**:
   ```bash
   # Start development server
   npm run dev
   
   # Test preview URL manually
   curl "http://localhost:3000/api/preview?secret=YOUR_SECRET&contentType=post&slug=your-post-slug"
   ```

2. **Exit preview mode**:
   - Click "Exit Preview" button in the preview banner
   - Or visit: `http://localhost:3000/api/exit-preview`

## API Endpoints

### Enable Preview
```
GET /api/preview?secret=SECRET&contentType=TYPE&slug=SLUG
```

**Parameters:**
- `secret`: Your preview secret key
- `contentType`: `post` or `page`
- `slug`: The content slug

### Exit Preview
```
GET /api/exit-preview?slug=SLUG
```

**Parameters:**
- `slug` (optional): Redirect to specific page after exiting

## Features

### ✅ Implemented
- Preview API routes for news and pages
- Preview banner with exit functionality
- Preview-enabled Contentful client
- Draft mode integration
- Local development support

### 🔄 How It Works
1. **Content editor** clicks "Open preview" in Contentful
2. **Contentful** redirects to your preview API with secret and content info
3. **Preview API** validates secret and enables draft mode
4. **Website** shows draft content with preview banner
5. **User** can exit preview to return to published content

## Troubleshooting

### Common Issues

1. **"Invalid token" error**
   - Check that `CONTENTFUL_PREVIEW_SECRET` matches the secret in your preview URLs

2. **"Missing required parameters" error**
   - Ensure your Contentful preview URLs include all required parameters

3. **Preview not showing draft content**
   - Verify `CONTENTFUL_PREVIEW_ACCESS_TOKEN` is correct
   - Check that the content is saved as draft (not published)

4. **Preview banner not showing**
   - Check browser console for JavaScript errors
   - Verify the preview banner component is loaded

### Debug Mode

Add this to your `.env.local` for debug logging:
```env
DEBUG=preview:*
```

## Security Notes

1. **Keep your preview secret secure** - never commit it to version control
2. **Use HTTPS in production** for preview URLs
3. **Limit preview access** to authorized content editors only
4. **Regularly rotate** your preview secret

## Next Steps

- Test preview functionality with both news and pages
- Configure production preview URLs
- Train content editors on preview workflow
- Monitor preview usage and performance
