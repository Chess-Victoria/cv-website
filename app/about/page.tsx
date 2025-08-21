import { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import Layout from "@/components/layout/Layout"
import ChessClubSlider from '@/components/slider/ChessClubSlider'
import PagesGrid from '@/components/sections/about/PagesGrid'
import PageHeadContent from '@/components/elements/PageHeadContent'
import { getAboutPageData } from '@/lib/utils/about-page'
import AboutContent from '@/components/sections/about/AboutContent'

export const metadata: Metadata = {
  title: "About Chess Victoria | Our Mission, Vision & Chess Community",
  description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria. Discover our history, values, and commitment to fostering a vibrant chess community.",
  keywords: "about chess Victoria, chess Victoria mission, chess Victoria vision, chess community Victoria, chess organization Australia",
  openGraph: {
    title: "About Chess Victoria | Our Mission, Vision & Chess Community",
    description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria. Discover our history, values, and commitment to fostering a vibrant chess community.",
    type: 'website',
    		url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/about`,
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'About Chess Victoria',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "About Chess Victoria | Our Mission, Vision & Chess Community",
    description: "Learn about Chess Victoria's mission to promote chess growth, inclusion, and excellence across Victoria.",
    images: ['/assets/img/logo/cvlogo.png'],
  },
  	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/about`,
	},
}

export const revalidate = 604800 // 7 days

export default async function About() {
  const aboutPageData = await getAboutPageData()

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<PageHeadContent
						title="About Chess Victoria"
						backgroundImage="/assets/img/bg/header-bg5.png"
						breadcrumbs={[
							{ name: "Home", link: "/" },
							{ name: "About Us", link: "/about" }
						]}
					/>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== ABOUT AREA STARTS =======*/}
					<Suspense fallback={<div>Loading...</div>}>
						<AboutContent overviewBlock={aboutPageData.overviewBlock} />
					</Suspense>
					{/*===== ABOUT AREA ENDS =======*/}
					{/*===== OTHERS AREA STARTS =======*/}
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
					{/*===== OTHERS AREA ENDS =======*/}
					{/*===== OTHERS AREA STARTS =======*/}
					<div className="choose-section-area sp2">
						<PagesGrid pages={aboutPageData.pages} />

					</div>
					{/*===== OTHERS AREA ENDS =======*/}
					{/*===== CTA AREA =======*/}
					<CTAWithCountdown
						buttonLabel="Contact Us"
						buttonHref="/contact"
						useFeaturedEvent
					/>
				</div>

			</Layout>
		</>
	)
}