import client from '@/lib/contentful';
import { CommitteeList, CommitteeMember, Person, CommitteeMemberData, CommitteeListData, CommitteePageData } from '@/lib/types/committee';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { getContactImage } from '@/lib/constants';

/**
 * Fetch all current committee lists from Contentful
 */
export async function getCurrentCommitteeLists(): Promise<CommitteeListData[]> {
  try {
    const response = await client.getEntries({
      content_type: 'committeeList',
      'fields.isCurrent': true,
      include: 4
    });

    if (!response.items || response.items.length === 0) {
      return [];
    }

    return response.items.map((item: any) => mapCommitteeListToData(item as unknown as CommitteeList));
  } catch (error) {
    console.error('Error fetching committee lists:', error);
    return [];
  }
}

/**
 * Map Contentful committee list entry to component data
 */
function mapCommitteeListToData(committeeList: CommitteeList): CommitteeListData {
  const members: CommitteeMemberData[] = [];

  if (committeeList.fields.members) {
    committeeList.fields.members.forEach((memberRef: any) => {
      if (memberRef && typeof memberRef === 'object' && 'fields' in memberRef) {
        const member = memberRef as any;
        const memberData = mapCommitteeMemberToData(member);
        if (memberData) {
          members.push(memberData);
        }
      }
    });
  }

  // Extract tags from metadata
  const tags: string[] = [];
  if (committeeList.metadata && committeeList.metadata.tags) {
    committeeList.metadata.tags.forEach((tag: any) => {
      if (tag.sys && tag.sys.id) {
        tags.push(tag.sys.id);
      }
    });
  }

  return {
    id: committeeList.sys.id,
    name: committeeList.fields.name,
    year: committeeList.fields.year,
    isCurrent: committeeList.fields.isCurrent || false,
    members,
    tags
  };
}

/**
 * Map Contentful committee member entry to component data
 */
function mapCommitteeMemberToData(member: any): CommitteeMemberData | null {
  try {
    const person = member.fields.personal;
    if (!person || typeof person !== 'object' || !('fields' in person)) {
      return null;
    }

    const personData = person as any;
    
    const memberData: CommitteeMemberData = {
      id: member.sys.id,
      role: member.fields.role,
      person: {
        id: person.sys.id,
        name: personData.fields.name,
        email: personData.fields.email,
        phone: personData.fields.phone,
        jobTitle: personData.fields.jobTitle,
        image: personData.fields.image ? {
          url: getContactImage(personData.fields.image.fields.file.url),
          alt: personData.fields.image.fields.title || personData.fields.name
        } : undefined
      }
    };

    // Map about field (rich text)
    if (member.fields.about) {
      memberData.about = member.fields.about;
    }

    // Map member image
    if (member.fields.image) {
      memberData.image = {
        url: getContactImage(member.fields.image.fields.file.url),
        alt: member.fields.image.fields.title || member.fields.role
      };
    }

    return memberData;
  } catch (error) {
    console.error('Error mapping committee member:', error);
    return null;
  }
}

/**
 * Fetch committee page data with all current committee lists
 */
export async function getCommitteePageData(): Promise<CommitteeListData[]> {
  const committeeLists = await getCurrentCommitteeLists();
  
  // Sort committees: Executive first, then Non-Executive
  return committeeLists.sort((a, b) => {
    const aTags = a.tags || [];
    const bTags = b.tags || [];
    
    const aIsExecutive = aTags.some(tag => tag.toLowerCase().includes('executive'));
    const bIsExecutive = bTags.some(tag => tag.toLowerCase().includes('executive'));
    
    // Executive committees come first
    if (aIsExecutive && !bIsExecutive) return -1;
    if (!aIsExecutive && bIsExecutive) return 1;
    
    // If both are same type, maintain original order
    return 0;
  });
}
