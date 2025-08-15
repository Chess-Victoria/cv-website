
import Link from 'next/link'

export default function Section4() {
	return (
		<>

			<div className="others-pricing-area2 sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="pricing-heading heading12 text-center space-margin60">
								<h5>our event Pricing Plan</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Event Passes and Pricing</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="fade-right" data-aos-duration={1000}>
							<div className="pricing-boarea">
								<h3>One Day Festival Pass</h3>
								<div className="space16" />
								<p>Free 7 day trial, No credit card required, Cancel Anytime</p>
								<div className="space32" />
								<h2>$49.89<span>/Day</span></h2>
								<div className="space8" />
								<ul>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Ticket for one day</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Chance to win door prize&nbsp;</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" /><s>Free-official merchandise</s></li>
									<li><img src="/assets/img/icons/check5.svg" alt="" /><s>Free artist photo + signature</s>
									</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" /><s>Hotel Voucher</s></li>
								</ul>
								<div className="space32" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn9">Buy Tickets Now</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="fade-right" data-aos-duration={1000}>
							<div className="pricing-boarea box2">
								<h3>Full Festival Pass</h3>
								<div className="space16" />
								<p>Free 7 day trial, No credit card required, Cancel Anytime</p>
								<div className="space32" />
								<h2>$69.89<span>/Day</span></h2>
								<div className="space8" />
								<ul>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Ticket for one day</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Chance to win door prize&nbsp;</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Free-official merchandise</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" /><s>Free artist photo + signature</s>
									</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" /><s>Hotel Voucher</s></li>
								</ul>
								<div className="space32" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn9">Buy Tickets Now</Link>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="fade-right" data-aos-duration={1000}>
							<div className="pricing-boarea">
								<h3>Couple Pass</h3>
								<div className="space16" />
								<p>Free 7 day trial, No credit card required, Cancel Anytime</p>
								<div className="space32" />
								<h2>$89.89<span>/Day</span></h2>
								<div className="space8" />
								<ul>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Ticket for one day</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Chance to win door prize&nbsp;</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Free-official merchandise</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Free artist photo + signature</li>
									<li><img src="/assets/img/icons/check5.svg" alt="" />Hotel Voucher</li>
								</ul>
								<div className="space32" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn9">Buy Tickets Now</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
