import { getHomePageData } from '@/app/home.data';

export default async function PromotionBannerExample() {
  const homePageData = await getHomePageData();
  
  if (!homePageData.heroBanner) {
    return (
      <div className="container">
        <h3>Promotion Banner Example</h3>
        <p>No promotion banner data available.</p>
      </div>
    );
  }

  const { heroBanner } = homePageData;

  return (
    <div className="container">
      <h3>Hero Banner Example</h3>
      
      <div className="hero-banner" style={{
        border: '1px solid #ddd',
        padding: '20px',
        margin: '20px 0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <div className="banner-content">
          {heroBanner.title && (
            <div className="banner-title" style={{ marginBottom: '10px' }}>
              {heroBanner.title}
            </div>
          )}
          
          {heroBanner.description && (
            <p style={{ marginBottom: '15px', color: '#666' }}>
              {heroBanner.description}
            </p>
          )}
          
          <div className="banner-actions" style={{ display: 'flex', gap: '10px' }}>
            {heroBanner.buttons?.primary?.url && (
              <a 
                href={heroBanner.buttons.primary.url}
                className="btn btn-primary"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                {heroBanner.buttons.primary.text}
              </a>
            )}
            
            {heroBanner.buttons?.secondary?.url && (
              <a 
                href={heroBanner.buttons.secondary.url}
                className="btn btn-secondary"
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                {heroBanner.buttons.secondary.text}
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="debug-info" style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <h4>Debug Information:</h4>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {JSON.stringify(heroBanner, null, 2)}
        </pre>
      </div>
    </div>
  );
}
