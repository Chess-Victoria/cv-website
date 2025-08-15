'use client'
import CountUp from 'react-countup'
import Slider from "react-slick"

const settings = {
	autoplay: true,
	autoplaySpeed: 2500,
	speed: 1500,
	slidesToShow: 1,
	slidesToScroll: 1,
	pauseOnHover: false,
	dots: false,
	arrows: false,
	pauseOnDotsHover: true,
	cssEase: 'linear',
	fade: true,
	draggable: true,
	// prevArrow: $(".testimonial-prev-arrow"),
	// nextArrow: $(".testimonial-next-arrow"),
}

import Countdown from '@/components/elements/Countdown'
import Link from 'next/link'

export default function Section1() {
	return (
		<>

			<Slider {...settings} className="hero2-slider-area">
				<div className="her2-section-area">
					<img src="/assets/img/elements/elements9.png" alt="" className="elements9" />
					<img src="/assets/img/elements/elements10.png" alt="" className="elements10" />
					<img src="/assets/img/elements/elements11.png" alt="" className="elements11" />
					<div className="img1">
						<img src="/assets/img/all-images/hero/hero-img2.png" alt="" />
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="hero2-header">
									<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Lead Purpose, Innovate with Passion</h5>
									<div className="space28" />
									<h1>Yearly Business</h1>
									<div className="space16" />
									<h1><span className="conferences">Conferences</span> “ <CountUp className="odometer" enableScrollSpy={true} end={25} /> ”</h1>
									<Countdown />
									<div className="space32" />
									<div className="btn-area1">
										<Link href="/event-schedule" className="vl-btn2"><span className="demo">Reserve My Seat</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="arrow-btn">
									<div className="about-btnarea">
										<svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200" fill="none" className="keyframe5">
											<path d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z" fill="#C0F037" />
										</svg>
										<Link href="/pricing-plan">
											<span><i className="fa-solid fa-arrow-right" /></span>
											<br />
											<div className="space12" />
											Buy Ticket
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="her2-section-area">
					<img src="/assets/img/elements/elements9.png" alt="" className="elements9" />
					<img src="/assets/img/elements/elements10.png" alt="" className="elements10" />
					<img src="/assets/img/elements/elements11.png" alt="" className="elements11" />
					<div className="img1">
						<img src="/assets/img/all-images/hero/hero-img3.png" alt="" />
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="hero2-header">
									<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Lead Purpose, Innovate with Passion</h5>
									<div className="space28" />
									<h1>Yearly Business</h1>
									<div className="space16" />
									<h1><span className="conferences">Conferences</span> “ <CountUp className="odometer" enableScrollSpy={true} end={25} /> ”</h1>
									<Countdown />
									<div className="space32" />
									<div className="btn-area1">
										<Link href="/event-schedule" className="vl-btn2"><span className="demo">Reserve My Seat</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="arrow-btn">
									<div className="about-btnarea">
										<svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200" fill="none" className="keyframe5">
											<path d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z" fill="#C0F037" />
										</svg>
										<Link href="/pricing-plan">
											<span><i className="fa-solid fa-arrow-right" /></span>
											<br />
											<div className="space12" />
											Buy Ticket
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="her2-section-area">
					<img src="/assets/img/elements/elements9.png" alt="" className="elements9" />
					<img src="/assets/img/elements/elements10.png" alt="" className="elements10" />
					<img src="/assets/img/elements/elements11.png" alt="" className="elements11" />
					<div className="img1">
						<img src="/assets/img/all-images/hero/hero-img4.png" alt="" />
					</div>
					<div className="container">
						<div className="row">
							<div className="col-lg-6">
								<div className="hero2-header">
									<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Lead Purpose, Innovate with Passion</h5>
									<div className="space28" />
									<h1>Yearly Business</h1>
									<div className="space16" />
									<h1><span className="conferences">Conferences</span> “ <CountUp className="odometer" enableScrollSpy={true} end={25} /> ”</h1>
									<Countdown />
									<div className="space32" />
									<div className="btn-area1">
										<Link href="/event-schedule" className="vl-btn2"><span className="demo">Reserve My Seat</span><span className="arrow"><i className="fa-solid fa-arrow-right" /></span></Link>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="arrow-btn">
									<div className="about-btnarea">
										<svg xmlns="http://www.w3.org/2000/svg" width={200} height={200} viewBox="0 0 200 200" fill="none" className="keyframe5">
											<path d="M93.8771 2.53621C96.8982 1.28483 98.4087 0.659138 100 0.659138C101.591 0.659138 103.102 1.28483 106.123 2.5362L164.588 26.7531C167.609 28.0045 169.119 28.6302 170.245 29.7554C171.37 30.8806 171.995 32.3912 173.247 35.4123L197.464 93.8771C198.715 96.8982 199.341 98.4087 199.341 100C199.341 101.591 198.715 103.102 197.464 106.123L173.247 164.588C171.995 167.609 171.37 169.119 170.245 170.245C169.119 171.37 167.609 171.995 164.588 173.247L106.123 197.464C103.102 198.715 101.591 199.341 100 199.341C98.4087 199.341 96.8982 198.715 93.8771 197.464L35.4123 173.247C32.3912 171.995 30.8806 171.37 29.7554 170.245C28.6302 169.119 28.0045 167.609 26.7531 164.588L2.53621 106.123C1.28483 103.102 0.659138 101.591 0.659138 100C0.659138 98.4087 1.28483 96.8982 2.5362 93.8771L26.7531 35.4123C28.0045 32.3912 28.6302 30.8806 29.7554 29.7554C30.8806 28.6302 32.3912 28.0045 35.4123 26.7531L93.8771 2.53621Z" fill="#C0F037" />
										</svg>
										<Link href="/pricing-plan">
											<span><i className="fa-solid fa-arrow-right" /></span>
											<br />
											<div className="space12" />
											Buy Ticket
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Slider>
			<div className="testimonial-arrows">
				<div className="testimonial-prev-arrow">
					<button><i className="fa-solid fa-angle-left" /></button>
				</div>
				<div className="testimonial-next-arrow">
					<button><i className="fa-solid fa-angle-right" /></button>
				</div>
			</div>

		</>
	)
}
