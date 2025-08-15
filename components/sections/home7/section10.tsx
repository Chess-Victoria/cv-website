
import Link from 'next/link'

export default function Section10() {
	return (
		<>

			<div className="cta7-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="cta7-bg-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg18.png)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
								<div className="row">
									<div className="col-lg-7 m-auto">
										<div className="cta-heading text-center">
											<h2>Are you want to join our events?</h2>
											<div className="space16" />
											<p>It is a long established fact that a reader will be distracted by the <br className="d-lg-block d-none" /> readable content of a page when looking at its
												layout.</p>
											<div className="space32" />
											<div className="btn-area1">
												<Link href="/contact" className="vl-btn7">Register Now <span><i className="fa-solid fa-arrow-right" /></span></Link>
											</div>
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
