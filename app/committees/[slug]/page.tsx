
import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getCommitteeMemberBySlug } from "@/lib/utils/committee"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getContactImage } from "@/lib/constants"
import PageHeadContent from '@/components/elements/PageHeadContent'

export default async function CommitteeMemberPage({ params }: { params: { slug: string } }) {
  const member = await getCommitteeMemberBySlug(params.slug);

  if (!member) {
    notFound();
  }

  const imageUrl = member.image?.url || member.person.image?.url || getContactImage();
  const imageAlt = member.image?.alt || member.person.image?.alt || member.person.name;

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <PageHeadContent
            title="Committee Member Details"
            backgroundImage="/assets/img/bg/header-bg7.png"
            breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Committees', link: '/committees' }, { name: member.person.name, link: `/committees/${member.slug}` }]}
          />
          {/*===== HERO AREA ENDS =======*/}
          {/*===== TEAM AREA STARTS =======*/}
          <div className="team-details-section-area sp1">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 m-auto">
                  <div className="speakers-details-box">
                    <div className="row align-items-center">
                      <div className="col-lg-3">
                        <div className="our-team-boxarea">
                          <div className="team-widget-area">
                            <img src="/assets/img/elements/elements25.png" alt="" className="elements21" />
                            <img src="/assets/img/elements/elements26.png" alt="" className="elements22" />
                            <div className="img1">
                              <img src={imageUrl} alt={imageAlt} className="team-img4" />
                            </div>
                          </div>
                          <div className="content-area">
                            <Link href={`/committees/${member.slug}`}>{member.person.name}</Link>
                            <div className="space16" />
                            <p>{member.role}</p>
                            {member.person.jobTitle && (
                              <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>{member.person.jobTitle}</p>
                            )}
                            <div className="space24" />
                            <ul>
                              <li>
                                <Link href={`/committees/${member.slug}`} className="icon1"><i className="fa-solid fa-user" /></Link>
                              </li>
                              {member.person.email && (
                                <li>
                                  <Link href={`mailto:${member.person.email}`} className="icon2"><i className="fa-solid fa-envelope" /></Link>
                                </li>
                              )}
                              {member.person.phone && (
                                <li>
                                  <Link href={`tel:${member.person.phone}`} className="icon3"><i className="fa-solid fa-phone" /></Link>
                                </li>
                              )}
                              <li>
                                <Link href={`/committees/${member.slug}`} className="icon4"><i className="fa-solid fa-info" /></Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="speakesr-details-content heading2">
                          <h2>Overview</h2>
                          <div className="space16" />
                          {member.about ? (
                            <div className="about-content">
                              {documentToReactComponents(member.about)}
                            </div>
                          ) : (
                            <p>No detailed information available for this committee member.</p>
                          )}
                          <div className="space32" />
                          <div className="row">
                            <div className="col-lg-5">
                              <div className="details-content">
                                {member.person.email && (
                                  <>
                                    <h4>Email:</h4>
                                    <div className="space12" />
                                    <Link href={`mailto:${member.person.email}`}>{member.person.email}</Link>
                                    <div className="space32" />
                                  </>
                                )}
                                {member.person.phone && (
                                  <>
                                    <h4>Phone:</h4>
                                    <div className="space12" />
                                    <Link href={`tel:${member.person.phone}`}>{member.person.phone}</Link>
                                    <div className="space32" />
                                  </>
                                )}
                                <h4>Role:</h4>
                                <div className="space12" />
                                {member.role}
                              </div>
                            </div>
                            <div className="col-lg-7">
                              <div className="heading2">
                                <h3>Committee Member</h3>
                                <div className="space16" />
                                {member.person.about ? (
                                  <p>{member.person.about}</p>
                                ) : (
                                  <p>{member.person.name} serves as {member.role} in the Chess Victoria committee. {member.person.jobTitle && `They work as ${member.person.jobTitle}.`} Their dedication and expertise contribute significantly to the chess community in Victoria.</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="event-team-area sp10">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="heading2 text-center space-margin60">
                    <h2>Event History {member.person.name}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 m-auto">
                  <div className="event-widget-area">
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <h1 className="active">01</h1>
                          <div className="row align-items-center">
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/event/event-img4.png" alt="" />
                              </div>
                            </div>
                            <div className="col-lg-1" />
                            <div className="col-lg-6">
                              <div className="content-area">
                                <ul>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
                                  </li>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
                                  </li>
                                </ul>
                                <div className="space20" />
                                <Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
                                <div className="space24" />
                                <div className="author-area">
                                  <div className="autho-name-area">
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alex Roberton</Link>
                                      <div className="space8" />
                                      <p>UI/UX Designer</p>
                                    </div>
                                  </div>
                                  <div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alexys Archer</Link>
                                      <div className="space8" />
                                      <p>WP Developer</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space48" />
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <h1 className="active">02</h1>
                          <div className="row align-items-center">
                            <div className="col-lg-7">
                              <div className="content-area">
                                <ul>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
                                  </li>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
                                  </li>
                                </ul>
                                <div className="space20" />
                                <Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
                                <div className="space24" />
                                <div className="author-area">
                                  <div className="autho-name-area">
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alex Roberton</Link>
                                      <div className="space8" />
                                      <p>UI/UX Designer</p>
                                    </div>
                                  </div>
                                  <div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alexys Archer</Link>
                                      <div className="space8" />
                                      <p>WP Developer</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
                                </div>
                              </div>
                              <div className="space30 d-lg-none d-block" />
                            </div>
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/event/event-img5.png" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space30" />
                    <div className="row">
                      <div className="col-lg-10 m-auto">
                        <div className="event2-boxarea box1">
                          <h1 className="active">03</h1>
                          <div className="row align-items-center">
                            <div className="col-lg-5">
                              <div className="img1">
                                <img src="/assets/img/all-images/event/event-img6.png" alt="" />
                              </div>
                            </div>
                            <div className="col-lg-1" />
                            <div className="col-lg-6">
                              <div className="content-area">
                                <ul>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/clock1.svg" alt="" />10.00 AM -12.00 PM <span> | </span></Link>
                                  </li>
                                  <li>
                                    <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />26/C Asana, New York </Link>
                                  </li>
                                </ul>
                                <div className="space20" />
                                <Link href="/event-single" className="head">Elevate User Experience Expertise</Link>
                                <div className="space24" />
                                <div className="author-area">
                                  <div className="autho-name-area">
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img1.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alex Roberton</Link>
                                      <div className="space8" />
                                      <p>UI/UX Designer</p>
                                    </div>
                                  </div>
                                  <div className="autho-name-area" style={{ padding: '0 0 0 12px', border: 'none' }}>
                                    <div className="img1">
                                      <img src="/assets/img/all-images/testimonials/testimonial-img2.png" alt="" />
                                    </div>
                                    <div className="text">
                                      <Link href="/speakers-single">Alexys Archer</Link>
                                      <div className="space8" />
                                      <p>WP Developer</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="space24" />
                                <div className="btn-area1">
                                  <Link href="/pricing-plan" className="vl-btn1"><span className="demo">purchase ticket Now</span></Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*===== TEAM AREA ENDS =======*/}
          {/*===== CTA AREA STARTS =======*/}
          <div className="cta1-section-area d-lg-block d-block">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 m-auto">
                  <div className="cta1-main-boxarea">
                    <div className="timer-btn-area">
                      <Countdown />
                      <div className="btn-area1">
                        <Link href="/contact" className="vl-btn1">Contact Us</Link>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/committees"><img src="/assets/img/icons/calender1.svg" alt="" />View All Committee Members</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
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
                        <Link href="/contact" className="vl-btn1">Contact Us</Link>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/committees"><img src="/assets/img/icons/calender1.svg" alt="" />View All Committee Members</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
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