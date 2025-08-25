import { getClubPageData } from "@/lib/utils/club-page"
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'
import PromotedClubs from './PromotedClubs'
import ClubsTable from './ClubsTable'
import ClubsMap from './ClubsMap'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

// Cache the data fetching with tags for revalidation
const getCachedClubPageData = unstable_cache(
  async () => {
    return await getClubPageData("chess-club-in-victoria");
  },
  ['chess-clubs-data'],
  {
    tags: ['chess-clubs', 'club-page'],
    revalidate: getRevalidationTime('CLUB_PAGE')
  }
);

export default async function ChessClubsPageDataFetcher() {
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
      <div className='pt-5'></div>
      
      {/* Promoted Clubs Section */}
      {clubPageData?.promotedClubs && clubPageData.promotedClubs.length > 0 && (
        <PromotedClubs clubs={clubPageData.promotedClubs} />
      )}
      
      {/* All Clubs Table Section */}
      {clubPageData?.allClubs && clubPageData.allClubs.length > 0 && (
        <ClubsTable clubs={clubPageData.allClubs} />
      )}
      
      {/* Clubs Map Section */}
      {clubPageData?.allClubs && clubPageData.allClubs.length > 0 && (
        <ClubsMap clubs={clubPageData.allClubs} />
      )}
      
      <CTAWithCountdown
        buttonLabel="Contact Us"
        buttonHref="/contact"
        useFeaturedEvent
      />
    </>
  )
}
