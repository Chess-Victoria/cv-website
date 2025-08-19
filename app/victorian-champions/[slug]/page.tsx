import Countdown from '@/components/elements/Countdown';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import PageHeadContent from '@/components/elements/PageHeadContent'
import { getEntryBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { unstable_cache } from 'next/cache';
import { getRevalidationTime } from '@/lib/config';
import { notFound } from 'next/navigation';

// Cache the champion data fetching
const getCachedChampion = unstable_cache(
  async (slug: string) => {
    const champion = await getEntryBySlug('championPage', slug);
    return champion;
  },
  ['champion-data'],
  {
    tags: ['champions'],
    revalidate: getRevalidationTime('CHAMPION')
  }
);

interface ChampionPageProps {
    params: { slug: string }
}

export default async function ChampionPage({ params }: ChampionPageProps) {
    const champion = await getCachedChampion(params.slug);
    
    // If no champion found, show 404
    if (!champion) {
        notFound();
    }
    
    const { title = 'Champion', introduction } = champion?.fields || {};

    // Type guard for Contentful rich text Document
    const isRichTextDocument = (doc: any): doc is import('@contentful/rich-text-types').Document => {
        return doc && typeof doc === 'object' && doc.nodeType === 'document';
    };

    const introductionContent = isRichTextDocument(introduction)
        ? documentToReactComponents(introduction)
        : null;

    return (
        <Layout headerStyle={1} footerStyle={1}>
            <div>
                <PageHeadContent
                    title={typeof title === 'string' ? title : 'Champion'}
                    backgroundImage="/assets/img/bg/header-bg12.png"
                    breadcrumbs={[
                        { name: 'Home', link: '/' },
                        { name: 'Victorian Champions', link: '/victorian-champions' },
                        { name: typeof title === 'string' ? title : 'Champion', link: `/victorian-champions/${params.slug}` }
                    ]}
                />
                {/*===== HERO AREA ENDS =======*/}
                {/*===== MAIN CONTENT AREA STARTS =======*/}
                <div className="champion-inner-section sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 m-auto" data-aos="zoom-in" data-aos-duration={1000}>
                                <div className="contact4-boxarea">
                                    <div className="space8" />
                                    {introductionContent && (
                                        <div className="mb-3">{introductionContent}</div>
                                    )}
                                    {/* Champions Table */}
                                    {Array.isArray(champion?.fields?.champions) && champion.fields.champions.length > 0 && (
                                        <div className="schedule-section-area">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col-lg-11 m-auto">
                                                        <div className="schedule">
                                                            <table className="table table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Year</th>
                                                                        <th>Name</th>
                                                                        <th>Division</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {champion.fields.champions.map((item: any, idx: number) => (
                                                                        <tr key={item.sys?.id || idx}>
                                                                            <td>{item.fields?.year || ''}</td>
                                                                            <td>{item.fields?.name || ''}</td>
                                                                            <td>{item.fields?.division || ''}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===== MAIN CONTENT AREA ENDS =======*/}
                {/*===== CTA AREA STARTS =======*/}
                <div className="cta1-section-area d-lg-block d-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="cta1-main-boxarea">
                                    <div className="timer-btn-area">
                                        <div className="btn-area1">
                                            <Link href="/contact" className="vl-btn1">Contact Us</Link>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <Link href="/events"><img src="/assets/img/icons/calender1.svg" alt="" />Check our upcoming events</Link>
                                        </li>
                                        <li className="m-0">
                                            <Link href="/chess-clubs"><img src="/assets/img/icons/location1.svg" alt="" />Find a chess club near you</Link>
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
                                        <div className="btn-area1">
                                            <Link href="/contact" className="vl-btn1">Contact Us</Link>
                                        </div>
                                    </div>
                                    <ul>
                                        <li>
                                            <Link href="/events"><img src="/assets/img/icons/calender1.svg" alt="" />Check our upcoming events</Link>
                                        </li>
                                        <li className="m-0">
                                            <Link href="/contact"><img src="/assets/img/icons/location1.svg" alt="" />Find a chess club near you</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function generateStaticParams() {
    const { getEntries } = await import('@/lib/contentful');
    const entries = await getEntries('championPage');
    return entries.map((entry: any) => ({ slug: entry.fields.slug }));
}
