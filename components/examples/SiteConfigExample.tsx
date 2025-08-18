import { SITE_CONFIG } from '@/lib/site-config';

export default function SiteConfigExample() {
  const {
    siteName,
    contactEmail,
    contactPhone,
    address,
  } = SITE_CONFIG;

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
        <h3>Raw Configuration</h3>
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '12px'
        }}>
          {JSON.stringify(SITE_CONFIG, null, 2)}
        </pre>
      </div>
    </div>
  );
}
