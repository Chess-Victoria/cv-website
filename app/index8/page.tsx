
import Layout from "@/components/layout/Layout"
import Section1 from '@/components/sections/home8/section1'
import Section2 from '@/components/sections/home8/section2'
import Section3 from '@/components/sections/home8/section3'
import Section4 from '@/components/sections/home8/section4'
import Section5 from '@/components/sections/home8/section5'
import Section6 from '@/components/sections/home8/section6'
export default function Home8() {

	return (
		<>
			<Layout headerStyle={8} footerStyle={8}>
				<Section1 />
				<Section2 />
				<Section3 />
				<Section4 />
				<Section5 />
				<Section6 />
			</Layout>
		</>
	)
}