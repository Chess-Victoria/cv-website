
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section3() {
	return (
		<>

			<div className="about7-section-area sp1">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="about-header-area heading10">
								<h2 className="text-anime-style-3">Transforming the of Global Economic Landscape</h2>
								<div className="space16" />
								<p data-aos="fade-left" data-aos-duration={900}>Our mission at Economy Event to drive meaningful
									dialogue, foster collaboration, spark innovative solutions for sustainable economic.</p>
								<div className="space32" />
								<div className="about-auhtor-box" data-aos="fade-left" data-aos-duration={1000}>
									<div className="icons">
										<img src="/assets/img/icons/about-icon1.svg" alt="" />
									</div>
									<div className="text">
										<Link href="/#">ECollaborating for Economic Impact</Link>
										<div className="space12" />
										<p>This event brings together economists business leaders policymakers, and innovators
											from around the globe.</p>
									</div>
								</div>
								<div className="space20" />
								<div className="about-auhtor-box" data-aos="fade-left" data-aos-duration={1100}>
									<div className="icons">
										<img src="/assets/img/icons/about-icon2.svg" alt="" />
									</div>
									<div className="text">
										<Link href="/#">Where Ideas Shape the Economy</Link>
										<div className="space12" />
										<p>With a focus on topics such as global trade, financial technology, sustainable
											development, and policy.</p>
									</div>
								</div>
								<div className="space32" />
								<div className="btn-area1" data-aos="fade-left" data-aos-duration={1200}>
									<Link href="/contact" className="vl-btn7">Become an Attendee <span><i className="fa-solid fa-arrow-right" /></span></Link>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="about-all-images">
								<div className="img1 image-anime reveal">
									<img src="/assets/img/all-images/about/about-img17.png" alt="" />
								</div>
								<div className="img2 image-anime reveal">
									<img src="/assets/img/all-images/about/about-img18.png" alt="" />
								</div>
								<div className="arrow-btn">
									<Link href="/#">
										{/* <img src="/assets/img/elements/elements34.png" alt="" class="elements34 keyframe5"> */}
										<div className="content" >
											<CircleText text="Build Success Brand." />
										</div>
										<img src="/assets/img/icons/arrow1.svg" alt="" className="arrow1" />
									</Link>
								</div>
								<img src="/assets/img/elements/elements37.png" alt="" className="elements37" />
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
