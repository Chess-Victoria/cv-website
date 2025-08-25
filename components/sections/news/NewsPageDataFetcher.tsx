import Link from "next/link"
import { getPostsPageData } from "@/lib/utils/posts"

interface NewsPageDataFetcherProps {
  currentPage: number;
  perPage: number;
}

export default async function NewsPageDataFetcher({ currentPage, perPage }: NewsPageDataFetcherProps) {
  const data = await getPostsPageData(currentPage, perPage);
  const makeHref = (p: number) => `/news/page-${p}`;

  return (
    <div className="bloginner-section-area sp1">
      <div className="container">
        <div className="row">
          {data.items.map((post, idx) => (
            <div key={post.id || idx} className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800 + (idx % 3) * 200}>
              <div className="blog4-boxarea">
                <div className="img1">
                  <img src={post.imageUrl || "/assets/img/all-images/blog/blog-img4.png"} alt="" />
                </div>
                <div className="content-area">
                  <ul>
                    <li>
                      <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />{new Date(post.date || '').toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })} <span> | </span></Link>
                    </li>
                    {post.authorName ? (
                      <li>
                        <Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />{post.authorName}</Link>
                      </li>
                    ) : null}
                  </ul>
                  <div className="space20" />
                  <Link href={`/news/read/${post.slug}`}>{post.title}</Link>
                  <div className="space24" />
                  <Link href={`/news/read/${post.slug}`} className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
                  <div className="arrow">
                    <Link href={`/news/read/${post.slug}`}><i className="fa-solid fa-arrow-right" /></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="space30" />
          <div className="pagination-area">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" href={makeHref(Math.max(1, data.page - 1))} aria-label="Previous">
                    <i className="fa-solid fa-angle-left" />
                  </Link>
                </li>
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((p) => (
                  <li key={p} className="page-item">
                    <Link className={`page-link${p === data.page ? ' active' : ''}`} href={makeHref(p)}>{p}</Link>
                  </li>
                ))}
                <li className="page-item">
                  <Link className="page-link" href={makeHref(Math.min(data.totalPages, data.page + 1))} aria-label="Next">
                    <i className="fa-solid fa-arrow-right" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
