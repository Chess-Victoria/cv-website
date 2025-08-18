
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import GalleryGridWithViewer from '@/components/elements/GalleryGridWithViewer'
import { getImageGalleryBySlugWithTags } from '@/lib/utils/image-gallery'
import { getRevalidationTime } from '@/lib/config'

export const revalidate = getRevalidationTime('IMAGE_GALLERY');

export default async function Memories({ searchParams }: { searchParams?: { page?: string; per?: string } }) {
  const gallery = await getImageGalleryBySlugWithTags('chess-victoria-photo-gallery');
  const allImages = gallery?.images || [];

  const perPage = Math.max(1, parseInt(searchParams?.per || '15', 10) || 3);
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10) || 1);
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
					<div className="cta1-section-area d-lg-block d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/*===== CTA AREA ENDS =======*/}
					{/*===== CTA AREA STARTS =======*/}
					<div className="cta1-section-area d-lg-none d-block">
						<div className="container">
							<div className="row">
								<div className="col-lg-10 m-auto">
									<div className="cta1-main-boxarea">
										<div className="timer-btn-area">
										<Countdown />
											<div className="btn-area1">
												<Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
											</div>
										</div>
										<ul>
											<li>
												<Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />30 January 2025 - 6pm to 11:30pm</Link>
											</li>
											<li className="m-0">
												<Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Secret Location In The UK</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Layout>
		</>
	)
}