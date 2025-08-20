'use client'
import { useState } from 'react';
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config';

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(1)
	const [isSearch, setSearch] = useState(false)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}

	const handleSearch = () => {
		setSearch(!isSearch)
	}
	return (
		<>
			<div className="mobile-header mobile-haeder1 d-block d-lg-none">
				<div className="container-fluid">
					<div className="col-12">
						<div className="mobile-header-elements">
							<div className="mobile-logo">
								<Link href="/"><img src={SITE_CONFIG.logo || '/assets/img/logo/cvlogo1.png'} alt="" /></Link>
							</div>
							<div className="search-icon header__search header-search-btn" onClick={handleSearch}>
								<a><img src="/assets/img/icons/search1.svg" alt="" /></a>
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
						<img src={SITE_CONFIG.logoBlack || '/assets/img/logo/cvlogo1.png'} alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						{/* About Chess Victoria */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 1 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(1)}><em /></span>
							<Link href="/pages/chess-victoria-mission" className="hash-nav">About Chess Victoria</Link>
							<ul className={`sub-menu ${isAccordion == 1 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 1 ? 'block' : 'none'}` }}>
								<li><Link href="/committees">Our Committees</Link></li>
								<li><Link href="/about/players">Our Players</Link></li>
								<li><Link href="/pages/chess-victoria-mission">Our Missions</Link></li>
								<li><Link href="/pages/chess-victoria-vision">Our Vision</Link></li>
								<li><Link href="/memories">Our Memories</Link></li>
							</ul>
						</li>
						{/* Victorian Champions */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 2 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(2)}><em /></span>
							<Link href="/victorian-champions" className="hash-nav">Victorian Champions</Link>
							<ul className={`sub-menu ${isAccordion == 2 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 2 ? 'block' : 'none'}` }}>
								<li><Link href="/victorian-champions/junior-champions">Junior Champions</Link></li>
								<li><Link href="/victorian-champions/australian-master">Australian Masters</Link></li>
								<li><Link href="/victorian-champions/victorian-champions">Victorian Champions</Link></li>
								<li><Link href="/victorian-champions/victorian-country-champions">Victorian Country Champions</Link></li>
								<li><Link href="/victorian-champions/victorian-open-champions">Victorian Open Champions</Link></li>
								<li><Link href="/victorian-champions/victorian-women-champions">Victorian Women Champions</Link></li>
							</ul>
						</li>
						{/* Events */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 3 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(3)}><em /></span>
							<Link href="/events" className="hash-nav">Events</Link>
							<ul className={`sub-menu ${isAccordion == 3 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 3 ? 'block' : 'none'}` }}>
								<li><Link href="/events/2025-chess-victoria/">Chess Victoria Event</Link></li>
								<li><Link href="/events/2025-state-tournaments">State level Tournaments</Link></li>
								<li><Link href="/events/fide-tournaments">FIDE Tournaments</Link></li>
							</ul>
						</li>
						{/* Chess Club in Victoria */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 4 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(4)}><em /></span>
							<Link href="/chess-clubs" className="hash-nav">Chess Club in Victoria</Link>
							<ul className={`sub-menu ${isAccordion == 4 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 4 ? 'block' : 'none'}` }}>
								<li><Link href="/chess-clubs/other-chess-associations">Other Chess Associations</Link></li>
							</ul>
						</li>
						{/* News & Update */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 5 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(5)}><em /></span>
							<Link href="/news" className="hash-nav">News & Update</Link>
							<ul className={`sub-menu ${isAccordion == 5 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 5 ? 'block' : 'none'}` }}>
								<li><Link href="/news/news/category/chess-victoria-news/page-1">Chess Victoria News</Link></li>
								<li><Link href="/news/category/victorian-junior-updates/page-1">Victorian Junior News</Link></li>
								<li><Link href="/news/category/victorian-championship-news/page-1">Victorian Champions News</Link></li>
							</ul>
						</li>
						{/* Others */}
						<li className="has-sub hash-has-sub"><span className={`submenu-button ${isAccordion == 6 ? 'submenu-opened' : ''}`} onClick={() => handleAccordion(6)}><em /></span>
							<Link href="/news" className="hash-nav">Others</Link>
							<ul className={`sub-menu ${isAccordion == 6 ? 'open-sub' : ''}`} style={{ display: `${isAccordion == 6 ? 'block' : 'none'}` }}>
								<li><Link href="/documents">Documents</Link></li>
								<li><Link href="/galleries">Galleries</Link></li>
								<li><Link href="/faq">FAQ</Link></li>
								<li><Link href="/contact">Contact Us</Link></li>
							</ul>
						</li>
					</ul>

					<div className="allmobilesection">
						<Link href="/contact" className="vl-btn1">Contact Now</Link>
						<div className="single-footer">
							<h3>Contact Info</h3>
							<div className="footer1-contact-info">
								{SITE_CONFIG.contactPhone && (
									<div className="contact-info-single">
										<div className="contact-info-icon">
											<span><i className="fa-solid fa-phone-volume" /></span>
										</div>
										<div className="contact-info-text">
											<Link href={`tel:${SITE_CONFIG.contactPhone}`}>{SITE_CONFIG.contactPhone}</Link>
										</div>
									</div>
								)}
								{SITE_CONFIG.contactEmail && (
									<div className="contact-info-single">
										<div className="contact-info-icon">
											<span><i className="fa-solid fa-envelope" /></span>
										</div>
										<div className="contact-info-text">
											<Link href={`mailto:${SITE_CONFIG.contactEmail}`}>{SITE_CONFIG.contactEmail}</Link>
										</div>
									</div>
								)}
								{SITE_CONFIG.address && (
									<div className="single-footer">
										<h3>Our Location</h3>
										<div className="contact-info-single">
											<div className="contact-info-icon">
												<span><i className="fa-solid fa-location-dot" /></span>
											</div>
											<div className="contact-info-text">
												<Link href="/#">{SITE_CONFIG.address}</Link>
											</div>
										</div>
									</div>
								)}
								<div className="single-footer">
									<h3>Social Links</h3>
									<div className="social-links-mobile-menu">
										<ul>
											{SITE_CONFIG.facebookUrl && (
												<li>
													<Link href={SITE_CONFIG.facebookUrl} target="_blank"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
											)}
											{SITE_CONFIG.instagramUrl && (
												<li>
													<Link href={SITE_CONFIG.instagramUrl} target="_blank"><i className="fa-brands fa-instagram" /></Link>
												</li>
											)}
											{SITE_CONFIG.linkedinUrl && (
												<li>
													<Link href={SITE_CONFIG.linkedinUrl} target="_blank"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
											)}
											{SITE_CONFIG.pinterestUrl && (
												<li>
													<Link href={SITE_CONFIG.pinterestUrl} target="_blank"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											)}
											{SITE_CONFIG.youtubeUrl && (
												<li>
													<Link href={SITE_CONFIG.youtubeUrl} target="_blank"><i className="fa-brands fa-youtube" /></Link>
												</li>
											)}
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={`header-search-form-wrapper ${isSearch ? 'open' : ''}`}>
				<div className="tx-search-close tx-close" onClick={handleSearch}><i className="fa-solid fa-xmark" /></div>
				<div className="header-search-container">
					<form 
						role="search" 
						className="search-form"
						onSubmit={(e) => {
							e.preventDefault();
							const formData = new FormData(e.currentTarget);
							const query = formData.get('s') as string;
							if (query && query.trim()) {
								window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
								handleSearch();
							}
						}}
					>
						<input 
							type="search" 
							className="search-field" 
							placeholder="Search news, events, clubs..." 
							name="s" 
							required
							minLength={2}
						/>
						<button type="submit" className="search-submit">
							<img src="/assets/img/icons/search1.svg" alt="" />
						</button>
					</form>
				</div>
			</div>
			{isSearch && <div className="body-overlay active" onClick={handleSearch} />}
		</>
	)
}
