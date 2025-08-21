import Layout from "@/components/layout/Layout"
import { getAllImageGalleries } from "@/lib/utils/image-gallery"
import PagesGrid from "@/components/sections/about/PagesGrid"
import PageHeadContent from '@/components/elements/PageHeadContent'
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown'
import { ImageGalleryData } from "@/lib/types/image-gallery"

// Cache the data fetching with tags for revalidation
const getCachedGalleriesData = unstable_cache(
  async () => {
    return await getAllImageGalleries();
  },
  ['galleries-data'],
  {
    tags: ['galleries', 'imageGallery'],
    revalidate: getRevalidationTime('IMAGE_GALLERY')
  }
);

// Function to map gallery data to PageItem format
function mapGalleriesToPageItems(galleries: ImageGalleryData[]) {
  return galleries.map((gallery) => ({
    id: gallery.id,
    title: gallery.title,
    slug: gallery.slug,
    url: `/galleries/${gallery.slug}`,
    summary: gallery.descriptionHtml 
      ? `${gallery.images.length} image${gallery.images.length !== 1 ? 's' : ''} • ${gallery.descriptionHtml.replace(/<[^>]*>/g, '').substring(0, 150)}...`
      : `Browse ${gallery.images.length} image${gallery.images.length !== 1 ? 's' : ''} from this gallery.`
  }))
}

export default async function GalleriesPage() {
  const galleries = await getCachedGalleriesData();

  if (!galleries || galleries.length === 0) {
    return (
      <Layout headerStyle={1} footerStyle={1}>
        <div>
          <PageHeadContent
            title="Photo Galleries"
            backgroundImage="/assets/img/bg/header-bg10.png"
            breadcrumbs={[
              { name: "Home", link: "/" },
              { name: "Galleries", link: "/galleries" }
            ]}
          />

          <div className="choose-section-area sp2">
            <div className="container">
              <div className="row">
                <div className="col-lg-4 m-auto">
                  <div className="heading2 text-center space-margin60">
                    <h5>Photo Galleries</h5>
                    <div className="space18" />
                    <h2>No Galleries Available</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="text-center">
                    <p>No galleries found in Contentful.</p>
                    <p>Please ensure imageGallery content types have been created and published.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Map galleries to PageItem format
  const pageItems = mapGalleriesToPageItems(galleries);

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Photo Galleries"
          backgroundImage="/assets/img/bg/header-bg10.png"
          breadcrumbs={[
            { name: "Home", link: "/" },
            { name: "Galleries", link: "/galleries" }
          ]}
        />

        <div className="choose-section-area sp2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <PagesGrid 
                  pages={pageItems} 
                  eyebrow="Browse Collections" 
                  heading="Photo Galleries" 
                  ctaLabel="View Gallery" 
                />
              </div>
            </div>
          </div>
        </div>
        
        {/*===== CTA AREA STARTS =======*/}
        <CTAWithCountdown
          buttonLabel="Contact Us"
          buttonHref="/contact"
          useFeaturedEvent
        />
      </div>
    </Layout>
  )
}
