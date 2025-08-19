import { Metadata } from 'next';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import { getAllPages } from '@/lib/utils/page';

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
            <div className="row">
              <div className="col-lg-8 m-auto">
                {pages.length > 0 ? (
                  <div className="pages-list">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Summary</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pages.map((page) => (
                            <tr key={page.id}>
                              <td>
                                <strong>{page.title}</strong>
                              </td>
                              <td>
                                {page.summary ? (
                                  <span className="text-muted">{page.summary}</span>
                                ) : (
                                  <span className="text-muted">No summary available</span>
                                )}
                              </td>
                              <td>
                                <Link 
                                  href={`/pages/${page.slug}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  View Page
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="alert alert-info" role="alert">
                      <i className="fa-solid fa-info-circle me-2"></i>
                      No pages are currently available.
                    </div>
                    <p className="text-muted">
                      Pages will appear here once they are created in Contentful.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
