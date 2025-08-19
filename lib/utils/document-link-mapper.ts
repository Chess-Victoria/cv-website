import { DocumentLink, DocumentLinkData, GroupedDocumentLinks } from '@/lib/types/document-link';

export function mapDocumentLink(entry: DocumentLink): DocumentLinkData {
  return {
    id: entry.sys.id,
    name: entry.fields.name || 'Untitled Document',
    url: entry.fields.url || '#',
    type: entry.fields.type || 'Other'
  };
}

export function groupDocumentLinksByType(documentLinks: DocumentLinkData[]): GroupedDocumentLinks {
  const grouped: GroupedDocumentLinks = {};
  
  documentLinks.forEach(link => {
    const type = link.type || 'Other';
    if (!grouped[type]) {
      grouped[type] = [];
    }
    grouped[type].push(link);
  });
  
  return grouped;
}
