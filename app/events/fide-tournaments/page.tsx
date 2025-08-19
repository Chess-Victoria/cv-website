import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"

// Interface for FIDE tournament data
interface FideTournament {
  id: string;
  name: string;
  date: string;
  city: string;
  country: string;
}

// Function to fetch FIDE tournaments data
async function getFideTournaments(): Promise<FideTournament[]> {
  try {
    const response = await fetch('https://ratings.fide.com/a_tournaments.php?country=AUS&period=current', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      next: { revalidate: parseInt(process.env.REVALIDATE_EVENT || (process.env.NODE_ENV === 'development' ? '10' : '3600')) }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // The FIDE API returns an array of arrays
    // Each tournament is: [id, name, city, type, date, empty, month, month_date, empty]
    let tournaments = [];
    if (Array.isArray(data)) {
      tournaments = data;
    } else if (data && typeof data === 'object') {
      // If data is an object, try to extract tournaments from common properties
      tournaments = data.tournaments || data.data || data.results || [];
    }
    
    // Ensure tournaments is an array
    if (!Array.isArray(tournaments)) {
      return [];
    }
    
    // Filter for Melbourne tournaments and transform data
    const melbourneTournaments = tournaments
      .filter((tournament: any) => {
        // Handle array format: [id, name, city, type, date, empty, month, month_date, empty]
        if (Array.isArray(tournament)) {
          const city = tournament[2]; // city is at index 2
          return city && city.toLowerCase().includes('melbourne');
        }
        // Handle object format (fallback)
        const hasCity = tournament && tournament.city;
        return hasCity && tournament.city.toLowerCase().includes('melbourne');
      })
      .map((tournament: any) => {
        // Handle array format: [id, name, city, type, date, empty, month, month_date, empty]
        if (Array.isArray(tournament)) {
          return {
            id: tournament[0] || 'N/A',
            name: tournament[1] || 'Unknown Tournament',
            date: tournament[4] || 'TBD', // date is at index 4
            city: tournament[2] || 'Melbourne',
            country: 'AUS'
          };
        }
        // Handle object format (fallback)
        return {
          id: tournament.id || tournament.tournament_id || tournament.fide_id || 'N/A',
          name: tournament.name || tournament.tournament_name || tournament.title || 'Unknown Tournament',
          date: tournament.date || tournament.start_date || tournament.tournament_date || 'TBD',
          city: tournament.city || 'Melbourne',
          country: tournament.country || 'AUS'
        };
      });

    return melbourneTournaments;
  } catch (error) {
    console.error('Error fetching FIDE tournaments:', error);
    return [];
  }
}

export default async function FideTournamentsPage() {
  // Fetch FIDE tournaments data
  const tournaments = await getFideTournaments();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>FIDE Tournaments</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/events">Events</Link> <i className="fa-solid fa-angle-right" /> <span>FIDE Tournaments</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/*===== HERO AREA ENDS =======*/}
        {/*===== FIDE TOURNAMENTS AREA STARTS =======*/}
        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>FIDE Rated Tournaments in Melbourne</h2>
                  <p>Official FIDE tournaments taking place in Victoria</p>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {tournaments.length > 0 ? (
                    <div className="schedule-section-area">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-11 m-auto">
                            <div className="schedule">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Tournament Name</th>
                                    <th>FIDE ID</th>
                                    <th>Date</th>
                                    <th>Location</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {tournaments.map((tournament, index) => (
                                    <tr key={tournament.id}>
                                      <td>
                                        <strong>{tournament.name}</strong>
                                      </td>
                                      <td>
                                        <code>{tournament.id}</code>
                                      </td>
                                      <td>
                                        {tournament.date}
                                      </td>
                                      <td>
                                        {tournament.city}, {tournament.country}
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
                          <h3>No FIDE Tournaments Available</h3>
                          <p>There are currently no FIDE tournaments scheduled in Melbourne.</p>
                          <p>Please check back later or visit the <a href="https://ratings.fide.com/a_tournaments.php?country=AUS&period=current" target="_blank" rel="noopener noreferrer">official FIDE website</a> for more information.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== FIDE TOURNAMENTS AREA ENDS =======*/}
        
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
                        Organize a Tournament
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
                        Organize a Tournament
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
