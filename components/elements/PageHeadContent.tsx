import Link from 'next/link'

interface BreadcrumbItem {
  name: string
  link: string
}

interface PageHeadContentProps {
  title: string
  backgroundImage: string
  breadcrumbs?: BreadcrumbItem[]
  subtitle?: string
}

export default function PageHeadContent({ title, backgroundImage, breadcrumbs, subtitle }: PageHeadContentProps) {
  return (
    <div className="inner-page-header" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto">
            <div className="heading1 text-center">
              <h1>{title}</h1>
              <div className="space20" />
              {subtitle && <p>{subtitle}</p>}
              {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="breadcrumb-links">
                  {breadcrumbs.map((item, index) => (
                    <span key={index}>
                      {index > 0 && <i className="fa-solid fa-angle-right" />}
                      {index === breadcrumbs.length - 1 ? (
                        <span>{item.name}</span>
                      ) : (
                        <Link href={item.link}>{item.name}</Link>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
