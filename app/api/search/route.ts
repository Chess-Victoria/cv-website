import { NextRequest, NextResponse } from 'next/server';
import { getEntries } from '@/lib/contentful';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

/**
 * Extract plain text from rich text content
 */
function extractTextFromRichText(content: any): string {
  if (!content || !content.content) return '';
  
  const extractText = (items: any[]): string => {
    return items.map(item => {
      if (item.content) {
        return extractText(item.content);
      }
      return item.value || '';
    }).join(' ');
  };
  
  return extractText(content.content);
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'news' | 'chess-club' | 'committee-member' | 'event' | 'page';
  slug: string;
  url: string;
  date?: string;
}

const searchContentful = unstable_cache(
  async (query: string): Promise<SearchResult[]> => {
    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    // Helper function to safely search content type
    const searchContentType = async (contentType: string, mapper: (entry: any) => SearchResult) => {
      try {
        const entries = await getEntries(contentType, 2);
        const filteredResults = (entries as any[]).filter((entry: any) => {
          const title = String(entry.fields?.title || '').toLowerCase();
          const name = String(entry.fields?.name || '').toLowerCase();
          const description = String(entry.fields?.description || '').toLowerCase();
          const summary = String(entry.fields?.summary || '').toLowerCase();
          const role = String(entry.fields?.role || '').toLowerCase();
          const bio = String(entry.fields?.bio || '').toLowerCase();
          
          // Extract text from rich text fields
          const descriptionText = entry.fields?.description ? extractTextFromRichText(entry.fields.description) : '';
          const summaryText = entry.fields?.summary ? extractTextFromRichText(entry.fields.summary) : '';
          const bioText = entry.fields?.bio ? extractTextFromRichText(entry.fields.bio) : '';
          
          const searchableText = `${title} ${name} ${description} ${summary} ${role} ${bio} ${descriptionText} ${summaryText} ${bioText}`.toLowerCase();
          return searchableText.includes(searchTerm);
        }).map(mapper);
        
        return filteredResults;
      } catch (error) {
        console.warn(`Failed to search content type '${contentType}':`, error);
        return [];
      }
    };

    try {
      // Search in news/posts
      const newsResults = await searchContentType('post', (entry: any) => ({
        id: entry.sys.id,
        title: entry.fields.title || 'Untitled',
        description: entry.fields.summary ? extractTextFromRichText(entry.fields.summary) : '',
        type: 'news' as const,
        slug: entry.fields.slug || '',
        url: `/news/read/${entry.fields.slug}`,
        date: entry.fields.publishedDate || entry.sys.createdAt
      }));

      // Search in chess clubs
      const clubResults = await searchContentType('clubDetail', (entry: any) => {
        // Try different possible title fields
        const title = entry.fields.title || entry.fields.name || entry.fields.clubName || 'Untitled Club';
        return {
          id: entry.sys.id,
          title: title,
          description: entry.fields.description ? extractTextFromRichText(entry.fields.description) : 
                     entry.fields.summary ? extractTextFromRichText(entry.fields.summary) : '',
          type: 'chess-club' as const,
          slug: entry.fields.slug || '',
          url: `/chess-clubs/${entry.fields.slug}`,
          date: entry.sys.createdAt
        };
      });

      // Search in committee members
      const committeeResults = await searchContentType('committeeMember', (entry: any) => {
        // Try different possible name fields
        const name = entry.fields.name || entry.fields.title || entry.fields.memberName || 'Unknown Member';
        return {
          id: entry.sys.id,
          title: name,
          description: entry.fields.role || entry.fields.position || '',
          type: 'committee-member' as const,
          slug: entry.fields.slug || '',
          url: `/committee-member/${entry.fields.slug}`,
          date: entry.sys.createdAt
        };
      });

      // Search in events
      const eventResults = await searchContentType('event', (entry: any) => {
        // Try different possible title fields
        const title = entry.fields.title || entry.fields.name || entry.fields.eventName || 'Untitled Event';
        const slug = entry.fields.slug || entry.fields.id || '';
        return {
          id: entry.sys.id,
          title: title,
          description: entry.fields.description ? extractTextFromRichText(entry.fields.description) : 
                     entry.fields.summary ? extractTextFromRichText(entry.fields.summary) : '',
          type: 'event' as const,
          slug: slug,
          url: slug ? `/event/${slug}` : '#',
          date: entry.fields.datetime || entry.sys.createdAt
        };
      });

      // Search in pages
      const pageResults = await searchContentType('page', (entry: any) => {
        return {
          id: entry.sys.id,
          title: entry.fields.title || 'Untitled Page',
          description: entry.fields.summary ? extractTextFromRichText(entry.fields.summary) : '',
          type: 'page' as const,
          slug: entry.fields.slug || '',
          url: entry.fields.slug ? `/pages/${entry.fields.slug}` : '#',
          date: entry.sys.createdAt
        };
      });

      // Combine all results and sort by date (newest first)
      const allResults = [...newsResults, ...clubResults, ...committeeResults, ...eventResults, ...pageResults].filter(Boolean);
      allResults.sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

      return allResults;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  },
  ['search-results'],
  {
    tags: ['search', 'news', 'clubDetail', 'committeeMember', 'event'],
    revalidate: getRevalidationTime('DEFAULT')
  }
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ results: [], total: 0, query: query || '' });
  }

  try {
    const results = await searchContentful(query.trim());
    
    return NextResponse.json({
      results,
      total: results.length,
      query: query.trim()
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [], total: 0, query: query.trim() },
      { status: 500 }
    );
  }
}
