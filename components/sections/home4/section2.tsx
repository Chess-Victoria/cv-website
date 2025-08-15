import Countdown from '@/components/elements/Countdown'


export default function Section2() {
	return (
		<>

			<div className="others4-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="others-bg">
								<div className="row align-items-center">
									<div className="col-lg-4">
										<div className="heading-area">
											<h4 className="text-anime-style-3">Yearly Business Conferences “25”</h4>
											<div className="space20 d-lg-none d-block" />
										</div>
									</div>
									<div className="col-lg-2" />
									<div className="col-lg-6">
										<div className="others-times-area">
											<Countdown style={1} />
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
