
import Link from 'next/link'

export default function Section3() {
	return (
		<>

			<div className="about6-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="row">
								<div className="col-lg-6 col-md-6">
									<div className="img1 reveal image-anime">
										<div className="space60 d-lg-block d-none" />
										<img src="/assets/img/all-images/about/about-img14.png" alt="" />
									</div>
									<div className="space30 d-md-none d-block" />
								</div>
								<div className="col-lg-6 col-md-6">
									<div className="img1 reveal image-anime">
										<img src="/assets/img/all-images/about/about-img15.png" alt="" />
									</div>
									<div className="img1 reveal image-anime">
										<div className="space30" />
										<img src="/assets/img/all-images/about/about-img16.png" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about6-header heading9">
								<h5 data-aos="fade-left" data-aos-duration={700}><img src="/assets/img/icons/sub-logo1.svg" alt="" />About Summit</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Why Attend the Marketing Summit Event “2025”</h2>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>The Marketing Summit 2024 is more than just a
									conference—it's an opportunity to redefine your marketing approach. From seasoned
									professionals to emerging talents, this summit is designed for those who are passionate
									about staying ahead of the curve.</p>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={1000}>With a focus on digital transformation, content
									strategies, and data-driven decision-making, attendees will walk away with actionable
									insights to drive their brand's success."</p>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/about" className="vl-btn6">About Event <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
