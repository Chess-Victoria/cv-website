import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPlayersByCategory, Player } from "@/lib/utils/acf-ratings" // Import Player and getPlayersByCategory
import { getRevalidationTime } from '@/lib/config'

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
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>Top Players - {category.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/about">About</Link> <i className="fa-solid fa-angle-right" /> <Link href="/about/players">Players</Link> <i className="fa-solid fa-angle-right" /> <span>{category.name}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
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
                    <div className="schedule-section-area">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-11 m-auto">
                            <div className="schedule">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Rank</th>
                                    <th>Name</th>
                                    <th>Title</th>
                                    <th>Age</th>
                                    <th>National Rating</th>
                                    <th>ACF ID</th>
                                    <th>FIDE ID</th>
                                    <th>State</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredPlayers.map((player, index) => (
                                    <tr key={player.nationalId}>
                                      <td>
                                        <strong>{index + 1}</strong>
                                      </td>
                                      <td>
                                        <strong>{player.name}</strong>
                                      </td>
                                      <td>
                                        {player.title && player.title.trim() ? (
                                          <span className="badge bg-success text-white">{player.title}</span>
                                        ) : null}
                                      </td>
                                      <td>
                                        {player.age}
                                      </td>
                                      <td>
                                        <span className="badge bg-primary text-white">{player.nationalRating}</span>
                                      </td>
                                      <td>
                                        <code className="text-dark">{player.nationalId}</code>
                                      </td>
                                      <td>
                                        {player.fideId && player.fideId !== '0' ? (
                                          <a 
                                            href={`https://ratings.fide.com/profile/${player.fideId}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary text-decoration-none"
                                          >
                                            <code className="text-primary">{player.fideId}</code>
                                            <i className="fa-solid fa-external-link-alt ms-1" style={{fontSize: '0.8em'}}></i>
                                          </a>
                                        ) : (
                                          <span className="text-muted">-</span>
                                        )}
                                      </td>
                                      <td>
                                        <span className="text-dark">{player.state}</span>
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
