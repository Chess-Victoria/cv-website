import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";
import "/public/assets/css/vendor/aos.css"
import "/public/assets/css/vendor/bootstrap.min.css"
import "/public/assets/css/vendor/fontawesome.css"
import "/public/assets/css/vendor/magnific-popup.css"
import "/public/assets/css/vendor/mobile.css"
// import "/public/assets/css/vendor/owlcarousel.min.css"
import "/public/assets/css/vendor/sidebar.css"
import "/public/assets/css/vendor/slick-slider.css"
import "/public/assets/css/vendor/nice-select.css"
import "/public/assets/css/vendor/odometer.css"
import "/public/assets/css/main.css"
import "/public/assets/css/override.css"
import type { Metadata, Viewport } from "next"
import { Figtree, Space_Grotesk } from "next/font/google"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const figtree = Figtree({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--figtree",
	display: 'swap',
})
const grotesk = Space_Grotesk({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: "--grotesk",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Chess Victoria | Promoting Chess Growth, Inclusion & Excellence",
	description: "Discover Chess Victoria, the leading body promoting chess across Victoria. We support players of all ages and abilities, host tournaments, foster community, and inspire excellence through the game of chess.",
	keywords: "chess, Victoria, chess club, chess tournament, chess Victoria, Australian chess, chess community, chess events, chess competitions",
	authors: [{ name: "Chess Victoria" }],
	creator: "Chess Victoria",
	publisher: "Chess Victoria",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_AU',
		url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au',
		title: 'Chess Victoria | Promoting Chess Growth, Inclusion & Excellence',
		description: 'Discover Chess Victoria, the leading body promoting chess across Victoria. We support players of all ages and abilities, host tournaments, foster community, and inspire excellence through the game of chess.',
		siteName: 'Chess Victoria',
		images: [
			{
				url: '/assets/img/logo/cvlogo.png',
				width: 1200,
				height: 630,
				alt: 'Chess Victoria Logo',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Chess Victoria | Promoting Chess Growth, Inclusion & Excellence',
		description: 'Discover Chess Victoria, the leading body promoting chess across Victoria. We support players of all ages and abilities, host tournaments, foster community, and inspire excellence through the game of chess.',
		images: ['/assets/img/logo/cvlogo.png'],
		creator: '@chessvictoria',
	},
	icons: {
		icon: [
			{ url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/favicon.ico', sizes: 'any' },
		],
		apple: [
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		other: [
			{ rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#1a365d' },
		],
	},
	manifest: '/site.webmanifest',
	verification: {
		google: 'your-google-verification-code', // Replace with actual verification code
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au',
	},
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	themeColor: '#1a365d',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
				<link rel="manifest" href="/site.webmanifest" />
				<meta name="msapplication-TileColor" content="#1a365d" />
				<meta name="theme-color" content="#1a365d" />
			</head>
			<body className={`${figtree.variable} ${grotesk.variable}`}>
				{children}
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	)
}
