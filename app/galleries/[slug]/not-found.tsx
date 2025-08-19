import Layout from "@/components/layout/Layout"
import Link from "next/link"

export default function NotFound() {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div className="schedule-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="text-center">
                <h2>Gallery Not Found</h2>
                <p>The gallery you're looking for doesn't exist or may have been removed.</p>
                <div className="mt-4">
                  <Link href="/galleries" className="vl-btn1">
                    Back to All Galleries
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
