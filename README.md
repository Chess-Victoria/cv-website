# Chess Victoria Website

A Next.js website for Chess Victoria with Contentful CMS integration.

## Features

- **Contentful CMS Integration**: Dynamic content management
- **Chess Clubs**: Interactive map with club locations
- **Committee Members**: Detailed member profiles
- **Events**: Event management and display
- **Responsive Design**: Mobile-friendly interface

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Contentful account
- Google Maps API key (for chess clubs map)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```bash
   # Contentful
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   
   # Google Maps (for chess clubs map)
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key
   FROM_EMAIL=your_from_email
   TO_EMAIL=your_to_email
   ```

### Google Maps API Setup

To enable the chess clubs map functionality:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Maps JavaScript API"
4. Create credentials (API key)
5. Add the API key to your `.env.local` file as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Contentful Setup

1. Create a Contentful space
2. Set up content types as defined in the `contentful/` directory
3. Add your space ID and access token to `.env.local`

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Contentful CLI

The project includes Contentful CLI for managing content types:

```bash
# Pull latest content types from Contentful
make pull

# Push local content types to Contentful
make push
```

## Project Structure

- `app/` - Next.js app router pages
- `components/` - React components
- `lib/` - Utilities and type definitions
- `contentful/` - Contentful content type definitions
- `public/` - Static assets

## Features

### Chess Clubs Map

- Interactive Google Maps integration
- Pin drops for all chess clubs
- Popup information with club details
- Address, phone, email, and schedule information
- Links to individual club pages

### Committee Members

- Member listing with filtering
- Individual member detail pages
- Rich text content support
- Contact information integration

### Events

- Event management and display
- Event details and scheduling
- Integration with chess clubs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
