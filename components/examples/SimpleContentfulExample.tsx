import { getSingleEntry } from '@/lib/contentful';
import Popup from '@/components/layout/Popup';
import { mapAnnouncementToPopupContent } from '@/lib/utils/announcement-mapper';

export default async function SimpleContentfulExample() {
  // Simple approach: directly get homepage with depth 2
  const homePage = await getSingleEntry('homePage', 2);
  
  let popupContent: any = undefined;
  
  if (homePage?.fields?.announcement) {
    const announcementFields = (homePage.fields.announcement as any).fields;
    const announcement = {
      title: announcementFields.title as string,
      summary: announcementFields.summary as any,
      reference: announcementFields.reference as any,
      url: announcementFields.url as string,
      items: announcementFields.items as string[],
    };
    popupContent = mapAnnouncementToPopupContent(announcement);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Simple Contentful Example</h1>
      <p>This demonstrates the simplified approach using getSingleEntry('homePage', 2).</p>
      
      <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Homepage Data:</h3>
        <p><strong>Found:</strong> {homePage ? 'Yes' : 'No'}</p>
        {homePage && (
          <>
            <p><strong>Title:</strong> {(homePage.fields as any).name || 'Not set'}</p>
            <p><strong>Description:</strong> {(homePage.fields as any).name || 'Not set'}</p>
            <p><strong>Has Announcement:</strong> {homePage.fields.announcement ? 'Yes' : 'No'}</p>
            <p><strong>Has Popup Content:</strong> {popupContent ? 'Yes' : 'No'}</p>
          </>
        )}
      </div>

      {/* Popup with Contentful data */}
      <Popup 
        content={popupContent}
        isVisible={!!popupContent}
        onClose={() => {}}
        onNoThanks={() => {}}
        onAction={() => {}}
      />
    </div>
  );
}

