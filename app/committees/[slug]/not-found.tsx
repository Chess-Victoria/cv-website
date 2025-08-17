import Link from "next/link"
import Layout from "@/components/layout/Layout"

export default function NotFound() {
  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg7.png)' }}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="heading1 text-center">
                    <h1>Committee Member Not Found</h1>
                    <div className="space20" />
                    <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/committees">Committees</Link> <i className="fa-solid fa-angle-right" /> <span>Not Found</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="error-section-area sp10">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <div className="error-content text-center">
                    <h2>404</h2>
                    <h3>Committee Member Not Found</h3>
                    <p>The committee member you're looking for doesn't exist or may have been removed.</p>
                    <div className="space24" />
                    <div className="btn-area1">
                      <Link href="/committees" className="vl-btn1">Back to Committees</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
