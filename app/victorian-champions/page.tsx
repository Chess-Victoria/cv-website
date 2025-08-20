import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'
import { getEntries } from '@/lib/contentful'
import PagesGrid from '@/components/sections/about/PagesGrid'

function extractTextFromRichText(content: any): string {
  if (!content) return ''
  if (typeof content === 'string') return content
  if (content.content && Array.isArray(content.content)) {
    return content.content
      .map((node: any) => {
        if (node.content && Array.isArray(node.content)) {
          return node.content.map((t: any) => t.value || '').join('')
        }
        return node.value || ''
      })
      .join(' ')
  }
  return ''
}

interface ChampionListItem {
  title: string
  slug: string
  summary?: string
}

const getAllChampions = unstable_cache(
  async (): Promise<ChampionListItem[]> => {
    const entries = await getEntries('championPage', 1)
    const items = (entries as any[]).map((item) => ({
      title: item?.fields?.title ?? 'Untitled',
      slug: item?.fields?.slug ?? '',
      summary: extractTextFromRichText(item?.fields?.introduction)
    }))
    return items.filter(item => !!item.slug)
  },
  ['all-champions'],
  {
    tags: ['champions'],
    revalidate: getRevalidationTime('CHAMPION')
  }
)

export const metadata: Metadata = {
  title: 'Victorian Champions - Chess Victoria',
  description: 'Browse the list of Victorian champions and view detailed records.',
}

export default async function VictorianChampionsIndexPage() {
  const champions = await getAllChampions()
  const pages = champions.map((c) => ({
    id: c.slug,
    title: c.title,
    slug: c.slug,
    url: `/victorian-champions/${c.slug}`,
    summary: c.summary,
  }))

  return (
    <Layout headerStyle={1} footerStyle={1}>
      <div>
        <PageHeadContent
          title="Victorian Champions"
          backgroundImage="/assets/img/bg/header-bg12.png"
          breadcrumbs={[
            { name: 'Home', link: '/' },
            { name: 'Victorian Champions', link: '/victorian-champions' }
          ]}
        />

        <div className="choose-section-area sp2">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <PagesGrid pages={pages} eyebrow="Champions" heading="Our Champion Category" ctaLabel="View Champion" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
