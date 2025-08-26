'use client'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { CommitteeListData } from '@/lib/types/committee-list'

interface CommitteeListProps {
  data: CommitteeListData;
}

const swiperOptions = {
  modules: [Autoplay, Pagination, Navigation],
  slidesPerView: 3,
  spaceBetween: 30,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: true,

  // Navigation
  navigation: {
    nextEl: '.owl-next',
    prevEl: '.owl-prev',
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
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1199: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1350: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  }
}

export default function CommitteeList({ data }: CommitteeListProps) {
  return (
    <div className="team1-section-area sp1">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="team-header space-margin60 heading2">
              <h5 data-aos="fade-left" data-aos-duration={800}>{data.subtitle}</h5>
              <div className="space16" />
              <h2 className="text-anime-style-3">{data.title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 position-relative">
            <div className="team-slider-area">
              <Swiper {...swiperOptions} className="team-slider-area ">
                {data.members.map((member, index) => (
                  <SwiperSlide key={`member-${member.id}-${index}`} className="team-widget-boxarea">
                    <div className="img1 image-anime">
                      <img src={member.image.src} alt={member.image.alt} />
                      <ul>
                        {member.socialLinks.facebook && (
                          <li>
                            <Link href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-facebook-f" />
                            </Link>
                          </li>
                        )}
                        {member.socialLinks.linkedin && (
                          <li>
                            <Link href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-linkedin-in" />
                            </Link>
                          </li>
                        )}
                        {member.socialLinks.instagram && (
                          <li>
                            <Link href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-instagram" />
                            </Link>
                          </li>
                        )}
                        {member.socialLinks.youtube && (
                          <li>
                            <Link href={member.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="m-0">
                              <i className="fa-brands fa-youtube" />
                            </Link>
                          </li>
                        )}
                        {member.socialLinks.email && (
                          <li>
                            <Link href={`mailto:${member.socialLinks.email}`} className="m-0">
                              <i className="fa-solid fa-envelope" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="space20" />
                    <div className="text-area">
                      <Link href={member.profileUrl || "/committee"}>{member.name}</Link>
                      <div className="space16" />
                      <p>{member.title}</p>
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
    </div>
  )
}
