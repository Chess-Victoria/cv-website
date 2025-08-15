
import CircleText from '@/components/elements/CircleText'
import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<div className="hero7-section-area" style={{ backgroundImage: 'url(assets/img/bg/header-bg18.png)', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-2 col-md-3">
							<div className="date-btn">
								<svg xmlns="http://www.w3.org/2000/svg" width={148} height={168} viewBox="0 0 148 168" fill="none">
									<path d="M66 3.6188C69.9043 1.36467 71.8564 0.237604 74 0.237604C76.1436 0.237604 78.0957 1.36467 82 3.6188L139.612 36.8812C143.516 39.1353 145.469 40.2624 146.54 42.1188C147.612 43.9752 147.612 46.2293 147.612 50.7376V117.262C147.612 121.771 147.612 124.025 146.54 125.881C145.469 127.738 143.516 128.865 139.612 131.119L82 164.381C78.0957 166.635 76.1436 167.762 74 167.762C71.8564 167.762 69.9043 166.635 66 164.381L8.38784 131.119C4.48357 128.865 2.53143 127.738 1.45964 125.881C0.38784 124.025 0.38784 121.771 0.38784 117.262V50.7376C0.38784 46.2293 0.38784 43.9752 1.45964 42.1188C2.53143 40.2624 4.48357 39.1353 8.38784 36.8812L66 3.6188Z" fill="#FC226A" />
									<path d="M66.25 4.05181C68.2106 2.91989 69.6501 2.08939 70.8666 1.53835C72.073 0.991856 73.0242 0.737604 74 0.737604C74.9758 0.737604 75.927 0.991856 77.1334 1.53835C78.3499 2.08939 79.7894 2.91989 81.75 4.05182L139.362 37.3142C141.323 38.4461 142.762 39.2776 143.847 40.0555C144.924 40.8271 145.619 41.5237 146.107 42.3688C146.595 43.2139 146.851 44.1648 146.981 45.4828C147.112 46.8118 147.112 48.4737 147.112 50.7376V117.262C147.112 119.526 147.112 121.188 146.981 122.517C146.851 123.835 146.595 124.786 146.107 125.631C145.619 126.476 144.924 127.173 143.847 127.944C142.762 128.722 141.323 129.554 139.362 130.686L81.75 163.948C79.7894 165.08 78.3499 165.911 77.1334 166.462C75.927 167.008 74.9758 167.262 74 167.262C73.0242 167.262 72.073 167.008 70.8666 166.462C69.6501 165.911 68.2106 165.08 66.25 163.948L8.63784 130.686C6.67728 129.554 5.23826 128.722 4.15283 127.944C3.07635 127.173 2.38057 126.476 1.89265 125.631C1.40473 124.786 1.14933 123.835 1.0194 122.517C0.8884 121.188 0.88784 119.526 0.88784 117.262V50.7376C0.88784 48.4737 0.8884 46.8118 1.0194 45.4828C1.14933 44.1648 1.40473 43.2139 1.89265 42.3688C2.38057 41.5237 3.07635 40.8271 4.15283 40.0555C5.23826 39.2776 6.67728 38.4461 8.63784 37.3142L66.25 4.05181Z" stroke="white" strokeOpacity="0.1" />
								</svg>
								<h2>15</h2>
								<p>jan 2025</p>
							</div>
						</div>
						<div className="col-lg-5 col-md-9">
							<div className="heading-area">
								<h1 className="text-anime-style-3">Digital World&nbsp; Conference</h1>
							</div>
						</div>
						<div className="col-lg-1" />
						<div className="col-lg-2">
							<div className="arrow-btn">
								<Link href="/#">
									{/* <img src="/assets/img/elements/elements34.png" alt="" class="elements34 keyframe5"> */}
									<div className="content" >
										<CircleText text="Build Success Brand." />
									</div>
									<img src="/assets/img/icons/arrow1.svg" alt="" className="arrow1" />
								</Link>
							</div>
						</div>
					</div>
					<div className="space60" />
					<div className="row">
						<div className="col-lg-5 col-md-6">
							<div className="img1 image-anime reveal">
								<img src="/assets/img/all-images/hero/hero-img9.png" alt="" />
							</div>
						</div>
						<div className="col-lg-3 col-md-6">
							<div className="img1 image-anime reveal">
								<img src="/assets/img/all-images/hero/hero-img10.png" alt="" />
							</div>
						</div>
						<div className="col-lg-4">
							<div className="heading-area">
								<p>From cutting-edge technology and digital transformation to leadership strategies and
									sustainable growth, Innovate 2024 provide.</p>
								<div className="space32" />
								<div className="btn-area1">
									<Link href="/contact" className="vl-btn7">Reserve My Seat <span><i className="fa-solid fa-arrow-right" /></span></Link>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-4">
						</div>
						<div className="col-lg-7">
							<div className="timer-btn-area">
								<Countdown style={1} />
							</div>
							<div className="timer-btn-area d-none">
								<Countdown />
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
