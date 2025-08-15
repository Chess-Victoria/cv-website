
import Link from 'next/link'

export default function Section8() {
	return (
		<>

			<div className="contact2-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="contact-header heading4 text-center space-margin60">
								<h5>How to reach</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Direction To The Venue</h2>
							</div>
						</div>
					</div>
					<div className="row align-items-center">
						<div className="col-lg-7" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="mapouter">
								<div className="gmap_canvas">
									<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="contact-boxs-area" data-aos="zoom-in" data-aos-duration={1000}>
								<div className="contact-auhtor-box">
									<div className="icons">
										<img src="/assets/img/icons/mail2.svg" alt="" />
									</div>
									<div className="text">
										<h4>Our Email</h4>
										<div className="space14" />
										<Link href="/mailto:eventify@gmail.com">eventify@gmail.com</Link>
									</div>
								</div>
								<div className="space30" />
								<div className="contact-auhtor-box">
									<div className="icons">
										<img src="/assets/img/icons/phn2.svg" alt="" />
									</div>
									<div className="text">
										<h4>Call/Message</h4>
										<div className="space14" />
										<Link href="/tel:+11234567890">+1 123 456 7890</Link>
									</div>
								</div>
								<div className="space30" />
								<div className="contact-auhtor-box">
									<div className="icons">
										<img src="/assets/img/icons/clock2.svg" alt="" />
									</div>
									<div className="text">
										<h4>Schedule</h4>
										<div className="space14" />
										<Link href="/#">Sunday-Fri: 9 AM – 6 PM</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
