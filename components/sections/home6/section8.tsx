'use client'
import Slider from "react-slick"

const settings = {
	loop: true,
	slidesToShow: 3,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 5000,
	cssEase: 'linear',
	infinite: true,
	arrows: false,
	touchMove: true,
	swipeToSlide: true,
	swipe: true,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
				infinite: true,
			}
		},

		{
			breakpoint: 600,
			settings: {
				slidesToShow: 2,
				slidesToScroll: 1,
			}
		},

		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},

		{
			breakpoint: 375,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},

		{
			breakpoint: 320,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			}
		},
	]
}
const settings2 = {
	loop: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 7000,
		cssEase: 'linear',
		infinite: true,
		arrows: false,
		touchMove: true,
		swipeToSlide: true,
		swipe: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},

			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},

			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},

			{
				breakpoint: 375,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},

			{
				breakpoint: 320,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
}

import Link from 'next/link'

export default function Section8() {
	return (
		<>

			<div className="testimonial6-section-area sp1">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 m-auto">
							<div className="testimonial-heading heading9 text-center space-margin60">
								<h5><img src="/assets/img/icons/sub-logo1.svg" alt="" />Testimonials</h5>
								<div className="space20" />
								<h2 className="text-anime-style-3">Register For Eventify “2025”</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-12">
							<Slider {...settings} className="testimonial-reviews-area">
								<div className="testimonial-boxarea">
									<p>“The insights I gained here were game-changing. A must-attend any marketer.”</p>
									<Link href="/#">Sarah M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Attending this summit was one of the best decisions I made this year. The speakers
										provided real-world insights that I could immediately apply to my campaigns.”</p>
									<Link href="/#">Lisa M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Incredible speakers and invaluable networking opportunities. I left feeling inspired.”
									</p>
									<Link href="/#">David K.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“The summit offered a great mix of theory and practice. I appreciated how the workshops
										dug deep into practical strategies while the keynote sessions inspired me to think
										bigger.”</p>
									<Link href="/#">Jason W.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“The insights I gained here were game-changing. A must-attend any marketer.”</p>
									<Link href="/#">Sarah M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Attending this summit was one of the best decisions I made this year. The speakers
										provided real-world insights that I could immediately apply to my campaigns.”</p>
									<Link href="/#">Lisa M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Incredible speakers and invaluable networking opportunities. I left feeling inspired.”
									</p>
									<Link href="/#">David K.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“The summit offered a great mix of theory and practice. I appreciated how the workshops
										dug deep into practical strategies while the keynote sessions inspired me to think
										bigger.”</p>
									<Link href="/#">Jason W.</Link>
								</div>
							</Slider>
							<div className="space24" />
							<Slider {...settings2} className="testimonial-reviews-area2">
								<div className="testimonial-boxarea">
									<p>“The networking opportunities were unparalleled. Beyond the valuable sessions, I found
										myself in meaningful conversations with other attendees who shared similar challenges.”
									</p>
									<Link href="/#">Sarah M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“From the well-organized sessions to the exceptional lineup of speakers, everything about
										this summit was top-notch. It was a fantastic opportunity to learn about the latest
										trends.”</p>
									<Link href="/#">Lisa M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Incredible speakers and invaluable networking opportunities. I left feeling inspired.”
									</p>
									<Link href="/#">David K.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“An amazing opportunity to connect with leaders and like-minded professionals.”</p>
									<Link href="/#">Jason W.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“I’ve attended many industry events, but this summit was a standout. The variety of
										sessions kept things engaging, and I appreciated how the content was tailored for
										different experience levels.”</p>
									<Link href="/#">Sarah M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“It’s rare to find an event that’s both inspiring and practical. This one nailed it.”</p>
									<Link href="/#">Lisa M.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“Incredible speakers and invaluable networking opportunities. I left feeling inspired.”
									</p>
									<Link href="/#">David K.</Link>
								</div>
								<div className="testimonial-boxarea">
									<p>“The summit offered a great mix of theory and practice. I appreciated how the workshops
										dug deep into practical strategies while the keynote sessions inspired me to think
										bigger.”</p>
									<Link href="/#">Jason W.</Link>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}
