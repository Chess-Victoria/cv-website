import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getPlayersByTitle, Player } from "@/lib/utils/acf-ratings"
import { getRevalidationTime } from '@/lib/config'

interface TitleCategory {
  id: string;
  name: string;
  description: string;
}

const TITLE_CATEGORIES: Record<string, TitleCategory> = {
  'cm': { id: 'cm', name: 'Candidate Master (CM)', description: 'Players with Candidate Master title' },
  'fm': { id: 'fm', name: 'FIDE Master (FM)', description: 'Players with FIDE Master title' },
  'im': { id: 'im', name: 'International Master (IM)', description: 'Players with International Master title' },
  'gm': { id: 'gm', name: 'Grandmaster (GM)', description: 'Players with Grandmaster title' },
  'wcm': { id: 'wcm', name: 'Woman Candidate Master (WCM)', description: 'Female players with Woman Candidate Master title' },
  'wfm': { id: 'wfm', name: 'Woman FIDE Master (WFM)', description: 'Female players with Woman FIDE Master title' },
  'wim': { id: 'wim', name: 'Woman International Master (WIM)', description: 'Female players with Woman International Master title' },
  'wgm': { id: 'wgm', name: 'Woman Grandmaster (WGM)', description: 'Female players with Woman Grandmaster title' }
};

// ISR revalidation
export const revalidate = getRevalidationTime('ACF_RATINGS') || 86400 * 30; // 30 days default

export default async function TitlePlayersPage({ params }: { params: { title: string } }) {
  const titleCategory = TITLE_CATEGORIES[params.title.toLowerCase()];

  if (!titleCategory) {
    notFound();
  }

  let filteredPlayers: Player[] = [];
  let error: string | null = null;

  try {
    filteredPlayers = await getPlayersByTitle(params.title.toUpperCase());
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
                  <h1>Top Players - {titleCategory.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/about">About</Link> <i className="fa-solid fa-angle-right" /> <Link href="/about/players">Players</Link> <i className="fa-solid fa-angle-right" /> <span>{titleCategory.name}</span></Link>
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
                  <h2>Top Victorian Players - {titleCategory.name}</h2>
                  <p>{titleCategory.description}</p>
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
                                          <span className="badge bg-success text-white">{player.title.trim()}</span>
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
                          <p>There are currently no players with the {titleCategory.name} title.</p>
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
