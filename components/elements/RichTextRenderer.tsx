'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface RichTextRendererProps {
  content: any; // Raw Contentful response
  className?: string;
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  // Debug logging
  console.log(`🎨 RichTextRenderer received:`, content);
  console.log(`🎨 Content type:`, typeof content);
  console.log(`🎨 Content.content:`, content?.content);
  console.log(`🎨 Content.content type:`, typeof content?.content);
  console.log(`🎨 Content.content is array:`, Array.isArray(content?.content));

  // Handle string content (fallback)
  if (typeof content === 'string') {
    console.log(`✅ RichTextRenderer: Rendering string content`);
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
    console.log(`❌ RichTextRenderer: Invalid content structure, returning null`);
    console.log(`❌ Content exists:`, !!content);
    console.log(`❌ Content is object:`, typeof content === 'object');
    console.log(`❌ Content has content property:`, content && 'content' in content);
    console.log(`❌ Content.content exists:`, !!content?.content);
    console.log(`❌ Content.content is array:`, Array.isArray(content?.content));
    return null;
  }

  try {
    console.log(`✅ RichTextRenderer: Rendering rich text content successfully`);
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
