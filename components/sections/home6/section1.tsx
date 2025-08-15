
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero6-section-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg17.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-7">
							<div className="hero6-header">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Marketing Summit “2025”</h5>
								<div className="space24" />
								<h1 className="text-anime-style-3">Empowering Tomorrow's Marketers</h1>
								<div className="space24" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn6">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
								</div>
								<div className="arrow-btn">
									<img src="/assets/img/elements/elements34.png" alt="" className="keyframe5" />
									<div className="arrow">
										<img src="/assets/img/icons/arrow2.svg" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="img1">
								<img src="/assets/img/all-images/hero/hero-img8.png" alt="" />
								<div className="date-format">
									<img src="/assets/img/elements/elements35.png" alt="" className="keyframe5" />
									<h5>15</h5>
									<p>January</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
