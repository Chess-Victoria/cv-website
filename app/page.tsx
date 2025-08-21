import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import Popup from '@/components/layout/Popup'
import HeroBanner from '@/components/sections/home1/HeroBanner'
import WelcomeBlock from '@/components/sections/home1/WelcomeBlock'
import EventList from '@/components/sections/home1/EventList'
import CommitteeList from '@/components/sections/home1/CommitteeList'
import ReferenceList from '@/components/sections/home1/ReferenceList'
import GalleryImageCarousel from '@/components/sections/home1/GalleryImageCarousel'
import NewsUpdate from '@/components/sections/home1/NewsUpdate'
import { getHomePageData } from './home.data'
import CTAWithCountdown from "@/components/sections/home1/CTAWithCountdown"
import { generateHomeMetadata } from './metadata'

// Generate metadata using the new system
export async function generateMetadata(): Promise<Metadata> {
  const homePageData = await getHomePageData()
  return generateHomeMetadata(homePageData.metadata)
}

// Removed hardcoded fallbacks for production cleanliness

export default async function Home() {
	// Load homepage data from Contentful
	const homePageData = await getHomePageData()

	// Fetch latest 3 news items (server component, cached with ISR)
	const { getPostsPageData } = await import('@/lib/utils/posts')
	const newsPage = await getPostsPageData(1, 3)
	
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<HeroBanner data={homePageData.heroBanner!} />
				{homePageData.welcomeBlock && (
					<WelcomeBlock data={homePageData.welcomeBlock} />
				)}
				{homePageData.eventList && <EventList data={homePageData.eventList} />}
				{homePageData.committeeList && <CommitteeList data={homePageData.committeeList} />}
				{homePageData.featuredGallery?.images?.length ? (
					<GalleryImageCarousel
						title={homePageData.featuredGallery.title}
						subtitle="Our memories"
						images={homePageData.featuredGallery.images}
						link={homePageData.featuredGallery.referenceLink || '/memories'}
					/>
				) : null}
				<ReferenceList data={homePageData.featuredClubs!} useTextLogo />
				<NewsUpdate items={newsPage.items} />
				<CTAWithCountdown
					buttonLabel="Contact Us"
					buttonHref="/contact"
					useFeaturedEvent
				/>
			</Layout>
			
			{homePageData.popupContent && (
				<Popup 
					content={homePageData.popupContent}
					isVisible={true}
				/>
			)}
		</>
	)
}