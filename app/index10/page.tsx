
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home10/section1'
import Section2 from '@/components/sections/home10/section2'
import Section3 from '@/components/sections/home10/section3'
import Section4 from '@/components/sections/home10/section4'
import Section5 from '@/components/sections/home10/section5'
import Section6 from '@/components/sections/home10/section6'
import Section7 from '@/components/sections/home10/section7'
import Section8 from '@/components/sections/home10/section8'
export default function Home10() {

	return (
		<>
			<Layout headerStyle={10} footerStyle={10}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
				<Section7 />
				<Section8 />
			</Layout>
		</>
	)
}