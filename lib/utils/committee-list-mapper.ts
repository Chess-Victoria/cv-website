import { CommitteeListData, CommitteeList, CommitteeMemberFields, PersonFields } from '@/lib/types/committee-list';
import { renderRichText } from '@/lib/utils/rich-text';

// Fallback committee list data
export const fallbackCommitteeListData: CommitteeListData = {
  title: "Chess Victoria Committee",
  subtitle: "Our Leadership Team",
  members: [
    {
      id: "member-1",
      name: "Dr. Peter Tsai",
      title: "President",
      image: {
        src: "/assets/img/all-images/team/team-img1.png",
        alt: "Dr. Peter Tsai"
      },
      socialLinks: {
        linkedin: "https://linkedin.com/in/peter-tsai",
        email: "chess@t-s-a-i.com"
      },
      profileUrl: "/committee/peter-tsai"
    }
  ]
};

/**
 * Map Contentful CommitteeList to CommitteeListData
 */
export function mapCommitteeListToCommitteeListData(committeeList: CommitteeList): CommitteeListData {
  if (!committeeList.members || committeeList.members.length === 0) {
    console.warn('No committee members found in CommitteeList');
    return fallbackCommitteeListData;
  }

  const members = committeeList.members
    .map((memberRef, index) => {
      if (!memberRef.fields) {
        console.warn(`Committee member ${index} has no fields`);
        return null;
      }

      const memberFields = memberRef.fields as CommitteeMemberFields;
      
      // Get person data if available
      let personData: PersonFields | null = null;
      if (memberFields.personal?.fields) {
        personData = memberFields.personal.fields as PersonFields;
      }

      // Get image URL
      let imageUrl = "/assets/img/all-images/team/team-img1.png"; // Default fallback
      let imageAlt = personData?.name || memberFields.role || "Committee Member";
      
      if (memberFields.image?.fields?.file?.url) {
        imageUrl = memberFields.image.fields.file.url;
      } else if (personData?.image?.fields?.file?.url) {
        imageUrl = personData.image.fields.file.url;
      }

      // Build social links
      const socialLinks: any = {};
      if (personData?.linkedin) socialLinks.linkedin = personData.linkedin;
      if (personData?.facebook) socialLinks.facebook = personData.facebook;
      if (personData?.email) socialLinks.email = personData.email;

      return {
        id: `member-${index + 1}`,
        name: personData?.name || memberFields.role || "Unknown Member",
        title: memberFields.role || personData?.jobTitle || "Committee Member",
        image: {
          src: imageUrl,
          alt: imageAlt
        },
        socialLinks,
        profileUrl: `/committee/${personData?.name?.toLowerCase().replace(/\s+/g, '-') || `member-${index + 1}`}`
      };
    })
    .filter(member => member !== null) as any[];

  return {
    title: committeeList.name || "Chess Victoria Committee",
    subtitle: "Our Leadership Team",
    members: members.length > 0 ? members : fallbackCommitteeListData.members
  };
}
