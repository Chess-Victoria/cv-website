'use client'
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { ReferenceListData } from '@/lib/types/reference-list'
import Link from 'next/link'

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

interface ChessClubSliderProps {
	clubData?: ReferenceListData
}

export default function ChessClubSlider({ clubData }: ChessClubSliderProps) {
	// If no club data, return null
	if (!clubData || !clubData.items || clubData.items.length === 0) {
		return null
	}

	// Function to get initials from club name
	const getInitials = (name: string): string => {
		const words = name.split(' ')
		if (words.length >= 3) {
			// For names like "Melbourne Chess Club", return "MCC"
			return words.map(word => word.charAt(0).toUpperCase()).join('')
		} else if (words.length === 2) {
			// For names like "Boxhill Chess", return "BC"
			return words.map(word => word.charAt(0).toUpperCase()).join('')
		} else {
			// For single word names, return first 3 letters
			return name.substring(0, 3).toUpperCase()
		}
	}

	return (
		<>
			<Swiper {...swiperOptions} className="brand-slider-area owl-carousel">
				{clubData.items.map((club) => (
					<SwiperSlide key={club.id} className="brand-box">
						<Link href={`/chess-clubs/${club.id}`} className="club-link">
							<div className="club-box">
								<div className="club-initials" data-length={getInitials(club.name).length}>{getInitials(club.name)}</div>
								<div className="club-name">{club.name}</div>
							</div>
						</Link>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}
