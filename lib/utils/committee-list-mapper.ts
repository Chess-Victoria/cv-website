import { CommitteeListData, CommitteeList, CommitteeMemberFields, PersonFields } from '@/lib/types/committee-list';

/**
 * Map Contentful CommitteeList to CommitteeListData
 */
export function mapCommitteeListToCommitteeListData(committeeList: CommitteeList): CommitteeListData {
  if (!committeeList.members || committeeList.members.length === 0) {
    console.warn('No committee members found in CommitteeList');
    return {
      title: committeeList.name || '',
      subtitle: 'Our Leadership Team',
      members: []
    };
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
      let imageUrl = "/assets/img/default/committee-no-image.png"; // Prefer content-provided image only
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

      const memberSlug = (memberRef as any)?.fields?.slug || personData?.name?.toLowerCase().replace(/\s+/g, '-') || `member-${index + 1}`;

      return {
        id: `member-${index + 1}`,
        name: personData?.name || memberFields.role || "Unknown Member",
        title: memberFields.role || personData?.jobTitle || "Committee Member",
        image: {
          src: imageUrl || '/assets/img/default/no-photo.png',
          alt: imageAlt || '/assets/img/default/committee-no-image.png'
        },
        socialLinks,
        profileUrl: `/committees/${memberSlug}`
      };
    })
    .filter(member => member !== null) as any[];

  return {
    title: committeeList.name || '',
    subtitle: 'Our Leadership Team',
    members
  };
}
