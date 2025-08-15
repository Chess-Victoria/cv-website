import BrandSlider from '@/components/slider/BrandSlider'


export default function Section6() {
	return (
		<>

			<div className="brands6-section-area">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 m-auto">
							<div className="brand-header heading4 space-margin60 text-center">
								<h3>Join 4,000+ companies already growing</h3>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12" data-aos="zoom-in" data-aos-duration={800}>
						<BrandSlider />
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
