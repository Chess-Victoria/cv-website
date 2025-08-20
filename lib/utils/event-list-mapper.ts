import { EventListData, EventList } from '@/lib/types/event-list';
import { formatEventDateTime } from '@/lib/utils/date-formatter';

// Fallback event list data
export const fallbackEventListData: EventListData = {
  title: "Our Events Schedule Plan",
  subtitle: "Event Schedule",
  days: [
    {
      id: "day-1",
      dayNumber: "01",
      date: "01",
      month: "JAN",
      year: "2025",
      events: [
        {
          id: "event-1-1",
          title: "Chess Victoria Championship",
          description: "Join us for the premier chess tournament in Victoria featuring top players from across the state.",
          time: "7:30 PM - 10:30 PM",
          location: "Box Hill Chess Club",
          image: {
            src: "/assets/img/all-images/event/event-img1.png",
            alt: "Chess Tournament"
          },
          buttonText: "Register Now",
          buttonUrl: "/event-schedule"
        }
      ]
    }
  ]
};

/**
 * Map Contentful EventList to EventListData
 * Groups events by date and creates day-based structure
 */
export function mapEventListToEventListData(eventList: EventList): EventListData {
  if (!eventList.events || eventList.events.length === 0) {
    console.warn('No events found in EventList');
    return fallbackEventListData;
  }

  // Group events by date
  const eventsByDate = new Map<string, any[]>();
  
  eventList.events.forEach((eventRef) => {
    if (eventRef.fields) {
      const event = eventRef.fields;
      const eventDate = event.datetime ? new Date(event.datetime) : new Date();
      const dateKey = eventDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      if (!eventsByDate.has(dateKey)) {
        eventsByDate.set(dateKey, []);
      }
      eventsByDate.get(dateKey)!.push(event);
    }
  });

  // Convert to EventListData format
  const days: any[] = [];
  let dayNumber = 1;

  // Sort dates and create days
  const sortedDates = Array.from(eventsByDate.keys()).sort();
  
  sortedDates.forEach((dateKey) => {
    const events = eventsByDate.get(dateKey)!;
    const eventDate = new Date(dateKey);
    
    const day: any = {
      id: `day-${dayNumber}`,
      dayNumber: dayNumber.toString().padStart(2, '0'),
      date: eventDate.getDate().toString().padStart(2, '0'),
      month: eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      year: eventDate.getFullYear().toString(),
      events: events.map((event, eventIndex) => ({
        id: `event-${dayNumber}-${eventIndex + 1}`,
        title: event.name || 'Untitled Event',
        description: event.summary || event.description || 'No description available',
        time: event.datetime ? formatEventDateTime(event.datetime) : 'TBD',
        location: event.location || 'Location TBD',
        image: {
          src: event.image?.fields?.file?.url || "/assets/img/all-images/event/event-img1.png",
          alt: event.name || 'Event'
        },
        buttonText: "Learn More",
        buttonUrl: event.slug ? `/event/${event.slug}` : (event.url || "/event-schedule")
      }))
    };
    
    days.push(day);
    dayNumber++;
  });

  return {
    title: eventList.name || "Our Events Schedule Plan",
    subtitle: "Event Schedule",
    days: days.length > 0 ? days : fallbackEventListData.days
  };
}
