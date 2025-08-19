import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getPostsPageData } from "@/lib/utils/posts";
import PageHeadContent from '@/components/elements/PageHeadContent';

// Static revalidation for Next.js 15
export const revalidate = 3600; // 1 hour

interface NewsPageProps {
  params: Promise<{ page: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { page } = await params;
  // Expect format: page-1, page-2, etc.
  const match = page?.match(/page-(\d+)/i);
  const currentPage = Math.max(1, parseInt(match?.[1] || '1', 10) || 1);
  const perPage = 10;

  const data = await getPostsPageData(currentPage, perPage);

  const makeHref = (p: number) => `/news/page-${p}`;

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="News & Updates"
          backgroundImage="/assets/img/bg/header-bg13.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "News & Updates", link: "/news" }
          ]}
        />

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


