
import Link from 'next/link'

export default function Section8() {
	return (
		<>

			<div className="contact4-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="contact4-boxarea">
								<h3 className="text-anime-style-3">Leave A Message</h3>
								<div className="space8" />
								<div className="row">
									<div className="col-lg-6 col-md-6">
										<div className="input-area">
											<input type="text" placeholder="Name" />
										</div>
									</div>
									<div className="col-lg-6 col-md-6">
										<div className="input-area">
											<input type="text" placeholder="Phone" />
										</div>
									</div>
									<div className="col-lg-12 col-md-6">
										<div className="input-area">
											<input type="email" placeholder="Email" />
										</div>
									</div>
									<div className="col-lg-12 col-md-6">
										<div className="input-area">
											<input type="text" placeholder="Subjects" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="input-area">
											<textarea placeholder="Message" />
										</div>
									</div>
									<div className="col-lg-12">
										<div className="space24" />
										<div className="input-area">
											<button type="submit" className="vl-btn4">Send</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="contact4-header heading7">
								<h5 data-aos="fade-left" data-aos-duration={800}>How to reach</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Connect with Our Team</h2>
								<div className="space18" />
								<p data-aos="fade-left" data-aos-duration={900}>We’re here to help! you have any questions about Innovate 2024, need assistance with registration, or want to learn more about.</p>
								<div className="space12" />
								<div className="contact-author-box" data-aos="fade-left" data-aos-duration={1000}>
									<div className="icons">
										<img src="/assets/img/icons/mail1.svg" alt="" />
									</div>
									<div className="text">
										<h4>Our Email</h4>
										<div className="space10" />
										<Link href="/mailto:eventify@gmail.com">eventify@gmail.com</Link>
									</div>
								</div>
								<div className="contact-author-box" data-aos="fade-left" data-aos-duration={1100}>
									<div className="icons">
										<img src="/assets/img/icons/phn1.svg" alt="" />
									</div>
									<div className="text">
										<h4>Call/Message</h4>
										<div className="space10" />
										<Link href="/tel:+11234567890">+1 123 456 7890</Link>
									</div>
								</div>
								<div className="contact-author-box" data-aos="fade-left" data-aos-duration={1200}>
									<div className="icons">
										<img src="/assets/img/icons/clock1.svg" alt="" />
									</div>
									<div className="text">
										<h4>Schedule</h4>
										<div className="space10" />
										<Link href="/mailto:eventify@gmail.com">Sunday-Fri: 9 AM – 6 PM</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="space60" />
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="img1 image-anime reveal">
								<img src="/assets/img/all-images/contact/contact-img2.png" alt="" />
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<div className="img1 image-anime reveal">
								<img src="/assets/img/all-images/contact/contact-img3.png" alt="" />
							</div>
						</div>
						<div className="col-lg-5">
							<div className="mapouter">
								<div className="gmap_canvas">
									<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
