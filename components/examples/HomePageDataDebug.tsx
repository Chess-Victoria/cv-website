import { getHomePageData } from '@/app/home.data';

export default async function HomePageDataDebug() {
  const homePageData = await getHomePageData();
  
  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>HomePage Data Debug</h2>
      
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h3>Data Status</h3>
        <p><strong>Hero Banner Data Available:</strong> {homePageData.heroBanner ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Popup Content Available:</strong> {homePageData.popupContent ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Event List Data Available:</strong> {homePageData.eventList ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Committee List Data Available:</strong> {homePageData.committeeList ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Featured Clubs Data Available:</strong> {homePageData.featuredClubs ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Page Title:</strong> {homePageData.title || 'Not set'}</p>
        <p><strong>Page Description:</strong> {homePageData.description || 'Not set'}</p>
      </div>
      
      <div style={{ 
        marginBottom: '30px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7',
        borderRadius: '8px' 
      }}>
        <h3>Hero Banner Data</h3>
        {homePageData.heroBanner ? (
          <div>
            <p><strong>Title:</strong> {homePageData.heroBanner.title || 'null'}</p>
            <p><strong>Description:</strong> {homePageData.heroBanner.description || 'null'}</p>
            <p><strong>Background Image:</strong> {homePageData.heroBanner.backgroundImage || 'null'}</p>
            <p><strong>Hero Image:</strong> {homePageData.heroBanner.heroImage || 'null'}</p>
            <p><strong>Tagline Text:</strong> {homePageData.heroBanner.tagline?.text || 'null'}</p>
            <p><strong>Tagline Icon:</strong> {homePageData.heroBanner.tagline?.icon || 'null'}</p>
            <p><strong>Primary Button:</strong> {homePageData.heroBanner.buttons?.primary?.text || 'null'} → {homePageData.heroBanner.buttons?.primary?.url || 'null'}</p>
            <p><strong>Secondary Button:</strong> {homePageData.heroBanner.buttons?.secondary?.text || 'null'} → {homePageData.heroBanner.buttons?.secondary?.url || 'null'}</p>
            <p><strong>Event Title:</strong> {homePageData.heroBanner.eventInfo?.title || 'null'}</p>
            <p><strong>Event Date:</strong> {homePageData.heroBanner.eventInfo?.date || 'null'}</p>
            <p><strong>Event Location:</strong> {homePageData.heroBanner.eventInfo?.location || 'null'}</p>
            <p><strong>Event Description:</strong> {homePageData.heroBanner.eventInfo?.description || 'null'}</p>
            <p><strong>Show Countdown:</strong> {homePageData.heroBanner.showCountdown ? 'true' : 'false'}</p>
            <p><strong>Event DateTime (ISO):</strong> {homePageData.heroBanner.eventDateTime || 'null'}</p>
            <p><strong>Event DateTime (Formatted):</strong> {homePageData.heroBanner.eventInfo?.date || 'null'}</p>
          </div>
        ) : (
          <p>No hero banner data available</p>
        )}
      </div>

      {/* Event List Data */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#e7f3ff', 
        borderRadius: '8px' 
      }}>
        <h3>Event List Data</h3>
        {homePageData.eventList ? (
          <div>
            <p><strong>Title:</strong> {homePageData.eventList.title}</p>
            <p><strong>Subtitle:</strong> {homePageData.eventList.subtitle}</p>
            <p><strong>Number of Days:</strong> {homePageData.eventList.days.length}</p>
            {homePageData.eventList.days.map((day, dayIndex) => (
              <div key={day.id} style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                <p><strong>Day {day.dayNumber}:</strong> {day.date} {day.month} {day.year}</p>
                <p><strong>Events:</strong> {day.events.length}</p>
                {day.events.map((event) => (
                  <div key={event.id} style={{ marginLeft: '20px', marginTop: '5px' }}>
                    <p><strong>• {event.title}</strong></p>
                    <p style={{ marginLeft: '10px' }}>Time: {event.time}</p>
                    <p style={{ marginLeft: '10px' }}>Location: {event.location}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p>No event list data available</p>
        )}
      </div>

      {/* Committee List Data */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#fff3cd', 
        borderRadius: '8px' 
      }}>
        <h3>Committee List Data</h3>
        {homePageData.committeeList ? (
          <div>
            <p><strong>Title:</strong> {homePageData.committeeList.title}</p>
            <p><strong>Subtitle:</strong> {homePageData.committeeList.subtitle}</p>
            <p><strong>Number of Members:</strong> {homePageData.committeeList.members.length}</p>
            {homePageData.committeeList.members.map((member) => (
              <div key={member.id} style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                <p><strong>• {member.name}</strong> - {member.title}</p>
                <p style={{ marginLeft: '10px' }}>Image: {member.image.src}</p>
                <p style={{ marginLeft: '10px' }}>Social Links: {Object.keys(member.socialLinks).join(', ') || 'None'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No committee list data available</p>
        )}
      </div>

      {/* Featured Clubs Data */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#e8f5e8', 
        borderRadius: '8px' 
      }}>
        <h3>Featured Clubs Data</h3>
        {homePageData.featuredClubs ? (
          <div>
            <p><strong>Title:</strong> {homePageData.featuredClubs.title}</p>
            <p><strong>Subtitle:</strong> {homePageData.featuredClubs.subtitle}</p>
            <p><strong>Number of Clubs:</strong> {homePageData.featuredClubs.items.length}</p>
            {homePageData.featuredClubs.items.map((club) => (
              <div key={club.id} style={{ marginTop: '10px', padding: '10px', backgroundColor: 'white', borderRadius: '4px' }}>
                <p><strong>• {club.name}</strong> - {club.title}</p>
                <p style={{ marginLeft: '10px' }}>Description: {club.description}</p>
                <p style={{ marginLeft: '10px' }}>Image: {club.image.src}</p>
                <p style={{ marginLeft: '10px' }}>URL: {club.url}</p>
                <p style={{ marginLeft: '10px' }}>Social Links: {Object.keys(club.socialLinks || {}).join(', ') || 'None'}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No featured clubs data available</p>
        )}
      </div>
      
      <div style={{ 
        marginTop: '30px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h4>Complete HomePage Data JSON:</h4>
        <pre style={{ 
          whiteSpace: 'pre-wrap', 
          wordBreak: 'break-word',
          fontSize: '12px',
          maxHeight: '600px',
          overflow: 'auto',
          backgroundColor: '#fff',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          {JSON.stringify(homePageData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
