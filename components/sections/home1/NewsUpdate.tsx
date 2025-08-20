import Link from 'next/link'
import { formatDateOnly } from '@/lib/utils/date-formatter'

type NewsItem = {
  id: string
  slug: string
  title: string
  date?: string
  authorName?: string
  imageUrl?: string
  summary?: string
}

export default function NewsUpdate({ items }: { items: NewsItem[] }) {
  if (!items || items.length === 0) return null

  const renderCard = (item: NewsItem, aosDuration: number) => (
    <div className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={aosDuration} key={item.id}>
      <div className="blog1-auhtor-boxarea">
        {item.imageUrl ? (
          <div className="img1 image-anime">
            <img src={item.imageUrl} alt="" />
          </div>
        ) : null}
        <div className="content-area">
          <ul>
            <li>
              <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />{item.date ? formatDateOnly(item.date) : ''}</Link>
            </li>
          </ul>
          <div className="space20" />
          <Link href={`/news/read/${item.slug}`}>{item.title}</Link>
          <div className="space24" />
          <div className="btn-area1">
            <Link href={`/news/read/${item.slug}`} className="vl-btn2">Read More</Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <div className="blog1-section-area sp2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto">
              <div className="blog-header text-center heading2 space-margin60">
                <h5 data-aos="fade-left" data-aos-duration={900}>News &amp; updates</h5>
                <div className="space16" />
                <h2 className="text-anime-style-3">Latest updates in Chess Victoria</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {items.slice(0, 3).map((item, idx) => renderCard(item, 800 + idx * 200))}
          </div>
        </div>
      </div>
    </>
  )
}


