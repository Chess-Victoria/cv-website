import { getFirstAnnouncement } from '@/lib/announcements';
import { mapAnnouncementToPopupContent } from '@/lib/utils/announcement-mapper';
import Popup from '@/components/layout/Popup';

export default async function AnnouncementExample() {
  // Load announcement from Contentful
  const announcement = await getFirstAnnouncement();

  // Map to PopupContent
  const popupContent = announcement ? mapAnnouncementToPopupContent(announcement) : undefined;

  return (
    <div>
      <h2>Announcement Example</h2>
      <p>This component loads announcement data from Contentful, maps it to PopupContent, and passes it to the Popup component.</p>
      
      {announcement ? (
        <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Loaded Announcement:</h3>
          <p><strong>Title:</strong> {announcement.title}</p>
          <p><strong>URL:</strong> {announcement.url}</p>
          {announcement.items && (
            <div>
              <strong>Items:</strong>
              <ul>
                {announcement.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No announcement found in Contentful.</p>
      )}

      {/* Popup with mapped Contentful data */}
      <Popup 
        content={popupContent}
        isVisible={!!popupContent}
        onClose={() => console.log('Popup closed')}
        onNoThanks={() => console.log('No thanks clicked')}
        onAction={() => console.log('Action clicked')}
      />
    </div>
  );
}
