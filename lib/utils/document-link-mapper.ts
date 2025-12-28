import { DocumentLink, DocumentLinkData, GroupedDocumentLinks } from '@/lib/types/document-link';

export function mapDocumentLink(entry: DocumentLink): DocumentLinkData {
  // Check if document (Contentful media) exists, use its URL if available
  // Otherwise fall back to the url field
  let url = '#';
  
  if (entry.fields.document?.fields?.file?.url) {
    // Contentful asset URL - prepend https: if it's a protocol-relative URL
    const assetUrl = entry.fields.document.fields.file.url;
    url = assetUrl.startsWith('//') ? `https:${assetUrl}` : assetUrl;
  } else if (entry.fields.url) {
    // Fall back to external URL field
    url = entry.fields.url;
  }

  return {
    id: entry.sys.id,
    name: entry.fields.name || 'Untitled Document',
    url: url,
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
