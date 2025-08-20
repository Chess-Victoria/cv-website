'use client'
import Link from 'next/link'

interface PageItem {
  id: string
  title: string
  summary?: string
  slug?: string
  url?: string
}

interface PagesGridProps {
  pages?: PageItem[]
}

export default function PagesGrid({ pages }: PagesGridProps) {
  // If no pages data, show a message
  if (!pages || pages.length === 0) {
    return (
      <div className="choose-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 m-auto">
              <div className="heading2 text-center space-margin60">
                <h5>Learn More</h5>
                <div className="space18" />
                <h2>Explore Our Content</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <p>No content pages configured yet. Check back soon for updates!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="choose-section-area sp2">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 m-auto">
            <div className="heading2 text-center space-margin60">
              <h5>Learn More</h5>
              <div className="space18" />
              <h2>Explore Our Content</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {pages.map((page, index) => (
            <div key={page.id || index} className="col-lg-4 col-md-6">
              <div className="choose-widget-boxarea">
                <div className="icons">
                  <img src="/assets/img/icons/choose-icons1.svg" alt="" />
                </div>
                <div className="space24" />
                <div className="content-area">
                  <Link href={page.url || `/pages/${page.slug}` || '#'}>
                    {page.title || 'Untitled Page'}
                  </Link>
                  <div className="space16" />
                  <p>
                    {page.summary || 'Discover more about this topic and learn valuable insights.'}
                  </p>
                  <div className="space24" />
                  <Link 
                    href={page.url || `/pages/${page.slug}` || '#'} 
                    className="readmore"
                  >
                    Read More <i className="fa-solid fa-arrow-right" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
