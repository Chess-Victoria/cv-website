'use client'
import { useState } from 'react';
import Link from 'next/link'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(1)

const handleAccordion = (key: any) => {
    setIsAccordion(prevState => prevState === key ? null : key)
}
	return (
		<>
			<div className="mobile-header mobile-haeder1 d-block d-lg-none">
				<div className="container-fluid">
					<div className="col-12">
						<div className="mobile-header-elements">
							<div className="mobile-logo">
								<Link href="//"><img src="/assets/img/logo/logo1.png" alt="" /></Link>
							</div>
							<div className="mobile-nav-icon dots-menu" onClick={handleMobileMenu}>
								<i className="fa-solid fa-bars-staggered" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`mobile-sidebar mobile-sidebar1 ${isMobileMenu ? 'mobile-menu-active' : ''}`}>
				<div className="logosicon-area">
					<div className="logos">
						<img src="/assets/img/logo/logo2.png" alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion  == 1 ? "submenu-opened" : ""}`}onClick={() => handleAccordion (1)}><em /></span>
							<Link href="/#" className="hash-nav">Home </Link>
							<ul className={`sub-menu ${isAccordion  == 1 ? "open-sub" : ""}`} style={{ display: `${isAccordion  == 1 ? "block" : "none"}` }}>
								<li className="hash-has-sub"><Link href="/" className="hash-nav">Home One</Link></li>
								<li className="hash-has-sub"><Link href="/index2" className="hash-nav">Home Two</Link></li>
								<li className="hash-has-sub"><Link href="/index3" className="hash-nav">Home Three</Link></li>
								<li className="hash-has-sub"><Link href="/index4" className="hash-nav">Home Four</Link></li>
								<li className="hash-has-sub"><Link href="/index5" className="hash-nav">Home Five</Link></li>
								<li className="hash-has-sub"><Link href="/index6" className="hash-nav">Home Six</Link></li>
								<li className="hash-has-sub"><Link href="/index7" className="hash-nav">Home Seven</Link></li>
								<li className="hash-has-sub"><Link href="/index8" className="hash-nav">Home Eight</Link></li>
								<li className="hash-has-sub"><Link href="/index9" className="hash-nav">Home Nine</Link></li>
								<li className="hash-has-sub"><Link href="/index10" className="hash-nav">Home Ten</Link></li>
							</ul>
						</li>
						<li className="hash-has-sub"><Link href="/about" className="hash-nav">About Event</Link></li>
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion  == 2 ? "submenu-opened" : ""}`}onClick={() => handleAccordion (2)}><em /></span>
							<Link href="/features" className="hash-nav">Speakers</Link>
							<ul className={`sub-menu ${isAccordion  == 2 ? "open-sub" : ""}`} style={{ display: `${isAccordion  == 2 ? "block" : "none"}` }}>
								<li className="hash-has-sub"><Link href="/speakers" className="hash-nav">Speakers</Link></li>
								<li className="hash-has-sub"><Link href="/speakers-single" className="hash-nav">Speakers Details</Link></li>
							</ul>
						</li>
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion  == 3 ? "submenu-opened" : ""}`}onClick={() => handleAccordion (3)}><em /></span>
							<Link href="/features" className="hash-nav">Schedule</Link>
							<ul className={`sub-menu ${isAccordion  == 3 ? "open-sub" : ""}`} style={{ display: `${isAccordion  == 3 ? "block" : "none"}` }}>
								<li className="hash-has-sub"><Link href="/event" className="hash-nav">Our Event</Link></li>
								<li className="hash-has-sub"><Link href="/event-schedule" className="hash-nav">Event Schedule</Link></li>
								<li className="hash-has-sub"><Link href="/event-single" className="hash-nav">Event Details</Link></li>
							</ul>
						</li>
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion  == 4 ? "submenu-opened" : ""}`}onClick={() => handleAccordion (4)}><em /></span>
							<Link href="/#" className="hash-nav">Blogs</Link>
							<ul className={`sub-menu ${isAccordion  == 4 ? "open-sub" : ""}`} style={{ display: `${isAccordion  == 4 ? "block" : "none"}` }}>
								<li className="hash-has-sub"><Link href="/blog" className="hash-nav">Our Blog</Link></li>
								<li className="hash-has-sub"><Link href="/blog-single" className="hash-nav">Blog Details</Link></li>
							</ul>
						</li>
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion  == 5 ? "submenu-opened" : ""}`}onClick={() => handleAccordion (5)}><em /></span>
							<Link href="/#" className="hash-nav">Pages</Link>
							<ul className={`sub-menu ${isAccordion  == 5 ? "open-sub" : ""}`} style={{ display: `${isAccordion  == 5 ? "block" : "none"}` }}>
								<li className="hash-has-sub"><Link href="/memories" className="hash-nav">Our Memories</Link></li>
								<li className="hash-has-sub"><Link href="/pricing-plan" className="hash-nav">Pricing Plan</Link></li>
								<li className="hash-has-sub"><Link href="/faq" className="hash-nav">FAQ,s</Link></li>
								<li className="hash-has-sub"><Link href="/contact" className="hash-nav">Contact Us</Link></li>
							</ul>
						</li>
						<li className="hash-has-sub"><Link href="/contact" className="hash-nav">Contact Us</Link></li>
					</ul>

					<div className="allmobilesection">
						<Link href="//contact" className="vl-btn1">Contact Now</Link>
						<div className="single-footer">
							<h3>Contact Info</h3>
							<div className="footer1-contact-info">
								<div className="contact-info-single">
									<div className="contact-info-icon">
										<span><i className="fa-solid fa-phone-volume" /></span>
									</div>
									<div className="contact-info-text">
										<Link href="//tel:+3(924)4596512">+3(924)4596512</Link>
									</div>
								</div>
								<div className="contact-info-single">
									<div className="contact-info-icon">
										<span><i className="fa-solid fa-envelope" /></span>
									</div>
									<div className="contact-info-text">
										<Link href="//mailto:info@example.com">info@example.com</Link>
									</div>
								</div>
								<div className="single-footer">
									<h3>Our Location</h3>
									<div className="contact-info-single">
										<div className="contact-info-icon">
											<span><i className="fa-solid fa-location-dot" /></span>
										</div>
										<div className="contact-info-text">
											<Link href="//mailto:info@example.com">55 East Birchwood Ave.Brooklyn, <br />
												New York 11201,United States</Link>
										</div>
									</div>
								</div>
								<div className="single-footer">
									<h3>Social Links</h3>
									<div className="social-links-mobile-menu">
										<ul>
											<li>
												<Link href="//#"><i className="fa-brands fa-facebook-f" /></Link>
											</li>
											<li>
												<Link href="//#"><i className="fa-brands fa-instagram" /></Link>
											</li>
											<li>
												<Link href="//#"><i className="fa-brands fa-linkedin-in" /></Link>
											</li>
											<li>
												<Link href="//#"><i className="fa-brands fa-youtube" /></Link>
											</li>
										</ul>
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
