'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { ClubListItem } from '@/lib/types/club-page'
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps'

interface ClubsMapProps {
  clubs: ClubListItem[];
}

interface ClubMapMarker {
  id: string;
  club: ClubListItem;
  location: NonNullable<ClubListItem['location']>;
}

export default function ClubsMap({ clubs }: ClubsMapProps) {
  const [selectedMarker, setSelectedMarker] = useState<ClubMapMarker | null>(null)
  const [camera, setCamera] = useState({
    center: { lat: -37.8136, lng: 144.9631 }, // Default to Melbourne
    zoom: 10
  })
  const initializedRef = useRef(false)

  const clubsWithAnyLocation = useMemo(() => {
    return clubs.filter((club) => {
      const hasPrimary = typeof club.location?.lat === 'number' && typeof club.location?.lon === 'number'
      const hasSecondary = typeof club.secondaryLocation?.lat === 'number' && typeof club.secondaryLocation?.lon === 'number'
      return hasPrimary || hasSecondary
    })
  }, [clubs])

  const markers = useMemo(() => {
    return clubsWithAnyLocation.flatMap((club) => {
      const clubMarkers: ClubMapMarker[] = []

      if (typeof club.location?.lat === 'number' && typeof club.location?.lon === 'number') {
        clubMarkers.push({
          id: `${club.id}-primary`,
          club,
          location: club.location
        })
      }

      if (typeof club.secondaryLocation?.lat === 'number' && typeof club.secondaryLocation?.lon === 'number') {
        clubMarkers.push({
          id: `${club.id}-secondary`,
          club,
          location: club.secondaryLocation
        })
      }

      return clubMarkers
    })
  }, [clubsWithAnyLocation])

  // Debug logs removed for production

  // Calculate initial center point (average of all coordinates)
  const initialCenter = useMemo(() => {
    if (markers.length === 0) {
      return { lat: -37.8136, lng: 144.9631 } // Default to Melbourne
    }

    const centerLat = markers.reduce((sum, marker) => sum + marker.location.lat, 0) / markers.length
    const centerLng = markers.reduce((sum, marker) => sum + marker.location.lon, 0) / markers.length

    return { lat: centerLat, lng: centerLng }
  }, [markers])

  // Initialize camera state only once when clubs data is first available
  useEffect(() => {
    if (markers.length > 0 && !initializedRef.current) {
      setCamera({
        center: initialCenter,
        zoom: markers.length === 1 ? 12 : 10
      })
      initializedRef.current = true
    }
  }, [markers.length, initialCenter])

  if (markers.length === 0) {
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
                      secondaryLocation: club.secondaryLocation,
                      hasCoords: !!(
                        (typeof club.location?.lat === 'number' && typeof club.location?.lon === 'number') ||
                        (typeof club.secondaryLocation?.lat === 'number' && typeof club.secondaryLocation?.lon === 'number')
                      )
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
                {markers.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={{ lat: marker.location.lat, lng: marker.location.lon }}
                    title={marker.location.label ? `${marker.club.name} - ${marker.location.label}` : marker.club.name}
                    onClick={() => setSelectedMarker(marker)}
                  />
                ))}

                {selectedMarker && (
                  <InfoWindow
                    position={{ lat: selectedMarker.location.lat, lng: selectedMarker.location.lon }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div style={{ padding: '10px', maxWidth: '250px' }}>
                      <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '16px' }}>
                        {selectedMarker.club.name}
                      </h3>
                      {selectedMarker.location.label && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Pin:</strong> {selectedMarker.location.label}
                        </p>
                      )}
                      {selectedMarker.location.address && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Address:</strong> {selectedMarker.location.address}
                        </p>
                      )}
                      {selectedMarker.club.contact?.phone && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Phone:</strong>{' '}
                          <a href={`tel:${selectedMarker.club.contact.phone}`} style={{ color: '#007bff' }}>
                            {selectedMarker.club.contact.phone}
                          </a>
                        </p>
                      )}
                      {selectedMarker.club.contact?.email && (
                        <p style={{ margin: '5px 0', color: '#666' }}>
                          <strong>Email:</strong>{' '}
                          <a href={`mailto:${selectedMarker.club.contact.email}`} style={{ color: '#007bff' }}>
                            {selectedMarker.club.contact.email}
                          </a>
                        </p>
                      )}
                      {selectedMarker.club.schedules && selectedMarker.club.schedules.length > 0 && (
                        <>
                          <p style={{ margin: '5px 0', color: '#666' }}>
                            <strong>Schedule:</strong>
                          </p>
                          <ul style={{ margin: '5px 0', paddingLeft: '20px', color: '#666' }}>
                            {selectedMarker.club.schedules.map((schedule, index) => (
                              <li key={index}>{schedule}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      <a
                        href={`/chess-clubs/${selectedMarker.club.slug}`}
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
                Click on any pin to see club details. {markers.length} pins shown across {clubsWithAnyLocation.length} clubs.
                {markers.length > 1 && ' Use zoom and pan controls to explore the map.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
