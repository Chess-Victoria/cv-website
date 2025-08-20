'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { ClubListItem } from '@/lib/types/club-page'
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps'

interface ClubsMapProps {
  clubs: ClubListItem[];
}

export default function ClubsMap({ clubs }: ClubsMapProps) {
  const [selectedClub, setSelectedClub] = useState<ClubListItem | null>(null)
  const [camera, setCamera] = useState({
    center: { lat: -37.8136, lng: 144.9631 }, // Default to Melbourne
    zoom: 10
  })
  const initializedRef = useRef(false)

  // Filter clubs with valid coordinates - memoized to prevent re-creation
  const clubsWithCoords = useMemo(() => {
    return clubs.filter(club => {
      const hasCoords = club.location?.lat && club.location?.lon
      return hasCoords
    })
  }, [clubs])

  // Debug logs removed for production

  // Calculate bounds to fit all markers
  const bounds = useMemo(() => {
    if (clubsWithCoords.length === 0) return null

    const lats = clubsWithCoords.map(club => club.location!.lat)
    const lngs = clubsWithCoords.map(club => club.location!.lon)

    return {
      north: Math.max(...lats),
      south: Math.min(...lats),
      east: Math.max(...lngs),
      west: Math.min(...lngs)
    }
  }, [clubsWithCoords])

  // Calculate initial center point (average of all coordinates)
  const initialCenter = useMemo(() => {
    if (clubsWithCoords.length === 0) {
      return { lat: -37.8136, lng: 144.9631 } // Default to Melbourne
    }
    
    const centerLat = clubsWithCoords.reduce((sum, club) => sum + club.location!.lat, 0) / clubsWithCoords.length
    const centerLng = clubsWithCoords.reduce((sum, club) => sum + club.location!.lon, 0) / clubsWithCoords.length
    
    return { lat: centerLat, lng: centerLng }
  }, [clubsWithCoords])

  // Initialize camera state only once when clubs data is first available
  useEffect(() => {
    if (clubsWithCoords.length > 0 && !initializedRef.current) {
      setCamera({
        center: initialCenter,
        zoom: clubsWithCoords.length === 1 ? 12 : 10
      })
      initializedRef.current = true
    }
  }, [clubsWithCoords.length, initialCenter])

  if (clubsWithCoords.length === 0) {
    return (
      <div className="map-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="heading2 text-center space-margin60">
                <h2>Chess Clubs Map</h2>
                <p>Find chess clubs near you</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <p>No clubs with location data available to display on the map.</p>
                <p>Please ensure clubs have latitude and longitude coordinates in Contentful.</p>
                <details style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '20px auto' }}>
                  <summary>Debug Information</summary>
                  <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px', fontSize: '12px' }}>
                    {JSON.stringify(clubs.map(club => ({
                      name: club.name,
                      location: club.location,
                      hasCoords: !!(club.location?.lat && club.location?.lon)
                    })), null, 2)}
                  </pre>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="map-section-area sp10">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="heading2 text-center space-margin60">
              <h2>Chess Clubs Map</h2>
              <p>Find chess clubs near you</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}>
              <Map
                center={camera.center}
                zoom={camera.zoom}
                style={{ 
                  width: '100%', 
                  height: '500px', 
                  borderRadius: '10px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
                mapId="chess-clubs-map"
                gestureHandling="greedy"
                zoomControl={true}
                mapTypeControl={true}
                scaleControl={true}
                streetViewControl={true}
                fullscreenControl={true}
                onCameraChanged={(ev) => {
                  setCamera({
                    center: ev.detail.center,
                    zoom: ev.detail.zoom
                  })
                }}
              >
                {clubsWithCoords.map((club) => (
                  <Marker
                    key={club.id}
                    position={{ lat: club.location!.lat, lng: club.location!.lon }}
                    title={club.name}
                    onClick={() => setSelectedClub(club)}
                  />
                ))}

                {selectedClub && (
                  <InfoWindow
                    position={{ lat: selectedClub.location!.lat, lng: selectedClub.location!.lon }}
                    onCloseClick={() => setSelectedClub(null)}
                  >
                    <div style={{ padding: '10px', maxWidth: '250px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>
                        {selectedClub.name}
                      </h3>
                      {selectedClub.location?.address && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Address:</strong> {selectedClub.location.address}
                        </p>
                      )}
                      {selectedClub.contact?.phone && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${selectedClub.contact.phone}`} style={{ color: '#007bff' }}>
                            {selectedClub.contact.phone}
                          </a>
                        </p>
                      )}
                      {selectedClub.contact?.email && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${selectedClub.contact.email}`} style={{ color: '#007bff' }}>
                            {selectedClub.contact.email}
                          </a>
                        </p>
                      )}
                      {selectedClub.schedules && selectedClub.schedules.length > 0 && (
                        <>
                          <p style={{ margin: '5px 0', color: '#666' }}>
                            <strong>Schedule:</strong>
                          </p>
                          <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#666' }}>
                            {selectedClub.schedules.map((schedule, index) => (
                              <li key={index}>{schedule}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <a
                        href={`/chess-clubs/${selectedClub.slug}`}
                        style={{
                          display: 'inline-block',
                          marginTop: '10px',
                          padding: '5px 10px',
                          background: '#007bff',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '3px'
                        }}
                      >
                        View Details
                      </a>
                    </div>
                  </InfoWindow>
                )}
              </Map>
            </APIProvider>
            <div className="text-center mt-4">
              <p className="text-muted">
                Click on any pin to see club details. {clubsWithCoords.length} clubs shown on map.
                {clubsWithCoords.length > 1 && ' Use zoom and pan controls to explore the map.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
