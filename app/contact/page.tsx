'use client'

import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'
import PageHeadContent from '@/components/elements/PageHeadContent'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'

export default function Contact() {
	const emailDisplay = SITE_CONFIG.contactEmail || 'Chess Victoria@gmail.com'
	const emailHref = SITE_CONFIG.contactEmail ? `mailto:${SITE_CONFIG.contactEmail}` : 'mailto:Chess-Victoria@gmail.com'
	const phoneDisplay = SITE_CONFIG.contactPhone || '+1 123 456 7890'
	const phoneHref = SITE_CONFIG.contactPhone ? `tel:${SITE_CONFIG.contactPhone}` : 'tel:+11234567890'
	const addressDisplay = SITE_CONFIG.address || 'Melbourne, Australia'

	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		email: '',
		subject: '',
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<{
		type: 'success' | 'error' | null
		message: string
	}>({ type: null, message: '' })

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData(prev => ({
			...prev,
			[name]: value
		}))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus({ type: null, message: '' })

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			})

			const result = await response.json()

			if (response.ok) {
				setSubmitStatus({
					type: 'success',
					message: 'Thank you! Your message has been sent successfully.'
				})
				// Reset form
				setFormData({
					name: '',
					phone: '',
					email: '',
					subject: '',
					message: ''
				})
			} else {
				setSubmitStatus({
					type: 'error',
					message: result.error || 'Failed to send message. Please try again.'
				})
			}
		} catch (error) {
			setSubmitStatus({
				type: 'error',
				message: 'An error occurred. Please try again.'
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<PageHeadContent
						title="Contact Us"
						backgroundImage="/assets/img/bg/header-bg12.png"
						breadcrumbs={[
							{ name: "Home", link: "/" },
							{ name: "Contact Us", link: "/contact" }
						]}
					/>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== CONTACT AREA STARTS =======*/}
					<div className="contact-inner-section sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="img1 image-anime">
										<img src="/assets/img/pages/contact-us-1.png" alt="" />
									</div>
								</div>
								<div className="col-lg-6" data-aos="zoom-in" data-aos-duration={1000}>
									<div className="contact4-boxarea">
										<h3 className="text-anime-style-3">Get In Touch Now</h3>
										<div className="space8" />

										{/* Status Messages */}
										{submitStatus.type && (
											<div className={`alert ${submitStatus.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: '20px' }}>
												{submitStatus.message}
											</div>
										)}

										<form onSubmit={handleSubmit}>
											<div className="row">
												<div className="col-lg-6 col-md-6">
													<div className="input-area">
														<input
															type="text"
															placeholder="Name"
															name="name"
															value={formData.name}
															onChange={handleInputChange}
															required
														/>
													</div>
												</div>
												<div className="col-lg-6 col-md-6">
													<div className="input-area">
														<input
															type="text"
															placeholder="Phone"
															name="phone"
															value={formData.phone}
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="col-lg-12 col-md-6">
													<div className="input-area">
														<input
															type="email"
															placeholder="Email"
															name="email"
															value={formData.email}
															onChange={handleInputChange}
															required
														/>
													</div>
												</div>
												<div className="col-lg-12 col-md-6">
													<div className="input-area">
														<input
															type="text"
															placeholder="Subjects"
															name="subject"
															value={formData.subject}
															onChange={handleInputChange}
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="input-area">
														<textarea
															placeholder="Message"
															name="message"
															value={formData.message}
															onChange={handleInputChange}
															required
															rows={5}
														/>
													</div>
												</div>
												<div className="col-lg-12">
													<div className="space24" />
													<div className="input-area text-end">
														<button
															type="submit"
															className="vl-btn1"
															disabled={isSubmitting}
														>
															{isSubmitting ? 'Sending...' : 'Submit Now'}
														</button>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CONTACT AREA ENDS =======*/}
					{/*===== CONTACT AREA STARTS =======*/}
					<div className="contact2-bg-section">
						<div className="img1">
							<img src="/assets/img/pages/contact-us-2.png" alt="" className="contact-img1" />
						</div>
						<div className="container">
							<div className="row">
								<div className="col-lg-6">
									<div className="space48" />
									<div className="row">
										{/* Email full row */}
										<div className="col-lg-12 col-md-12">
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={900}>
												<div className="icons">
													<img src="/assets/img/icons/mail1.svg" alt="" />
												</div>
												<div className="text">
													<h5>Our Email</h5>
													<div className="space14" />
													<Link href={emailHref}>{emailDisplay}</Link>
												</div>
											</div>
											<div className="space18" />
										</div>
										{/* Location and Phone in 2 col */}
										<div className="col-lg-6 col-md-6">
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
												<div className="icons">
													<img src="/assets/img/icons/location1.svg" alt="" />
												</div>
												<div className="text">
													<h5>Our location</h5>
													<div className="space14" />
													<Link href="https://www.google.com/maps?q=Victoria%2C%20Australia">{addressDisplay}</Link>
												</div>
											</div>
										</div>
										<div className="col-lg-6 col-md-6">
											<div className="space20 d-md-none d-block" />
											<div className="contact-boxarea" data-aos="zoom-in" data-aos-duration={1000}>
												<div className="icons">
													<img src="/assets/img/icons/phn1.svg" alt="" />
												</div>
												<div className="text">
													<h5>Call/Message</h5>
													<div className="space14" />
													<Link href={phoneHref}>{phoneDisplay}</Link>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="mapouter">
							<div className="gmap_canvas">
								<iframe src="https://www.google.com/maps?q=Victoria%2C%20Australia&z=6&output=embed" width={600} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							</div>
						</div>
					</div>
					<div className="space100 d-lg-block d-none" />
					<div className="space50 d-lg-none d-block" />
					{/*===== CONTACT AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<CTAWithCountdown
						buttonLabel="Contact Us"
						buttonHref="/contact"
						useFeaturedEvent
					/>
				</div>

			</Layout>
		</>
	)
}