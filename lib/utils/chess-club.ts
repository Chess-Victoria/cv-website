import { getEntries, getEntryBySlug } from '@/lib/contentful';
import { ChessClub, ChessClubData } from '@/lib/types/chess-club';
import { getContactImage, getClubImage, getEventImage } from '@/lib/constants';
import { unstable_cache } from 'next/cache';
import { Document } from '@contentful/rich-text-types';
import { getRevalidationTime } from '@/lib/config';

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
    revalidate: getRevalidationTime('CHESS_CLUB')
  }
);

/**
 * Fetch chess club by slug with caching
 */
export const getChessClubData = unstable_cache(
  async (slug: string) => {
    const response = await getEntryBySlug('clubDetail', slug);
    if (!response) {
      return null;
    }

    const mappedData = mapChessClubToData(response as unknown as ChessClub);
    return mappedData;
  },
  ['chess-club-data'],
  {
    tags: ['chess-club', 'clubDetail'],
    revalidate: getRevalidationTime('CHESS_CLUB')
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
    quickIntro: club.fields.quickIntro as any, // Keep raw Contentful response
    content: club.fields.content as any, // Keep raw Contentful response
    location: club.fields.location ? {
      lat: club.fields.location.lat,
      lon: club.fields.location.lon
    } : undefined,
    contact: undefined,
    currentEvents: undefined,
    images: []
  };

  // Map contact information
  if (club.fields.contact && typeof club.fields.contact === 'object' && 'fields' in club.fields.contact) {
    const contact = club.fields.contact as any;
    clubData.contact = {
      name: contact.fields.name || '',
      title: contact.fields.title || contact.fields.jobTitle || '',
      email: contact.fields.email || '',
      image: contact.fields.image ? {
        url: contact.fields.image.fields.file?.url || getContactImage(),
        alt: contact.fields.image.fields.description || contact.fields.name || 'Contact'
      } : undefined
    };
  }

  // Map current events
  if (club.fields.currentEvents && typeof club.fields.currentEvents === 'object' && 'fields' in club.fields.currentEvents) {
    const eventsList = club.fields.currentEvents as any;
    const events = eventsList.fields.events || [];
    
    clubData.currentEvents = {
      title: eventsList.fields.name || '',
      subtitle: eventsList.fields.slug || '',
      events: events.map((eventRef: any) => {
        if (eventRef && typeof eventRef === 'object' && 'fields' in eventRef) {
          const event = eventRef as any;
          return {
            id: event.sys.id,
            name: event.fields.name || '',
            datetime: event.fields.datetime || new Date().toISOString(),
            location: event.fields.location || '',
            url: event.fields.url,
            summary: event.fields.summary,
            description: event.fields.description as any, // Keep raw Contentful response
            contact: event.fields.contact ? event.fields.contact.map((contactRef: any) => {
              if (contactRef && typeof contactRef === 'object' && 'fields' in contactRef) {
                const contact = contactRef as any;
                return {
                  name: contact.fields.name || '',
                  title: contact.fields.title || contact.fields.jobTitle || '',
                  email: contact.fields.email || '',
                  image: contact.fields.image ? {
                    url: contact.fields.image.fields.file?.url || getContactImage(),
                    alt: contact.fields.image.fields.description || contact.fields.name || 'Contact'
                  } : undefined
                };
              }
              return null;
            }).filter(Boolean) : undefined
          };
        }
        return null;
      }).filter(Boolean) as Array<{
        id: string;
        name: string;
        datetime: string;
        location: string;
        url?: string;
        summary?: string;
        description?: any; // Keep raw Contentful response
        contact?: Array<{
          name: string;
          title?: string;
          email?: string;
          image?: {
            url: string;
            alt?: string;
          };
        }>;
      }>
    };
  }

  // Map images
  if (club.fields.images && Array.isArray(club.fields.images)) {
    clubData.images = club.fields.images.map((imageRef: any) => {
      if (imageRef && typeof imageRef === 'object' && 'fields' in imageRef) {
        const image = imageRef as any;
        return {
          id: image.sys.id,
          url: image.fields.file?.url || getClubImage(),
          alt: image.fields.description || club.fields.name || 'Club Image',
          width: image.fields.file?.details?.image?.width,
          height: image.fields.file?.details?.image?.height
        };
      }
      return null;
    }).filter(Boolean) as Array<{
      id: string;
      url: string;
      alt?: string;
      width?: number;
      height?: number;
    }>;
  }

  return clubData;
}
