import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PagesGrid from '@/components/sections/about/PagesGrid'

// Hardcoded data for the 4 menu items
const otherPages = [
  {
    id: 'documents',
    title: 'Documents',
    url: '/documents',
    summary: 'Browse and download important documents, policies, and resources from Chess Victoria. Access tournament regulations, membership forms, and official publications.',
  },
  {
    id: 'galleries',
    title: 'Galleries',
    url: '/galleries',
    summary: 'Explore our photo galleries showcasing chess events, tournaments, and community moments. Relive the excitement of chess competitions across Victoria.',
  },
  {
    id: 'faq',
    title: 'FAQ',
    url: '/faq',
    summary: 'Find answers to frequently asked questions about Chess Victoria, tournaments, membership, and chess events. Get quick information about our services and policies.',
  },
  {
    id: 'contact',
    title: 'Contact Us',
    url: '/contact',
    summary: 'Get in touch with Chess Victoria. Contact us for tournament information, membership inquiries, general questions, or to report issues.',
  },
]

export const metadata: Metadata = {
  title: 'Others - Chess Victoria',
  description: 'Access documents, galleries, FAQ, and contact information for Chess Victoria. Find important resources and get in touch with our team.',
  openGraph: {
    title: 'Others - Chess Victoria',
    description: 'Access documents, galleries, FAQ, and contact information for Chess Victoria. Find important resources and get in touch with our team.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/others`,
    type: 'website',
    images: [
      {
        url: '/assets/img/logo/cvlogo.png',
        width: 1200,
        height: 630,
        alt: 'Chess Victoria - Others',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Others - Chess Victoria',
    description: 'Access documents, galleries, FAQ, and contact information for Chess Victoria. Find important resources and get in touch with our team.',
    images: ['/assets/img/logo/cvlogo.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/others`,
  },
}

export default async function OthersPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Others"
          backgroundImage="/assets/img/bg/header-bg12.png"
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Others', link: '/others' }
          ]}
        />

        <div className="choose-section-area sp2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <PagesGrid 
                  pages={otherPages} 
                  eyebrow="Resources" 
                  heading="Other Resources & Information" 
                  ctaLabel="Learn More" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
