'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PopupProps, PopupContent } from '@/lib/types/popup'
import RichTextRenderer from '@/components/elements/RichTextRenderer'

export default function Popup({ 
	content, 
	isVisible = true, 
	onClose, 
	onNoThanks, 
	onAction 
}: PopupProps) {
	const [isOpen, setIsOpen] = useState(false)

	useEffect(() => {
		// Display the popup after a short delay if visible
		if (isVisible && content) {
			const timer = setTimeout(() => {
				setIsOpen(true)
			}, 100)

			return () => clearTimeout(timer)
		}
	}, [isVisible, content])

	const handleClose = () => {
		setIsOpen(false)
		onClose?.()
	}

	const handleNoThanks = () => {
		setIsOpen(false)
		onNoThanks?.()
	}

	const handleAction = () => {
		onAction?.()
	}

	// Don't render if no content or not visible
	if (!content || !isOpen) {
		return null
	}

	return (
		<>
			<div id="popup" className="popup-overlay" style={{ display: isOpen ? 'flex' : 'none' }}>
				<div className="popup-content">
					<span className="close-btn" id="close-popup" onClick={handleClose}>×</span>
					<div className="popup-icon">
						<img src={content.logo?.src || "/assets/img/logo/cvlogo-notext.png"} alt={content.logo?.alt || ""} />
					</div>
					<div className="space32" />
					<div className="heading2">
						{content.title && <h2>{content.title}</h2>}
						<div className="space8" />
						{content.description && (
							typeof content.description === 'string' ? (
								<p>{content.description}</p>
							) : (
								<RichTextRenderer content={content.description} />
							)
						)}
						{content.items && content.items.length > 0 && (
							<ul>
								{content.items.map((item: string, index: number) => (
									<li key={index}>
										<img src="/assets/img/icons/check3.svg" alt="" />
										{item}
									</li>
								))}
							</ul>
						)}
					</div>
					<div className="space50" />
					{content.actionButton && (
						content.actionButton.url ? (
							<Link className="vl-btn2" href={content.actionButton.url} onClick={handleAction}>
								<span className="demo">{content.actionButton.text}</span>
								<span className="arrow">
									<i className="fa-solid fa-arrow-right" />
								</span>
							</Link>
						) : (
							<button className="vl-btn2" onClick={handleAction}>
								<span className="demo">{content.actionButton.text}</span>
								<span className="arrow">
									<i className="fa-solid fa-arrow-right" />
								</span>
							</button>
						)
					)}
					{content.showNoThanks !== false && (
						<p className="no-thanks" onClick={handleNoThanks}>
							{content.noThanksText || "No thanks"}
						</p>
					)}
				</div>
			</div>
		</>
	)
}
