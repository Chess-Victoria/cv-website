import { Metadata } from 'next';
import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import SearchResults from '@/components/sections/search/SearchResults';

interface SearchPageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

export const metadata: Metadata = {
  title: 'Search Results - Chess Victoria',
  description: 'Search results for Chess Victoria website',
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const searchParamsData = await searchParams;
  const query = searchParamsData.q || '';
  const type = searchParamsData.type;

  const getSubtitle = () => {
    if (!query) return 'Search our website';
    const typeLabel = type ? getTypeLabel(type) : 'content';
    return `Results for "${query}"${type ? ` in ${typeLabel}` : ''}`;
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return 'News';
      case 'chess-club': return 'Chess Clubs';
      case 'committee-member': return 'Committee Members';
      case 'event': return 'Events';
      case 'page': return 'Pages';
      default: return 'Content';
    }
  };

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Search Results"
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle={getSubtitle()}
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Search', link: '/search' }
          ]}
        />

        <div className="search-results-section-area py-2 px-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <Suspense fallback={
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3">Searching...</p>
                  </div>
                }>
                  <SearchResults query={query} type={type} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
