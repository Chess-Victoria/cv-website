'use client'
import { useEffect, useMemo, useState } from 'react'
import { algoliasearch } from 'algoliasearch'

interface AlgoliaPlayer {
  objectID: string
  name: string
  state: string
  dateOfBirth: string
  gender: string
  title: string
  fideId: string
  nationalId: string
  nationalRating: number
  nationalElo: number
  age: number
  fideRating?: number
  fideRatingMonth?: string
  lastUpdated: string
}

interface AlgoliaSearchResponse {
  hits: AlgoliaPlayer[]
  nbHits: number
  page: number
  nbPages: number
  hitsPerPage: number
  query: string
}

export default function PlayersSearchClient() {
  const [queryInput, setQueryInput] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AlgoliaSearchResponse | null>(null)
  const hitsPerPage = 50

  // Initialize Algolia search client
  const searchClient = useMemo(() => {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
    const searchKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY
    const indexName = process.env.NEXT_PUBLIC_ALGOLIA_PLAYERS_INDEX_NAME || 'players'

    if (!appId || !searchKey) {
      console.error('Algolia configuration missing')
      return null
    }

    return algoliasearch(appId, searchKey)
  }, [])

  // Debounce query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(queryInput.trim())
    }, 400)
    return () => clearTimeout(handler)
  }, [queryInput])

  // Reset to first page when query changes
  useEffect(() => {
    setPage(1)
  }, [debouncedQuery])

  // Search with Algolia
  useEffect(() => {
    if (!searchClient) {
      setError('Search service not configured')
      return
    }

    let ignore = false
    setLoading(true)
    setError(null)

    searchClient.searchSingleIndex({
      indexName: process.env.NEXT_PUBLIC_ALGOLIA_PLAYERS_INDEX_NAME || 'players',
      searchParams: {
        query: debouncedQuery,
        page: page - 1, // Algolia uses 0-based pagination
        hitsPerPage,
        attributesToRetrieve: [
          'objectID', 'name', 'state', 'dateOfBirth', 'gender', 'title',
          'fideId', 'nationalId', 'nationalRating', 'nationalElo', 'age',
          'fideRating', 'fideRatingMonth', 'lastUpdated'
        ],
        attributesToHighlight: ['name'],
        highlightPreTag: '<mark>',
        highlightPostTag: '</mark>'
      }
    })
    .then((response: any) => {
      if (ignore) return
      setData({
        hits: response.hits,
        nbHits: response.nbHits,
        page: response.page + 1, // Convert back to 1-based pagination
        nbPages: response.nbPages,
        hitsPerPage: response.hitsPerPage,
        query: debouncedQuery
      })
    })
    .catch(err => {
      if (ignore) return
      setError('Failed to search players')
      console.error('Algolia search error:', err)
    })
    .finally(() => {
      if (!ignore) setLoading(false)
    })

    return () => { ignore = true }
  }, [debouncedQuery, page, searchClient])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDebouncedQuery(queryInput.trim())
    setPage(1)
  }

  return (
    <div className="row">
      <div className="col-lg-12 m-auto">
        <div className="event-widget-area">
          <div className="row mb-3">
            <div className="col-lg-8 col-md-10 m-auto">
              <form onSubmit={onSubmit} className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by player name..."
                  value={queryInput}
                  onChange={(e) => setQueryInput(e.target.value)}
                />
                <button type="submit" className="vl-btn1">Search</button>
              </form>
            </div>
          </div>

          {loading && (
            <div className="text-center">Loading...</div>
          )}
          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {data && data.hits && (
            <div className="schedule-section-area mobile-table">
              <div className="container">
                <div className="row">
                  <div className="col-lg-11 m-auto">
                    <div className="schedule">
                      {/* Desktop */}
                      <div className="table-responsive d-none d-lg-block">
                        <table className="table table-bordered table-sm simple-table">
                          <thead>
                            <tr>
                              <th className="text-center">#</th>
                              <th>Name</th>
                              <th className="text-center">Title</th>
                              <th className="text-center">Age</th>
                              <th className="text-center">Rating</th>
                              <th className="text-center">FIDE Rating</th>
                              <th className="text-center">ACF ID</th>
                              <th className="text-center">FIDE ID</th>
                              <th className="text-center">State</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.hits.map((p: AlgoliaPlayer, idx: number) => (
                              <tr key={`${p.nationalId}-${idx}`}>
                                <td className="text-center">{(data.page - 1) * data.hitsPerPage + idx + 1}</td>
                                <td><strong className="text-break">{p.name}</strong></td>
                                <td className="text-center">{p.title?.trim() ? (<span className="badge bg-success text-white">{p.title.trim()}</span>) : null}</td>
                                <td className="text-center">{p.age}</td>
                                <td className="text-center"><span className="badge bg-primary text-white">{p.nationalRating}</span></td>
                                <td className="text-center">
                                  {p.fideId && p.fideId !== '0' && p.fideRating ? (
                                    <a href={`https://ratings.fide.com/profile/${p.fideId}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                      <span className="badge bg-dark text-white">{p.fideRating}</span>
                                    </a>
                                  ) : (<span className="text-muted">-</span>)}
                                </td>
                                <td className="text-center"><code className="text-dark small">{p.nationalId}</code></td>
                                <td className="text-center">
                                  {p.fideId && p.fideId !== '0' ? (
                                    <a href={`https://ratings.fide.com/profile/${p.fideId}`} target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none">
                                      <code className="text-primary small">{p.fideId}</code>
                                      <i className="fa-solid fa-external-link-alt ms-1" style={{fontSize: '0.7em'}}></i>
                                    </a>
                                  ) : (<span className="text-muted">-</span>)}
                                </td>
                                <td className="text-center">{p.state}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Mobile */}
                      <div className="d-lg-none">
                        <table className="table table-bordered table-sm" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr style={{display: 'table-row'}}>
                              <th style={{width: '13%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>#</th>
                              <th style={{width: '49%', textAlign: 'left', padding: '8px 4px', border: '1px solid #dee2e6'}}>Name</th>
                              <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rating</th>
                              <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>FIDE</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.hits.map((p: AlgoliaPlayer, idx: number) => (
                              <tr key={`${p.nationalId}-${idx}`}>
                                <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>{(data.page - 1) * data.hitsPerPage + idx + 1}</td>
                                <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'left', paddingLeft: '8px'}}>
                                  {p.fideId && p.fideId !== '0' ? (
                                    <a href={`https://ratings.fide.com/profile/${p.fideId}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                      {p.title?.trim() ? (<span className="badge bg-success text-white" style={{fontSize: '0.7em', marginRight: '4px'}}>{p.title.trim()}</span>) : null}
                                      <strong className="text-primary">{p.name}</strong>
                                    </a>
                                  ) : (
                                    <>
                                      {p.title?.trim() ? (<span className="badge bg-success text-white" style={{fontSize: '0.7em', marginRight: '4px'}}>{p.title.trim()}</span>) : null}
                                      <strong>{p.name}</strong>
                                    </>
                                  )}
                                </td>
                                <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                                  <span className="badge bg-primary text-white">{p.nationalRating}</span>
                                </td>
                                <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                                  {p.fideId && p.fideId !== '0' && p.fideRating ? (
                                    <a href={`https://ratings.fide.com/profile/${p.fideId}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                                      <span className="badge bg-dark text-white">{p.fideRating}</span>
                                    </a>
                                  ) : (<span className="text-muted">-</span>)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      <div className="d-flex justify-content-center align-items-center gap-2 mt-3">
                        <button className="vl-btn1" disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
                        <span>Page {data.page} of {data.nbPages}</span>
                        <button className="vl-btn1" disabled={page >= (data.nbPages || 1)} onClick={() => setPage(p => p + 1)}>Next</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


