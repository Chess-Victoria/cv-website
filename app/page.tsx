import Layout from "@/components/layout/Layout"
import Popup from '@/components/layout/Popup'
import HeroBanner from '@/components/sections/home1/HeroBanner'
import Section2 from '@/components/sections/home1/section2'
import EventList from '@/components/sections/home1/EventList'
import CommitteeList from '@/components/sections/home1/CommitteeList'
import ReferenceList from '@/components/sections/home1/ReferenceList'
import Section5 from '@/components/sections/home1/section5'
import Section6 from '@/components/sections/home1/section6'
import Section8 from '@/components/sections/home1/section8'
import Section9 from '@/components/sections/home1/section9'
import { getHomePageData } from './home.data'
import { hardcodedCommitteeListData } from './committee-list.data'
import { hardcodedSponsorsListData } from './sponsors-list.data'

export default async function Home() {
	// Load homepage data from Contentful
	const homePageData = await getHomePageData()
	
	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<HeroBanner data={homePageData.heroBanner!} />
				<Section2 />
				{homePageData.eventList ? (
					<EventList data={homePageData.eventList} />
				) : (
					<div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#f8f9fa' }}>
						<h3>Event List Not Available</h3>
						<p>No scheduled events data found. Please check Contentful configuration.</p>
						<p>Debug: homePageData.eventList is {homePageData.eventList ? 'defined' : 'undefined'}</p>
					</div>
				)}
				{homePageData.committeeList ? (
					<CommitteeList data={homePageData.committeeList} />
				) : (
					<CommitteeList data={hardcodedCommitteeListData} />
				)}
				<Section5 />
				<Section6 />
				<ReferenceList data={homePageData.featuredClubs!} />
				<Section8 />
				<Section9 />
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