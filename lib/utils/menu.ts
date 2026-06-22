import { unstable_cache } from 'next/cache'
import { getEntries } from '@/lib/contentful'
import { isPreviewMode } from '@/lib/preview'
import type { MenuItem } from '@/lib/types/menu'

type ContentfulMenuEntry = {
    sys?: { id?: string }
    fields?: {
        name?: string
        url?: string
        isMainMenu?: boolean
        items?: ContentfulMenuEntry[]
    }
}

function normalizeMenuItem(entry: ContentfulMenuEntry, ancestorIds: Set<string> = new Set()): MenuItem | null {
    const id = entry.sys?.id
    if (!id || ancestorIds.has(id)) {
        return null
    }

    const fields = entry.fields ?? {}
    const nextAncestors = new Set(ancestorIds)
    nextAncestors.add(id)

    const items = (fields.items ?? [])
        .map((child) => normalizeMenuItem(child, nextAncestors))
        .filter((child): child is MenuItem => Boolean(child))

    return {
        id,
        name: fields.name?.trim() || 'Menu item',
        url: fields.url?.trim() || '#',
        items,
    }
}

const loadMainMenu = unstable_cache(
    async (preview: boolean): Promise<MenuItem[]> => {
        const entries = (await getEntries('menu', 10)) as ContentfulMenuEntry[]
        return entries
            .filter((entry) => Boolean(entry.fields?.isMainMenu))
            .flatMap((entry) => (entry.fields?.items ?? []).map((child) => normalizeMenuItem(child)))
            .filter((item): item is MenuItem => Boolean(item))
    },
    ['contentful-main-menu'],
    {
        revalidate: 60,
        tags: ['menu'],
    }
)

export async function getMainMenuItems(): Promise<MenuItem[]> {
    const preview = await isPreviewMode()
    return loadMainMenu(preview)
}
