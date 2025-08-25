import Layout from "@/components/layout/Layout"
import { notFound } from "next/navigation"
import PageHeadContent from '@/components/elements/PageHeadContent'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import { Suspense } from 'react'
import { CATEGORIES } from '@/lib/utils/player-categories'
import PlayersTableSkeleton from '@/components/players/PlayersTableSkeleton'
import PlayersDataFetcher from '@/components/players/PlayersDataFetcher'
import PlayersPageHeader from '@/components/players/PlayersPageHeader'
import PlayersPageFooter from '@/components/players/PlayersPageFooter'

// ISR revalidation - static value for Next.js 15
export const revalidate = 2592000; // 30 days (86400 * 30)

export default async function TopActivePlayersPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES[categorySlug];

  if (!category) {
    notFound();
  }

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={`Top Active Players - ${category.name}`}
          backgroundImage="/assets/img/bg/header-bg8.png"
          breadcrumbs={[
            { name: 'Home', link: '/' }, 
            { name: 'About', link: '/about' }, 
            { name: 'Players', link: '/about/players' }, 
            { name: category.name, link: `/about/players/${categorySlug}` }, 
            { name: 'Active', link: `/about/players/${categorySlug}/active` }
          ]}
        />

        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <PlayersPageHeader 
                  category={category} 
                  categorySlug={categorySlug} 
                  isActivePage={true} 
                />
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12 m-auto">
                <Suspense fallback={<PlayersTableSkeleton />}>
                  <PlayersDataFetcher 
                    categorySlug={categorySlug} 
                    categoryName={category.name} 
                    isActivePage={true} 
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        
        <PlayersPageFooter categorySlug={categorySlug} isActivePage={true} />
        
        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          useFeaturedEvent
        />
      </div>
    </Layout>
  )
}


