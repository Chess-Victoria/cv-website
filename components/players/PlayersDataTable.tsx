import { Player } from "@/lib/utils/acf-ratings"

interface PlayersDataTableProps {
  players: Player[];
  fideMap: Record<string, { rating?: number; ratingMonth?: string }>;
  error: string | null;
  categorySlug: string;
  categoryName: string;
  isActivePage?: boolean;
}

export default function PlayersDataTable({ 
  players, 
  fideMap, 
  error, 
  categorySlug, 
  categoryName,
  isActivePage = false 
}: PlayersDataTableProps) {
  if (error) {
    return (
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="text-center">
            <h3>Error Loading Player Data</h3>
            <p className="text-danger">{error}</p>
            <p>Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="row">
        <div className="col-lg-10 m-auto">
          <div className="text-center">
            <h3>{isActivePage ? 'No Active Players Found' : 'No Players Found'}</h3>
            <p>
              {isActivePage 
                ? 'There are currently no active players in this category.'
                : 'There are currently no players in this category.'
              }
            </p>
            {isActivePage ? (
              <p>
                View all players in this category:{' '}
                <a href={`/about/players/${categorySlug}`} className="text-primary text-decoration-underline">
                  Back to {categoryName}
                </a>
              </p>
            ) : (
              <p>Please check back later or visit the <a href="https://auschess.org.au/rating-lists/" target="_blank" rel="noopener noreferrer">ACF rating lists</a> for more information.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="schedule-section-area mobile-table">
      <div className="container">
        <div className="row">
          <div className="col-lg-11 m-auto">
            <div className="schedule">
              {/* Desktop Table */}
              <div className="table-responsive d-none d-lg-block">
                <table className="table table-bordered table-sm simple-table">
                  <thead>
                    <tr>
                      <th className="text-center">Rank</th>
                      <th>Name</th>
                      <th className="text-center">Title</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Rating</th>
                      <th className="text-center">ACF ID</th>
                      <th className="text-center">FIDE Rating</th>
                      <th className="text-center">FIDE ID</th>
                      <th className="text-center">State</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => (
                      <tr key={player.nationalId}>
                        <td className="text-center">
                          <strong>{index + 1}</strong>
                        </td>
                        <td>
                          <strong className="text-break">{player.name}</strong>
                        </td>
                        <td className="text-center">
                          {player.title && player.title.trim() ? (
                            <span className="badge bg-success text-white">{player.title}</span>
                          ) : null}
                        </td>
                        <td className="text-center">
                          {player.age === 0 ? 'N/A' : player.age}
                        </td>
                        <td className="text-center">
                          <span className="badge bg-primary text-white">{player.nationalRating}</span>
                        </td>
                        <td className="text-center">
                          <code className="text-dark small">{player.nationalId}</code>
                        </td>
                        <td className="text-center">
                          {player.fideId && player.fideId !== '0' && fideMap[player.fideId]?.rating ? (
                            <span className="badge bg-dark text-white">{fideMap[player.fideId]?.rating}</span>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="text-center">
                          {player.fideId && player.fideId !== '0' ? (
                            <a 
                              href={`https://ratings.fide.com/profile/${player.fideId}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-primary text-decoration-none"
                            >
                              <code className="text-primary small">{player.fideId}</code>
                              <i className="fa-solid fa-external-link-alt ms-1" style={{fontSize: '0.7em'}}></i>
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                        <td className="text-center">
                          <span className="text-dark">{player.state}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Table */}
              <div className="d-lg-none">
                <table className="table table-bordered table-sm" style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{display: 'table-row'}}>
                      <th style={{width: '13%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rank</th>
                      <th style={{width: '49%', textAlign: 'left', padding: '8px 4px', border: '1px solid #dee2e6'}}>Name</th>
                      <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rating</th>
                      <th style={{width: '19%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>FIDE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => (
                      <tr key={player.nationalId}>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          <strong>{index + 1}</strong>
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'left', paddingLeft: '8px'}}>
                          {player.fideId && player.fideId !== '0' ? (
                            <a
                              href={`https://ratings.fide.com/profile/${player.fideId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              {player.title && player.title.trim() ? (
                                <span className="badge bg-success text-white" style={{fontSize: '0.7em', marginRight: '4px'}}>{player.title}</span>
                              ) : null}
                              <strong className="text-primary">{player.name}</strong>
                            </a>
                          ) : (
                            <>
                              {player.title && player.title.trim() ? (
                                <span className="badge bg-success text-white" style={{fontSize: '0.7em', marginRight: '4px'}}>{player.title}</span>
                              ) : null}
                              <strong>{player.name}</strong>
                            </>
                          )}
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          <span className="badge bg-primary text-white">{player.nationalRating}</span>
                        </td>
                        <td style={{display: 'table-cell', verticalAlign: 'middle', padding: '8px 4px', border: '1px solid #dee2e6', textAlign: 'center'}}>
                          {player.fideId && player.fideId !== '0' && fideMap[player.fideId]?.rating ? (
                            <a
                              href={`https://ratings.fide.com/profile/${player.fideId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-decoration-none"
                            >
                              <span className="badge bg-dark text-white">{fideMap[player.fideId]?.rating}</span>
                            </a>
                          ) : (
                            <span className="text-muted">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
