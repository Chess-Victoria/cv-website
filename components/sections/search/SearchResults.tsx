'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'news' | 'chess-club' | 'committee-member' | 'event' | 'page';
  slug: string;
  url: string;
  date?: string;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
  type?: string | null;
}

interface SearchResultsProps {
  query: string;
  type?: string;
}

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'news':
      return 'fa-newspaper';
    case 'chess-club':
      return 'fa-chess-board';
    case 'committee-member':
      return 'fa-user-tie';
    case 'event':
      return 'fa-calendar';
    case 'page':
      return 'fa-file-alt';
    default:
      return 'fa-file';
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'news':
      return 'News';
    case 'chess-club':
      return 'Chess Club';
    case 'committee-member':
      return 'Committee Member';
    case 'event':
      return 'Event';
    case 'page':
      return 'Page';
    default:
      return 'Content';
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return '';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return '';
  }
};

export default function SearchResults({ query, type }: SearchResultsProps) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      setError('Please enter at least 2 characters to search');
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchUrl = type 
          ? `/api/search?q=${encodeURIComponent(query.trim())}&type=${encodeURIComponent(type)}`
          : `/api/search?q=${encodeURIComponent(query.trim())}`;
        const response = await fetch(searchUrl);
        const data: SearchResponse = await response.json();

        if (response.ok) {
          setResults(data.results);
          if (data.results.length === 0) {
            const typeLabel = type ? getTypeLabel(type) : 'content';
            setError(`No ${typeLabel.toLowerCase()} found for "${query}"`);
          }
        } else {
          setError('Search failed. Please try again.');
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Searching for "{query}"...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="alert alert-info" role="alert">
          <i className="fa-solid fa-info-circle me-2"></i>
          {error}
        </div>
        {query && (
          <div className="mt-4">
            <p>Try searching for different keywords or browse our content:</p>
            <div className="space24" />
            {!type && (
              <>
                <div className="btn-area1">
                  <Link href="/news" className="vl-btn1">Browse News</Link>
                </div>
                <div className="space16" />
                <div className="btn-area1">
                  <Link href="/events" className="vl-btn1">Browse Events</Link>
                </div>
                <div className="space16" />
                <div className="btn-area1">
                  <Link href="/chess-clubs" className="vl-btn1">Browse Clubs</Link>
                </div>
                <div className="space16" />
                <div className="btn-area1">
                  <Link href="/committees" className="vl-btn1">Browse Committees</Link>
                </div>
              </>
            )}
            {type === 'news' && (
              <div className="btn-area1">
                <Link href="/news" className="vl-btn1">Browse All News</Link>
              </div>
            )}
            {type === 'event' && (
              <div className="btn-area1">
                <Link href="/events" className="vl-btn1">Browse All Events</Link>
              </div>
            )}
            {type === 'chess-club' && (
              <div className="btn-area1">
                <Link href="/chess-clubs" className="vl-btn1">Browse All Clubs</Link>
              </div>
            )}
            {type === 'committee-member' && (
              <div className="btn-area1">
                <Link href="/committees" className="vl-btn1">Browse All Committees</Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="search-results">
      {results.length > 0 && (
        <div className="mb-4">
          <h3>
            Found {results.length} {type ? getTypeLabel(type).toLowerCase() : 'result'}{results.length !== 1 ? 's' : ''} for "{query}"
            {type && <span className="badge bg-primary ms-2">{getTypeLabel(type)}</span>}
          </h3>
        </div>
      )}

      <div className="search-results-list">
        {results.map((result) => (
          <div key={result.id} className="search-result-item card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-start">
                <div className="me-3">
                  <i className={`fa-solid ${getTypeIcon(result.type)} text-primary`} style={{ fontSize: '1.5rem' }}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">
                      <Link href={result.url} className="text-decoration-none">
                        {result.title}
                      </Link>
                    </h5>
                    <span className="badge bg-secondary">{getTypeLabel(result.type)}</span>
                  </div>
                  
                  {result.description && (
                    <p className="card-text text-muted mb-2">
                      {result.description.length > 150 
                        ? `${result.description.substring(0, 150)}...` 
                        : result.description
                      }
                    </p>
                  )}
                  
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      <i className="fa-solid fa-calendar me-1"></i>
                      {formatDate(result.date)}
                    </small>
                    <Link href={result.url} className="btn btn-sm btn-outline-primary">
                      View Details <i className="fa-solid fa-arrow-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-muted">
            Can't find what you're looking for? Try different keywords or browse our content.
          </p>
          <div className="space24" />
          {!type && (
            <>
              <div className="btn-area1">
                <Link href="/news" className="vl-btn1">Browse News</Link>
              </div>
              <div className="space16" />
              <div className="btn-area1">
                <Link href="/events" className="vl-btn1">Browse Events</Link>
              </div>
              <div className="space16" />
              <div className="btn-area1">
                <Link href="/chess-clubs" className="vl-btn1">Browse Clubs</Link>
              </div>
              <div className="space16" />
              <div className="btn-area1">
                <Link href="/committees" className="vl-btn1">Browse Committees</Link>
              </div>
            </>
          )}
          {type === 'news' && (
            <div className="btn-area1">
              <Link href="/news" className="vl-btn1">Browse All News</Link>
            </div>
          )}
          {type === 'event' && (
            <div className="btn-area1">
              <Link href="/events" className="vl-btn1">Browse All Events</Link>
            </div>
          )}
          {type === 'chess-club' && (
            <div className="btn-area1">
              <Link href="/chess-clubs" className="vl-btn1">Browse All Clubs</Link>
            </div>
          )}
          {type === 'committee-member' && (
            <div className="btn-area1">
              <Link href="/committees" className="vl-btn1">Browse All Committees</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
