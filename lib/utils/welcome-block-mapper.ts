import { WelcomeBlockData } from '@/components/sections/home1/WelcomeBlock'

// Contentful model (Welcome Block):
// - title (Symbol)
// - images (Array<Link Asset>)
// - actionButtonText (Symbol)
// - actionButtonUrl (Symbol)
// - line1Header (Symbol)
// - line1Text (Symbol)
// - line2Header (Symbol)
// - line2Text (Symbol)
// - caption (Symbol)
// - summary (Text)
export interface WelcomeBlockCounter {
  name: string
  end: number
  value?: string
}

export interface WelcomeBlockEntryFields {
  title?: string
  images?: Array<any>
  actionButtonText?: string
  actionButtonUrl?: string
  line1Header?: string
  line1Text?: string
  line2Header?: string
  line2Text?: string
  caption?: string
  summary?: string
  counter?: WelcomeBlockCounter[]
}

export function mapWelcomeBlock(entryFields: WelcomeBlockEntryFields): WelcomeBlockData {
  const images = (entryFields.images || []).slice(0, 3).map((img: any) => ({
    url: img?.fields?.file?.url || '',
    alt: img?.fields?.description || '',
  })) as Array<{ url: string; alt?: string }>

  // Ensure exactly 3 images for layout
  const padded = [0, 1, 2].map((i) => images[i] || { url: '', alt: '' }) as [
    { url: string; alt?: string },
    { url: string; alt?: string },
    { url: string; alt?: string }
  ]

  // Build two features from line1/line2
  const features = [
    {
      title: entryFields.line1Header,
      text: entryFields.line1Text,
    },
    {
      title: entryFields.line2Header,
      text: entryFields.line2Text,
    },
  ].filter(f => f.title || f.text)

  return {
    eyebrow: entryFields.caption,
    title: entryFields.title,
    description: entryFields.summary,
    images: padded,
    features,
    ctaLabel: entryFields.actionButtonText,
    ctaHref: entryFields.actionButtonUrl,
    counter: entryFields.counter || [],
  }
}


