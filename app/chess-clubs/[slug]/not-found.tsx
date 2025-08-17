import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function NotFound() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        {/* Header Section */}
        <div className="inner-page-header" style={{ backgroundImage: 'url(assets/img/bg/header-bg9.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>Chess Club Not Found</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Chess Club Not Found</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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
