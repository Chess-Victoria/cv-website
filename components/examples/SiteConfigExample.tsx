'use client'

import { useSiteConfig } from '@/lib/hooks/useSiteConfig';

export default function SiteConfigExample() {
  const {
    config,
    loading,
    error,
    siteName,
    contactEmail,
    contactPhone,
    address,
    socialMedia,
    headerLinks,
    footerLinks,
  } = useSiteConfig();

  if (loading) {
    return <div>Loading site configuration...</div>;
  }

  if (error) {
    return <div>Error loading site configuration: {error}</div>;
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Site Configuration Example</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Basic Information</h3>
        <p><strong>Site Name:</strong> {siteName || 'Not configured'}</p>
        <p><strong>Contact Email:</strong> {contactEmail || 'Not configured'}</p>
        <p><strong>Contact Phone:</strong> {contactPhone || 'Not configured'}</p>
        <p><strong>Address:</strong> {address || 'Not configured'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Social Media</h3>
        {socialMedia ? (
          <ul>
            {socialMedia.facebook && <li>Facebook: {socialMedia.facebook}</li>}
            {socialMedia.twitter && <li>Twitter: {socialMedia.twitter}</li>}
            {socialMedia.instagram && <li>Instagram: {socialMedia.instagram}</li>}
            {socialMedia.linkedin && <li>LinkedIn: {socialMedia.linkedin}</li>}
          </ul>
        ) : (
          <p>No social media configured</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Header Links</h3>
        {headerLinks.length > 0 ? (
          <ul>
            {headerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No header links configured</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Footer Links</h3>
        {footerLinks.length > 0 ? (
          <ul>
            {footerLinks.map((link, index) => (
              <li key={index}>
                <a href={link.url}>{link.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No footer links configured</p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Raw Configuration</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}
