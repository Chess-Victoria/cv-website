import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import FooterGallery from '@/components/elements/FooterGallery'


export default function SiteFooter() {
	return (
		<>
			<div className="footer1-sertion-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6">
							<div className="footer-logo-area">
								<img src={SITE_CONFIG.logoBlack || '/assets/img/logo/cvlogo-black.png'} alt="" width={100} />
								<div className="space16" />
								<p>{SITE_CONFIG.footerText || ''}</p>
								<div className="space24" />
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
											<Link href={SITE_CONFIG.pinterestUrl} target="_blank" className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
										</li>
									)}
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-6">
							<div className="link-content">
								<h3>Quick Links</h3>
								<ul>
									<li><Link href="/about">About Us</Link></li>
									<li><Link href="/news">News & Updates</Link></li>
									<li><Link href="/faq">Frequently Asked Questions</Link></li>
									<li><Link href="/contact">Contact Us</Link></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="link-content2">
								<h3>Contact Us</h3>
								<ul>
									{SITE_CONFIG.contactPhone && (
										<li>
											<Link href={`tel:${SITE_CONFIG.contactPhone}`}><img src="/assets/img/icons/phn1.svg" alt="" />{SITE_CONFIG.contactPhone}</Link>
										</li>
									)}
									{SITE_CONFIG.address && (
										<li>
											<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />{SITE_CONFIG.address}</Link>
										</li>
									)}
									{SITE_CONFIG.contactEmail && (
										<li>
											<Link href={`mailto:${SITE_CONFIG.contactEmail}`}><img src="/assets/img/icons/mail1.svg" alt="" />{SITE_CONFIG.contactEmail}</Link>
										</li>
									)}
									{SITE_CONFIG.websiteUrl && (
										<li>
											<Link href={"//" + SITE_CONFIG.websiteUrl} target="_blank"> <img src="/assets/img/icons/world1.svg" alt="" />{SITE_CONFIG.websiteUrl}</Link>
										</li>
									)}
								</ul>
							</div>
						</div>
						<div className="col-lg-4 col-md-6">
							<FooterGallery />
						</div>
					</div>
					<div className="space60" />
					<div className="row">
						<div className="col-lg-12">
							<div className="copyright">
								<p>© Copyright {new Date().getFullYear()} -{SITE_CONFIG.siteName || 'Chess Victoria'}. All Right Reserved</p>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
