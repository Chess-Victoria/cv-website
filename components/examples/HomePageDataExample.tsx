import { getHomePageData } from '@/app/home.data';
import Popup from '@/components/layout/Popup';

export default async function HomePageDataExample() {
  // Load homepage data from Contentful
  const homePageData = await getHomePageData();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Homepage Data Example</h1>
      <p>This component loads homepage data from Contentful and displays the popup.</p>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Loaded Homepage Data:</h3>
        <p><strong>Title:</strong> {homePageData.title || 'Not set'}</p>
        <p><strong>Description:</strong> {homePageData.description || 'Not set'}</p>
        <p><strong>Has Popup Content:</strong> {homePageData.popupContent ? 'Yes' : 'No'}</p>
        
        {homePageData.popupContent && (
          <div style={{ marginTop: '15px' }}>
            <h4>Popup Content:</h4>
            <p><strong>Title:</strong> {homePageData.popupContent.title}</p>
            <p><strong>Description:</strong> {homePageData.popupContent.description}</p>
            {homePageData.popupContent.actionButton && (
              <p><strong>Action Button:</strong> {homePageData.popupContent.actionButton.text}</p>
            )}
            {homePageData.popupContent.items && (
              <div>
                <strong>Items:</strong>
                <ul>
                  {homePageData.popupContent.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Popup with Contentful data */}
      <Popup 
        content={homePageData.popupContent}
        isVisible={!!homePageData.popupContent}
        onClose={() => {}}
        onNoThanks={() => {}}
        onAction={() => {}}
      />
    </div>
  );
}

