# Contentful Webhook Setup for ISR Revalidation

This guide explains how to set up a Contentful webhook to trigger Incremental Static Regeneration (ISR) when content is updated.

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
CONTENTFUL_REVALIDATE_SECRET=your-secret-key-here
```

**Important**: Choose a strong, random secret key. This will be used to authenticate webhook requests from Contentful.

## Contentful Webhook Configuration

### 1. Create the Webhook in Contentful

1. Go to your Contentful space
2. Navigate to **Settings** → **Webhooks**
3. Click **Add webhook**
4. Configure the webhook:

   **Name**: `ISR Revalidation`
   
   **URL**: `https://your-domain.com/api/revalidate`
   
   **HTTP Method**: `POST`
   
   **Headers**:
   ```
   Authorization: Bearer your-secret-key-here
   Content-Type: application/json
   ```

### 2. Configure Triggers

Select the following triggers to revalidate pages when content changes:

- **Entry publish** ✅
- **Entry unpublish** ✅
- **Entry delete** ✅

### 3. Filter Content Types (Optional)

You can optionally filter which content types trigger revalidation:

- `homePage`
- `clubPage`
- `clubDetail`
- `committeeList`
- `comitteeMember`
- `event`
- `eventList`
- `frequentlyAskedQuestion`
- `champion`
- `championPage`
- `siteConfiguration`
- `announcement`

## How It Works

### 1. Content Update Flow

1. Content is updated in Contentful
2. Content is published
3. Contentful sends webhook to `/api/revalidate`
4. API validates the secret key
5. API extracts content type and entry ID
6. API revalidates relevant pages using `revalidatePath()` and `revalidateTag()`
7. Next.js regenerates the affected pages

### 2. Revalidation Logic

The API revalidates pages based on content type:

| Content Type | Revalidated Pages |
|--------------|-------------------|
| `homePage` | `/`, `homepage` tag |
| `clubPage` | `/chess-clubs`, `chess-clubs` tag |
| `clubDetail` | `/chess-clubs/[slug]`, `/chess-clubs`, `chess-club` tag |
| `committeeList` | `/committees`, `/committees/[slug]`, `committees` tag |
| `event` | `/event`, `/event-schedule`, `/event-single`, `events` tag |
| `frequentlyAskedQuestion` | `/faq`, `faq` tag |
| `champion` | `/champions/[slug]`, `champions` tag |
| `siteConfiguration` | `/`, `/about`, `/contact`, `site-config` tag |

### 3. Cache Tags

The application uses cache tags for granular revalidation:

- `homepage` - Homepage content
- `chess-clubs` - Chess clubs listing
- `chess-club` - Individual club pages
- `committees` - Committee pages
- `events` - Event pages
- `faq` - FAQ page
- `champions` - Champion pages
- `site-config` - Site configuration

## Testing the Webhook

### 1. Test the API Endpoint

```bash
curl -X GET https://your-domain.com/api/revalidate
```

Should return:
```json
{
  "message": "Revalidate API endpoint is working",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. Test with Secret Key

```bash
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer your-secret-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "sys": {
      "id": "test-entry-id",
      "contentType": {
        "sys": {
          "id": "clubDetail"
        }
      }
    }
  }'
```

Should return:
```json
{
  "revalidated": true,
  "contentType": "clubDetail",
  "entryId": "test-entry-id",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Considerations

1. **Secret Key**: Keep your `CONTENTFUL_REVALIDATE_SECRET` secure and never commit it to version control
2. **HTTPS**: Always use HTTPS in production
3. **Rate Limiting**: Consider implementing rate limiting for the webhook endpoint
4. **Validation**: The API validates the webhook payload structure

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check that the secret key matches between Contentful and your environment
2. **400 Bad Request**: Verify the webhook payload structure
3. **500 Internal Server Error**: Check server logs for detailed error messages

### Debug Logs

The API logs detailed information about webhook requests:

- Webhook payload received
- Content type and entry ID extracted
- Pages being revalidated
- Success/failure status

Check your server logs to debug webhook issues.

## Production Deployment

1. Set the `CONTENTFUL_REVALIDATE_SECRET` environment variable in your production environment
2. Update the webhook URL to your production domain
3. Test the webhook with a content update
4. Monitor logs to ensure revalidation is working correctly

## Fallback Revalidation

The application also includes fallback revalidation:

- **Time-based**: Pages revalidate every hour (3600 seconds) as a fallback
- **Manual**: You can manually trigger revalidation by calling the API endpoint
- **Build-time**: Pages are generated at build time for initial deployment
