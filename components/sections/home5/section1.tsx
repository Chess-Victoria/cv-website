
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero5-section-area">
				<img src="/assets/img/elements/elements31.png" alt="" className="elements31" />
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-7">
							<div className="header5-heading">
								<h5>
									<span><img src="/assets/img/icons/location2.svg" alt="" /></span>Location: 1800 Abbot Kinney Blvd
								</h5>
								<div className="space32" />
								<h1 className="text-anime-style-3">AI Digital</h1>
								<div className="space32" />
								<h1 className="text-anime-style-3"><img src="/assets/img/all-images/others/author-img1.png" alt="" /><span>Summit</span></h1>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="img1">
								<img src="/assets/img/all-images/hero/hero-img7.png" alt="" className="keyframe5 hero-img7" />
								<Link href="/#">
									<div className="content" >
										<CircleText text="Build Success Brand." />
									</div>
									<span><img src="/assets/img/icons/arrow1.svg" alt="" /></span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
