import Layout from "@/components/layout/Layout"
import Link from "next/link"
import PageHeadContent from '@/components/elements/PageHeadContent'

interface NotFoundPageProps {
  title: string
  subtitle?: string
  description: string
  primaryAction: {
    text: string
    href: string
  }
  secondaryAction?: {
    text: string
    href: string
  }
  breadcrumbs: Array<{ name: string; link: string }>
  backgroundImage?: string
}

export default function NotFoundPage({
  title,
  subtitle = "404 - Page Not Found",
  description,
  primaryAction,
  secondaryAction,
  breadcrumbs,
  backgroundImage = "/assets/img/bg/header-bg9.png"
}: NotFoundPageProps) {
  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title={title}
          backgroundImage={backgroundImage}
          subtitle={subtitle}
          breadcrumbs={breadcrumbs}
        />

        {/* Content Section */}
        <div className="event-sidepage-section-area py-5 px-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 m-auto">
                <div className="text-center">
                  <h2>{subtitle}</h2>
                  <div className="space32" />
                  <p>{description}</p>
                  <div className="space40" />
                  <div className="btn-area1">
                    <Link href={primaryAction.href} className="vl-btn1">{primaryAction.text}</Link>
                  </div>
                  {secondaryAction && (
                    <>
                      <div className="space24" />
                      <div className="btn-area1">
                        <Link href={secondaryAction.href} className="vl-btn1">{secondaryAction.text}</Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
