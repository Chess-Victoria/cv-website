'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PreviewBanner() {
  const [isPreview, setIsPreview] = useState(false);

  useEffect(() => {
    // Check if we're in preview mode by looking for the draft mode cookie
    const isDraftMode = document.cookie
      .split('; ')
      .find(row => row.startsWith('__prerender_bypass='));
    
    // Also check for our custom preview cookie
    const isContentfulPreview = document.cookie
      .split('; ')
      .find(row => row.startsWith('contentful_preview='));
    
    setIsPreview(!!(isDraftMode || isContentfulPreview));
  }, []);

  if (!isPreview) {
    return null;
  }

  return (
    <div className="preview-banner">
      <div className="preview-banner-content">
        <div className="preview-banner-left">
          <span className="preview-banner-icon">👁️</span>
          <span className="preview-banner-text">
            You are viewing draft content in preview mode
          </span>
        </div>
        <div className="preview-banner-right">
          <a 
            href="/api/exit-preview" 
            className="preview-banner-exit"
          >
            Exit Preview
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .preview-banner {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ff6b35;
          color: white;
          z-index: 9999;
          padding: 8px 0;
          font-size: 14px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .preview-banner-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .preview-banner-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .preview-banner-icon {
          font-size: 16px;
        }
        
        .preview-banner-text {
          font-weight: 500;
        }
        
        .preview-banner-exit {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        
        .preview-banner-exit:hover {
          background: rgba(255, 255, 255, 0.3);
          color: white;
        }
        
        /* Add top padding to body when banner is visible */
        :global(body) {
          padding-top: 40px;
        }
      `}</style>
    </div>
  );
}
