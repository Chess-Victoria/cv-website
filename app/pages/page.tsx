import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import { getAllPages } from '@/lib/utils/page';

export const revalidate = 86400; // ISR: 24 hours

export const metadata: Metadata = {
  title: 'Pages - Chess Victoria',
  description: 'Browse all content pages on Chess Victoria website',
};

export default async function PagesIndex() {
  const pages = await getAllPages();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Pages"
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle="Browse all content pages"
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Pages', link: '/pages' }
          ]}
        />

        <div className="pages-index-section-area sp10">
          <div className="container">
            {pages.length > 0 ? (
              <div className="row g-4 py-5">
                {pages.map((page) => (
                  <div key={page.id} className="col-lg-4 col-md-6">
                    <div className="page-card">
                      <div className="page-card-body">
                        <h5 className="page-card-title">{page.title}</h5>
                        <p className="page-card-summary">
                          {page.summary || 'No summary available'}
                        </p>
                        <div className="page-card-actions">
                          <Link href={`/pages/${page.slug}`} className="vl-btn1 small">View Page</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-8 m-auto">
                  <div className="text-center">
                    <div className="alert alert-info" role="alert">
                      <i className="fa-solid fa-info-circle me-2"></i>
                      No pages are currently available.
                    </div>
                    <p className="text-muted">
                      Pages will appear here once they are created in Contentful.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
