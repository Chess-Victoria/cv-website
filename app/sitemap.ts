import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://chessvictoria.org.au'

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/events',
    '/chess-clubs',
    '/committees',
    '/galleries',
    '/news',
    '/pages',
    '/victorian-champions',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1.0 : 0.7,
  }))

  // Dynamic routes
  const [pages, posts, events, clubs, galleries, championCategories] = await Promise.all([
    import('@/lib/utils/page').then(m => m.getAllPages()).catch(() => []),
    import('@/lib/utils/posts').then(async (m) => (await m.getPostsPageData(1, 1000)).items).catch(() => []),
    import('@/lib/utils/event').then(m => m.getAllEvents()).catch(() => []),
    import('@/lib/utils/chess-club').then(m => m.getAllChessClubs()).catch(() => []),
    import('@/lib/utils/image-gallery').then(m => m.getAllImageGalleries()).catch(() => []),
    import('@/app/victorian-champions/page').then(async () => {
      const { getEntries } = await import('@/lib/contentful')
      const entries = await getEntries('championPage', 1)
      return entries as any[]
    }).catch(() => []),
  ])

  const pageUrls: MetadataRoute.Sitemap = (pages as any[]).map((p: any) => ({
    url: `${baseUrl}/pages/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const postUrls: MetadataRoute.Sitemap = (posts as any[]).map((p: any) => ({
    url: `${baseUrl}/news/read/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const eventUrls: MetadataRoute.Sitemap = (events as any[]).map((e: any) => ({
    url: `${baseUrl}/event/${e.fields?.slug || e.sys?.id}`,
    changeFrequency: 'daily',
    priority: 0.6,
  }))

  const clubUrls: MetadataRoute.Sitemap = (clubs as any[]).map((c: any) => ({
    url: `${baseUrl}/chess-clubs/${c.fields?.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const galleryUrls: MetadataRoute.Sitemap = (galleries as any[]).map((g: any) => ({
    url: `${baseUrl}/galleries/${g.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  const championsUrls: MetadataRoute.Sitemap = (championCategories as any[]).map((c: any) => ({
    url: `${baseUrl}/victorian-champions/${c.fields?.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    ...staticRoutes,
    ...pageUrls,
    ...postUrls,
    ...eventUrls,
    ...clubUrls,
    ...galleryUrls,
    ...championsUrls,
  ]
}


