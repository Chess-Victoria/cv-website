import EventList from '@/components/sections/home1/EventList'
import { EventListData } from '@/lib/types/event-list'

// Example data for demonstration
const exampleEventListData: EventListData = {
  title: "Chess Victoria Events",
  subtitle: "Tournament Schedule",
  days: [
    {
      id: "day-1",
      dayNumber: "01",
      date: "15",
      month: "AUG",
      year: "2025",
      events: [
        {
          id: "event-1-1",
          title: "Victorian Championship - Round 1",
          description: "The premier chess tournament in Victoria featuring top players from across the state.",
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
    },
    {
      id: "day-2",
      dayNumber: "02",
      date: "22",
      month: "AUG",
      year: "2025",
      events: [
        {
          id: "event-2-1",
          title: "Victorian Championship - Round 2",
          description: "Second round of the championship with exciting matchups.",
          time: "7:30 PM - 10:30 PM",
          location: "Box Hill Chess Club",
          image: {
            src: "/assets/img/all-images/event/event-img2.png",
            alt: "Chess Tournament"
          },
          buttonText: "Register Now",
          buttonUrl: "/event-schedule"
        }
      ]
    }
  ]
}

export default function EventListExample() {
  return (
    <div>
      <h2>EventList Component Example</h2>
      <p>This demonstrates the EventList component with custom data:</p>
      <EventList data={exampleEventListData} />
    </div>
  )
}
