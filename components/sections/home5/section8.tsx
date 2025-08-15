
'use client'
import CountUp from 'react-countup'
export default function Section8() {
	return (
		<>

			<div className="counter5-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="counter-box">
								<h2><CountUp className="odometer" enableScrollSpy={true} end={3} />D</h2>
								<p>Days Of Event</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="counter-box">
								<h2><CountUp className="odometer" enableScrollSpy={true} end={20} />K+</h2>
								<p>Registered Participant</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="counter-box">
								<h2><CountUp className="odometer" enableScrollSpy={true} end={12} />K+</h2>
								<p>Attendance Event</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="counter-box">
								<h2><CountUp className="odometer" enableScrollSpy={true} end={5} /></h2>
								<p>Our Event Venue</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
