
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home2/section1'
import Section2 from '@/components/sections/home2/section2'
import Section3 from '@/components/sections/home2/section3'
import Section4 from '@/components/sections/home2/section4'
import Section5 from '@/components/sections/home2/section5'
import Section6 from '@/components/sections/home2/section6'
import Section7 from '@/components/sections/home2/section7'
import Section8 from '@/components/sections/home2/section8'
import Section9 from '@/components/sections/home2/section9'
export default function Home2() {

	return (
		<>
			<Layout headerStyle={2} footerStyle={2}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
				<Section9 />
			</Layout>
		</>
	)
}