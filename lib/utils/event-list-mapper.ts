import { EventListData, EventList } from '@/lib/types/event-list';
import { formatEventDateTime } from '@/lib/utils/date-formatter';

/**
 * Map Contentful EventList to EventListData
 * Groups events by date and creates day-based structure
 */
export function mapEventListToEventListData(eventList: EventList): EventListData {
  if (!eventList.events || eventList.events.length === 0) {
    console.warn('No events found in EventList');
    return {
      title: eventList.name || "Our Events Schedule Plan",
      subtitle: "Event Schedule",
      days: []
    };
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
          src: event.image?.fields?.file?.url || "/assets/img/default/generic-event.png",
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
    days: days
  };
}
