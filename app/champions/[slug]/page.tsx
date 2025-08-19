import Countdown from '@/components/elements/Countdown';
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getEntryBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import CTAWithCountdown from '@/components/sections/home1/CTAWithCountdown';

interface ChampionPageProps {
    params: Promise<{ slug: string }>
}

export default async function ChampionPage({ params }: ChampionPageProps) {
    const { slug } = await params;
    const champion = await getEntryBySlug('championPage', slug);
    const { title = 'Champion', introduction } = champion?.fields || {};
    const championsList = (champion as any)?.fields?.champions as any[] | undefined;
    const hasDivision = Array.isArray(championsList) && championsList.some((item: any) => !!item?.fields?.division);

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
                <div className="inner-page-header" style={{ backgroundImage: 'url(/assets/img/bg/header-bg12.png)' }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 m-auto">
                                <div className="heading1 text-center">
                                    <h1>{typeof title === 'string' ? title : 'Champion'}</h1>

                                    <div className="space20" />
                                    <Link href="/">Home <i className="fa-solid fa-angle-right" /> <span>Champion</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
                                                            <table>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Year</th>
                                                                        <th>Name</th>
                                                                        {hasDivision && <th>Division</th>}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {champion.fields.champions.map((item: any, idx: number) => (
                                                                        <tr key={item.sys?.id || idx}>
                                                                            <td>{item.fields?.year || ''}</td>
                                                                            <td>{item.fields?.name || ''}</td>
                                                                            {hasDivision && <td>{item.fields?.division || ''}</td>}
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
                <CTAWithCountdown
						buttonLabel="Contact Us"
						buttonHref="/contact"
						useFeaturedEvent
					/>
            </div>
        </Layout>
    );
}

export async function generateStaticParams() {
    const { getEntries } = await import('@/lib/contentful');
    const entries = await getEntries('championPage');
    return entries.map((entry: any) => ({ slug: entry.fields.slug }));
}
