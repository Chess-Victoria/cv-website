import { Metadata } from 'next'
import Layout from "@/components/layout/Layout"
import PageHeadContent from '@/components/elements/PageHeadContent'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'
import { getEntries } from '@/lib/contentful'

interface ChampionListItem {
  title: string
  slug: string
}

const getAllChampions = unstable_cache(
  async (): Promise<ChampionListItem[]> => {
    const entries = await getEntries('championPage', 1)
    const items = (entries as any[]).map((item) => ({
      title: item?.fields?.title ?? 'Untitled',
      slug: item?.fields?.slug ?? ''
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

        <div className="schedule-section-area sp10 py-5 px-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-11 m-auto">
                <div className="schedule">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th style={{ width: '160px' }}>Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {champions.length > 0 ? (
                        champions.map((c) => (
                          <tr key={c.slug}>
                            <td>{c.title}</td>
                            <td>
                              <Link href={`/victorian-champions/${c.slug}`} className="vl-btn1">
                                View
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="text-center">No champions found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
