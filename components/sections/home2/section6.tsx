
'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 2,
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
			slidesPerView: 2,
			spaceBetween: 30,
		},
		1350: {
			slidesPerView: 2,
			spaceBetween: 30,
		},
	}
}

export default function Section6() {
	return (
		<>

			<div className="memory2-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="memory-heaer2 heading4 space-margin60">
								<div className="heading4">
									<h5>last year memory</h5>
									<div className="space18" />
									<h2 className="text-anime-style-3">Recent Memories 2024</h2>
								</div>
								<div className="btn-area1" data-aos="zoom-in" data-aos-duration={1000}>
									<Link href="/memories" className="vl-btn2"><span className="demo">See Recent Photos</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
								</div>
							</div>
						</div>
						<div className="col-lg-12 memory-widget-slider">
							<Swiper {...swiperOptions} className=" owl-carousel">
								<SwiperSlide className="memory-widget-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img1.png" alt="" />
									</div>
									<div className="content-area">
										<Link href="/memories" className="arrow"><i className="fa-solid fa-arrow-right" /></Link>
										<div className="text">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/memories">Event Conferences</Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory-widget-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img2.png" alt="" />
									</div>
									<div className="content-area">
										<Link href="/memories" className="arrow"><i className="fa-solid fa-arrow-right" /></Link>
										<div className="text">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/memories">Event Conferences</Link>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="memory-widget-boxarea">
									<div className="img1">
										<img src="/assets/img/all-images/memory/memory-img3.png" alt="" />
									</div>
									<div className="content-area">
										<Link href="/memories" className="arrow"><i className="fa-solid fa-arrow-right" /></Link>
										<div className="text">
											<p>Event 2024</p>
											<div className="space12" />
											<Link href="/memories">Event Conferences</Link>
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
