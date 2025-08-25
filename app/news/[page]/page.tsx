import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import NewsPageDataFetcher from '@/components/sections/news/NewsPageDataFetcher'

// Static revalidation for Next.js 15
export const revalidate = 86400; // 24 hours

interface NewsPageProps {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { page } = await params;
  const match = page?.match(/page-(\d+)/i);
  const currentPage = Math.max(1, parseInt(match?.[1] || '1', 10) || 1);
  
  const title = currentPage === 1 
    ? "News & Updates | Chess Victoria - Latest Chess News & Announcements"
    : `News & Updates - Page ${currentPage} | Chess Victoria`;
    
  const description = currentPage === 1
    ? "Stay updated with the latest chess news, tournament results, announcements, and community updates from Chess Victoria. Read about chess events, player achievements, and chess community news."
    : `Browse chess news and updates from Chess Victoria - Page ${currentPage}. Latest tournament results, announcements, and community updates.`;

  return {
    title,
    description,
    keywords: "chess news Victoria, chess updates, chess Victoria news, chess tournament results, chess announcements, chess community news",
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/news/page-${currentPage}`,
      images: [
        {
          url: '/assets/img/logo/cvlogo.png',
          width: 1200,
          height: 630,
          alt: 'Chess Victoria News & Updates',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/assets/img/logo/cvlogo.png'],
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'}/news/page-${currentPage}`,
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { page } = await params;
  // Expect format: page-1, page-2, etc.
  const match = page?.match(/page-(\d+)/i);
  const currentPage = Math.max(1, parseInt(match?.[1] || '1', 10) || 1);
  const perPage = 10;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="News & Updates"
          backgroundImage="/assets/img/bg/header-bg13.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "News & Updates", link: "/news" }
          ]}
        />

        <Suspense fallback={<PageLoadingSkeleton />}>
          <NewsPageDataFetcher currentPage={currentPage} perPage={perPage} />
        </Suspense>
      </div>
    </Layout>
  );
}


