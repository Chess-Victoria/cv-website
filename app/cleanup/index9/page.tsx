
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home9/section1'
import Section2 from '@/components/sections/home9/section2'
import Section3 from '@/components/sections/home9/section3'
import Section4 from '@/components/sections/home9/section4'
import Section5 from '@/components/sections/home9/section5'
import Section6 from '@/components/sections/home9/section6'
import Section7 from '@/components/sections/home9/section7'
export default function Home9() {

	return (
		<>
			<Layout headerStyle={9} footerStyle={9}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
			</Layout>
		</>
	)
}