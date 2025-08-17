
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getCommitteeMemberBySlug } from "@/lib/utils/committee"
import { notFound } from "next/navigation"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

interface CommitteeMemberPageProps {
  params: {
    slug: string;
  };
}

export default async function CommitteeMemberPage({ params }: CommitteeMemberPageProps) {
  const { slug } = params;
  const member = await getCommitteeMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg9.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{member.person.name}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>{member.person.name}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Member Details */}
        <div className="speakers-single-section-area sp8">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="speakers-single-content">
                  <div className="img1">
                    <img src="/assets/img/all-images/team/team-img1.png" alt={member.person.name} />
                  </div>
                  <div className="space32" />
                  <h3>{member.person.name}</h3>
                  <p className="role">{member.role}</p>
                  {member.person.jobTitle && <p className="job-title">{member.person.jobTitle}</p>}
                  
                  {/* Contact Information */}
                  <div className="contact-info">
                    {member.person.email && (
                      <p><strong>Email:</strong> <a href={`mailto:${member.person.email}`}>{member.person.email}</a></p>
                    )}
                    {member.person.phone && (
                      <p><strong>Phone:</strong> <a href={`tel:${member.person.phone}`}>{member.person.phone}</a></p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="speakers-single-sidebar">
                  {/* Overview Section */}
                  {member.about && (
                    <div className="widget-box">
                      <h4>Overview</h4>
                      <div className="content">
                        {documentToReactComponents(member.about)}
                      </div>
                    </div>
                  )}
                  
                  {/* Committee Member Section */}
                  {member.person.about && (
                    <div className="widget-box">
                      <h4>Committee Member</h4>
                      <div className="content">
                        <p>{member.person.about}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Member Events Section (Hardcoded for now) */}
                  <div className="widget-box">
                    <h4>Member Events</h4>
                    <div className="content">
                      <p>Event information will be available soon.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section-area sp10">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="cta-content text-center">
                  <h2>Contact Committee Member</h2>
                  <p>Get in touch with {member.person.name} for committee-related inquiries.</p>
                  <Link href="/contact" className="readmore">
                    Contact Us <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}