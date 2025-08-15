
import Link from 'next/link'

export default function Section4() {
	return (
		<>

			<div className="vanue-section-area sp2">
				<div className="container">
					<div className="row">
						<div className="col-lg-5 m-auto">
							<div className="vanue-header heading10 text-center space-margin60">
								<h2 className="text-anime-style-3">Explore Our&nbsp;4 Venues</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={900}>
							<div className="vanue-single-item-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/others/vanue-img1.png" alt="" />
								</div>
								<div className="content-area">
									<span>Venue 01</span>
									<div className="space16" />
									<Link href="/event-single">Marine City Michigan</Link>
									<div className="space12" />
									<p>New York, USA</p>
									<div className="space16" />
									<Link href="/event-single" className="tour">Virtual Tour <i className="fa-solid fa-arrow-right" /></Link>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1000}>
							<div className="vanue-single-item-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/others/vanue-img2.png" alt="" />
								</div>
								<div className="content-area">
									<span>Venue 02</span>
									<div className="space16" />
									<Link href="/event-single">Kansas City Omaha</Link>
									<div className="space12" />
									<p>New York, USA</p>
									<div className="space16" />
									<Link href="/event-single" className="tour">Virtual Tour <i className="fa-solid fa-arrow-right" /></Link>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1100}>
							<div className="vanue-single-item-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/others/vanue-img3.png" alt="" />
								</div>
								<div className="content-area">
									<span>Venue 03</span>
									<div className="space16" />
									<Link href="/event-single">New Hampshire City</Link>
									<div className="space12" />
									<p>New York, USA</p>
									<div className="space16" />
									<Link href="/event-single" className="tour">Virtual Tour <i className="fa-solid fa-arrow-right" /></Link>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-duration={1200}>
							<div className="vanue-single-item-area">
								<div className="img1 image-anime">
									<img src="/assets/img/all-images/others/vanue-img4.png" alt="" />
								</div>
								<div className="content-area">
									<span>Venue 04</span>
									<div className="space16" />
									<Link href="/event-single">Marine City Michigan</Link>
									<div className="space12" />
									<p>New York, USA</p>
									<div className="space16" />
									<Link href="/event-single" className="tour">Virtual Tour <i className="fa-solid fa-arrow-right" /></Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
