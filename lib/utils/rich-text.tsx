import React from 'react';
import { Announcement } from '../types/announcement';

/**
 * Render rich text content from Contentful
 */
export function renderRichText(content: Announcement['summary']) {
  if (!content || !content.content) {
    return null;
  }

  return content.content.map((node, index) => {
    const { nodeType, content: nodeContent, data } = node;

    switch (nodeType) {
      case 'heading-1':
        return <h1 key={index}>{renderTextContent(nodeContent)}</h1>;
      case 'heading-2':
        return <h2 key={index}>{renderTextContent(nodeContent)}</h2>;
      case 'heading-3':
        return <h3 key={index}>{renderTextContent(nodeContent)}</h3>;
      case 'heading-4':
        return <h4 key={index}>{renderTextContent(nodeContent)}</h4>;
      case 'heading-5':
        return <h5 key={index}>{renderTextContent(nodeContent)}</h5>;
      case 'heading-6':
        return <h6 key={index}>{renderTextContent(nodeContent)}</h6>;
      case 'paragraph':
        return <p key={index}>{renderTextContent(nodeContent)}</p>;
      case 'unordered-list':
        return <ul key={index}>{renderListItems(nodeContent)}</ul>;
      case 'ordered-list':
        return <ol key={index}>{renderListItems(nodeContent)}</ol>;
      case 'blockquote':
        return <blockquote key={index}>{renderTextContent(nodeContent)}</blockquote>;
      case 'hr':
        return <hr key={index} />;
      case 'hyperlink':
        return (
          <a key={index} href={data?.uri} target="_blank" rel="noopener noreferrer">
            {renderTextContent(nodeContent)}
          </a>
        );
      default:
        return <div key={index}>{renderTextContent(nodeContent)}</div>;
    }
  });
}

/**
 * Render text content with marks (bold, italic, etc.)
 */
function renderTextContent(content: any[]): React.ReactNode {
  if (!content) return null;

  return content.map((textNode, index) => {
    const { value, marks = [] } = textNode;
    let element = value;

    // Apply marks
    marks.forEach((mark: string) => {
      switch (mark) {
        case 'bold':
          element = <strong key={index}>{element}</strong>;
          break;
        case 'italic':
          element = <em key={index}>{element}</em>;
          break;
        case 'underline':
          element = <u key={index}>{element}</u>;
          break;
        case 'code':
          element = <code key={index}>{element}</code>;
          break;
        case 'superscript':
          element = <sup key={index}>{element}</sup>;
          break;
        case 'subscript':
          element = <sub key={index}>{element}</sub>;
          break;
        case 'strikethrough':
          element = <del key={index}>{element}</del>;
          break;
      }
    });

    return element;
  });
}

/**
 * Render list items
 */
function renderListItems(content: any[]): React.ReactNode {
  if (!content) return null;

  return content.map((node, index) => {
    if (node.nodeType === 'list-item') {
      return <li key={index}>{renderTextContent(node.content)}</li>;
    }
    return null;
  });
}

