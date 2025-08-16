import { getEntries } from './contentful';
import { Announcement } from './types/announcement';

/**
 * Load all announcements from Contentful
 */
export async function getAnnouncements(): Promise<Announcement[]> {
  try {
    const entries = await getEntries('announcement');
    
    return entries.map((entry: any) => ({
      title: entry.fields.title,
      summary: entry.fields.summary,
      reference: entry.fields.reference,
      url: entry.fields.url,
      items: entry.fields.items,
    }));
  } catch (error) {
    console.error('Error loading announcements:', error);
    return [];
  }
}

/**
 * Load a single announcement by ID
 */
export async function getAnnouncementById(id: string): Promise<Announcement | null> {
  try {
    const entries = await getEntries('announcement');
    const announcement = entries.find((entry: any) => entry.sys.id === id);
    
    if (!announcement) {
      return null;
    }

    return {
      title: announcement.fields.title,
      summary: announcement.fields.summary,
      reference: announcement.fields.reference,
      url: announcement.fields.url,
      items: announcement.fields.items,
    };
  } catch (error) {
    console.error('Error loading announcement:', error);
    return null;
  }
}

/**
 * Load the first announcement (useful for popup)
 */
export async function getFirstAnnouncement(): Promise<Announcement | null> {
  try {
    const announcements = await getAnnouncements();
    return announcements.length > 0 ? announcements[0] : null;
  } catch (error) {
    console.error('Error loading first announcement:', error);
    return null;
  }
}

