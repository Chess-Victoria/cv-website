
'use client'
import Countdown from '@/components/elements/Countdown'
import CountUp from 'react-countup'
export default function Section2() {
	return (
		<>

			<div className="about8-section-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg20.png)', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
				<img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="space50 d-lg-none d-block" />
							<div className="about8-images">
								<img src="/assets/img/all-images/about/about-img10.png" alt="" className="about-img10 aniamtion-key-1" />
								<div className="img1" data-aos="zoom-in" data-aos-duration={1000}>
									<img src="/assets/img/all-images/about/about-img19.png" alt="" />
								</div>
								<div className="img2" data-aos="zoom-in" data-aos-duration={1100}>
									<img src="/assets/img/all-images/about/about-img20.png" alt="" />
								</div>
								<div className="img3" data-aos="zoom-in" data-aos-duration={1200}>
									<img src="/assets/img/all-images/about/about-img8.png" alt="" />
								</div>
							</div>
						</div>
						<div className="col-lg-2" />
						<div className="col-lg-4">
							<div className="space60 d-lg-none d-block" />
							<div className="side-img1-area">
								{/* <img src="/assets/img/all-images/about/about-img21.png" alt=""> */}
								<div className="counter-box">
									<h3><CountUp className="odometer" enableScrollSpy={true} end={20} />+</h3>
									<p>Speakers</p>
								</div>
								<div className="img1">
									<img src="/assets/img/all-images/about/about-img22.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/all-images/about/about-img23.png" alt="" />
								</div>
								<div className="img3">
									<img src="/assets/img/all-images/about/about-img24.png" alt="" />
								</div>
								<div className="img4">
									<img src="/assets/img/all-images/about/about-img25.png" alt="" />
								</div>
								<div className="counter-box2">
									<h3><CountUp className="odometer" enableScrollSpy={true} end={12} />+</h3>
									<p>Session</p>
								</div>
								<div className="counter-box3">
									<h3><CountUp className="odometer" enableScrollSpy={true} end={12} />+</h3>
									<p>Attendance</p>
								</div>
								<div className="counter-box4">
									<h3><CountUp className="odometer" enableScrollSpy={true} end={18} />+</h3>
									<p>Sponsors</p>
								</div>
							</div>
							<div className="div d-lg-none d-block" style={{ marginBottom: 200 }} />
						</div>
					</div>
				</div>
				<div className="others8-section-area sp1">
					<div className="container">
						<Countdown style={2} />
					</div>
				</div>
			</div>

		</>
	)
}
