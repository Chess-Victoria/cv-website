import { Metadata } from 'next';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import { getEntries } from '@/lib/contentful';
import { DocumentLink } from '@/lib/types/document-link';
import { mapDocumentLink, groupDocumentLinksByType } from '@/lib/utils/document-link-mapper';

export const metadata: Metadata = {
  title: 'Documents - Chess Victoria',
  description: 'Browse and download important documents and resources from Chess Victoria',
};

async function getDocumentLinks() {
  try {
    const entries = await getEntries('documentLink');
    const documentLinks = entries.map((entry: any) => mapDocumentLink(entry as DocumentLink));
    return groupDocumentLinksByType(documentLinks);
  } catch (error) {
    console.error('Error fetching document links:', error);
    return {};
  }
}

export default async function DocumentsPage() {
  const groupedLinks = await getDocumentLinks();
  const types = Object.keys(groupedLinks).sort();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Documents"
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle="Browse and download important documents and resources from Chess Victoria"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Documents", link: "/documents" }
          ]}
        />

        {/* Documents Content */}
        <div className="documents-section-area sp10" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {types.length === 0 ? (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="alert alert-info text-center">
                        <p>No documents are currently available.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  types.map((type) => (
                    <div key={type} className="row mb-5">
                      <div className="col-lg-12">
                        <div className="card">
                          <div className="card-header">
                            <h3 className="card-title mb-0">{type}</h3>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive">
                              <table className="table table-hover">
                                <thead>
                                  <tr>
                                    <th>Document Name</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {groupedLinks[type].map((link) => (
                                    <tr key={link.id}>
                                      <td>{link.name}</td>
                                      <td>
                                        <a 
                                          href={link.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="btn btn-sm"
                                          style={{ backgroundColor: 'rgb(160, 43, 189)', color: 'white' }}
                                        >
                                          <i className="fa-solid fa-download me-2"></i>
                                          Download
                                        </a>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
