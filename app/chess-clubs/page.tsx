
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getClubPageData } from "@/lib/utils/club-page"
import PromotedClubs from "@/components/sections/chess-clubs/PromotedClubs"
import ClubsTable from "@/components/sections/chess-clubs/ClubsTable"
import ClubsMap from "@/components/sections/chess-clubs/ClubsMap"

export default async function ChessClubsPage() {
	// Fetch data from Contentful
	const clubPageData = await getClubPageData();

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/img/bg/header-bg10.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Chess Clubs in Victoria</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Chess Clubs</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					
					{/*===== PROMOTED CLUBS AREA STARTS =======*/}
					{clubPageData?.promotedClubs && clubPageData.promotedClubs.length > 0 ? (
						<PromotedClubs clubs={clubPageData.promotedClubs} />
					) : (
						<div className="choose-section-area sp2">
							<div className="container">
								<div className="row">
									<div className="col-lg-4 m-auto">
										<div className="heading2 text-center space-margin60">
											<h2>Top Clubs</h2>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-12">
										<div className="text-center">
											<p>No promoted clubs configured yet. Please create a clubPage entry in Contentful.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{/*===== PROMOTED CLUBS AREA ENDS =======*/}
					
					{/*===== ALL CLUBS TABLE AREA STARTS =======*/}
					{clubPageData?.allClubs && clubPageData.allClubs.length > 0 ? (
						<ClubsTable clubs={clubPageData.allClubs} />
					) : (
						<div className="schedule-section-area sp10">
							<div className="container">
								<div className="row">
									<div className="col-lg-11 m-auto">
										<div className="text-center">
											<h3>All Chess Clubs</h3>
											<p>No clubs configured yet. Please create a clubPage entry in Contentful with clubs data.</p>
											<p>You need to:</p>
											<ul className="list-unstyled">
												<li>1. Create a clubPage content type entry</li>
												<li>2. Add promotedClub references (featured clubs)</li>
												<li>3. Add clubs references (all clubs listing)</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
					{/*===== ALL CLUBS TABLE AREA ENDS =======*/}
					
					{/*===== CLUBS MAP AREA STARTS =======*/}
					{clubPageData?.allClubs && clubPageData.allClubs.length > 0 && (
						<ClubsMap clubs={clubPageData.allClubs} />
					)}
					{/*===== CLUBS MAP AREA ENDS =======*/}
					
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-block d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/contact" className="vl-btn1">Contact Us</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join a Chess Club Today</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CTA AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-none d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />Join a Chess Club Today</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Layout>
		</>
	)
}