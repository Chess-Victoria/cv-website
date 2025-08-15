
import Link from 'next/link'

export default function Section4() {
	return (
		<>

			<div className="event10-section-area sp3">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 m-auto">
							<div className="event-heading heading13 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Event Schedule</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Event Location &amp; How to Get There</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<div className="event6-widget-boxarea" data-aos="fade-left" data-aos-duration={1000}>
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/event/event-img25.png" alt="" />
										</div>
									</div>
									<div className="col-lg-5">
										<div className="content-area">
											<h3 className="text-anime-style-3">“The Future of AI in Everyday Life with Emily Chang,
												CEO of TechX Solutions.”</h3>
											<div className="space24" />
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10:00 AM -12:00
														PM</Link>
												</li>
												<li className="space14" />
												<li>
													<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana,
														New York</Link>
												</li>
											</ul>
											<div className="space32" />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn10">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="space50" />
							<div className="event6-widget-boxarea" data-aos="fade-right" data-aos-duration={1100}>
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/event/event-img26.png" alt="" />
										</div>
									</div>
									<div className="col-lg-5">
										<div className="content-area">
											<h3 className="text-anime-style-3">“Cybersecurity Trends and Threats" by Rachel Wong,
												Cybersecurity Expert at SecureNet.”</h3>
											<div className="space24" />
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10:00 AM -12:00
														PM</Link>
												</li>
												<li className="space14" />
												<li>
													<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana,
														New York</Link>
												</li>
											</ul>
											<div className="space32" />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn10">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="space50" />
							<div className="event6-widget-boxarea" data-aos="fade-left" data-aos-duration={1200}>
								<div className="row align-items-center">
									<div className="col-lg-7">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/event/event-img14.png" alt="" />
										</div>
									</div>
									<div className="col-lg-5">
										<div className="content-area">
											<h3 className="text-anime-style-3">“Join us at the State Plaza Conference Hall, a
												premier location equipped with modern amenities.”</h3>
											<div className="space24" />
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10:00 AM -12:00
														PM</Link>
												</li>
												<li className="space14" />
												<li>
													<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana,
														New York</Link>
												</li>
											</ul>
											<div className="space32" />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn10">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="space30" />
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
