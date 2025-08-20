
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home6/section1'
import Section10 from '@/components/sections/home6/section10'
import Section2 from '@/components/sections/home6/section2'
import Section3 from '@/components/sections/home6/section3'
import Section4 from '@/components/sections/home6/section4'
import Section5 from '@/components/sections/home6/section5'
import Section6 from '@/components/sections/home6/section6'
import Section7 from '@/components/sections/home6/section7'
import Section8 from '@/components/sections/home6/section8'
import Section9 from '@/components/sections/home6/section9'
export default function Home6() {

	return (
		<>
			<Layout headerStyle={6} footerStyle={6}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
				<Section9 />
				<Section10 />
			</Layout>
		</>
	)
}