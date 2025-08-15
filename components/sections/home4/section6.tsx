
'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
	modules: [Autoplay, Pagination, Navigation],
	slidesPerView: 1,
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
}

export default function Section6() {
	return (
		<>

			<div className="testimonial4-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="testimonial4-header heading6 text-center space-margin60">
								<h5 data-aos="fade-left" data-aos-duration={800}>testimonial</h5>
								<div className="space18" />
								<h2 className="text-anime-style-3">Feedback from Innovate 2024</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-8 m-auto testimonial-review-slider">
							<Swiper {...swiperOptions} className=" owl-carousel">
								<SwiperSlide className="testimonial4-content">
									<ul>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
									</ul>
									<div className="space20" />
									<p className="main">“The networking opportunities were equally transformative, allowing me to connect with like-minded professionals who share a passion for innovation and growth. Overall, Innovate 2024 has reinvigorated approach to business &amp; opened doors to new.”</p>
									<div className="space32" />
									<div className="name-area">
										<div className="img1">
											<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
										</div>
										<div className="text">
											<Link href="/speakers">Tristian Stubbs</Link>
											<div className="space6" />
											<p>Founder, Payhawk</p>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="testimonial4-content">
									<ul>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
									</ul>
									<div className="space20" />
									<p className="main">“The networking opportunities were equally transformative, allowing me to connect with like-minded professionals who share a passion for innovation and growth. Overall, Innovate 2024 has reinvigorated approach to business &amp; opened doors to new.”</p>
									<div className="space32" />
									<div className="name-area">
										<div className="img1">
											<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
										</div>
										<div className="text">
											<Link href="/speakers">Tristian Stubbs</Link>
											<div className="space6" />
											<p>Founder, Payhawk</p>
										</div>
									</div>
								</SwiperSlide>
								<SwiperSlide className="testimonial4-content">
									<ul>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
										<li><i className="fa-solid fa-star" /></li>
									</ul>
									<div className="space20" />
									<p className="main">“The networking opportunities were equally transformative, allowing me to connect with like-minded professionals who share a passion for innovation and growth. Overall, Innovate 2024 has reinvigorated approach to business &amp; opened doors to new.”</p>
									<div className="space32" />
									<div className="name-area">
										<div className="img1">
											<img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
										</div>
										<div className="text">
											<Link href="/speakers">Tristian Stubbs</Link>
											<div className="space6" />
											<p>Founder, Payhawk</p>
										</div>
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
