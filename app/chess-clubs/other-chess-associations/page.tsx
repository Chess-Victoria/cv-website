
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getClubPageData } from "@/lib/utils/club-page"
import PromotedClubs from "@/components/sections/chess-clubs/PromotedClubs"
import ClubsTable from "@/components/sections/chess-clubs/ClubsTable"
import ClubsMap from "@/components/sections/chess-clubs/ClubsMap"
import PageHeadContent from '@/components/elements/PageHeadContent'
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

// Cache the data fetching with tags for revalidation
const getCachedClubPageData = unstable_cache(
  async () => {
    return await getClubPageData("other-chess-associations");
  },
  ['chess-clubs-data'],
  {
    tags: ['chess-assocition', 'clubDetail'],
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
          <PageHeadContent
            title="Other Chess Associations"
            backgroundImage="/assets/img/bg/header-bg10.png"
            breadcrumbs={[
              { name: "Home", link: "/" },
              { name: "Other Chess Associations", link: "/chess-clubs/other-chess-associations" }
            ]}
          />

          <div className='pt-5'></div>
          {/*===== HERO AREA ENDS =======*/}
          
          {/*===== PROMOTED CLUBS AREA STARTS =======*/}
          {clubPageData?.promotedClubs && clubPageData.promotedClubs.length > 0 && (
            <PromotedClubs clubs={clubPageData.promotedClubs} />
          )}
          {/*===== PROMOTED CLUBS AREA ENDS =======*/}
          
          {/*===== ALL CLUBS TABLE AREA STARTS =======*/}
          {clubPageData?.allClubs && clubPageData.allClubs.length > 0  && <ClubsTable clubs={clubPageData.allClubs} title="All Chess Associations" />}
          {/*===== ALL CLUBS TABLE AREA ENDS =======*/}
          
          {/*===== CLUBS MAP AREA STARTS =======*/}
          {clubPageData?.allClubs && clubPageData.allClubs.length > 0 && (
            <ClubsMap clubs={clubPageData.allClubs} />
          )}
          {/*===== CLUBS MAP AREA ENDS =======*/}
          
          {/*===== CTA AREA STARTS =======*/}
          <CTAWithCountdown
						buttonLabel="Contact Us"
						buttonHref="/contact"
						useFeaturedEvent
					/>
        </div>

      </Layout>
    </>
  )
}