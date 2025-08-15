
import Link from 'next/link'

export default function Section3() {
	return (
		<>

			<div className="about4-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="about-images">
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img11.png" alt="" />
										</div>
										<div className="space30" />
										<div className="content-box">
											<p>Upcoming Event 2025</p>
											<div className="space12" />
											<h6>Digital Technology's</h6>
											<div className="space6" />
											<ul>
												<li>
													<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM</Link>
												</li>
												<li>
													<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York</Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="space44" />
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img12.png" alt="" />
										</div>
										<div className="space30" />
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img13.png" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about4-heading heading6">
								<h5 data-aos="fade-left" data-aos-duration={800}>about our business conferences</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Innovating for Tomorrow Insights for Business</h2>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>Perfectly captures the essence of what this blog aims to deliver. In a rapidly evolving business landscape, leaders must stay.</p>
								<div className="space10" />
								<ul data-aos="fade-left" data-aos-duration={1000}>
									<li><img src="/assets/img/icons/check1.svg" alt="" />Director of the Developing Communities</li>
									<li><img src="/assets/img/icons/check1.svg" alt="" />Deputy Attorney General Media Project</li>
									<li><img src="/assets/img/icons/check1.svg" alt="" />Law School and Civil Rights Attorney</li>
									<li><img src="/assets/img/icons/check1.svg" alt="" /> Majored in Political Science</li>
								</ul>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/event-schedule" className="vl-btn4">Reserve My Seat</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
