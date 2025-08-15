
'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 4,
	spaceBetween: 30,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	loop: true,

	// Navigation
	navigation: {
		nextEl: '.h1n',
		prevEl: '.h1p',
	},

	// Pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},

	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 30,
		},
		575: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		767: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
		991: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 4,
			spaceBetween: 30,
		},
	}
}

export default function Section4() {
	return (
		<>

			<div className="team3-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-5">
							<div className="team2-header heading5 space-margin60">
								<h5>our 10+ event speakers</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Our Event Speakers</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 team-slider-area2">
							<Swiper {...swiperOptions} className=" owl-carousel">
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img8.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Alex Robertson</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img9.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Alexy Sammo</Link>
										<div className="space16" />
										<p>HR Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img10.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Andrew Symonds</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img11.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Ben Stokes</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img8.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Alex Robertson</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img9.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Alexy Sammo</Link>
										<div className="space16" />
										<p>HR Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img10.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Andrew Symonds</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
								<SwiperSlide className="our-team-boxarea">
									<div className="team-widget-area">
										<img src="/assets/img/elements/elements21.png" alt="" className="elements21" />
										<img src="/assets/img/elements/elements22.png" alt="" className="elements22" />
										<div className="img1">
											<img src="/assets/img/all-images/team/team-img11.png" alt="" className="team-img4" />
											<div className="share">
												<Link href="/#"><img src="/assets/img/icons/share1.svg" alt="" /></Link>
											</div>
											<ul>
												<li>
													<Link href="/#" className="icon1"><i className="fa-brands fa-facebook-f" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon2"><i className="fa-brands fa-linkedin-in" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon3"><i className="fa-brands fa-instagram" /></Link>
												</li>
												<li>
													<Link href="/#" className="icon4"><i className="fa-brands fa-pinterest-p" /></Link>
												</li>
											</ul>
										</div>
									</div>
									<div className="space28" />
									<div className="content-area">
										<Link href="/speakers">Ben Stokes</Link>
										<div className="space16" />
										<p>Finance Consultant</p>
									</div>
								</SwiperSlide>
							</Swiper>

<div className="owl-nav">
	<button type="button" role="presentation" className="owl-prev h1p">
		<i className="fa-solid fa-angle-left" />
	</button>
	<button type="button" role="presentation" className="owl-next h1n">
		<i className="fa-solid fa-angle-right" />
	</button>
</div>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
