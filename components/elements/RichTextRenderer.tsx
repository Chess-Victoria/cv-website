'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface RichTextRendererProps {
  content: any; // Raw Contentful response
  className?: string;
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  // Debug logging removed for production

  // Handle string content (fallback)
  if (typeof content === 'string') {
    return (
      <div className={`rich-text-content ${className || ''}`} style={{
        lineHeight: '1.6',
        fontSize: '16px',
        color: '#333'
      }}>
        <p>{content}</p>
      </div>
    );
  }

  // Check if content exists and has the required structure for rich text
  if (!content || typeof content !== 'object' || !content.content || !Array.isArray(content.content)) {
    return null;
  }

  try {
    return (
      <div className={`rich-text-content ${className || ''}`} style={{
        lineHeight: '1.6',
        fontSize: '16px',
        color: '#333'
      }}>
        {documentToReactComponents(content)}
      </div>
    );
  } catch (error) {
    console.error('❌ Error rendering rich text content:', error);
    return null;
  }
}
