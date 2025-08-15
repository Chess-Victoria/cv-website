'use client'
import CountUp from 'react-countup'
import Link from 'next/link'

export default function Section2() {
	return (
		<>

			<div className="about2-section-area sp1">
				<img src="/assets/img/elements/elements13.png" alt="" className="elements12" />
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="about-images-area">
								<img src="/assets/img/elements/elements14.png" alt="" className="elements14" />
								<div className="row align-items-center">
									<div className="col-lg-6 col-md-6">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img4.png" alt="" />
										</div>
										<div className="space24 d-md-none d-block" />
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img5.png" alt="" />
										</div>
										<div className="space24" />
										<div className="img1 image-anime reveal">
											<img src="/assets/img/all-images/about/about-img6.png" alt="" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-1" />
						<div className="col-lg-5">
							<div className="about2-header heading4">
								<h5 data-aos="fade-left" data-aos-duration={800}>about our business conferences</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Growth Through World Class And Conferences</h2>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>At Business, we bring together brightest minds, leaders, and trailblazers from across industries to explore latest trends, technologies, and strategies shaping the future.</p>
								<div className="others-boxarea" data-aos="fade-left" data-aos-duration={1000}>
									<div className="icons-box">
										<div className="icons">
											<img src="/assets/img/icons/about-icon1.svg" alt="" />
										</div>
										<p><CountUp className="odometer" enableScrollSpy={true} end={40} />+ Speakers</p>
									</div>
									<div className="icons-box">
										<div className="icons">
											<img src="/assets/img/icons/about-icon2.svg" alt="" />
										</div>
										<p><CountUp className="odometer" enableScrollSpy={true} end={19} />+ Sponsors</p>
									</div>
								</div>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/contact" className="vl-btn2"><span className="demo">Become an Attendee</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
