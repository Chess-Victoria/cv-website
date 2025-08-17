import { getEntries, getEntryBySlug } from '@/lib/contentful';
import { ChessClub, ChessClubData } from '@/lib/types/chess-club';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getContactImage, getClubImage, getEventImage } from '@/lib/constants';
import { unstable_cache } from 'next/cache';

/**
 * Fetch all chess clubs from Contentful with caching
 */
export const getAllChessClubs = unstable_cache(
  async () => {
    const response = await getEntries('clubDetail', 2);
    return response as unknown as ChessClub[];
  },
  ['all-chess-clubs'],
  {
    tags: ['chess-club', 'clubDetail'],
    revalidate: 3600 // 1 hour fallback
  }
);

/**
 * Fetch chess club by slug with caching
 */
export const getChessClubData = unstable_cache(
  async (slug: string) => {
    const response = await getEntryBySlug('clubDetail', slug, 4);
    
    if (!response) {
      return null;
    }

    return mapChessClubToData(response as unknown as ChessClub);
  },
  ['chess-club-data'],
  {
    tags: ['chess-club', 'clubDetail'],
    revalidate: 3600 // 1 hour fallback
  }
);

/**
 * Map Contentful chess club entry to component data
 */
function mapChessClubToData(club: ChessClub): ChessClubData {
  const clubData: ChessClubData = {
    id: club.sys.id,
    slug: club.fields.slug,
    name: club.fields.name,
    website: club.fields.website,
    quickIntro: club.fields.quickIntro,
    content: club.fields.content ? documentToReactComponents(club.fields.content) : null,
    location: club.fields.location ? {
      lat: club.fields.location.lat,
      lon: club.fields.location.lon
    } : undefined,
    contact: null,
    currentEvents: null,
    images: []
  };

  // Map contact information
  if (club.fields.contact && typeof club.fields.contact === 'object' && 'fields' in club.fields.contact) {
    const contact = club.fields.contact as any;
    clubData.contact = {
      name: contact.fields.name || '',
      phone: contact.fields.phone || '',
      email: contact.fields.email || '',
      image: contact.fields.image ? {
        url: contact.fields.image.fields.file?.url || getContactImage(),
        alt: contact.fields.image.fields.description || contact.fields.name || 'Contact'
      } : {
        url: getContactImage(),
        alt: contact.fields.name || 'Contact'
      }
    };
  }

  // Map current events
  if (club.fields.currentEvents && Array.isArray(club.fields.currentEvents)) {
    clubData.currentEvents = {
      events: club.fields.currentEvents.map((eventRef: any) => {
        if (eventRef && typeof eventRef === 'object' && 'fields' in eventRef) {
          const event = eventRef as any;
          return {
            id: event.sys.id,
            name: event.fields.name,
            datetime: event.fields.datetime,
            location: event.fields.location,
            url: event.fields.url,
            contacts: event.fields.contact ? event.fields.contact.map((contactRef: any) => {
              if (contactRef && typeof contactRef === 'object' && 'fields' in contactRef) {
                const contact = contactRef as any;
                return {
                  name: contact.fields.name || '',
                  phone: contact.fields.phone || '',
                  email: contact.fields.email || '',
                  image: contact.fields.image ? {
                    url: contact.fields.image.fields.file?.url || getContactImage(),
                    alt: contact.fields.image.fields.description || contact.fields.name || 'Contact'
                  } : {
                    url: getContactImage(),
                    alt: contact.fields.name || 'Contact'
                  }
                };
              }
              return null;
            }).filter(Boolean) : []
          };
        }
        return null;
      }).filter(Boolean)
    };
  }

  // Map images
  if (club.fields.images && Array.isArray(club.fields.images)) {
    clubData.images = club.fields.images.map((imageRef: any) => {
      if (imageRef && typeof imageRef === 'object' && 'fields' in imageRef) {
        const image = imageRef as any;
        return {
          url: image.fields.file?.url || getClubImage(),
          alt: image.fields.description || club.fields.name || 'Club Image'
        };
      }
      return null;
    }).filter(Boolean);
  }

  return clubData;
}
