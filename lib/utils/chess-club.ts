import { getEntries, getEntryBySlug } from '@/lib/contentful';
import { ChessClub, ChessClubData } from '@/lib/types/chess-club';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getContactImage } from '@/lib/constants';

/**
 * Fetch all chess club entries from Contentful
 */
export async function getChessClubs(): Promise<ChessClub[]> {
  try {
    const response = await getEntries('clubDetail', 2);
    return response as unknown as ChessClub[];
  } catch (error) {
    console.error('Error fetching chess clubs:', error);
    return [];
  }
}

/**
 * Fetch a single chess club by slug with all references resolved
 */
export async function getChessClubBySlug(slug: string): Promise<ChessClub | null> {
  try {
    const response = await getEntryBySlug('clubDetail', slug, 4);
    return response ? (response as unknown as ChessClub) : null;
  } catch (error) {
    console.error('Error fetching chess club by slug:', error);
    return null;
  }
}



/**
 * Map chess club entries to ChessClubData with resolved references
 */
export async function mapChessClubsToData(clubs: ChessClub[]): Promise<ChessClubData[]> {
  const mappedClubs = clubs.map((club) => {
    // Read contact information directly from resolved fields
    let contactData = undefined;
    if (club.fields.contact && typeof club.fields.contact === 'object' && 'fields' in club.fields.contact) {
      const contact = club.fields.contact as any;
      contactData = {
        name: contact.fields.name,
        title: contact.fields.title,
        email: contact.fields.email,
        image: {
          url: getContactImage(contact.fields.image?.fields?.file?.url),
          alt: contact.fields.image?.fields?.title || contact.fields.name
        }
      };
    }

    // Read current events directly from resolved fields
    let currentEventsData = undefined;
    if (club.fields.currentEvents && typeof club.fields.currentEvents === 'object' && 'fields' in club.fields.currentEvents) {
      const eventsList = club.fields.currentEvents as any;
      currentEventsData = {
        title: eventsList.fields.name,
        subtitle: eventsList.fields.slug,
        events: eventsList.fields.events?.map((event: any) => ({
          id: event.sys.id,
          name: event.fields?.name || 'Event',
          datetime: event.fields?.datetime || new Date().toISOString(),
          location: event.fields?.location || 'TBD',
          url: event.fields?.url,
          summary: event.fields?.summary,
          description: event.fields?.description ? documentToReactComponents(event.fields.description) : undefined,
          contact: event.fields?.contact?.map((contact: any) => {
            // Handle both contact and person types
            const contactData = {
              name: contact.fields?.name || 'Contact',
              title: contact.fields?.title || contact.fields?.jobTitle,
              email: contact.fields?.email,
              image: {
                url: getContactImage(contact.fields?.image?.fields?.file?.url),
                alt: contact.fields?.image?.fields?.title || contact.fields?.name || 'Contact'
              }
            };
            return contactData;
          }) || []
        })) || []
      };
    }

    // Map images if available
    const images = club.fields.images?.map((image) => ({
      id: image.sys.id,
      url: `/assets/img/all-images/team/team-img1.png`, // Placeholder - would need asset resolution
      alt: `${club.fields.name} image`,
      width: 400,
      height: 300
    })) || [];

    return {
      id: club.sys.id,
      slug: club.fields.slug,
      name: club.fields.name,
      contact: contactData,
      location: club.fields.location,
      website: club.fields.website,
      quickIntro: club.fields.quickIntro ? documentToReactComponents(club.fields.quickIntro) : undefined,
      content: club.fields.content ? documentToReactComponents(club.fields.content) : undefined,
      images,
      currentEvents: currentEventsData
    };
  });

  return mappedClubs;
}

/**
 * Get complete chess club data for listing
 */
export async function getChessClubListData(): Promise<{
  title: string;
  subtitle: string;
  clubs: ChessClubData[];
}> {
  try {
    const clubs = await getChessClubs();
    const clubData = await mapChessClubsToData(clubs);

    return {
      title: "Chess Clubs in Victoria",
      subtitle: "Find a chess club near you",
      clubs: clubData
    };
  } catch (error) {
    console.error('Error getting chess club list data:', error);
    return {
      title: "Chess Clubs in Victoria",
      subtitle: "Find a chess club near you",
      clubs: []
    };
  }
}

/**
 * Get single chess club data for individual page
 */
export async function getChessClubData(slug: string): Promise<ChessClubData | null> {
  try {
    const club = await getChessClubBySlug(slug);
    if (!club) return null;

    const clubData = await mapChessClubsToData([club]);
    return clubData[0];
  } catch (error) {
    console.error('Error getting chess club data:', error);
    return null;
  }
}
