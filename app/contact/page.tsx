
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Contact() {

	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(assets/img/bg/header-bg12.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Contact Us</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Contact Us</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== CONTACT AREA STARTS =======*/}
					<div className="contact-inner-section sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="img1 image-anime">
										<img src="/assets/img/all-images/contact/contact-img4.png" alt="" />
									</div>
								</div>
								<div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
									<div className="contact4-boxarea">
										<h3 className="text-anime-style-3">Get In Touch Now</h3>
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
												<div className="input-area text-end">
													<button type="submit" className="vl-btn1">Submit Now</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CONTACT AREA ENDS =======*/}
					{/*===== CONTACT AREA STARTS =======*/}
					<div className="contact2-bg-section">
						<div className="img1">
							<img src="/assets/img/all-images/contact/contact-img1.png" alt="" className="contact-img1" />
						</div>
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="space48" />
									<div className="row">
										<div className="col-lg-6 col-md-6">
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900}>
												<div className="icons">
													<img src="/assets/img/icons/mail1.svg" alt="" />
												</div>
												<div className="text">
													<h5>Our Email</h5>
													<div className="space14" />
													<Link href="/maito:eventify@gmail.com">eventify@gmail.com</Link>
												</div>
											</div>
											<div className="space18" />
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
												<div className="icons">
													<img src="/assets/img/icons/location1.svg" alt="" />
												</div>
												<div className="text">
													<h5>our location</h5>
													<div className="space14" />
													<Link href="/#">1800 Abbot Kinney</Link>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-6">
											<div className="space20 d-md-none d-block" />
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
												<div className="icons">
													<img src="/assets/img/icons/phn1.svg" alt="" />
												</div>
												<div className="text">
													<h5>Call/Message</h5>
													<div className="space14" />
													<Link href="/tel:+11234567890">+1 123 456 7890</Link>
												</div>
											</div>
											<div className="space18" />
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1200}>
												<div className="icons">
													<img src="/assets/img/icons/instagram.svg" alt="" />
												</div>
												<div className="text">
													<h5>Instagram</h5>
													<div className="space14" />
													<Link href="/#">eneventify.eve</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mapouter">
							<div className="gmap_canvas">
								<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							</div>
						</div>
					</div>
					<div className="space100 d-lg-block d-none" />
					<div className="space50 d-lg-none d-block" />
					{/*===== CONTACT AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-block d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CTA AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-none d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Layout>
		</>
	)
}