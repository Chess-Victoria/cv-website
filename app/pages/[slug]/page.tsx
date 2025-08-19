import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import RichTextRenderer from '@/components/elements/RichTextRenderer';
import { getPageBySlug, generateOpenGraphMetadata } from '@/lib/utils/page';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);
  
  if (!pageData) {
    return {
      title: 'Page Not Found - Chess Victoria',
      description: 'The page you are looking for does not exist.',
    };
  }

  const ogMetadata = generateOpenGraphMetadata(pageData);
  
  return {
    title: ogMetadata.title,
    description: ogMetadata.description,
    openGraph: {
      title: ogMetadata.title,
      description: ogMetadata.description,
      type: (ogMetadata.type as 'website' | 'article') || 'website',
      url: ogMetadata.url,
      images: ogMetadata.image ? [
        {
          url: ogMetadata.image,
          width: 1200,
          height: 630,
          alt: ogMetadata.title,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogMetadata.title,
      description: ogMetadata.description,
      images: ogMetadata.image ? [ogMetadata.image] : [],
    },
  };
}

// Generate static params for all pages
export async function generateStaticParams() {
  try {
    const { getAllPages } = await import('@/lib/utils/page');
    const pages = await getAllPages();
    
    return pages.map((page) => ({
      slug: page.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for pages:', error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const pageData = await getPageBySlug(slug);

  if (!pageData) {
    notFound();
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={pageData.title}
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle={pageData.summary}
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Pages', link: '/pages' },
            { name: pageData.title, link: `/pages/${pageData.slug}` }
          ]}
        />

        <div className="page-content-section-area py-5 px-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="page-content">
                  {pageData.content && (
                    <div className="content-body">
                      <RichTextRenderer content={pageData.content} />
                    </div>
                  )}
                  
                  {!pageData.content && (
                    <div className="text-center">
                      <p className="text-muted">No content available for this page.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
