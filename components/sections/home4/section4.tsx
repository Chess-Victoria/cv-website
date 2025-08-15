'use client'
import Link from 'next/link'
import { useState } from "react"

export default function Section4() {
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

			<div className="event4-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<div className="event-images-area" data-aos="zoom-in" data-aos-duration={1000}>
								<div className="img1">
									<img src="/assets/img/all-images/event/event-img7.png" alt="" />
								</div>
								<div className="content-area heading7">
									<h5>Event Schedule</h5>
									<div className="space18" />
									<h2>Our Events Schedule Plan</h2>
									<div className="space32" />
									<div className="btn-area1">
										<Link href="/pricing-plan" className="vl-btn4">purchase ticket now</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-2">
							<div data-aos="fade-up" data-aos-duration={900}>
								<ul className="nav nav-pills space-margin60" id="pills-tab" role="tablist">
									<li className="nav-item" onClick={() => handleTab(1)}>
										<button className={isTab == 1 ? "nav-link active" : "nav-link"} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
											<span className="day">Day 01</span>
											<span className="vl-flex">
												<span className="cal">01</span>
												<span className="date">JAN <br />
													2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(2)}>
										<button className={isTab == 2 ? "nav-link active" : "nav-link"} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
											<span className="day">Day 02</span>
											<span className="vl-flex">
												<span className="cal">08</span>
												<span className="date">JAN <br />
													2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(3)}>
										<button className={isTab == 3 ? "nav-link active" : "nav-link"} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
											<span className="day">Day 03</span>
											<span className="vl-flex">
												<span className="cal">15</span>
												<span className="date">JAN <br />
													2025</span>
											</span>
										</button>
									</li>
									<li className="nav-item" onClick={() => handleTab(4)}>
										<div className="space30 d-lg-none d-block" />
										<button className={isTab == 4 ? "nav-link m-0 active" : "nav-link m-0"} id="pills-contact1-tab" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">
											<span className="day">Day 04</span>
											<span className="vl-flex">
												<span className="cal">20</span>
												<span className="date">JAN <br />
													2025</span>
											</span>
										</button>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-5" data-aos="fade-left" data-aos-duration={1200}>
							<div className="tab-content" id="pills-tabContent">
								<div className={isTab == 1 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
									<div className="accordion" id="accordionExample">
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (1)}>
												<button className={isAccordion == 1 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />11:00 AM -12:00 PM</span>
													<span className="accor-btn">Registration &amp; Networking</span>
												</button>
											</h2>
											<div id="collapseOne" className={isAccordion == 1 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (2)}>
												<button className={isAccordion == 2 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Workshops &amp; Interactive Labs</span>
												</button>
											</h2>
											<div id="collapseTwo" className={isAccordion == 2 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (3)}>
												<button className={isAccordion == 3 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Leadership for the Future</span>
												</button>
											</h2>
											<div id="collapseThree" className={isAccordion == 3 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (4)}>
												<button className={isAccordion == 4 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />05:00 PM -06:00 PM</span>
													<span className="accor-btn">Networking Reception</span>
												</button>
											</h2>
											<div id="collapseFour" className={isAccordion == 4 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={isTab == 2 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
									<div className="accordion" id="accordionExample2">
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (5)}>
												<button className={isAccordion == 5 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="true" aria-controls="collapseFive">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />11:00 AM -12:00 PM</span>
													<span className="accor-btn">Registration &amp; Networking</span>
												</button>
											</h2>
											<div id="collapseFive" className={isAccordion == 5 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (6)}>
												<button className={isAccordion == 6 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Workshops &amp; Interactive Labs</span>
												</button>
											</h2>
											<div id="collapseSix" className={isAccordion == 6 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (7)}>
												<button className={isAccordion == 7 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Leadership for the Future</span>
												</button>
											</h2>
											<div id="collapseSeven" className={isAccordion == 7 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (8)}>
												<button className={isAccordion == 8 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />05:00 PM -06:00 PM</span>
													<span className="accor-btn">Networking Reception</span>
												</button>
											</h2>
											<div id="collapseEight" className={isAccordion == 8 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample2">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={isTab == 3 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
									<div className="accordion" id="accordionExample3">
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (9)}>
												<button className={isAccordion == 9 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseNine" aria-expanded="true" aria-controls="collapseNine">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />11:00 AM -12:00 PM</span>
													<span className="accor-btn">Registration &amp; Networking</span>
												</button>
											</h2>
											<div id="collapseNine" className={isAccordion == 9 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (10)}>
												<button className={isAccordion == 10 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Workshops &amp; Interactive Labs</span>
												</button>
											</h2>
											<div id="collapseTen" className={isAccordion == 10 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (11)}>
												<button className={isAccordion == 11 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseEleven" aria-expanded="false" aria-controls="collapseEleven">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Leadership for the Future</span>
												</button>
											</h2>
											<div id="collapseEleven" className={isAccordion == 11 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (12)}>
												<button className={isAccordion == 12 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwelve" aria-expanded="false" aria-controls="collapseTwelve">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />05:00 PM -06:00 PM</span>
													<span className="accor-btn">Networking Reception</span>
												</button>
											</h2>
											<div id="collapseTwelve" className={isAccordion == 12 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample3">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className={isTab == 4 ? "tab-pane fade show active" : "tab-pane fade"} id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab" tabIndex={0}>
									<div className="accordion" id="accordionExample4">
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (13)}>
												<button className={isAccordion == 13 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThirteen" aria-expanded="true" aria-controls="collapseThirteen">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />11:00 AM -12:00 PM</span>
													<span className="accor-btn">Registration &amp; Networking</span>
												</button>
											</h2>
											<div id="collapseThirteen" className={isAccordion == 13 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (14)}>
												<button className={isAccordion == 14 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFourteen" aria-expanded="false" aria-controls="collapseFourteen">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Workshops &amp; Interactive Labs</span>
												</button>
											</h2>
											<div id="collapseFourteen" className={isAccordion == 14 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (15)}>
												<button className={isAccordion == 15 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFifteen" aria-expanded="false" aria-controls="collapseFifteen">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />03:00 PM -04:00 PM</span>
													<span className="accor-btn">Leadership for the Future</span>
												</button>
											</h2>
											<div id="collapseFifteen" className={isAccordion == 15 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header"onClick={() => handleAccordion (16)}>
												<button className={isAccordion == 16 ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseSixteen" aria-expanded="false" aria-controls="collapseSixteen">
													<span><img src="/assets/img/icons/clock1.svg" alt="" />05:00 PM -06:00 PM</span>
													<span className="accor-btn">Networking Reception</span>
												</button>
											</h2>
											<div id="collapseSixteen" className={isAccordion == 16 ? "accordion-collapse collapse show" : "accordion-collapse collapse"} data-bs-parent="#accordionExample4">
												<div className="accordion-body">
													<p>Kick off the day with coffee and conversations. Meet fellow innovators &amp; industry leaders.</p>
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
