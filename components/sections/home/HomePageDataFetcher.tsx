import { getHomePageData } from '@/app/home.data'
import { getPostsPageData } from '@/lib/utils/posts'
import HeroBanner from '../home1/HeroBanner'
import WelcomeBlock from '../home1/WelcomeBlock'
import EventList from '../home1/EventList'
import CommitteeList from '../home1/CommitteeList'
import ReferenceList from '../home1/ReferenceList'
import GalleryImageCarousel from '../home1/GalleryImageCarousel'
import NewsUpdate from '../home1/NewsUpdate'
import CTAWithCountdown from '../home1/CTAWithCountdown'
import Popup from '@/components/layout/Popup'

export default async function HomePageDataFetcher() {
  // Load homepage data from Contentful
  const homePageData = await getHomePageData()

  // Fetch latest 3 news items (server component, cached with ISR)
  const newsPage = await getPostsPageData(1, 3)
  
  return (
    <>
      <HeroBanner data={homePageData.heroBanner!} useDynamicCountdown={true} />
      {homePageData.welcomeBlock && (
        <WelcomeBlock data={homePageData.welcomeBlock} />
      )}
      {homePageData.eventList && <EventList data={homePageData.eventList} />}
      {homePageData.committeeList && <CommitteeList data={homePageData.committeeList} />}
      {/* {homePageData.featuredGallery?.images?.length ? (
        <GalleryImageCarousel
          title={homePageData.featuredGallery.title}
          subtitle="Our memories"
          images={homePageData.featuredGallery.images}
          link={homePageData.featuredGallery.referenceLink || '/memories'}
        />
      ) : null} */}
      <ReferenceList data={homePageData.featuredClubs!} useTextLogo />
      <NewsUpdate items={newsPage.items} />
      <CTAWithCountdown
        buttonLabel="Contact Us"
        buttonHref="/contact"
        useFeaturedEvent
      />
      
      {homePageData.popupContent && (
        <Popup 
          content={homePageData.popupContent}
          isVisible={true}
        />
      )}
    </>
  )
}
