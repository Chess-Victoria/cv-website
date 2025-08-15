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

			<div className="event9-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="event2-header heading12 text-center space-margin60">
								<h5>Event Schedule</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Our Events Schedule Plan</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12" data-aos="fade-up" data-aos-duration={1000}>
							<div className="tabs-button space-margin60">
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
									<li className="nav-item" onClick={() => handleTab(3)}>
										<button className={isTab == 3 ? "nav-link m-0 active" : "nav-link m-0"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
											<span className="calender"><img src="/assets/img/icons/calender2.svg" alt="" /> </span>
											<span className="pl-8">
												<span className="day">Day Three</span>
												<span className="date">May 27, 2024</span>
											</span>
										</button>
									</li>
								</ul>
							</div>
							<div className="tab-content" id="pills-tabContent">
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img4.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space48" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">02</h1>
													<div className="row align-items-center">
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
															<div className="space30 d-lg-none d-block" />
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img5.png" alt="" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img6.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
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
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img4.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space48" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">02</h1>
													<div className="row align-items-center">
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
															<div className="space30 d-lg-none d-block" />
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img5.png" alt="" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img6.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
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
									<div className="event-widget-area">
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">01</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img4.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space48" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">02</h1>
													<div className="row align-items-center">
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
																</div>
															</div>
															<div className="space30 d-lg-none d-block" />
														</div>
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img5.png" alt="" />
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="space30" />
										<div className="row">
											<div className="col-lg-1" />
											<div className="col-lg-10 m-auto">
												<div className="event2-boxarea box1">
													<h1 className="active">03</h1>
													<div className="row align-items-center">
														<div className="col-lg-5">
															<div className="img1">
																<img src="/assets/img/all-images/event/event-img6.png" alt="" />
															</div>
														</div>
														<div className="col-lg-1" />
														<div className="col-lg-6">
															<div className="content-area">
																<ul>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
																	</li>
																	<li>
																		<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
																	</li>
																</ul>
																<div className="space20" />
																<Link href="/event-single" className="head">Elevate User Experience
																	Expertise</Link>
																<div className="space24" />
																<div className="author-area">
																	<div className="autho-name-area">
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alex Roberton</Link>
																			<div className="space8" />
																			<p>UI/UX Designer</p>
																		</div>
																	</div>
																	<div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
																		<div className="img1">
																			<img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
																		</div>
																		<div className="text">
																			<Link href="/speakers">Alexys Archer</Link>
																			<div className="space8" />
																			<p>WP Developer</p>
																		</div>
																	</div>
																</div>
																<div className="space24" />
																<div className="btn-area1">
																	<Link href="/pricing-plan" className="vl-btn9"><span className="demo">purchase ticket</span></Link>
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

		</>
	)
}
