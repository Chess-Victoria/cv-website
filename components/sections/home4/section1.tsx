
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero4-section-area">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-5">
							<div className="hero4-header">
								<h5 data-aos="fade-left" data-aos-duration={800}><img src="/assets/img/icons/sub-logo2.svg" alt="" className="d-md-inline-block d-none" /> Lead Purpose, Innovate with Passion</h5>
								<div className="space20" />
								<h1 className="text-anime-style-3">Elevate 2025 Leading with the Purpose</h1>
								<div className="space20" />
								<p data-aos="fade-left" data-aos-duration={900}>
									Welcome to Innovate 2024: Shaping the Future of <br className="d-lg-block d-none" />
									Business, where industry leaders, innovators.
								</p>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1000}>
									<Link href="/event-schedule" className="vl-btn4">Reserve My Seat</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-2" />
						<div className="col-lg-5">
							<div className="hero-content-images">
								<div className="img1 reveal image-anime">
									<img src="/assets/img/all-images/hero/hero-img5.png" alt="" />
								</div>
								<div className="content-area aniamtion-key-1">
									<div className="img2 image-anime reveal">
										<img src="/assets/img/all-images/hero/hero-img6.png" alt="" />
									</div>
									<div className="space16" />
									<Link href="/#" className="date">25 Jan, 2025</Link>
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM</Link>
										</li>
										<li>
											<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York</Link>
										</li>
									</ul>
									<div className="space24" />
									<div className="btn-area1">
										<Link href="/pricing-plan" className="vl-btn4">buy tickets</Link>
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
