import client from '@/lib/contentful';
import { Event, EventData, EventList, EventListData } from '@/lib/types/event';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import { getContactImage } from '@/lib/constants';

/**
 * Fetch all events directly from Contentful with caching
 */
export const getAllEvents = unstable_cache(
  async () => {
    try {
      const response = await client.getEntries({
        content_type: 'event',
        order: ['fields.datetime'],
        include: 2
      });

      return response.items;
    } catch (error) {
      console.error('Error fetching all events:', error);
      return [];
    }
  },
  ['all-events'],
  {
    tags: ['events'],
    revalidate: getRevalidationTime('EVENT')
  }
);

/**
 * Fetch all event lists from Contentful with caching
 */
export const getAllEventLists = unstable_cache(
  async () => {
    try {
      const response = await client.getEntries({
        content_type: 'eventList',
        order: ['fields.name'],
        include: 3
      });

      return response.items;
    } catch (error) {
      console.error('Error fetching event lists:', error);
      return [];
    }
  },
  ['all-event-lists'],
  {
    tags: ['events', 'event-lists'],
    revalidate: getRevalidationTime('EVENT')
  }
);

/**
 * Fetch single event list by slug from Contentful with caching
 */
export const getEventListBySlug = (slug: string) => {
  return unstable_cache(
    async () => {
      try {
        const response = await client.getEntries({
          content_type: 'eventList',
          'fields.slug': slug,
          include: 3,
          limit: 1
        });

        return response.items[0] || null;
      } catch (error) {
        console.error('Error fetching event list by slug:', error);
        return null;
      }
    },
    [`event-list-${slug}`],
    {
      tags: ['events', 'event-lists'],
      revalidate: getRevalidationTime('EVENT')
    }
  )();
};

/**
 * Map event entry to data structure
 */
function mapEventToData(event: Event): EventData {
  const eventData: EventData = {
    id: event.sys.id,
    name: event.fields.name,
    datetime: event.fields.datetime,
    location: event.fields.location,
    url: event.fields.url,
    description: event.fields.description,
    summary: event.fields.summary,
    tags: event.metadata?.tags?.map(tag => tag.sys.id) || []
  };

  // Map contact information if available
  if (event.fields.contact && Array.isArray(event.fields.contact)) {
    eventData.contact = event.fields.contact
      .map((contactRef: any) => {
        if (contactRef && typeof contactRef === 'object' && 'fields' in contactRef) {
          const contact = contactRef as any;
          return {
            id: contact.sys.id,
            name: contact.fields.name || '',
            email: contact.fields.email || '',
            phone: contact.fields.phone || '',
            title: contact.fields.title || contact.fields.jobTitle || '',
            image: contact.fields.image ? {
              url: contact.fields.image.fields.file?.url || getContactImage(),
              alt: contact.fields.image.fields.description || contact.fields.name || 'Contact'
            } : undefined
          };
        }
        return null;
      })
      .filter((contact): contact is NonNullable<typeof contact> => contact !== null);
  }

  return eventData;
}

/**
 * Map event list entry to data structure
 */
function mapEventListToData(eventList: EventList): EventListData {
  const mappedEvents: EventData[] = [];
  
  if (eventList.fields.events && Array.isArray(eventList.fields.events)) {
    mappedEvents.push(...eventList.fields.events
      .map((eventRef: any) => {
        if (eventRef && typeof eventRef === 'object' && 'fields' in eventRef) {
          return mapEventToData(eventRef as Event);
        }
        return null;
      })
      .filter((event): event is EventData => event !== null)
    );
  }

  return {
    id: eventList.sys.id,
    name: eventList.fields.name,
    slug: eventList.fields.slug,
    description: eventList.fields.description,
    events: mappedEvents
  };
}

/**
 * Get all events data for the main events page table
 */
export const getAllEventsData = async (): Promise<EventData[]> => {
  try {
    const events = await getAllEvents();
    
    return events.map((event: any) => 
      mapEventToData(event as Event)
    );
  } catch (error) {
    console.error('Error getting all events data:', error);
    return [];
  }
};

/**
 * Get event list data by slug with proper mapping
 */
export const getEventListData = (slug: string): Promise<EventListData | null> => {
  return unstable_cache(
    async () => {
      try {
        const eventList = await getEventListBySlug(slug);
        
        if (!eventList) {
          return null;
        }

        return mapEventListToData(eventList as unknown as EventList);
      } catch (error) {
        console.error('Error getting event list data:', error);
        return null;
      }
    },
    [`event-list-data-${slug}`],
    {
      tags: ['events', 'event-lists'],
      revalidate: getRevalidationTime('EVENT')
    }
  )();
};

/**
 * Get all event lists for navigation (only those with events)
 */
export const getEventListsForNavigation = async () => {
  try {
    const eventLists = await getAllEventLists();
    
    // Filter event lists to only include those with events
    const eventListsWithEvents = eventLists.filter((eventList: any) => {
      return eventList.fields.events && Array.isArray(eventList.fields.events) && eventList.fields.events.length > 0;
    });
    
    return eventListsWithEvents.map((eventList: any) => ({
      id: eventList.sys.id,
      name: eventList.fields.name,
      slug: eventList.fields.slug,
      description: eventList.fields.description,
      eventCount: eventList.fields.events?.length || 0
    }));
  } catch (error) {
    console.error('Error getting event lists for navigation:', error);
    return [];
  }
};
