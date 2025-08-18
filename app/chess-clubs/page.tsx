
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getClubPageData } from "@/lib/utils/club-page"
import PromotedClubs from "@/components/sections/chess-clubs/PromotedClubs"
import ClubsTable from "@/components/sections/chess-clubs/ClubsTable"
import ClubsMap from "@/components/sections/chess-clubs/ClubsMap"
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

// Cache the data fetching with tags for revalidation
const getCachedClubPageData = unstable_cache(
  async () => {
    return await getClubPageData();
  },
  ['chess-clubs-data'],
  {
    tags: ['chess-clubs', 'clubDetail'],
    revalidate: getRevalidationTime('CLUB_PAGE')
  }
);

export default async function ChessClubsPage() {
  const clubPageData = await getCachedClubPageData();

  if (!clubPageData) {
    return (
      <div className="schedule-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="text-center">
                <h2>Chess Clubs</h2>
                <p>No club page data found in Contentful.</p>
                <p>Please ensure the clubPage content type has been created and published.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg10.png)' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="heading1 text-center">
                    <h1>Chess Clubs in Victoria</h1>
                    <div className="space20" />
                    <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Chess Clubs</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== HERO AREA ENDS =======*/}
          
          {/*===== PROMOTED CLUBS AREA STARTS =======*/}
          {clubPageData?.promotedClubs && clubPageData.promotedClubs.length > 0 && (
            <PromotedClubs clubs={clubPageData.promotedClubs} />
          )}
          {/*===== PROMOTED CLUBS AREA ENDS =======*/}
          
          {/*===== ALL CLUBS TABLE AREA STARTS =======*/}
          {clubPageData?.allClubs && clubPageData.allClubs.length > 0  && <ClubsTable clubs={clubPageData.allClubs} />}
          {/*===== ALL CLUBS TABLE AREA ENDS =======*/}
          
          {/*===== CLUBS MAP AREA STARTS =======*/}
          {clubPageData?.allClubs && clubPageData.allClubs.length > 0 && (
            <ClubsMap clubs={clubPageData.allClubs} />
          )}
          {/*===== CLUBS MAP AREA ENDS =======*/}
          
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
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join a Chess Club Today</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
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
                        <Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join a Chess Club Today</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}