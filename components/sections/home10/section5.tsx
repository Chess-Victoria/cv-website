
import Link from 'next/link'

export default function Section5() {
	return (
		<>

			<div className="team10-section-area sp3">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="heading13 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />our speaker</h5>
								<div className="space20" />
								<h2>Meet Our 2025 Speakers</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4">
							<div className="team10-widget-boxarea">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/team/team-img38.png" alt="" />
								</div>
								<div className="text-area">
									<Link href="/speakers-single">Alex Carter</Link>
									<div className="space16" />
									<p>CEO, TechX Solution</p>
								</div>
							</div>
							<div className="space30" />
						</div>
						<div className="col-lg-8">
							<div className="row">
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img39.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">Autumn Phillips</Link>
											<div className="space16" />
											<p>AI Research Lead</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img40.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">James Hall</Link>
											<div className="space16" />
											<p>Cybersecurity Expert</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img41.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">Alex Buckmaster</Link>
											<div className="space16" />
											<p>Branding</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img42.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">Jerry Helfer</Link>
											<div className="space16" />
											<p>Quantum Technologies</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img43.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">Dennis Callis</Link>
											<div className="space16" />
											<p>GreenTech Innovations</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4 col-md-6">
									<div className="team10-widget-boxarea2">
										<div className="img1 image-anime">
											<img src="/assets/img/all-images/team/team-img44.png" alt="" />
										</div>
										<div className="text-area">
											<Link href="/speakers-single">Chris Glasser</Link>
											<div className="space16" />
											<p>Head of User Experience</p>
										</div>
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
