import { SITE_CONFIG } from '@/lib/site-config';
import Link from 'next/link'


export default function Header1({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
	return (
		<>
			<header>
				<div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="header-elements">
									<div className="site-logo">
										<Link href="/"><img src={SITE_CONFIG.logo} alt="" width={150} /></Link>
									</div>
									<div className="main-menu">
										<ul>
											{/* <li>
												<Link href="/#">Home <i className="fa-solid fa-angle-down" /></Link>
												<div className="tp-submenu hidden">
													<div className="row">
														<div className="col-lg-12">
															<div className="all-images-menu">
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img1.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/">Chess Victoria-Homepage 01</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img2.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index2">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index2">Chess Victoria-Homepage 02</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img3.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index3">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index3">Chess Victoria-Homepage 03</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img4.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index4">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index4">Chess Victoria-Homepage 04</Link>
																	</div>
																</div>
																<div className="homemenu-thumb" style={{ margin: 0 }}>
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img5.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index5">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index5">Chess Victoria-Homepage 05</Link>
																	</div>
																</div>
															</div>
															<div className="all-images-menu">
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img6.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index6">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index6">Chess Victoria-Homepage 06</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img7.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index7">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index7">Chess Victoria-Homepage 07</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img8.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index8">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index8">Chess Victoria-Homepage 08</Link>
																	</div>
																</div>
																<div className="homemenu-thumb">
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img9.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index9">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index9">Chess Victoria-Homepage 09</Link>
																	</div>
																</div>
																<div className="homemenu-thumb" style={{ margin: 0 }}>
																	<div className="img1">
																		<img src="/assets/img/all-images/demo/demo-img10.png" alt="" />
																	</div>
																	<div className="homemenu-btn">
																		<Link className="vl-btn1" href="/index10">View Demo </Link>
																	</div>
																	<div className="homemenu-text">
																		<Link href="/index10">Chess Victoria-Homepage 10</Link>
																	</div>
																</div>
															</div>
														</div>
													</div>
											</li> */}
											<li><Link href="/about">About Chess Victoria<i className="fa-solid fa-angle-down" /></Link>

												<ul className="dropdown-padding">
													<li>
														<Link href="/committees">Our Committees</Link>
													</li>
													<li><Link href="/about/players">Our Players</Link></li>
													<li><Link href="/mission">Our Missions</Link></li>
													<li><Link href="/vision">Our Vision</Link></li>
													<li><Link href="/memories">Our Memories</Link></li>
												</ul>
											</li>
											
											<li>
												<Link href="/victorian-champions">Victorian Champions <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/victorian-champions/junior-champions">Junior Champions</Link></li>
													<li><Link href="/victorian-champions/australian-master">Australian Masters</Link></li>
													<li><Link href="/victorian-champions/victorian-champions">Victorian Champions</Link></li>
													<li><Link href="/victorian-champions/victorian-country-champions">Victorian Country Champions</Link></li>
													<li><Link href="/victorian-champions/victorian-open">Victorian Open</Link></li>
													<li><Link href="/victorian-champions/victorian-women">Victorian Women</Link></li>
												</ul>
											</li>
											<li>
												<Link href="/events">Events <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/events/2025-chess-victoria/">Chess Victoria Event</Link></li>
													<li><Link href="/events/2025-state-tournaments">State level Tournaments</Link></li>
													<li><Link href="/events/2025-clubs-tournaments">Clubs Level Tournaments</Link></li>
													<li><Link href="/events/fide-tournaments">FIDE Tournaments</Link></li>
												</ul>
											</li>

											<li>
												<Link href="/chess-clubs">Victoria Club <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/chess-clubs/mcc">Melbourne Chess Club</Link></li>
													<li><Link href="/chess-clubs/bhcc">Boxhill Chess Club</Link></li>
													<li><Link href="/chess-clubs/hbcc">Hobsons Bay Chess Club</Link></li>
												</ul>
											</li>

											<li>
												<Link href="/news">News & Update <i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/news/category/chess-victoria-news/page-1">Chess Victoria News</Link></li>
													<li><Link href="/news/category/victorian-junior-updates/page-1">Victorian Junior News</Link></li>
													<li><Link href="/news/category/victorian-championship-news/page-1">Victorian Champions News</Link></li>
												</ul>
											</li>
											<li>
												<Link href="/others">Others<i className="fa-solid fa-angle-down" /></Link>
												<ul className="dropdown-padding">
													<li><Link href="/galleries">Galleries</Link></li>
													<li><Link href="/players/search">Players Search</Link></li>
													<li><Link href="/faq">FAQ</Link></li>
													<li><Link href="/documents">Documents</Link></li>
													<li><Link href="/contact">Contact Us</Link></li>
												</ul>
											</li>
										</ul>
									</div>
									<div className="btn-area">
										<div className="search-icon header__search header-search-btn" onClick={handleSearch}>
											<a><img src="/assets/img/icons/search1.svg" alt="" /></a>
										</div>
										<ul>
											{SITE_CONFIG.facebookUrl && (
												<li>
													<Link href={SITE_CONFIG.facebookUrl} target='_blank'><i className="fa-brands fa-facebook-f" /></Link>
												</li>
											)}
											{SITE_CONFIG.instagramUrl && (
												<li>
													<Link href={SITE_CONFIG.instagramUrl} target='_blank'><i className="fa-brands fa-instagram" /></Link>
												</li>
											)}
											{SITE_CONFIG.linkedinUrl && (
												<li>
													<Link href={SITE_CONFIG.linkedinUrl} target='_blank'><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
											)}
											{SITE_CONFIG.pinterestUrl && (
												<li>
													<Link href={SITE_CONFIG.pinterestUrl} target='_blank' className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											)}
										</ul>
									</div>
									<div className={`header-search-form-wrapper ${isSearch ? 'open' : ''}`}>
										<div className="tx-search-close tx-close" onClick={handleSearch}><i className="fa-solid fa-xmark" /></div>
										<div className="header-search-container">
											<form role="search" className="search-form">
												<input type="search" className="search-field" placeholder="Search …" name="s" />
												<button type="submit" className="search-submit"><img src="/assets/img/icons/search1.svg" alt="" /></button>
											</form>
										</div>
									</div>
									{isSearch && <div className="body-overlay active" onClick={handleSearch} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

		</>
	)
}
