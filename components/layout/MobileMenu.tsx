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
								<Link href="//"><img src="/assets/img/logo/cvlogo1.png" alt="" /></Link>
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
						<img src="/assets/img/logo/cvlogo1.png" alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						{/* About Chess Victoria */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 1 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(1)}><em /></span>
							<Link href="/about" className="hash-nav">About Chess Victoria</Link>
							<ul className={`sub-menu ${isAccordion == 1 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 1 ? 'block' : 'none'}` }}>
								<li><Link href="/committees">Our Committees</Link></li>
								<li><Link href="/about/players">Our Players</Link></li>
								<li><Link href="/mission">Our Missions</Link></li>
								<li><Link href="/vision">Our Vision</Link></li>
								<li><Link href="/memories">Our Memories</Link></li>
							</ul>
						</li>
						{/* Victorian Champions */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 2 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(2)}><em /></span>
							<Link href="/victorian-champions" className="hash-nav">Victorian Champions</Link>
							<ul className={`sub-menu ${isAccordion == 2 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 2 ? 'block' : 'none'}` }}>
								<li><Link href="/victorian-champions/junior-champions">Junor Champions</Link></li>
								<li><Link href="/victorian-champions/australian-master">Australian Masters</Link></li>
								<li><Link href="/victorian-champions/victorian-champions">Victorian Champions</Link></li>
								<li><Link href="/victorian-champions/victorian-country-champions">Victorian Country Champions</Link></li>
								<li><Link href="/victorian-champions/victorian-open">Victorian Open</Link></li>
								<li><Link href="/victorian-champions/victorian-women">Victorian Women</Link></li>
							</ul>
						</li>
						{/* Events */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 4 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(4)}><em /></span>
							<Link href="/events" className="hash-nav">Events</Link>
							<ul className={`sub-menu ${isAccordion == 4 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 4 ? 'block' : 'none'}` }}>
								<li><Link href="/events/2025-chess-victoria/">Chess Victoria Event</Link></li>
								<li><Link href="/events/2025-state-tournaments">State level Tournaments</Link></li>
								<li><Link href="/events/2025-clubs-tournaments">Clubs Level Tournaments</Link></li>
								<li><Link href="/events/fide-tournaments">FIDE Tournaments</Link></li>
							</ul>
						</li>
						{/* Victoria Club */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 5 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(5)}><em /></span>
							<Link href="/chess-clubs" className="hash-nav">Victoria Club</Link>
							<ul className={`sub-menu ${isAccordion == 5 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 5 ? 'block' : 'none'}` }}>
								<li><Link href="/chess-clubs/mcc">Melbourne Chess Club</Link></li>
								<li><Link href="/chess-clubs/bhcc">Boxhill Chess Club</Link></li>
								<li><Link href="/chess-clubs/hbcc">Hobsons Bay Chess Club</Link></li>
							</ul>
						</li>
						{/* Pages */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 6 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(6)}><em /></span>
							<Link href="/news" className="hash-nav">Others</Link>
							<ul className={`sub-menu ${isAccordion == 6 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 6 ? 'block' : 'none'}` }}>
								<li><Link href="/galleries">Galleries</Link></li>
								<li><Link href="/faq">FAQ</Link></li>
								<li><Link href="/contact">Contact Us</Link></li>
							</ul>
						</li>
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
