import { getEntries } from '@/lib/contentful'
import { mapWelcomeBlock } from './welcome-block-mapper'
import { WelcomeBlockData } from '@/components/sections/home1/WelcomeBlock'
import { mapReferenceListToData } from './reference-list-mapper'
import { ReferenceListData } from '@/lib/types/reference-list'
import { unstable_cache } from 'next/cache'
import { getRevalidationTime } from '@/lib/config'

function extractTextFromRichText(content: any): string {
  if (!content) return '';
  
  if (typeof content === 'string') return content;
  
  if (content.content && Array.isArray(content.content)) {
    return content.content
      .map((node: any) => {
        if (node.content && Array.isArray(node.content)) {
          return node.content.map((textNode: any) => textNode.value || '').join('');
        }
        return node.value || '';
      })
      .join(' ');
  }
  
  return '';
}

export interface PageData {
  id: string
  title: string
  summary?: string
  slug?: string
  url?: string
}

export interface AboutPageData {
  title?: string
  overviewBlock?: WelcomeBlockData
  clubList?: ReferenceListData
  pages?: PageData[]
  metadata?: any
}

function mapPagesData(pages: any[]): PageData[] {
  if (!pages || !Array.isArray(pages)) {
    return []
  }

  return pages.map((page) => {
    const fields = page.fields || page
    return {
      id: page.sys?.id || page.id || '',
      title: fields.title || 'Untitled Page',
      summary: fields.summary ? extractTextFromRichText(fields.summary) : '',
      slug: fields.slug || '',
      url: fields.slug ? `/pages/${fields.slug}` : '#'
    }
  })
}

export const getAboutPageData = unstable_cache(
  async (): Promise<AboutPageData> => {
    try {
      const entries = await getEntries('aboutPage', 2)
      
      if (!entries || entries.length === 0) {
        console.warn('No About Page entries found')
        return {}
      }

      const aboutPage = entries[0]
      const fields = aboutPage.fields

      console.log('🏠 AboutPage raw fields keys:', Object.keys(fields))

      return {
        title: typeof fields.title === 'string' ? fields.title : undefined,
        overviewBlock: fields.overviewBlock && typeof fields.overviewBlock === 'object' && 'fields' in fields.overviewBlock && fields.overviewBlock.fields ? mapWelcomeBlock(fields.overviewBlock.fields as any) : undefined,
        clubList: fields.clubList && typeof fields.clubList === 'object' && 'fields' in fields.clubList && fields.clubList.fields ? mapReferenceListToData(fields.clubList.fields as any) : undefined,
        pages: fields.pages && Array.isArray(fields.pages) ? mapPagesData(fields.pages) : undefined,
        metadata: fields.metadata,
      }
    } catch (error) {
      console.error('Error fetching About Page data:', error)
      return {}
    }
  },
  ['about-page-data'],
  {
    tags: ['aboutPage', 'welcomeBlock', 'referenceList', 'page'],
    revalidate: getRevalidationTime('DEFAULT')
  }
)
