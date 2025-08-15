'use client'
import CountUp from 'react-countup'
import Link from 'next/link'

export default function Section2() {
	return (
		<>

			<div className="about3-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="about3-images">
								<img src="/assets/img/all-images/about/about-img10.png" alt="" className="about-img10 aniamtion-key-1" />
								<div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
									<img src="/assets/img/all-images/about/about-img7.png" alt="" />
								</div>
								<div className="img2" data-aos="zoom-in" data-aos-duration={1100}>
									<img src="/assets/img/all-images/about/about-img8.png" alt="" />
								</div>
								<div className="img3" data-aos="zoom-in" data-aos-duration={1200}>
									<img src="/assets/img/all-images/about/about-img9.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about-header heading5">
								<h5 data-aos="fade-left" data-aos-duration={800}>about our Designer conferences</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Explore Future Of Design At Our Yearly Conference</h2>
								<div className="space18" />
								<p data-aos="fade-left" data-aos-duration={900}>The Yearly Designer Conferences designed to challenge, Event inspire, and push the boundaries of what is possible in design. From emerging technologies to sustainable design practices.</p>
								<div className="space12" />
								<div className="counter-area" data-aos="fade-left" data-aos-duration={1000}>
									<div className="counter-box">
										<h3><CountUp className="odometer" enableScrollSpy={true} end={250} />+</h3>
										<div className="space18" />
										<p>Our Journalist</p>
									</div>
									<div className="counter-box">
										<h3><CountUp className="odometer" enableScrollSpy={true} end={15} />+</h3>
										<div className="space18" />
										<p>Our Speaker</p>
									</div>
									<div className="counter-box" style={{ border: 'none' }}>
										<h3><CountUp className="odometer" enableScrollSpy={true} end={7} />K+</h3>
										<div className="space18" />
										<p>Attendees</p>
									</div>
								</div>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/event-schedule" className="vl-btn3">Reserve premium Seat</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
