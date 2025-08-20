import Layout from "@/components/layout/Layout";
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import PageHeadContent from '@/components/elements/PageHeadContent'
import NewsSearchForm from '@/components/elements/NewsSearchForm'
import { getRevalidationTime } from '@/lib/config'
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostCategories, getRelatedPostsByCategory, getPopularHashtags, getPopularAuthors } from "@/lib/utils/posts";
import type { Metadata } from 'next';
// ISR
export const revalidate = 600;

interface NewsReadPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: NewsReadPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'News & Update' };
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const pageUrl = `${siteUrl}/news/read/${post.slug}`;
  const imageUrl = post.imageUrl ? (post.imageUrl.startsWith('//') ? `https:${post.imageUrl}` : post.imageUrl) : undefined;
  const description = post.summary || (post.body ? post.body.slice(0, 160) : undefined);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      url: pageUrl,
      type: 'article',
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    alternates: { canonical: pageUrl },
  };
}

export default async function NewsReadPage({ params }: NewsReadPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const categories = await getAllPostCategories();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const shareUrl = `${siteUrl}/news/read/${post.slug}`;
  const shareTitle = encodeURIComponent(post.title);
  const shareUrlEnc = encodeURIComponent(shareUrl);
  const related = post.category?.id ? await getRelatedPostsByCategory(post.category.id, post.id, 3) : [];
  const popularTags = await getPopularHashtags(8);
  const popularAuthors = await getPopularAuthors(8);
  const targetDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="News & Update"
          backgroundImage="/assets/img/bg/header-bg14.png"
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'News & Updates', link: '/news' },
            { name: post.title, link: `/news/read/${post.slug}` },
          ]}
        />

        <div className="blog-details-section sp8">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-deatils-content heading2">
                  <h2>{post.title}</h2>
                  <div className="space16" />
                  {post.imageUrl ? (
                    <div className="img1">
                      <img src={post.imageUrl} alt="" />
                    </div>
                  ) : null}
                  <div className="space32" />
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
                  <div className="space18" />
                  {post.summary ? <p>{post.summary}</p> : null}
                  {post.body ? <p style={{ whiteSpace: 'pre-wrap' }}>{post.body}</p> : null}
                  {post.gallery && post.gallery.length > 0 ? (
                    <>
                      <div className="space48" />
                      <div className="row">
                        {post.gallery.map((url, i) => (
                          <div key={i} className="col-lg-6 col-md-6">
                            <div className="img1 image-anime">
                              <img src={url} alt="" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                  <div className="space32" />
                  <div className="tags-social-area">
                    <div className="tags">
                      <h4>Tags:</h4>
                      <ul>
                        {post.hashtags && post.hashtags.length > 0 ? (
                          post.hashtags.map((tag, i) => {
                            const label = tag?.startsWith('#') ? tag : `#${tag}`;
                            const linkTag = encodeURIComponent(tag);
                            return (
                              <li key={i}><Link href={`/news/hashtags/${linkTag}/page-1`}>{label}</Link></li>
                            );
                          })
                        ) : (
                          <li><Link href="/#">#news</Link></li>
                        )}
                      </ul>
                    </div>
                    <div className="social">
                      <h4>Share:</h4>
                      <ul>
                        <li>
                          <Link href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEnc}`} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-facebook-f" />
                          </Link>
                        </li>
                        <li>
                          <Link href={`https://twitter.com/intent/tweet?url=${shareUrlEnc}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-x-twitter" />
                          </Link>
                        </li>
                        <li>
                          <Link href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrlEnc}&title=${shareTitle}`} target="_blank" rel="noopener noreferrer">
                            <i className="fa-brands fa-linkedin-in" />
                          </Link>
                        </li>
                        <li className="m-0">
                          <Link href={`mailto:?subject=${shareTitle}&body=${shareUrlEnc}`} target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-envelope" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="space30 d-lg-none d-block" />
                <div className="blog-auhtor-details">
                  <NewsSearchForm />
                  <div className="space32" />
                  <div className="blog-categories">
                    <h3>News Category</h3>
                    <div className="space12" />
                    <ul>
                      {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                          <li key={cat.id}>
                            <Link href={`/news/category/${cat.slug}/page-1`}>{cat.name} <span><i className="fa-solid fa-angle-right" /></span></Link>
                          </li>
                        ))
                      ) : (
                        <li>
                          <Link href="#">No categories available</Link>
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="space32" />
                  <div className="tags-area">
                    <h3>Popular Hashtags</h3>
                    <div className="space12" />
                    <ul>
                      {(popularTags.slice(0, 4)).map(({ tag }, i) => (
                        <li key={i}><Link href={`/news/hashtags/${encodeURIComponent(tag)}/page-1`}>{tag.startsWith('#') ? tag : `#${tag}`}</Link></li>
                      ))}
                    </ul>
                    <ul>
                      {(popularTags.slice(4, 8)).map(({ tag }, i) => (
                        <li key={i}><Link href={`/news/hashtags/${encodeURIComponent(tag)}/page-1`}>{tag.startsWith('#') ? tag : `#${tag}`}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div className="space32" />
                  <div className="author-images-area">
                    <h3>Popular Authors</h3>
                    <div className="space12" />
                    <ul>
                      {popularAuthors.slice(0, 4).map((a, i) => (
                        a.imageUrl ? <li key={i}><img src={a.imageUrl} alt={a.name || ''} title={a.name} /></li> : null
                      ))}
                    </ul>
                    <ul>
                      {popularAuthors.slice(4, 8).map((a, i) => (
                        a.imageUrl ? <li key={i}><img src={a.imageUrl} alt={a.name || ''} title={a.name} /></li> : null
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bloginner-section-area sp1">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 m-auto">
                <div className="heading2 text-center space-margin60">
                  <h2>Read More Relevant News</h2>
                </div>
              </div>
            </div>
            <div className="row">
              {related && related.length > 0 ? related.map((r, idx) => (
                <div key={r.id || idx} className="col-lg-4 col-md-6" data-aos="zoom-in" data-aos-duration={800 + (idx % 3) * 200}>
                  <div className="blog4-boxarea">
                    {r.imageUrl ? (
                      <div className="img1"><img src={r.imageUrl} alt="" /></div>
                    ) : null}
                    <div className="content-area">
                      <ul>
                        <li><Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />{new Date(r.date || '').toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })}</Link></li>
                        {r.authorName ? (<li><Link href="/#"><img src="/assets/img/icons/user1.svg" alt="" />{r.authorName}</Link></li>) : null}
                      </ul>
                      <div className="space20" />
                      <Link href={`/news/read/${r.slug}`}>{r.title}</Link>
                      <div className="space24" />
                      <Link href={`/news/read/${r.slug}`} className="readmore">read more <i className="fa-solid fa-arrow-right" /></Link>
                      <div className="arrow"><Link href={`/news/read/${r.slug}`}><i className="fa-solid fa-arrow-right" /></Link></div>
                    </div>
                  </div>
                </div>
              )) : null}
            </div>
          </div>
        </div>
        {/*===== CTA AREA =======*/}
        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          links={[
          ]}
          useFeaturedEvent
        />
      </div>
    </Layout>
  );
}


