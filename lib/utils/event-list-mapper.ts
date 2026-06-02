import { EventListData, EventList } from '@/lib/types/event-list';
import { formatEventDateKey, formatEventDateTime, formatEventDateTimeParts } from '@/lib/utils/date-formatter';

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

  const getEventSortTime = (datetime?: string): number => {
    if (!datetime) {
      return Number.MAX_SAFE_INTEGER;
    }

    const parsedTime = new Date(datetime).getTime();
    return Number.isNaN(parsedTime) ? Number.MAX_SAFE_INTEGER : parsedTime;
  };

  eventList.events.forEach((eventRef) => {
    if (eventRef.fields) {
      const event = eventRef.fields;
      const dateKey = event.datetime ? formatEventDateKey(event.datetime) : new Date().toISOString().split('T')[0];

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
    const events = eventsByDate.get(dateKey)!
      .slice()
      .sort((firstEvent, secondEvent) => {
        return getEventSortTime(firstEvent.datetime) - getEventSortTime(secondEvent.datetime);
      });
    const eventDate = new Date(`${dateKey}T12:00:00Z`);
    const dateLabelParts = formatEventDateTimeParts(eventDate.toISOString(), 'en-AU').date.split(' ');
    const dayOfMonth = dateLabelParts[0] || eventDate.getDate().toString().padStart(2, '0');
    const monthLabel = dateLabelParts[1] || eventDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'Australia/Melbourne' });
    const yearLabel = dateLabelParts[2] || eventDate.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'Australia/Melbourne' });

    const day: any = {
      id: `day-${dayNumber}`,
      dayNumber: dayNumber.toString().padStart(2, '0'),
      date: dayOfMonth,
      month: monthLabel.toUpperCase(),
      year: yearLabel,
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
