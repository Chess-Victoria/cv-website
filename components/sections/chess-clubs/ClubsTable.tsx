'use client';

import React from "react";
import Link from "next/link";
import { ClubListItem } from "@/lib/types/club-page";

interface ClubsTableProps {
  clubs: ClubListItem[];
}

export default function ClubsTable({ clubs }: ClubsTableProps) {
  const [selectedFilter, setSelectedFilter] = React.useState<string | null>(null);

  if (!clubs || clubs.length === 0) {
    return (
      <div className="schedule-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="text-center">
                <p>No clubs available at the moment.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Generate A-Z filter buttons
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Get available letters (clubs that start with each letter)
  const availableLetters = new Set<string>();
  clubs.forEach(club => {
    const firstLetter = club.name.charAt(0).toUpperCase();
    if (alphabet.includes(firstLetter)) {
      availableLetters.add(firstLetter);
    }
  });

  // Filter clubs based on selected letter
  const filteredClubs = selectedFilter 
    ? clubs.filter(club => club.name.charAt(0).toUpperCase() === selectedFilter)
    : clubs;

  return (
    <div className="schedule-section-area sp10">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 m-auto">
            {/* Header Section */}
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="heading2 text-center space-margin60">
                  <h2>All Chess Clubs</h2>
                  <p>Find a chess club near you in Victoria</p>
                </div>
              </div>
            </div>

            {/* A-Z Filter Buttons */}
            <div className="row mb-4">
              <div className="col-lg-12">
                <div className="text-center">
                  <div className="filter-buttons">
                    {alphabet.map(letter => {
                      const isAvailable = availableLetters.has(letter);
                      const isSelected = selectedFilter === letter;
                      
                      return (
                        <button
                          key={letter}
                          onClick={() => setSelectedFilter(isSelected ? null : letter)}
                          className={`filter-btn ${isSelected ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                          disabled={!isAvailable}
                          style={{
                            margin: '2px',
                            padding: '8px 12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            backgroundColor: isSelected ? '#A02BBD' : (isAvailable ? '#fff' : '#f5f5f5'),
                            color: isSelected ? '#fff' : (isAvailable ? '#333' : '#999'),
                            cursor: isAvailable ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            fontWeight: isSelected ? 'bold' : 'normal'
                          }}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                  {selectedFilter && (
                    <div className="mt-3">
                      <button
                        onClick={() => setSelectedFilter(null)}
                        style={{
                          padding: '6px 12px',
                          border: '1px solid #A02BBD',
                          borderRadius: '4px',
                          backgroundColor: 'transparent',
                          color: '#A02BBD',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Clear Filter
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="row mb-3">
              <div className="col-lg-12">
                <div className="text-center">
                  <p>
                    {selectedFilter 
                      ? `Showing ${filteredClubs.length} club${filteredClubs.length !== 1 ? 's' : ''} starting with "${selectedFilter}"`
                      : `Showing all ${clubs.length} clubs`
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Clubs Table */}
            <div className="schedule">
              <table>
                <thead>
                  <tr>
                    <th>Club Name</th>
                    <th>Location</th>
                    <th>Contact</th>
                    <th>Weekly Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClubs.map((club) => (
                    <tr key={club.id}>
                      <td>
                        <Link href={`/chess-clubs/${club.slug}`} style={{ color: '#A02BBD', textDecoration: 'none', fontWeight: 'bold' }}>
                          {club.name}
                        </Link>
                        {club.website && (
                          <div>
                            <a 
                              href={club.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-muted"
                              style={{ fontSize: '12px' }}
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </td>
                      <td>
                        {club.location?.address || 'Not specified'}
                      </td>
                      <td>
                        {club.contact ? (
                          <div>
                            <strong>{club.contact.name}</strong>
                            {club.contact.email && <div>Email: {club.contact.email}</div>}
                            {club.contact.phone && <div>Phone: {club.contact.phone}</div>}
                          </div>
                        ) : (
                          'Not specified'
                        )}
                      </td>
                      <td>
                        {club.schedules && club.schedules.length > 0 ? (
                          <ul className="list-unstyled mb-0">
                            {club.schedules.map((schedule, index) => (
                              <li key={index}>{schedule}</li>
                            ))}
                          </ul>
                        ) : (
                          'Not specified'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results Message */}
            {selectedFilter && filteredClubs.length === 0 && (
              <div className="row mt-4">
                <div className="col-lg-12">
                  <div className="text-center">
                    <p>No clubs found starting with "{selectedFilter}". Try selecting a different letter or clear the filter.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
