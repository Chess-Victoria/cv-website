import Countdown from '@/components/elements/Countdown'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { getAllImageGalleries } from "@/lib/utils/image-gallery"
import GalleriesTable from "@/components/sections/galleries/GalleriesTable"
import PageHeadContent from '@/components/elements/PageHeadContent'
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';

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

export default async function GalleriesPage() {
  const galleries = await getCachedGalleriesData();

  if (!galleries || galleries.length === 0) {
    return (
      <div className="schedule-section-area sp10">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 m-auto">
              <div className="text-center">
                <h2>Photo Galleries</h2>
                <p>No galleries found in Contentful.</p>
                <p>Please ensure imageGallery content types have been created and published.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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

          <div className='pt-5'></div>
          {/*===== HERO AREA ENDS =======*/}
          
          {/*===== ALL GALLERIES TABLE AREA STARTS =======*/}
          {galleries && galleries.length > 0 && <GalleriesTable galleries={galleries} />}
          {/*===== ALL GALLERIES TABLE AREA ENDS =======*/}
          
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
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />View Our Photo Collections</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
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
                        <Link href="/pricing-plan" className="vl-btn1">Buy Ticket</Link>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <Link href="/#"><img src="/assets/img/icons/calender1.svg" alt="" />View Our Photo Collections</Link>
                      </li>
                      <li className="m-0">
                        <Link href="/#"><img src="/assets/img/icons/location1.svg" alt="" />Victoria, Australia</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </Layout>
    </>
  )
}
