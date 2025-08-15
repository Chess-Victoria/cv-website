
import Link from 'next/link'

export default function Section5() {
	return (
		<>

			<div className="attent6-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="attent-heading heading9 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />What You Learn</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Where Marketers Go to Learn</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800}>
							<div className="skils-widget-boxarea">
								<div className="icons">
									<img src="/assets/img/icons/skills1.svg" alt="" />
								</div>
								<div className="space32" />
								<div className="content-area">
									<Link href="/event-single">Connect with Visionaries</Link>
									<div className="space16" />
									<p>Join industry leaders and like-minded peers, and expand your network with a dynamic
										community ready to support your career growth and aspirations.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="skils-widget-boxarea">
								<div className="icons">
									<img src="/assets/img/icons/skills2.svg" alt="" />
								</div>
								<div className="space32" />
								<div className="content-area">
									<Link href="/event-single">Master New Skills</Link>
									<div className="space16" />
									<p>Every obstacle has a solution, and we bring together experts who’ve been through it all.
										Get practical advice, tips, and guidance to challenges faster.</p>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
							<div className="skils-widget-boxarea">
								<div className="icons">
									<img src="/assets/img/icons/skills3.svg" alt="" />
								</div>
								<div className="space32" />
								<div className="content-area">
									<Link href="/event-single">Take Actionable Insight</Link>
									<div className="space16" />
									<p>Immerse yourself in tailored sessions that address your biggest marketing hurdles. Leave
										with proven strategies and innovative ideas to elevate success.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
