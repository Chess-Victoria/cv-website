import Layout from '@/components/layout/Layout'
import PageHeadContent from '@/components/elements/PageHeadContent'
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import PlayersSearchClient from '@/components/players/PlayersSearchClient'

export const revalidate = 2592000 // 30 days

export default function PlayersSearchPage() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Players Search"
          backgroundImage="/assets/img/bg/header-bg8.png"
          breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'About', link: '/about' }, { name: 'Players', link: '/about/players' }, { name: 'Search', link: '/players/search' }]}
        />

        <div className="event-team-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Find Victorian Players</h2>
                  <p>Data is base on current ACF (Australian Chess Federation) ratings. Ratings are updated periodically and reflect the most recent official standings.</p>
                </div>
              </div>
            </div>

            <PlayersSearchClient />
          </div>
        </div>

        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          useFeaturedEvent
        />
      </div>
    </Layout>
  )
}


