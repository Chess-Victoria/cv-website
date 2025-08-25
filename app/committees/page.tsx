
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import CommitteesPageDataFetcher from "@/components/sections/committee/CommitteesPageDataFetcher"

export const revalidate = 604800; // 7 days

export default async function CommitteesPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Committee Members"
          backgroundImage="/assets/img/bg/header-bg10.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Committees", link: "/committees" }
          ]}
        />

        <Suspense fallback={<PageLoadingSkeleton />}>
          <CommitteesPageDataFetcher />
        </Suspense>
      </div>
    </Layout>
  );
}