'use client'
import Link from 'next/link'
import { useState } from "react"

export default function Section3() {
	const [isTab, setIsTab] = useState(1)
	const handleTab = (i: number) => {
		setIsTab(i)
	}
	return (
		<>

			<div className="event8-section-area sp1" style={{ backgroundImage: 'url(assets/img/bg/header-bg20.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="event8-header space-margin60">
								<div className="heading11">
									<h5>economy event schedule</h5>
									<div className="space18" />
									<h2 className="text-anime-style-3">Our Event Schedule</h2>
								</div>
								<div className="tabs-button">
									<ul className="nav nav-pills" id="pills-tab" role="tablist">
										<li className="nav-item" onClick={() => handleTab(1)}>
											<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
												<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /></span>
												<span className="pl-8">
													<span className="day">Day One</span>
													<span className="date">May 25, 2024</span>
												</span>
											</button>
										</li>
										<li className="nav-item" onClick={() => handleTab(2)}>
											<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
												<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /></span>
												<span className="pl-8">
													<span className="day">Day Two</span>
													<span className="date">May 26, 2024</span>
												</span>
											</button>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
							<div className="tab-content" id="pills-tabContent">
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>Morning Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head">The Future Of Crypto &amp;
																	Blockchain</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img21.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space80" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>Afternoon Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head"> Building On Blockchain
																	Participate</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img22.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space80" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>night Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head">The Next Big Crypto
																	Project Watch</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img23.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space50" />
									</div>
								</div>
								<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>Morning Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head">The Future Of Crypto &amp;
																	Blockchain</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img21.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space80" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>Afternoon Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head"> Building On Blockchain
																	Participate</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img22.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space80" />
										<div className="row">
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<div className="row align-items-center">
														<div className="col-lg-7">
															<div className="content-area">
																<h5>night Classes</h5>
																<div className="space20" />
																<Link href="/event-single" className="head">The Next Big Crypto
																	Project Watch</Link>
																<div className="space20" />
																<p>Join us at the premier crypto event of 2025, where industry
																	leaders, innovators, and visionaries come together to shape.
																</p>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn8"><span className="demo">Buy Ticket Now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
																</div>
															</div>
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img23.png" alt="" />
															</div>
														</div>
														<div className="space24" />
														<div className="col-gl-12">
															<div className="list">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="author-area">
																	<p>Speakers:</p>
																	<img src="/assets/img/all-images/event/event-img24.png" alt="" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space50" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
