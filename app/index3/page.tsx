
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home3/section1'
import Section10 from '@/components/sections/home3/section10'
import Section2 from '@/components/sections/home3/section2'
import Section3 from '@/components/sections/home3/section3'
import Section4 from '@/components/sections/home3/section4'
import Section5 from '@/components/sections/home3/section5'
import Section6 from '@/components/sections/home3/section6'
import Section7 from '@/components/sections/home3/section7'
import Section8 from '@/components/sections/home3/section8'
import Section9 from '@/components/sections/home3/section9'
export default function Home3() {

	return (
		<>
			<Layout headerStyle={3} footerStyle={3}>
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