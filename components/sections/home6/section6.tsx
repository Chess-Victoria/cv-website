
import Link from 'next/link'

export default function Section6() {
	return (
		<>

			<div className="team6-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="team-heading heading9 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />EVENT SPEAKERS</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Meet Our Event Speaker’s</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={900}>
							<div className="team-widget-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/team/team-img20.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/elements/brand-img1.png" alt="" />
								</div>
								<div className="content-area">
									<Link href="/speakers-single">Alex Carter</Link>
									<div className="space12" />
									<p>Marketing Strategist, Marketing Manager At Eventify.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1000}>
							<div className="team-widget-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/team/team-img21.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/elements/brand-img2.png" alt="" />
								</div>
								<div className="content-area">
									<Link href="/speakers-single">Jessica Lee</Link>
									<div className="space12" />
									<p>Creative Director, With a keen eye for design and storytelling.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1100}>
							<div className="team-widget-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/team/team-img22.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/elements/brand-img3.png" alt="" />
								</div>
								<div className="content-area">
									<Link href="/speakers-single">Michael Davis</Link>
									<div className="space12" />
									<p>Content Marketing Lead, Specializing in content converts.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-duration={1200}>
							<div className="team-widget-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/team/team-img23.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/elements/brand-img4.png" alt="" />
								</div>
								<div className="content-area">
									<Link href="/speakers-single">John Carry</Link>
									<div className="space12" />
									<p>Chief Marketing Officer, Culture Marketing Manager At Epicurious.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
