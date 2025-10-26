import { getAboutPageData } from '@/lib/utils/about-page'
import AboutContent from './AboutContent'
import ChessClubSlider from '@/components/slider/ChessClubSlider'
//import PagesGrid from './PagesGrid'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

export default async function AboutPageDataFetcher() {
  const aboutPageData = await getAboutPageData()

  return (
    <>
      <AboutContent overviewBlock={aboutPageData.overviewBlock} />
      
      {/* Chess Clubs Section */}
      <div className="brands3-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 m-auto">
              <div className="brand-header heading4 space-margin60 text-center">
                <h3>{aboutPageData.clubList?.title || 'Chess Clubs in Victoria'}</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
              <ChessClubSlider clubData={aboutPageData.clubList} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Pages Grid Section 
      <div className="choose-section-area sp2">
        <PagesGrid pages={aboutPageData.pages} />
      </div>
      */}
      <CTAWithCountdown
        buttonLabel="Contact Us"
        buttonHref="/contact"
        useFeaturedEvent
      />
    </>
  )
}
