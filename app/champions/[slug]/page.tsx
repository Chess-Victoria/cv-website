import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getEntryBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { unstable_cache } from 'next/cache';

// Cache the champion data fetching
const getCachedChampion = unstable_cache(
  async (slug: string) => {
    const champion = await getEntryBySlug('championPage', slug);
    return champion;
  },
  ['champion-data'],
  {
    tags: ['champions'],
    revalidate: 3600 // 1 hour fallback
  }
);

interface ChampionPageProps {
  params: {
    slug: string;
  };
}

export default async function ChampionPage({ params }: ChampionPageProps) {
  const champion = await getCachedChampion(params.slug);

  if (!champion) {
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h1>Champion Not Found</h1>
                <p>The requested champion could not be found.</p>
                <Link href="/champions" className="btn btn-primary">
                  Back to Champions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const championData = champion as any;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg10.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>{championData.fields.title}</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>{championData.fields.title}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Champion Content */}
        <div className="champion-section-area sp10">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="champion-content">
                  {championData.fields.content && (
                    <div className="rich-text-content">
                      {documentToReactComponents(championData.fields.content)}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="champion-sidebar">
                  <div className="widget-box">
                    <h4>Champion Information</h4>
                    <div className="content">
                      {championData.fields.year && (
                        <p><strong>Year:</strong> {championData.fields.year}</p>
                      )}
                      {championData.fields.category && (
                        <p><strong>Category:</strong> {championData.fields.category}</p>
                      )}
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
                  <h2>View All Champions</h2>
                  <p>Explore the complete list of Chess Victoria champions.</p>
                  <Link href="/champions" className="readmore">
                    View Champions <i className="fa-solid fa-arrow-right"></i>
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
