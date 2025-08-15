
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section7() {
	return (
		<>

			<div className="others10-section-area d-none">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="heading11 text-center space-margin80">
								<h5>countdown</h5>
								<div className="space28" />
								<h2 className="text-anime-style-3">Event Countdown</h2>
							</div>
						</div>
					</div>
					<Countdown style={2} />
					<div className="row">
						<div className="col-lg-12">
							<div className="space60" />
							<div className="btn-area1 text-center" data-aos="fade-left" data-aos-duration={1200}>
								<Link href="/pricing-plan" className="vl-btn10">purchase Ticket Now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
