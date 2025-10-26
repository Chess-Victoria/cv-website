
import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import GalleryGridWithViewer from '@/components/elements/GalleryGridWithViewer'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import { getImageGalleryBySlugWithTags } from '@/lib/utils/image-gallery'

export const metadata: Metadata = {
  title: "Recent Memories | Chess Victoria - Photo Gallery & Chess Events",
  description: "Browse our collection of recent memories and photos from chess events, tournaments, and community gatherings across Victoria. Relive the excitement of chess competitions and community moments.",
  keywords: "chess photos Victoria, chess memories, chess gallery, chess events photos, chess tournament pictures, chess Victoria gallery",
  openGraph: {
    title: "Recent Memories | Chess Victoria - Photo Gallery & Chess Events",
    description: "Browse our collection of recent memories and photos from chess events, tournaments, and community gatherings across Victoria.",
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/memories`,
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'Chess Victoria Memories & Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Recent Memories | Chess Victoria - Photo Gallery & Chess Events",
    description: "Browse our collection of recent memories and photos from chess events, tournaments, and community gatherings across Victoria.",
    images: ['/assets/img/logo/cvlogo.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/memories`,
  },
}

// Static revalidation for Next.js 15
export const revalidate = 604800; // 7 days

export default async function Memories({ searchParams }: { searchParams?: Promise<{ page?: string; per?: string }> }) {
  const searchParamsData = await searchParams;
  const gallery = await getImageGalleryBySlugWithTags('chess-victoria-photo-gallery');
  const allImages = gallery?.images || [];

  const perPage = Math.max(1, parseInt(searchParamsData?.per || '15', 10) || 3);
  const currentPage = Math.max(1, parseInt(searchParamsData?.page || '1', 10) || 1);
  const totalItems = allImages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / perPage));
  const page = Math.min(currentPage, totalPages);
  const startIndex = (page - 1) * perPage;
  const pageImages = allImages.slice(startIndex, startIndex + perPage);

  const makeHref = (p: number) => `/memories?page=${p}&per=${perPage}`;

	return (
		<>
			<Layout headerStyle={1} footerStyle={1}>
				<div>
					<div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg11.png)' }}>
						<div className="container">
							<div className="row">
								<div className="col-lg-6 m-auto">
									<div className="heading1 text-center">
										<h1>Recent Memories</h1>
										<div className="space20" />
										<Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Recent Memories</span></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== HERO AREA ENDS =======*/}
					{/*===== MEMORY AREA STARTS =======*/}
					<div className="memory-inner-section-area sp1">
						<div className="container">
							<div className="row">
								<GalleryGridWithViewer images={pageImages} title={gallery?.title} referenceLink={gallery?.referenceLink} />
								<div className="space30" />
								<div className="pagination-area">
									<nav aria-label="Page navigation example">
										<ul className="pagination">
											<li className="page-item">
												<Link className="page-link" href={makeHref(Math.max(1, page - 1))} aria-label="Previous">
													<i className="fa-solid fa-angle-left" />
												</Link>
											</li>
											{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
												<li key={p} className="page-item">
													<Link className={`page-link${p === page ? ' active' : ''}`} href={makeHref(p)}>{p}</Link>
												</li>
											))}
											<li className="page-item">
												<Link className="page-link" href={makeHref(Math.min(totalPages, page + 1))} aria-label="Next">
													<i className="fa-solid fa-angle-right" />
												</Link>
											</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
					</div>
					{/*===== MEMORY AREA ENDS =======*/}
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