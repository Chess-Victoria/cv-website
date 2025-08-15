
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero8-slider-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg19.png)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center bottom' }}>
				<img src="/assets/img/elements/layer1.png" alt="" className="layer1" />
				<div className="container">
					<div className="row">
						<div className="col-lg-8 m-auto">
							<div className="hero8-header text-center">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Join the the Future of crypto</h5>
								<div className="space32" />
								<h1 className="text-anime-style-3">Digital crypto</h1>
								<div className="space24" />
								<h1 className="text-anime-style-3"><span className="conferences">Conferences</span> ‘25</h1>
								<div className="space40" />
								<div className="btn-area1">
									<Link href="/contact" className="vl-btn8"><span className="demo">Reserve premium Seat</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="arrow-btnarea">
					<Link href="/about">
						{/* <img src="/assets/img/elements/elements19.png" alt="" class="elements19 keyframe5"> */}
						{/* <img src="/assets/img/elements/elements34.png" alt="" class="elements34 keyframe5"> */}
						<div className="content" >
							<CircleText text="Build Success Brand." />
						</div>
						<img src="/assets/img/icons/arrow1.svg" alt="" className="arrow1" />
					</Link>
				</div>
				<div className="date-btn aniamtion-key-1">
					<h4>15</h4>
					<div className="space14" />
					<p>January</p>
					<div className="space20" />
					<Link href="/pricing-plan">Buy Ticket</Link>
				</div>
			</div>

		</>
	)
}
