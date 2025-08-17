
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getCommitteePageData } from "@/lib/utils/committee"
import CommitteeList from "@/components/sections/committee/CommitteeList"

export default async function CommitteesPage() {
  // Fetch committee data from Contentful
  const committeeLists = await getCommitteePageData();

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg6.png)' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-5 m-auto">
                  <div className="heading1 text-center">
                    <h1>Our Committees</h1>
                    <div className="space20" />
                    <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Our Committees</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== HERO AREA ENDS =======*/}

          {/*===== COMMITTEE LISTS AREA STARTS =======*/}
          {committeeLists.length > 0 ? (
            committeeLists.map((committee) => (
              <CommitteeList key={committee.id} committee={committee} />
            ))
          ) : (
            <div className="team-sperkers-section-area sp1">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 m-auto">
                    <div className="heading2 text-center space-margin60">
                      <h2>No Committees Found</h2>
                      <p>No current committee lists are available.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/*===== COMMITTEE LISTS AREA ENDS =======*/}

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
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join Our Committee</Link>
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
                        <Link href="/contact" className="vl-btn1">Contact Us</Link>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join Our Committee</Link>
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