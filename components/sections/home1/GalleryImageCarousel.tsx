'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: { delay: 2500, disableOnInteraction: false },
  loop: true,
  navigation: { nextEl: '.owl-next', prevEl: '.owl-prev' },
  pagination: { el: '.swiper-pagination', clickable: true },
  breakpoints: {
    320: { slidesPerView: 1, spaceBetween: 30 },
    575: { slidesPerView: 2, spaceBetween: 30 },
    767: { slidesPerView: 2, spaceBetween: 30 },
    991: { slidesPerView: 2, spaceBetween: 30 },
    1199: { slidesPerView: 3, spaceBetween: 30 },
    1350: { slidesPerView: 3, spaceBetween: 30 },
  }
}

export type GalleryImage = { src: string; alt?: string }

export default function GalleryImageCarousel({
  title = 'Recent Memories',
  subtitle = 'last year memory',
  images,
  link = '/memories'
}: {
  title?: string
  subtitle?: string
  images: GalleryImage[]
  link?: string
}) {
  if (!images || images.length === 0) return null

  return (
    <>
      <div className="memory1-section-area sp1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="memory-header text-center heading2 space-margin60">
                <h5 data-aos="fade-left" data-aos-duration={800}>{subtitle}</h5>
                <div className="space16" />
                <h2 className="text-anime-style-3">{title}</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 memory-slider-area">
              <Swiper {...(swiperOptions as any)} className=" owl-carousel">
                {images.map((img, idx) => (
                  <SwiperSlide className="memory-boxarea" key={idx}>
                    <div className="img1 image-anime">
                      <img src={img.src} alt={img.alt || ''} />
                    </div>
                    <div className="content-area">
                      <img src="/assets/img/icons/logo1.svg" alt="" className="logo1 keyframe5" />
                      <div className="arrow">
                        <Link href={link}><i className="fa-solid fa-arrow-right" /></Link>
                      </div>
                      <div className="space18" />
                      <p>Event</p>
                      <div className="space12" />
                      <Link href={link}>{title}</Link>
                    </div>
                  </SwiperSlide>
                ))}
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


