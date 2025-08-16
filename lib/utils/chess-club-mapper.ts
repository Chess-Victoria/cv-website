import { ReferenceListData } from '@/lib/types/reference-list';
import { ReferenceList, ChessClub, ContactFields } from '@/lib/types/chess-club';
import { renderRichText } from '@/lib/utils/rich-text';
import { generateShortName } from '@/lib/utils/name-utils';

// Fallback chess club list data
export const fallbackChessClubListData: ReferenceListData = {
  title: "Featured Chess Clubs",
  subtitle: "The most popular chess clubs in Victoria",
  items: [
    {
      id: "club-1",
      name: "Melbourne Chess Club",
      shortName: "MCC",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Melbourne Chess Club"
      },
      title: "Historic Club",
      description: "Established 1866",
      url: "/clubs/melbourne"
    }
  ]
};

/**
 * Map Contentful ReferenceList with ChessClub items to ReferenceListData
 */
export function mapChessClubListToReferenceListData(referenceList: ReferenceList): ReferenceListData {
  if (!referenceList.items || referenceList.items.length === 0) {
    console.warn('No chess clubs found in ReferenceList');
    return fallbackChessClubListData;
  }

  const items = referenceList.items
    .map((itemRef, index) => {
      if (!itemRef.fields) {
        console.warn(`Chess club ${index} has no fields`);
        return null;
      }

      // Check if this is a chess club (clubDetail content type)
      const clubFields = itemRef.fields as ChessClub;
      
      // Get contact data if available
      let contactData: ContactFields | null = null;
      if (clubFields.contact?.fields) {
        contactData = clubFields.contact.fields as ContactFields;
      }

      // Get image URL from first image in the array
      let imageUrl = "/assets/img/logo/cvlogo-notext.png"; // Default fallback
      let imageAlt = clubFields.name || "Chess Club";
      
      if (clubFields.images && clubFields.images.length > 0 && clubFields.images[0].fields?.file?.url) {
        imageUrl = clubFields.images[0].fields.file.url;
      }

      // Build social links from contact information
      const socialLinks: any = {};
      if (contactData?.email) socialLinks.email = contactData.email;

      // Create description from quickIntro or contact info
      let description = "";
      if (clubFields.quickIntro) {
        // For now, just use a simple text extraction
        // In a full implementation, you'd want to render the RichText properly
        description = "Chess club with activities and events";
      } else if (contactData?.name) {
        description = `Contact: ${contactData.name}`;
        if (contactData.title) {
          description += ` (${contactData.title})`;
        }
      }

                 return {
             id: `club-${index + 1}`,
             name: clubFields.name || "Unknown Club",
             shortName: generateShortName(clubFields.name || "Unknown Club"),
             image: {
               src: imageUrl,
               alt: imageAlt
             },
             title: contactData?.title || "Chess Club",
             description: description,
             url: clubFields.website || `/clubs/${clubFields.name?.toLowerCase().replace(/\s+/g, '-') || `club-${index + 1}`}`,
             socialLinks
           };
    })
    .filter(item => item !== null) as any[];

  return {
    title: referenceList.title || "Featured Chess Clubs",
    subtitle: referenceList.subTitle || "The most popular chess clubs in Victoria",
    items: items.length > 0 ? items : fallbackChessClubListData.items
  };
}
