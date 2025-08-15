
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero10-section-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg23.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-7">
							<div className="hero6-header">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />12th Technology Forum Conference</h5>
								<div className="space24" />
								<h1 className="text-anime-style-3">Technology</h1>
								<h1 className="text-anime-style-3"><span>Forum “2025”</span></h1>
								<div className="space32" />
								<p>
									Explore cutting-edge innovations, network <br className="d-lg-block d-none" />
									with industry leaders and gain insight.
								</p>
								<div className="space16" />
								<ul>
									<li>
										<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" /> 15th, 16th, &amp; 17th
											January “2025”</Link>
									</li>
								</ul>
								<div className="space32" />
								<div className="btn-area1">
									<Link href="/contact" className="vl-btn10">Register now <img src="/assets/img/icons/arrow2.svg" alt="" /></Link>
								</div>
								<div className="arrow-btn">
									<div className="content" >
										<CircleText text="Build Success Brand." />
									</div>
									<div className="arrow">
										<img src="/assets/img/icons/arrow2.svg" alt="" />
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="hero10-images">
								<div className="img1">
									<img src="/assets/img/all-images/hero/hero-img12.png" alt="" />
								</div>
								<div className="img2">
									<img src="/assets/img/all-images/hero/hero-img13.png" alt="" />
								</div>
								<div className="img3">
									<img src="/assets/img/all-images/hero/hero-img14.png" alt="" />
								</div>
								<div className="img4">
									<img src="/assets/img/all-images/hero/hero-img15.png" alt="" />
								</div>
								<img src="/assets/img/elements/elements38.png" alt="" className="elements38 keyframe5" />
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
