
import CircleText from '@/components/elements/CircleText'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero3-section-area">
				<img src="/assets/img/elements/elements18.png" alt="" className="elements18" />
				<img src="/assets/img/elements/elements9.png" alt="" className="elements9" />
				<div className="container">
					<div className="row">
						<div className="col-lg-8 m-auto">
							<div className="hero3-header text-center">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Join the the Future of Design</h5>
								<div className="space32" />
								<h1 className="text-anime-style-3">Yearly designer</h1>
								<div className="space24" />
								<h1 className="text-anime-style-3"><span className="conferences">Conferences</span> ‘<span>25</span></h1>
								<div className="space40" />
								<div className="btn-area1">
									<Link href="/event-schedule" className="vl-btn3">Reserve premium Seat</Link>
									<Link href="/pricing-plan" className="vl-btn3 btn2">buy ticket now</Link>
								</div>
								<div className="arrow-btnarea">
									<Link href="/about">
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
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
