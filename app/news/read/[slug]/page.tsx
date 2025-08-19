import Layout from "@/components/layout/Layout";
import Countdown from '@/components/elements/Countdown'
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostCategories, getRelatedPostsByCategory, getPopularHashtags, getPopularAuthors } from "@/lib/utils/posts";
import type { Metadata } from 'next';
import PageHeadContent from '@/components/elements/PageHeadContent';

// Static revalidation for Next.js 15
export const revalidate = 3600; // 1 hour

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

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="News & Update"
          backgroundImage="/assets/img/bg/header-bg14.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "News & Updates", link: "/news" },
            { name: post.title, link: `/news/read/${post.slug}` }
          ]}
        />

        <div className="blog-details-section sp8">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="blog-deatils-content heading2">
                  <h2>{post.title}</h2>
                  <div className="space16" />
                  <div className="img1">
                    <img src={post.imageUrl || "/assets/img/all-images/blog/blog-img7.png"} alt="" />
                  </div>
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
                  
                  <div className="space48" />
                  
                  {/* Social Share */}
                  <div className="social-share">
                    <h4>Share this article:</h4>
                    <div className="space16" />
                    <div className="share-buttons">
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEnc}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary me-2">
                        <i className="fa-brands fa-facebook-f"></i> Facebook
                      </a>
                      <a href={`https://twitter.com/intent/tweet?url=${shareUrlEnc}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="btn btn-info me-2">
                        <i className="fa-brands fa-twitter"></i> Twitter
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEnc}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary me-2">
                        <i className="fa-brands fa-linkedin-in"></i> LinkedIn
                      </a>
                      <a href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} className="btn btn-success">
                        <i className="fa-solid fa-envelope"></i> Email
                      </a>
                    </div>
                  </div>
                  
                  <div className="space48" />
                  
                  {/* Related Posts */}
                  {related.length > 0 && (
                    <>
                      <h4>Related Articles:</h4>
                      <div className="space16" />
                      <div className="row">
                        {related.map((relatedPost, idx) => (
                          <div key={relatedPost.id || idx} className="col-lg-4 col-md-6">
                            <div className="related-post">
                              <div className="img1">
                                <img src={relatedPost.imageUrl || "/assets/img/all-images/blog/blog-img4.png"} alt="" />
                              </div>
                              <div className="content">
                                <h5>
                                  <Link href={`/news/read/${relatedPost.slug}`}>{relatedPost.title}</Link>
                                </h5>
                                <p>{new Date(relatedPost.date || '').toLocaleDateString('en-AU')}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="col-lg-4">
                <div className="sidebar">
                  {/* Categories */}
                  {categories.length > 0 && (
                    <div className="widget">
                      <h4>Categories</h4>
                      <div className="space16" />
                      <ul className="category-list">
                        {categories.map((category) => (
                          <li key={category.id}>
                            <Link href={`/news/category/${category.slug}`}>
                              {category.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="space32" />
                  
                  {/* Popular Tags */}
                  {popularTags.length > 0 && (
                    <div className="widget">
                      <h4>Popular Tags</h4>
                      <div className="space16" />
                      <div className="tag-cloud">
                        {popularTags.map((tag, index) => (
                          <Link key={index} href={`/news/hashtags/${encodeURIComponent(tag.tag)}/page-1`} className="tag">
                            #{tag.tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="space32" />
                  
                  {/* Popular Authors */}
                  {popularAuthors.length > 0 && (
                    <div className="widget">
                      <h4>Popular Authors</h4>
                      <div className="space16" />
                      <ul className="author-list">
                        {popularAuthors.map((author, index) => (
                          <li key={index}>
                            <Link href={`#`}>
                              {author.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-block d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Join Chess Victoria
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===== CTA AREA ENDS =======*/}
        
        {/*===== CTA AREA STARTS =======*/}
        <div className="cta1-section-area d-lg-none d-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-10 m-auto">
                <div className="cta1-main-boxarea">
                  <div className="timer-btn-area">
                    <Countdown />
                    <div className="btn-area1">
                      <Link href="/contact" className="vl-btn1">Contact Us</Link>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <Link href="/contact">
                        <img src="/assets/img/icons/calender1.svg" alt="" />
                        Join Chess Victoria
                      </Link>
                    </li>
                    <li className="m-0">
                      <Link href="/#">
                        <img src="/assets/img/icons/location1.svg" alt="" />
                        Victoria, Australia
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}


