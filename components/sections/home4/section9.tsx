
import Link from 'next/link'

export default function Section9() {
	return (
		<>

			<div className="blog4-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="blog-header heading6 text-center space-margin60">
								<h5>News &amp; updates</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Balancing Profit &amp; Purpose</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
							<div className="blog4-boxarea">
								<div className="img1">
									<img src="/assets/img/all-images/blog/blog-img4.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
										</li>
										<li>
											<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Beverly</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Save soil, save world Projects in 2020</Link>
									<div className="space24" />
									<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
									<div className="arrow">
										<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="blog4-boxarea">
								<div className="img1">
									<img src="/assets/img/all-images/blog/blog-img5.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
										</li>
										<li>
											<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Gisselle</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Civil Litigation paper’s Of Conference</Link>
									<div className="space24" />
									<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
									<div className="arrow">
										<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
							<div className="blog4-boxarea">
								<div className="img1">
									<img src="/assets/img/all-images/blog/blog-img6.png" alt="" />
								</div>
								<div className="content-area">
									<ul>
										<li>
											<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />26 Jan 2025 <span> | </span></Link>
										</li>
										<li>
											<Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />Mertie</Link>
										</li>
									</ul>
									<div className="space20" />
									<Link href="/blog-single">Greetings and Opening Event of health</Link>
									<div className="space24" />
									<Link href="/blog-single" className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
									<div className="arrow">
										<Link href="/blog-single"><i className="fa-solid fa-arrow-right" /></Link>
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
