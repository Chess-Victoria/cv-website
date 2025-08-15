
import Link from 'next/link'

export default function Section7() {
	return (
		<>

			<div className="others-pricing-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="pricing-heading heading9 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" /> PRICING</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Register For Eventify “2025”</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-6 col-md-6" data-aos="fade-right" data-aos-duration={1000}>
							<div className="pricing-boarea">
								<h3>Conference Pass</h3>
								<div className="space24" />
								<p>Get full access to all man stage keynotes, mastermind sessions, and installation for the
									conference at Eventify.</p>
								<div className="space32" />
								<h2>$249<span>2x1 with code Eventify</span></h2>
								<div className="space40" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn6">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
								</div>
								<div className="space40" />
								<h4>Complete Access To:</h4>
								<div className="space8" />
								<ul>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Main Stage Keynotes</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Mastermind Sessions (Booking Required)
									</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Unlimited Coffee at event Conference
									</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Breakfast, Snaks, and Buffet Lunch</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Post Event Cocktail Reception</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Pre-event Party On 14 January 2025</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Semrush Swag</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-6 col-md-6" data-aos="fade-left" data-aos-duration={1000}>
							<div className="pricing-boarea box2">
								<h3>VIP Pass</h3>
								<div className="space24" />
								<p>Get full access to all man stage keynotes, mastermind sessions, and installation for the
									conference at Eventify.</p>
								<div className="space32" />
								<h2>$449<span>2x1 with code Eventify</span></h2>
								<div className="space40" />
								<div className="btn-area1">
									<Link href="/pricing-plan" className="vl-btn6">Buy Tickets Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
								</div>
								<div className="space40" />
								<h4>Complete Access To:</h4>
								<div className="space8" />
								<ul>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Main Stage Keynotes</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Mastermind Sessions (Booking Required)
									</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Unlimited Coffee at event Conference
									</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Breakfast, Snaks, and Buffet Lunch</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Post Event Cocktail Reception</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Exclusive Speaker &amp; VIP Welcome Party on
										15 January 2025</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Fast-Track VIP Check In</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />60 Min Site Clinic (On Site or within a
										Month)</li>
									<li><img src="/assets/img/icons/check4.svg" alt="" />Semrush Certification Workshop of Your
										Choice On January 2025</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
