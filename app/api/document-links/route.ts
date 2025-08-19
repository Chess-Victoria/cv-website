import { NextResponse } from 'next/server';
import { getEntries } from '@/lib/contentful';
import { DocumentLink } from '@/lib/types/document-link';
import { mapDocumentLink, groupDocumentLinksByType } from '@/lib/utils/document-link-mapper';

export async function GET() {
  try {
    // Fetch all document links from Contentful
    const entries = await getEntries('documentLink');
    
    // Map the entries to our data structure
    const documentLinks = entries.map((entry: any) => mapDocumentLink(entry as DocumentLink));
    
    // Group by type
    const groupedLinks = groupDocumentLinksByType(documentLinks);
    
    return NextResponse.json({
      documentLinks,
      groupedLinks,
      totalCount: documentLinks.length
    });
  } catch (error) {
    console.error('Error fetching document links:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load document links' }, 
      { status: 500 }
    );
  }
}
