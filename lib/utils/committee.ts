import client from '@/lib/contentful';
import { CommitteeList, CommitteeMember, CommitteeListData, CommitteeMemberData, PersonData } from '@/lib/types/committee';
import { getContactImage } from '@/lib/constants';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

/**
 * Fetch current committee lists from Contentful with caching
 */
export const getCurrentCommitteeLists = unstable_cache(
  async () => {
    const response = await client.getEntries({
      content_type: 'committeeList',
      'fields.isCurrent': true,
      include: 5
    });
    return response.items;
  },
  ['committee-lists'],
  {
    tags: ['committees'],
    revalidate: getRevalidationTime('COMMITTEE')
  }
);

/**
 * Map committee list entry to data structure
 */
function mapCommitteeListToData(committeeList: any): CommitteeListData {
  const members: CommitteeMemberData[] = [];
  
  if (committeeList.fields.members) {
    committeeList.fields.members.forEach((memberRef: any) => {
      if (memberRef && typeof memberRef === 'object' && 'fields' in memberRef) {
        const member = mapCommitteeMemberToData(memberRef);
        if (member) {
          members.push(member);
        }
      }
    });
  }

  // Extract tags from metadata
  const tags = committeeList.metadata?.tags?.map((tag: any) => tag.sys.id) || [];

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
 * Map committee member entry to data structure
 */
function mapCommitteeMemberToData(committeeMember: any): CommitteeMemberData | null {
  try {
    const member: CommitteeMemberData = {
      id: committeeMember.sys.id,
      slug: committeeMember.fields.slug,
      role: committeeMember.fields.role,
      about: committeeMember.fields.about,
      person: {
        id: '',
        name: '',
        phone: '',
        email: ''
      }
    };

    // Map person data if available
    if (committeeMember.fields.personal && typeof committeeMember.fields.personal === 'object' && 'fields' in committeeMember.fields.personal) {
      const person = committeeMember.fields.personal as any;
      
      member.person = {
        id: person.sys?.id || '',
        name: person.fields.name || '',
        phone: person.fields.phone || '',
        email: person.fields.email || '',
        jobTitle: person.fields.jobTitle || '',
        about: person.fields.about || ''
      };
      
    }
    return member;
  } catch (error) {
    console.error('Error mapping committee member to data:', error);
    return null;
  }
}

/**
 * Get committee page data with caching
 */
export const getCommitteePageData = unstable_cache(
  async () => {
    try {
      const committeeLists = await getCurrentCommitteeLists();
      
      if (!committeeLists || committeeLists.length === 0) {
        return [];
      }

      const mappedLists: CommitteeListData[] = committeeLists.map((committeeList: any) => {
        const mapped = mapCommitteeListToData(committeeList);
        return mapped;
      });

      // Sort by tags (Executive first, then Non-Executive, Honorary life members last)
      return mappedLists.sort((a, b) => {
        const aIsExecutive = a.tags?.some(tag => tag.toLowerCase().includes('executive'));
        const bIsExecutive = b.tags?.some(tag => tag.toLowerCase().includes('executive'));
        const aIsHonorary = a.name?.toLowerCase().includes('honorary') || a.tags?.some(tag => tag.toLowerCase().includes('honorary'));
        const bIsHonorary = b.name?.toLowerCase().includes('honorary') || b.tags?.some(tag => tag.toLowerCase().includes('honorary'));
        
        // Honorary life members go to the bottom
        if (aIsHonorary && !bIsHonorary) return 1;
        if (!aIsHonorary && bIsHonorary) return -1;
        
        // Among non-honorary, Executive first
        if (aIsExecutive && !bIsExecutive && !aIsHonorary && !bIsHonorary) return -1;
        if (!aIsExecutive && bIsExecutive && !aIsHonorary && !bIsHonorary) return 1;
        
        return 0;
      });
    } catch (error) {
      console.error('Error getting committee page data:', error);
      return [];
    }
  },
  ['committee-page-data'],
  {
    tags: ['committees'],
    revalidate: getRevalidationTime('COMMITTEE')
  }
);

/**
 * Get committee member by slug with caching
 */
export const getCommitteeMemberBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const response = await client.getEntries({
        content_type: 'comitteeMember',
        'fields.slug': slug,
        include: 4,
        limit: 1
      });

      if (!response.items || response.items.length === 0) {
        return null;
      }

      const committeeMember = response.items[0];
      return mapCommitteeMemberToData(committeeMember);
    } catch (error) {
      console.error('Error getting committee member by slug:', error);
      return null;
    }
  },
  ['committee-member-data'],
  {
    tags: ['committees'],
    revalidate: getRevalidationTime('COMMITTEE')
  }
);
