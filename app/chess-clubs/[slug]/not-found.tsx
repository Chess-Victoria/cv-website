import Layout from "@/components/layout/Layout"
import Link from "next/link"
import PageHeadContent from '@/components/elements/PageHeadContent'

export default function NotFound() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Chess Club Not Found"
          backgroundImage="/assets/img/bg/header-bg9.png"
          breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Chess Clubs', link: '/chess-clubs' }, { name: 'Not Found', link: '/chess-clubs' }]}
        />

        {/* Content Section */}
        <div className="event-sidepage-section-area sp8">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="text-center">
                  <h2>404 - Chess Club Not Found</h2>
                  <div className="space32" />
                  <p>The chess club you're looking for doesn't exist or may have been moved.</p>
                  <div className="space40" />
                  <div className="btn-area1">
                    <Link href="/chess-clubs" className="vl-btn1">Browse All Chess Clubs</Link>
                  </div>
                  <div className="space24" />
                  <div className="btn-area1">
                    <Link href="/" className="vl-btn1">Return to Homepage</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
