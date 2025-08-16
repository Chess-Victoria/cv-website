import { getHomePageData } from '@/app/home.data';
import HeroBanner from '@/components/sections/home1/HeroBanner';

export default async function ContentfulHeroBannerExample() {
  const homePageData = await getHomePageData();
  
  return (
    <div className="container">
      <h2>Contentful Hero Banner Integration</h2>
      
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h3>Data Status</h3>
        <p><strong>Hero Banner Data Available:</strong> {homePageData.heroBanner ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Popup Content Available:</strong> {homePageData.popupContent ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Page Title:</strong> {homePageData.title || 'Not set'}</p>
      </div>
      
      {homePageData.heroBanner ? (
        <div style={{ marginBottom: '30px' }}>
          <h3>Hero Banner from Contentful</h3>
          <HeroBanner data={homePageData.heroBanner} />
        </div>
      ) : (
        <div style={{ 
          marginBottom: '30px', 
          padding: '20px', 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '8px' 
        }}>
          <h3>⚠️ No Hero Banner Data</h3>
          <p>The hero banner data is not available. This could mean:</p>
          <ul>
            <li>No homepage entry exists in Contentful</li>
            <li>Hero banner fields are not populated</li>
            <li>Fallback data is being used</li>
          </ul>
        </div>
      )}
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h4>Raw HomePage Data:</h4>
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word',
          fontSize: '12px',
          maxHeight: '400px',
          overflow: 'auto'
        }}>
          {JSON.stringify(homePageData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
