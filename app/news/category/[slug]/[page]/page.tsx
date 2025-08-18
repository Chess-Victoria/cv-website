import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getPostsByCategoryPageData } from "@/lib/utils/posts";
import { getRevalidationTime } from "@/lib/config";

export const revalidate = getRevalidationTime('POST');

interface CategoryPageProps {
  params: { slug: string; page: string };
}

export default async function NewsCategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const match = params.page?.match(/page-(\d+)/i);
  const currentPage = Math.max(1, parseInt(match?.[1] || '1', 10) || 1);
  const perPage = 10;

  const data = await getPostsByCategoryPageData(slug, currentPage, perPage);

  const makeHref = (p: number) => `/news/category/${slug}/page-${p}`;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg13.png)' }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 m-auto">
                <div className="heading1 text-center">
                  <h1>News & Updates</h1>
                  <div className="space20" />
                  <Link href="/">Home <i className="fa-solid fa-angle-right" /> <Link href="/news">News & Updates</Link> <i className="fa-solid fa-angle-right" /> <span>{data.category?.name || 'Category'}</span></Link>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                        <i className="fa-solid fa-angle-right" />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


