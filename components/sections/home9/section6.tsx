
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section6() {
	return (
		<>

			<div className="cta9-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 m-auto">
							<div className="cta1-main-boxarea">
								<div className="timer-btn-area">
								<Countdown />
									<div className="btn-area1">
										<Link className="vl-btn9" href="/pricing-plan"><span className="demo">Buy A Ticket</span> </Link>
									</div>
								</div>
								<ul>
									<li>
										<Link href="/#"><img src="/assets/img/icons/calender2.svg" alt="" />30 January 2025 - 6pm to
											11:30pm</Link>
									</li>
									<li className="m-0">
										<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The
											UK</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
