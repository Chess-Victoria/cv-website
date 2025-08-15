
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section12() {
	return (
		<>

			<div className="others5-section-area sp7">
				<img src="/assets/img/elements/elements30.png" alt="" className="elements30" />
				<div className="container">
					<div className="row">
						<div className="col-lg-9 m-auto">
							<div className="heading8 text-center space-margin80">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />our event countdown</h5>
								<div className="space32" />
								<h2>Event <span>Countdown</span></h2>
							</div>
						</div>
					</div>
					<Countdown style={2} />
					<div className="row">
						<div className="col-lg-12 m-auto">
							<div className="space60" />
							<div className="btn-area1 text-center">
								<Link href="/pricing-plan" className="vl-btn5"><span className="demo">purchase ticket now</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
								<Link href="/contact" className="vl-btn5 btn2"><span className="demo">Reserve Seat</span></Link>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
