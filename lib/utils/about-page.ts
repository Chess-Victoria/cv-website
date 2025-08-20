import { getEntries } from '@/lib/contentful'
import { mapWelcomeBlock } from './welcome-block-mapper'
import { WelcomeBlockData } from '@/components/sections/home1/WelcomeBlock'
import { mapReferenceListToData } from './reference-list-mapper'
import { ReferenceListData } from '@/lib/types/reference-list'

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

export async function getAboutPageData(): Promise<AboutPageData> {
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
      title: fields.title,
      overviewBlock: fields.overviewBlock ? mapWelcomeBlock(fields.overviewBlock.fields) : undefined,
      clubList: fields.clubList ? mapReferenceListToData(fields.clubList.fields) : undefined,
      pages: fields.pages ? mapPagesData(fields.pages) : undefined,
      metadata: fields.metadata,
    }
  } catch (error) {
    console.error('Error fetching About Page data:', error)
    return {}
  }
}
