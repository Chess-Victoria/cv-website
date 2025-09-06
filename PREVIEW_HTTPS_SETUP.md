# Contentful Preview with HTTPS Setup

## Why HTTPS is Required

Contentful preview functionality requires HTTPS for proper iframe cookie handling. Modern browsers require `SameSite=None` cookies to also have the `Secure` attribute, which only works over HTTPS connections.

## Development Setup

### Option 1: Use Next.js Built-in HTTPS (Recommended)

The project is already configured to run with HTTPS in development:

```bash
npm run dev
```

This will start the server at `https://localhost:3000` with self-signed certificates.

### Option 2: Use mkcert for Trusted Certificates

If you want to avoid browser security warnings:

1. Install mkcert:
   ```bash
   # macOS
   brew install mkcert
   
   # Windows (Chocolatey)
   choco install mkcert
   
   # Linux
   sudo apt install mkcert
   ```

2. Install the local CA:
   ```bash
   mkcert -install
   ```

3. Generate certificates:
   ```bash
   mkcert localhost 127.0.0.1 ::1
   ```

4. Update package.json to use the certificates:
   ```json
   {
     "scripts": {
       "dev:https": "NEXT_RUN_LOCAL=true next dev --experimental-https --experimental-https-key ./localhost-key.pem --experimental-https-cert ./localhost.pem"
     }
   }
   ```

## Contentful Preview URLs

When setting up preview URLs in Contentful, use:

- **Development**: `https://localhost:3000/api/preview?secret=YOUR_SECRET&contentType={contentType}&slug={slug}`
- **Production**: `https://yourdomain.com/api/preview?secret=YOUR_SECRET&contentType={contentType}&slug={slug}`

## Testing Preview Functionality

1. Start the development server with HTTPS:
   ```bash
   npm run dev
   ```

2. Test the preview API:
   ```bash
   curl -k "https://localhost:3000/api/preview?secret=protectme&contentType=page&slug=chess-victoria-mission"
   ```

3. Check that cookies are set with `Secure; SameSite=none`:
   ```bash
   curl -k -D - "https://localhost:3000/api/preview?secret=protectme&contentType=page&slug=chess-victoria-mission" | grep -i cookie
   ```

## Troubleshooting

### Browser Security Warnings

If you see security warnings in the browser:
- Click "Advanced" → "Proceed to localhost (unsafe)"
- Or use mkcert for trusted certificates

### Cookies Not Working in Iframe

Ensure:
1. Server is running on HTTPS
2. Cookies have `Secure; SameSite=none` attributes
3. Contentful preview URLs use HTTPS

### Fallback Methods

The preview system includes multiple fallback methods:
1. Next.js `draftMode()` with HTTPS cookies
2. Custom cookies with `SameSite=none`
3. URL parameters: `?preview=true&secret=YOUR_SECRET`

## Environment Variables

Required environment variables:
```env
CONTENTFUL_PREVIEW_ACCESS_TOKEN=your_preview_token
CONTENTFUL_PREVIEW_SECRET=your_secret
NEXT_PUBLIC_SITE_URL=https://localhost:3000  # Use HTTPS for development
```
