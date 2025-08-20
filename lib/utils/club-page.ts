import { getEntryBySlug, getSingleEntry } from '@/lib/contentful';
import { ClubPage, ClubPageData, ClubListItem } from '@/lib/types/club-page';

/**
 * Extract address from quickIntro rich text content
 */
function extractAddressFromQuickIntro(quickIntro: any): string | undefined {
  if (!quickIntro || !quickIntro.content) return undefined;
  
  try {
    // Flatten the content structure to extract all text
    const extractText = (content: any[]): string => {
      return content.map(item => {
        if (item.content) {
          return extractText(item.content);
        }
        return item.value || '';
      }).join(' ');
    };
    
    const fullText = extractText(quickIntro.content);
    
    // Look for common address patterns - more specific to avoid schedule info
    const addressPatterns = [
      // Full address with postcode: "123 Street Name, Suburb VIC 3000"
      /(\d+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd|Terrace|Tce|Way|Close|Crescent|Cres|Parade|Pde)[,\s]+[A-Za-z\s]+(?:VIC|NSW|QLD|WA|SA|TAS|NT|ACT)[\s]*\d{4})/i,
      
      // Address with suburb: "123 Street Name, Suburb"
      /(\d+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd|Terrace|Tce|Way|Close|Crescent|Cres|Parade|Pde)[,\s]+[A-Za-z\s]+(?:VIC|NSW|QLD|WA|SA|TAS|NT|ACT)?)/i,
      
      // Address mentioned with context: "located at 123 Street Name" or "address: 123 Street Name"
      /(?:located\s+at|address:?|at)\s+(\d+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd|Terrace|Tce|Way|Close|Crescent|Cres|Parade|Pde)[^.,]*(?:,\s*[A-Za-z\s]+)?)/i,
      
      // Simple street address: "123 Street Name"
      /(\d+[A-Za-z\s]+(?:Street|St|Road|Rd|Avenue|Ave|Drive|Dr|Lane|Ln|Place|Pl|Court|Ct|Boulevard|Blvd|Terrace|Tce|Way|Close|Crescent|Cres|Parade|Pde))/i
    ];
    
    for (const pattern of addressPatterns) {
      const match = fullText.match(pattern);
      if (match) {
        const address = match[1] || match[2];
        // Filter out addresses that contain schedule-related words
        if (address && !/(?:pm|am|night|morning|afternoon|evening|week|day|time|schedule|meet)/i.test(address)) {
          return address.trim();
        }
      }
    }
    
    return undefined;
  } catch (error) {
    console.error('Error extracting address from quickIntro:', error);
    return undefined;
  }
}

/**
 * Fetch club page data from Contentful
 */
export async function getClubPageData(slug: string): Promise<ClubPageData | null> {
  try {
    const clubPage = await getEntryBySlug('clubPage', slug, 4);
    
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
      // Try to get address from location field first
      let address = club.fields.location.address;
      
      // If no address in location field, try to extract from quickIntro
      if (!address && club.fields.quickIntro) {
        address = extractAddressFromQuickIntro(club.fields.quickIntro);
      }
      
      clubItem.location = {
        lat: club.fields.location.lat,
        lon: club.fields.location.lon,
        address: address
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
