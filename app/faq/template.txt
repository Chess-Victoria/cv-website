'use client'
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from "react"
export default function Faq() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i: number) => {
		setIsTab(i)
	}
	const [isAccordion, setIsAccordion] = useState(1)

const handleAccordion = (key: any) => {
    setIsAccordion(prevState => prevState === key ? null : key)
}
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/img/bg/header-bg15.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-9 m-auto">
									<div className="heading1 text-center">
										<h1>Frequently Asked Question</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Frequently Asked Question</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== FAQ AREA STARTS =======*/}
					<div className="faq-inner-section-area sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-7 m-auto">
									<div className="heading2 text-center space-margin60">
										<h2>Frequently Asked Question</h2>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-lg-11">
									<div className="faq-widget-area">
										<ul className="nav nav-pills" id="pills-tab" role="tablist">
											<li className="nav-item" onClick={() => handleTab(1)}>
												<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">All</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(2)}>
												<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Event Information</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(3)}>
												<button className={isTab == 3 ? "nav-link active" : "nav-link"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Registration &amp; Tickets</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(4)}>
												<button className={isTab == 4 ? "nav-link active" : "nav-link"} id="pills-contact1-tab" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">Event Experience</button>
											</li>
											<li className="nav-item" onClick={() => handleTab(5)}>
												<button className={isTab == 5 ? "nav-link m-0 active" : "nav-link m-0"} id="pills-contact2-tab" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">Speakers &amp; Sessions</button>
											</li>
										</ul>
										<div className="space48" />
										<div className="tab-content" id="pills-tabContent">
											<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
												<div className="faq-section-area">
													<div className="row">
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (1)}>
																			<button className={isAccordion == 1 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseOne" className={isAccordion == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (2)}>
																			<button className={isAccordion == 2 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseTwo" className={isAccordion == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (3)}>
																			<button className={isAccordion == 3 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseThree" className={isAccordion == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (4)}>
																			<button className={isAccordion == 4 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseFour" className={isAccordion == 4 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (5)}>
																			<button className={isAccordion == 5 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseFive" className={isAccordion == 5 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample2">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (6)}>
																			<button className={isAccordion == 6 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">What payment are accepted for registration?</button>
																		</h2>
																		<div id="collapseSix" className={isAccordion == 6 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (7)}>
																			<button className={isAccordion == 7 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">Can I attend only one day of the conference?</button>
																		</h2>
																		<div id="collapseSeven" className={isAccordion == 7 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (8)}>
																			<button className={isAccordion == 8 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">How can I updated on event announcements?</button>
																		</h2>
																		<div id="collapseEight" className={isAccordion == 8 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (9)}>
																			<button className={isAccordion == 9 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="false" aria-controls="collapseNine">How do I download the event app?</button>
																		</h2>
																		<div id="collapseNine" className={isAccordion == 9 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (10)}>
																			<button className={isAccordion == 10 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">Can I suggest or speakers for future events?</button>
																		</h2>
																		<div id="collapseTen" className={isAccordion == 10 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
												<div className="faq-section-area">
													<div className="row">
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample3">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (11)}>
																			<button className={isAccordion == 11 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="true" aria-controls="collapseEleven">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseEleven" className={isAccordion == 11 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (12)}>
																			<button className={isAccordion == 12 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseTwelve" className={isAccordion == 12 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (13)}>
																			<button className={isAccordion == 13 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="false" aria-controls="collapseThirteen">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseThirteen" className={isAccordion == 13 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (14)}>
																			<button className={isAccordion == 14 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseFourteen" className={isAccordion == 14 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (15)}>
																			<button className={isAccordion == 15 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseFifteen" className={isAccordion == 15 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample4">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (16)}>
																			<button className={isAccordion == 16 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtysix" aria-expanded="true" aria-controls="collapseThirtysix">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseThirtysix" className={isAccordion == 16 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (17)}>
																			<button className={isAccordion == 17 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtyseven" aria-expanded="false" aria-controls="collapseThirtyseven">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseThirtyseven" className={isAccordion == 17 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (18)}>
																			<button className={isAccordion == 18 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtyeight" aria-expanded="false" aria-controls="collapseThirtyeight">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseThirtyeight" className={isAccordion == 18 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (19)}>
																			<button className={isAccordion == 19 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtynine" aria-expanded="false" aria-controls="collapseThirtynine">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseThirtynine" className={isAccordion == 19 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (20)}>
																			<button className={isAccordion == 20 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourty" aria-expanded="false" aria-controls="collapseFourty">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseFourty" className={isAccordion == 20 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
												<div className="faq-section-area">
													<div className="row">
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample5">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (21)}>
																			<button className={isAccordion == 21 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixteen" aria-expanded="true" aria-controls="collapseSixteen">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseSixteen" className={isAccordion == 21 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample5">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (22)}>
																			<button className={isAccordion == 22 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeventeen" aria-expanded="false" aria-controls="collapseSeventeen">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseSeventeen" className={isAccordion == 22 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample5">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (23)}>
																			<button className={isAccordion == 23 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEightteen" aria-expanded="false" aria-controls="collapseEightteen">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseEightteen" className={isAccordion == 23 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample5">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (24)}>
																			<button className={isAccordion == 24 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseNineteen" aria-expanded="false" aria-controls="collapseNineteen">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseNineteen" className={isAccordion == 24 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample5">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (25)}>
																			<button className={isAccordion == 25 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwenty" aria-expanded="false" aria-controls="collapseTwenty">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseTwenty" className={isAccordion == 25 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample5">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample6">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (26)}>
																			<button className={isAccordion == 26 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyone" aria-expanded="true" aria-controls="collapseFourtyone">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseFourtyone" className={isAccordion == 26 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample6">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (27)}>
																			<button className={isAccordion == 27 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtytwo" aria-expanded="false" aria-controls="collapseFourtytwo">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseFourtytwo" className={isAccordion == 27 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample6">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (28)}>
																			<button className={isAccordion == 28 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtythree" aria-expanded="false" aria-controls="collapseFourtythree">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseFourtythree" className={isAccordion == 28 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample6">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (29)}>
																			<button className={isAccordion == 29 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyfour" aria-expanded="false" aria-controls="collapseFourtyfour">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseFourtyfour" className={isAccordion == 29 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample6">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (30)}>
																			<button className={isAccordion == 30 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyfive" aria-expanded="false" aria-controls="collapseFourtyfive">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseFourtyfive" className={isAccordion == 30 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample6">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className={isTab == 4 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab" tabIndex={0}>
												<div className="faq-section-area">
													<div className="row">
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample7">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (31)}>
																			<button className={isAccordion == 31 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentyone" aria-expanded="true" aria-controls="collapseTwentyone">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseTwentyone" className={isAccordion == 31 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample7">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (32)}>
																			<button className={isAccordion == 32 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentytwo" aria-expanded="false" aria-controls="collapseTwentytwo">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseTwentytwo" className={isAccordion == 32 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample7">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (33)}>
																			<button className={isAccordion == 33 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentythree" aria-expanded="false" aria-controls="collapseTwentythree">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseTwentythree" className={isAccordion == 33 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample7">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (34)}>
																			<button className={isAccordion == 34 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentyfour" aria-expanded="false" aria-controls="collapseTwentyfour">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseTwentyfour" className={isAccordion == 34 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample7">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (35)}>
																			<button className={isAccordion == 35 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentyfive" aria-expanded="false" aria-controls="collapseTwentyfive">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseTwentyfive" className={isAccordion == 35 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample7">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample8">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (36)}>
																			<button className={isAccordion == 36 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtySix" aria-expanded="true" aria-controls="collapseFourtySix">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseFourtySix" className={isAccordion == 36 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample8">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (37)}>
																			<button className={isAccordion == 37 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtySeven" aria-expanded="false" aria-controls="collapseFourtySeven">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseFourtySeven" className={isAccordion == 37 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample8">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (38)}>
																			<button className={isAccordion == 38 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyEight" aria-expanded="false" aria-controls="collapseFourtyEight">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseFourtyEight" className={isAccordion == 38 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample8">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (39)}>
																			<button className={isAccordion == 39 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyNine" aria-expanded="false" aria-controls="collapseFourtyNine">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseFourtyNine" className={isAccordion == 39 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample8">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (40)}>
																			<button className={isAccordion == 40 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourtyTen" aria-expanded="false" aria-controls="collapseFourtyTen">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseFourtyTen" className={isAccordion == 40 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample8">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div className={isTab == 5 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact2-tab" tabIndex={0}>
												<div className="faq-section-area">
													<div className="row">
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample9">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (41)}>
																			<button className={isAccordion == 41 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentysix" aria-expanded="true" aria-controls="collapseTwentysix">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseTwentysix" className={isAccordion == 41 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample9">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (42)}>
																			<button className={isAccordion == 42 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentyseven" aria-expanded="false" aria-controls="collapseTwentyseven">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseTwentyseven" className={isAccordion == 42 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample9">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (43)}>
																			<button className={isAccordion == 43 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentyeight" aria-expanded="false" aria-controls="collapseTwentyeight">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseTwentyeight" className={isAccordion == 43 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample9">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (44)}>
																			<button className={isAccordion == 44 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwentynine" aria-expanded="false" aria-controls="collapseTwentynine">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseTwentynine" className={isAccordion == 44 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample9">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (45)}>
																			<button className={isAccordion == 45 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirty" aria-expanded="false" aria-controls="collapseThirty">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseThirty" className={isAccordion == 45 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample9">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div className="col-lg-6">
															<div className="accordian-area">
																<div className="accordion" id="accordionExample10">
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (46)}>
																			<button className={isAccordion == 46 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtyone" aria-expanded="true" aria-controls="collapseThirtyone">What is Eventify, and who is it for?</button>
																		</h2>
																		<div id="collapseThirtyone" className={isAccordion == 46 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample10">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (47)}>
																			<button className={isAccordion == 47 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtytwo" aria-expanded="false" aria-controls="collapseThirtytwo">When and where is Eventify 2024 taking place?</button>
																		</h2>
																		<div id="collapseThirtytwo" className={isAccordion == 47 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample10">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (48)}>
																			<button className={isAccordion == 48 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtythree" aria-expanded="false" aria-controls="collapseThirtythree">How much does it cost to attend Eventify 2024?</button>
																		</h2>
																		<div id="collapseThirtythree" className={isAccordion == 48 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample10">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (49)}>
																			<button className={isAccordion == 49 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtyfour" aria-expanded="false" aria-controls="collapseThirtyfour">Will there be networking opportunities Eventify?</button>
																		</h2>
																		<div id="collapseThirtyfour" className={isAccordion == 49 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample10">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																	<div className="space20" />
																	<div className="accordion-item">
																		<h2 className="accordion-header"onClick={() => handleAccordion (50)}>
																			<button className={isAccordion == 50 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirtyfive" aria-expanded="false" aria-controls="collapseThirtyfive">How can I access session materials after event?</button>
																		</h2>
																		<div id="collapseThirtyfive" className={isAccordion == 50 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample10">
																			<div className="accordion-body">
																				<p>Eventify 2024 will be held on 26 at USA , located in New York. Full event details, including timings and venue information, will be provided after registration.</p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== FAQ AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-block d-block">
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
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
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
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
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