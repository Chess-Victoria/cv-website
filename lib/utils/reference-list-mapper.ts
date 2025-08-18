import { ReferenceList, ReferenceListData, ReferenceItem } from '@/lib/types/reference-list'

function pickFirstImage(entryFields: any): { src: string; alt: string } | undefined {
  const candidates = [entryFields?.image, entryFields?.logo, entryFields?.picture, entryFields?.photo]
  for (const asset of candidates) {
    const url: string | undefined = asset?.fields?.file?.url
    if (url) {
      const alt: string = asset?.fields?.title || asset?.fields?.description || entryFields?.name || entryFields?.title || 'Image'
      return { src: url, alt }
    }
  }
  return undefined
}

function pickUrl(entryFields: any): string | undefined {
  return entryFields?.url || entryFields?.website || entryFields?.link || undefined
}

function pickShortName(entryFields: any): string | undefined {
  return entryFields?.shortName || entryFields?.abbreviation || undefined
}

export function mapReferenceListToData(fields: ReferenceList): ReferenceListData {
  const title = fields.title || 'References'
  const subtitle = (fields as any).subTitle || ''

  const items: ReferenceItem[] = []
  const rawItems: any[] = Array.isArray(fields.items) ? (fields.items as any[]) : []

  rawItems.forEach((ref: any) => {
    if (!ref || typeof ref !== 'object' || !('fields' in ref)) return
    const entry = ref as any
    const f = entry.fields || {}

    const id: string | undefined = entry.sys?.id
    const name: string | undefined = f.name || f.title
    const image = pickFirstImage(f) || { src: '/assets/img/default/generic-chess-club.png', alt: name || 'Item' }
    if (!id || !name) return

    const item: ReferenceItem = {
      id,
      name,
      shortName: pickShortName(f) || name,
      image,
      title: f.title || undefined,
      description: f.description || undefined,
      url: pickUrl(f),
    }
    items.push(item)
  })

  return { title, subtitle, items }
}


