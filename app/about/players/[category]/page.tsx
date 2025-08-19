import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPlayersByCategory, Player } from "@/lib/utils/acf-ratings" // Import Player and getPlayersByCategory
import { getRevalidationTime } from '@/lib/config'
import PageHeadContent from '@/components/elements/PageHeadContent'

interface Category {
  id: string;
  name: string;
  description: string;
}

const CATEGORIES: Record<string, Category> = {
  'all': { id: 'all', name: 'All Players', description: 'All Victorian players' },
  'u8': { id: 'u8', name: 'Under 8', description: 'Players under 8 years old' },
  'u10': { id: 'u10', name: 'Under 10', description: 'Players under 10 years old' },
  'u12': { id: 'u12', name: 'Under 12', description: 'Players under 12 years old' },
  'u14': { id: 'u14', name: 'Under 14', description: 'Players under 14 years old' },
  'u16': { id: 'u16', name: 'Under 16', description: 'Players under 16 years old' },
  'u18': { id: 'u18', name: 'Under 18', description: 'Players under 18 years old' },
  'u20': { id: 'u20', name: 'Under 20', description: 'Players under 20 years old' },
  'girls-u8': { id: 'girls-u8', name: 'Girls Under 8', description: 'Female players under 8 years old' },
  'girls-u10': { id: 'girls-u10', name: 'Girls Under 10', description: 'Female players under 10 years old' },
  'girls-u12': { id: 'girls-u12', name: 'Girls Under 12', description: 'Female players under 12 years old' },
  'girls-u14': { id: 'girls-u14', name: 'Girls Under 14', description: 'Female players under 14 years old' },
  'girls-u16': { id: 'girls-u16', name: 'Girls Under 16', description: 'Female players under 16 years old' },
  'girls-u18': { id: 'girls-u18', name: 'Girls Under 18', description: 'Female players under 18 years old' },
  'girls-u20': { id: 'girls-u20', name: 'Girls Under 20', description: 'Female players under 20 years old' },
  'top-female': { id: 'top-female', name: 'Top Female Players', description: 'All female players in Victoria' }
};

// ISR revalidation
export const revalidate = getRevalidationTime('ACF_RATINGS') || 86400 * 30; // 30 days default

export default async function TopPlayersPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES[params.category];

  if (!category) {
    notFound();
  }

  let filteredPlayers: Player[] = [];
  let error: string | null = null;

  try {
    filteredPlayers = await getPlayersByCategory(params.category);
  } catch (err) {
    console.error('Error fetching players:', err);
    error = err instanceof Error ? err.message : 'Failed to load player data';
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={`Top Players - ${category.name}`}
          backgroundImage="/assets/img/bg/header-bg8.png"
          breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }, { name: 'Players', link: '/about/players' }, { name: category.name, link: `/about/players/${params.category}` }]}
        />

        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Top Victorian Players - {category.name}</h2>
                  <p>{category.description}</p>
                  <div className="alert alert-info mt-3" role="alert">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    <strong>Data Source:</strong> This data is based on official ACF (Australian Chess Federation) ratings. 
                    Ratings are updated periodically and reflect the most recent official standings.
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {error ? (
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="text-center">
                          <h3>Error Loading Player Data</h3>
                          <p className="text-danger">{error}</p>
                          <p>Please try again later or contact support if the problem persists.</p>
                          <p>You can also visit the <a href="https://auschess.org.au/rating-lists/" target="_blank" rel="noopener noreferrer">ACF rating lists</a> directly for more information.</p>
                        </div>
                      </div>
                    </div>
                  ) : filteredPlayers.length > 0 ? (
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
                                      <th className="text-center">FIDE ID</th>
                                      <th className="text-center">State</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredPlayers.map((player, index) => (
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
                                          {player.age}
                                        </td>
                                        <td className="text-center">
                                          <span className="badge bg-primary text-white">{player.nationalRating}</span>
                                        </td>
                                        <td className="text-center">
                                          <code className="text-dark small">{player.nationalId}</code>
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
                                      <th style={{width: '15%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rank</th>
                                      <th style={{width: '65%', textAlign: 'left', padding: '8px 4px', border: '1px solid #dee2e6'}}>Name</th>
                                      <th style={{width: '20%', textAlign: 'center', padding: '8px 4px', border: '1px solid #dee2e6'}}>Rating</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {filteredPlayers.map((player, index) => (
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
                  ) : (
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="text-center">
                          <h3>No Players Found</h3>
                          <p>There are currently no players in this category.</p>
                          <p>Please check back later or visit the <a href="https://auschess.org.au/rating-lists/" target="_blank" rel="noopener noreferrer">ACF rating lists</a> for more information.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-block d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Join Chess Victoria
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CTA AREA ENDS =======*/}
        
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-none d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Join Chess Victoria
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
