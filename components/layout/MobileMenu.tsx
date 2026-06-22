'use client'
import { useState } from 'react';
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config';
import MenuItems from './MenuItems';
import type { MenuItem } from '@/lib/types/menu';

export default function MobileMenu({ isMobileMenu, handleMobileMenu, menu }: any & { menu: MenuItem[] }) {
	const [isAccordion, setIsAccordion] = useState<string | null>(null)
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
								<Link href="/"><img src={SITE_CONFIG.logo} alt="" width={100} /></Link>
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
						<img src={SITE_CONFIG.logoBlack} alt="" />
					</div>
					<div className="menu-close" onClick={handleMobileMenu}>
						<i className="fa-solid fa-xmark" />
					</div>
				</div>
				<div className="mobile-nav mobile-nav1">
					<ul className="mobile-nav-list nav-list1">
						<MenuItems
							items={menu}
							mode="mobile"
							activeAccordionId={isAccordion}
							onToggleAccordion={handleAccordion}
							onNavigate={handleMobileMenu}
						/>
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
