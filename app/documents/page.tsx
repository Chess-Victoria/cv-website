import { Metadata } from 'next'
import { Suspense } from 'react'
import Layout from '@/components/layout/Layout'
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import DocumentsPageDataFetcher from '@/components/sections/documents/DocumentsPageDataFetcher'

export const metadata: Metadata = {
  title: 'Documents - Chess Victoria',
  description: 'Browse and download important documents and resources from Chess Victoria',
}

export const revalidate = 604800; // 7 days

export default async function DocumentsPage() {
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

        <Suspense fallback={<PageLoadingSkeleton />}>
          <DocumentsPageDataFetcher />
        </Suspense>
      </div>
    </Layout>
  );
}
