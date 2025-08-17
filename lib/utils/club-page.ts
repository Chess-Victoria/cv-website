import { getSingleEntry } from '@/lib/contentful';
import { ClubPage, ClubPageData, ClubListItem } from '@/lib/types/club-page';

/**
 * Fetch club page data from Contentful
 */
export async function getClubPageData(): Promise<ClubPageData | null> {
  try {
    const clubPage = await getSingleEntry('clubPage', 4);
    
    if (!clubPage) {
      return null;
    }

    const mappedData = mapClubPageToData(clubPage as unknown as ClubPage);
    return mappedData;
  } catch (error) {
    console.error('Error fetching club page data:', error);
    return null;
  }
}

/**
 * Map Contentful club page entry to component data
 */
function mapClubPageToData(clubPage: ClubPage): ClubPageData {
  const promotedClubs: ClubListItem[] = [];
  const allClubs: ClubListItem[] = [];

  // Map promoted clubs
  if (clubPage.fields.promotedClub) {
    clubPage.fields.promotedClub.forEach((promotedClubRef: any) => {
      if (promotedClubRef && typeof promotedClubRef === 'object' && 'fields' in promotedClubRef) {
        const club = promotedClubRef as any;
        const clubItem = mapClubToListItem(club);
        if (clubItem) {
          promotedClubs.push(clubItem);
        }
      }
    });
  }

  // Map all clubs
  if (clubPage.fields.clubs) {
    clubPage.fields.clubs.forEach((clubRef: any) => {
      if (clubRef && typeof clubRef === 'object' && 'fields' in clubRef) {
        const club = clubRef as any;
        const clubItem = mapClubToListItem(club);
        if (clubItem) {
          allClubs.push(clubItem);
        }
      }
    });
  }

  return {
    title: clubPage.fields.title,
    promotedClubs,
    allClubs
  };
}

/**
 * Map individual club entry to list item
 */
function mapClubToListItem(club: any): ClubListItem | null {
  try {
    const clubItem: ClubListItem = {
      id: club.sys.id,
      slug: club.fields.slug,
      name: club.fields.name,
      website: club.fields.website,
      schedules: club.fields.schedules || []
    };

    // Map location
    if (club.fields.location) {
      clubItem.location = {
        lat: club.fields.location.lat,
        lon: club.fields.location.lon
      };
    }

    // Map contact (person type)
    if (club.fields.contact && typeof club.fields.contact === 'object' && 'fields' in club.fields.contact) {
      const contact = club.fields.contact as any;
      clubItem.contact = {
        name: contact.fields.name,
        phone: contact.fields.phone,
        email: contact.fields.email
      };
    }

    return clubItem;
  } catch (error) {
    console.error('Error mapping club to list item:', error);
    return null;
  }
}
