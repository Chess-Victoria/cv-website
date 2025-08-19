import { Metadata } from 'next';
import { Suspense } from 'react';
import Layout from '@/components/layout/Layout';
import PageHeadContent from '@/components/elements/PageHeadContent';
import SearchResults from '@/components/sections/search/SearchResults';

interface SearchPageProps {
  searchParams: { q?: string };
}

export const metadata: Metadata = {
  title: 'Search Results - Chess Victoria',
  description: 'Search results for Chess Victoria website',
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Search Results"
          backgroundImage="/assets/img/bg/header-bg10.png"
          subtitle={query ? `Results for "${query}"` : 'Search our website'}
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Search', link: '/search' }
          ]}
        />

        <div className="search-results-section-area py-5 px-5">
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
                  <SearchResults query={query} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
