import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getRevalidationTime } from '@/lib/config'

// Available categories organized by type
const OPEN_CATEGORIES = [
  {
    id: 'all',
    name: 'All Players',
    description: 'All Victorian players',
    url: '/about/players/all'
  },
  {
    id: 'u8',
    name: 'Under 8',
    description: 'Players under 8 years old',
    url: '/about/players/u8'
  },
  {
    id: 'u10',
    name: 'Under 10',
    description: 'Players under 10 years old',
    url: '/about/players/u10'
  },
  {
    id: 'u12',
    name: 'Under 12',
    description: 'Players under 12 years old',
    url: '/about/players/u12'
  },
  {
    id: 'u14',
    name: 'Under 14',
    description: 'Players under 14 years old',
    url: '/about/players/u14'
  },
  {
    id: 'u16',
    name: 'Under 16',
    description: 'Players under 16 years old',
    url: '/about/players/u16'
  },
  {
    id: 'u18',
    name: 'Under 18',
    description: 'Players under 18 years old',
    url: '/about/players/u18'
  },
  {
    id: 'u20',
    name: 'Under 20',
    description: 'Players under 20 years old',
    url: '/about/players/u20'
  }
];

const FEMALE_CATEGORIES = [
  {
    id: 'top-female',
    name: 'Top Female Players',
    description: 'All female players in Victoria',
    url: '/about/players/top-female'
  },
  {
    id: 'girls-u8',
    name: 'Girls Under 8',
    description: 'Female players under 8 years old',
    url: '/about/players/girls-u8'
  },
  {
    id: 'girls-u10',
    name: 'Girls Under 10',
    description: 'Female players under 10 years old',
    url: '/about/players/girls-u10'
  },
  {
    id: 'girls-u12',
    name: 'Girls Under 12',
    description: 'Female players under 12 years old',
    url: '/about/players/girls-u12'
  },
  {
    id: 'girls-u14',
    name: 'Girls Under 14',
    description: 'Female players under 14 years old',
    url: '/about/players/girls-u14'
  },
  {
    id: 'girls-u16',
    name: 'Girls Under 16',
    description: 'Female players under 16 years old',
    url: '/about/players/girls-u16'
  },
  {
    id: 'girls-u18',
    name: 'Girls Under 18',
    description: 'Female players under 18 years old',
    url: '/about/players/girls-u18'
  },
  {
    id: 'girls-u20',
    name: 'Girls Under 20',
    description: 'Female players under 20 years old',
    url: '/about/players/girls-u20'
  }
];

// ISR revalidation
export const revalidate = getRevalidationTime('ACF_RATINGS') || 86400 * 30; // 30 days default

export default async function PlayersPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg8.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>Top Players</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/about">About</Link> <i className="fa-solid fa-angle-right" /> <span>Players</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/*===== PLAYERS CATEGORIES AREA STARTS =======*/}
        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Top Victorian Players</h2>
                  <p>View top players by category based on ACF ratings</p>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-lg-12 m-auto">
                <div className="event-widget-area">
                  {/* Desktop Layout - Side by Side */}
                  <div className="d-none d-lg-block">
                    <div className="row">
                      {/* Open/Male Categories */}
                      <div className="col-lg-6">
                        <div className="schedule-section-area">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="schedule">
                                  <h3 className="text-center mb-4">Open Categories</h3>
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Category</th>
                                        <th>Description</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {OPEN_CATEGORIES.map((category) => (
                                        <tr key={category.id}>
                                          <td>
                                            <Link href={category.url} className="text-decoration-none">
                                              <strong className="text-primary">{category.name}</strong>
                                            </Link>
                                          </td>
                                          <td>
                                            {category.description}
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
                      
                      {/* Female Categories */}
                      <div className="col-lg-6">
                        <div className="schedule-section-area">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="schedule">
                                  <h3 className="text-center mb-4">Female Categories</h3>
                                  <table className="table table-bordered">
                                    <thead>
                                      <tr>
                                        <th>Category</th>
                                        <th>Description</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {FEMALE_CATEGORIES.map((category) => (
                                        <tr key={category.id}>
                                          <td>
                                            <Link href={category.url} className="text-decoration-none">
                                              <strong className="text-primary">{category.name}</strong>
                                            </Link>
                                          </td>
                                          <td>
                                            {category.description}
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
                    </div>
                  </div>
                  
                  {/* Mobile Layout - Single Table */}
                  <div className="d-lg-none">
                    <div className="schedule-section-area">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-11 m-auto">
                            <div className="schedule">
                              <table className="table table-bordered">
                                <thead>
                                  <tr>
                                    <th>Category</th>
                                    <th>Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {[...OPEN_CATEGORIES, ...FEMALE_CATEGORIES].map((category) => (
                                    <tr key={category.id}>
                                      <td>
                                        <Link href={category.url} className="text-decoration-none">
                                          <strong className="text-primary">{category.name}</strong>
                                        </Link>
                                      </td>
                                      <td>
                                        {category.description}
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== PLAYERS CATEGORIES AREA ENDS =======*/}
        
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
