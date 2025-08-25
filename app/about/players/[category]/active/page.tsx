import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getACFPlayersData, Player } from "@/lib/utils/acf-ratings"
import { getFideRatingMap } from '@/lib/utils/fide-ratings'
import PageHeadContent from '@/components/elements/PageHeadContent'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

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

// ISR revalidation - static value for Next.js 15
export const revalidate = 2592000; // 30 days (86400 * 30)

export default async function TopActivePlayersPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES[categorySlug];

  if (!category) {
    notFound();
  }

  let filteredPlayers: Player[] = [];
  let fideMap: Record<string, { rating?: number; ratingMonth?: string }> = {}
  let error: string | null = null;

  try {
    const allPlayers = await getACFPlayersData();

    // Build category filter (replicates logic from ratings util)
    const categoryFilters: Record<string, (player: Player) => boolean> = {
      'all': (player: Player) => true,
      'u8': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 8,
      'u10': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 10,
      'u12': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 12,
      'u14': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 14,
      'u16': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 16,
      'u18': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 18,
      'u20': (player: Player) => player.dateOfBirth !== '0000/00/00' && player.age < 20,
      'girls-u8': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 8,
      'girls-u10': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 10,
      'girls-u12': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 12,
      'girls-u14': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 14,
      'girls-u16': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 16,
      'girls-u18': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 18,
      'girls-u20': (player: Player) => player.gender === 'f' && player.dateOfBirth !== '0000/00/00' && player.age < 20,
      'top-female': (player: Player) => player.gender === 'f'
    };

    const categoryFilter = categoryFilters[categorySlug] || (() => true);

    filteredPlayers = allPlayers
      .filter(categoryFilter)
      .filter(p => p.active)
      .filter(p => p.nationalRating > 0)
      .sort((a, b) => b.nationalRating - a.nationalRating)
      .slice(0, 100);

    fideMap = await getFideRatingMap();
  } catch (err) {
    console.error('Error fetching players:', err);
    error = err instanceof Error ? err.message : 'Failed to load player data';
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={`Top Active Players - ${category.name}`}
          backgroundImage="/assets/img/bg/header-bg8.png"
          breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }, { name: 'Players', link: '/about/players' }, { name: category.name, link: `/about/players/${categorySlug}` }, { name: 'Active', link: `/about/players/${categorySlug}/active` }]}
        />

        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Top Victorian Players - {category.name} (Active)</h2>
                  <p>Showing only players listed as Active by ACF.</p>
                  <div className="alert alert-info mt-3" role="alert">
                    <i className="fa-solid fa-info-circle me-2"></i>
                    <strong>Active status:</strong> Based on ACF "Players Active" list. Ratings are updated periodically.
                  </div>
                  <div className="mt-2">
                    <Link href={`/about/players/${categorySlug}`} className="text-decoration-none">
                      <i className="fa-solid fa-arrow-left me-1"></i> Back to {category.name}
                    </Link>
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
                          <p>Please try again later.</p>
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
                                      <th className="text-center">FIDE Rating</th>
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
                  ) : (
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="text-center">
                          <h3>No Active Players Found</h3>
                          <p>There are currently no active players in this category.</p>
                          <p>
                            View all players in this category:{' '}
                            <Link href={`/about/players/${categorySlug}`} className="text-primary text-decoration-underline">Back to {category.name}</Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-10 m-auto">
              <div className="text-center mt-3 mb-5">
                <p className="mb-0">
                  Not in the list?{' '}
                  <a href="/players/search" className="text-primary text-decoration-underline">You can search all Victorian players here</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          useFeaturedEvent
        />
      </div>
    </Layout>
  )
}


