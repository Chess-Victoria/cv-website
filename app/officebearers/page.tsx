
import { Suspense } from 'react'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import PageLoadingSkeleton from '@/components/layout/PageLoadingSkeleton'
import CommitteesPageDataFetcher from "@/components/sections/committee/CommitteesPageDataFetcher"

export const revalidate = 604800; // 7 days

export default async function OfficeBearersPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Office Bearers"
          backgroundImage="/assets/img/bg/header-bg10.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Office Bearers", link: "/officebearers" }
          ]}
        />

        <Suspense fallback={<PageLoadingSkeleton />}>
          <CommitteesPageDataFetcher
            basePath="/officebearers"
            emptyTitle="Office Bearers"
            emptyDescription="No office bearer data available at the moment."
            ctaTitle="Contact Our Office Bearers"
            ctaDescription="Interested in reaching the Chess Victoria office bearers? Contact us to get in touch."
          />
        </Suspense>
      </div>
    </Layout>
  );
}
