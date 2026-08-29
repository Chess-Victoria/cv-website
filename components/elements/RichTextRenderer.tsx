'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  content: any; // Raw Contentful response
  className?: string;
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  // Custom rendering options for rich text
  const renderOptions = {
    renderNode: {
      [BLOCKS.TABLE]: (node: any, children: any) => (
        <div className="table-responsive">
          <table>
            <tbody>{children}</tbody>
          </table>
        </div>
      ),
      [BLOCKS.TABLE_ROW]: (node: any, children: any) => <tr>{children}</tr>,
      [BLOCKS.TABLE_CELL]: (node: any, children: any) => <td>{children}</td>,
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => <th>{children}</th>,
      [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
      [BLOCKS.HEADING_4]: (node: any, children: any) => <h4>{children}</h4>,
      [BLOCKS.HEADING_5]: (node: any, children: any) => <h5>{children}</h5>,
      [BLOCKS.HEADING_6]: (node: any, children: any) => <h6>{children}</h6>,
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote>{children}</blockquote>,
      [BLOCKS.HR]: () => <hr />,
      // Embedded Asset (e.g., image)
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { title, file } = node?.data?.target?.fields ?? {};
        const url = file?.url ? (file.url.startsWith('//') ? `https:${file.url}` : file.url) : '';
        return url ? <img src={url} alt={title || ''} style={{ maxWidth: '100%' }} /> : null;
      },
      // Embedded Entry (e.g., linked contentful entry)
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        // Render a fallback placeholder with entry title if available
        const title = node?.data?.target?.fields?.title ?? 'Embedded Entry';
        return <div className="embedded-entry">{title}</div>;
      },
      // Inline Embedded Entry (e.g., inline entry reference)
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const title = node?.data?.target?.fields?.title ?? 'Inline Entry';
        return <span className="inline-embedded-entry">{title}</span>;
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
      [MARKS.UNDERLINE]: (text: any) => <u>{text}</u>,
      [MARKS.CODE]: (text: any) => <code>{text}</code>,
    },
  };

  // Handle string content (fallback)
  if (typeof content === 'string') {
    return (
      <div className={`rich-text-content ${className || ''}`}>
        <p>{content}</p>
      </div>
    );
  }

  // Check if content exists and has the required structure for rich text
  if (!content || typeof content !== 'object') {
    return null;
  }

  // Check if it's a proper rich text document
  if (!content.nodeType || content.nodeType !== 'document' || !content.content || !Array.isArray(content.content)) {
    return null;
  }

  try {
    return (
      <div className={`rich-text-content ${className || ''}`}>
        {documentToReactComponents(content, renderOptions)}
      </div>
    );
  } catch (error) {
    console.error('❌ Error rendering rich text content:', error);
    return null;
  }
}
