
'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 3,
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
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1199: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 3,
			spaceBetween: 30,
		},
	}
}

export default function Section9() {
	return (
		<>

			<div className="memory3-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="memory3-header text-center heading5 space-margin60">
								<h5>recent year Memories</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Recent Memories 2024</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12 memory-team-slider">
							<Swiper {...swiperOptions} className=" owl-carousel">
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img4.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img5.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img6.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img4.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img5.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory3-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img6.png" alt="" />
									</div>
									<div className="content-area">
										<p>Event 2024</p>
										<div className="space12" />
										<Link href="/memories">Freelancer Meetup</Link>
										<div className="plus">
											<Link href="/memories"><i className="fa-solid fa-plus" /></Link>
										</div>
									</div>
								</SwiperSlide>
							</Swiper>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
