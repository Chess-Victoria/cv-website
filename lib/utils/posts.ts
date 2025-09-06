import { unstable_cache } from 'next/cache';
import client from '@/lib/contentful';
import { getRevalidationTime } from '@/lib/config';
import { isPreviewMode } from '@/lib/preview';

export interface PostListItem {
  id: string;
  slug: string;
  title: string;
  date?: string;
  authorName?: string;
  imageUrl?: string;
  summary?: string;
}

export interface PostPageData {
  items: PostListItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface PostDetail extends PostListItem {
  body?: string;
  fullContent?: any;
  gallery?: string[];
  hashtags?: string[];
  category?: {
    id?: string;
    slug?: string;
    name?: string;
  }
}

export interface PostCategory {
  id: string;
  slug: string;
  name: string;
}

async function fetchPostsPageUncached(page: number, perPage: number): Promise<PostPageData> {
  const skip = (page - 1) * perPage;

  const res = await client.getEntries({
    content_type: 'post',
    limit: perPage,
    skip,
    order: ['-fields.date', '-sys.createdAt'],
    include: 2,
  } as any);

  const items: PostListItem[] = (res.items || []).map((entry: any) => {
    const fields = entry.fields || {};
    const authorName = fields.author?.fields?.name;
    const imageUrl = fields.image?.fields?.file?.url;
    return {
      id: entry.sys?.id,
      slug: fields.slug,
      title: fields.title,
      date: fields.date || entry.sys?.createdAt,
      authorName,
      imageUrl,
      summary: fields.summary,
    } as PostListItem;
  });

  const total: number = res.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return {
    items,
    total,
    page,
    perPage,
    totalPages,
  };
}

export async function getPostsPageData(page: number, perPage: number): Promise<PostPageData> {
  // In preview mode, bypass cache to get fresh draft content
  if (await isPreviewMode()) {
    return await fetchPostsPageUncached(page, perPage);
  }
  
  // In production mode, use cache
  return unstable_cache(
    async () => await fetchPostsPageUncached(page, perPage),
    ['posts-list'],
    { 
      revalidate: getRevalidationTime('POST'), 
      tags: ['posts'] 
    }
  )();
}

async function fetchPostBySlugUncached(slug: string): Promise<PostDetail | null> {
  const res = await client.getEntries({
    content_type: 'post',
    'fields.slug': slug,
    include: 3,
    limit: 1,
  } as any);

  const entry: any = (res.items || [])[0];
  if (!entry) return null;
  const f = entry.fields || {};
  const imageUrl = f.image?.fields?.file?.url;
  const gallery = Array.isArray(f.images) ? f.images.map((a: any) => a?.fields?.file?.url).filter(Boolean) : [];
  const hashtags: string[] = Array.isArray(f.hashtags) ? f.hashtags.filter((x: any) => typeof x === 'string') : [];
  const category = f.category?.sys ? {
    id: f.category.sys.id,
    slug: f.category.fields?.slug,
    name: f.category.fields?.name || f.category.fields?.title,
  } : undefined;
  return {
    id: entry.sys?.id,
    slug: f.slug,
    title: f.title,
    date: f.date || entry.sys?.createdAt,
    authorName: f.author?.fields?.name,
    imageUrl,
    summary: f.summary,
    body: f.content,
    fullContent: f.fullContent,
    gallery,
    hashtags,
    category,
  } as PostDetail;
}

export async function getPostBySlug(slug: string) {
  // In preview mode, bypass cache to get fresh draft content
  if (await isPreviewMode()) {
    return await fetchPostBySlugUncached(slug);
  }
  
  // In production mode, use cache
  const dataFn = unstable_cache(
    async () => fetchPostBySlugUncached(slug),
    [`post:${slug}`],
    { 
      revalidate: getRevalidationTime('POST'), 
      tags: ['posts', `post:${slug}`] 
    }
  );
  return dataFn();
}

async function fetchAllPostCategoriesUncached(): Promise<PostCategory[]> {
  const res = await client.getEntries({
    content_type: 'postCategory',
    order: ['fields.title'],
    limit: 1000,
  } as any);
  return (res.items || []).map((e: any) => ({
    id: e.sys?.id,
    slug: e.fields?.slug,
    name: e.fields?.title,
  }));
}

export const getAllPostCategories = unstable_cache(
  async (): Promise<PostCategory[]> => await fetchAllPostCategoriesUncached(),
  ['post-categories'],
  { revalidate: getRevalidationTime('POST'), tags: ['post-categories'] }
);

async function fetchPostsByCategoryPageUncached(categorySlug: string, page: number, perPage: number): Promise<PostPageData & { category?: PostCategory }> {
  // Resolve category id by slug first
  const catRes: any = await client.getEntries({ content_type: 'postCategory', 'fields.slug': categorySlug, limit: 1 } as any);
  const catEntry: any = (catRes.items || [])[0];
  const category: PostCategory | undefined = catEntry ? { id: catEntry.sys.id, slug: catEntry.fields.slug, name: (catEntry.fields.name || catEntry.fields.title) } : undefined;
  const skip = (page - 1) * perPage;
  const res = await client.getEntries({
    content_type: 'post',
    limit: perPage,
    skip,
    order: ['-fields.date', '-sys.createdAt'],
    include: 2,
    ...(category ? { 'fields.category.sys.id[in]': category.id } : {}),
  } as any);

  const items: PostListItem[] = (res.items || []).map((entry: any) => {
    const fields = entry.fields || {};
    const authorName = fields.author?.fields?.name;
    const imageUrl = fields.image?.fields?.file?.url;
    return {
      id: entry.sys?.id,
      slug: fields.slug,
      title: fields.title,
      date: fields.date || entry.sys?.createdAt,
      authorName,
      imageUrl,
      summary: fields.summary,
    } as PostListItem;
  });

  const total: number = res.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return { items, total, page, perPage, totalPages, category };
}

export function getPostsByCategoryPageData(categorySlug: string, page: number, perPage: number) {
  const dataFn = unstable_cache(
    async () => fetchPostsByCategoryPageUncached(categorySlug, page, perPage),
    [`posts-category:${categorySlug}:${page}:${perPage}`],
    { revalidate: getRevalidationTime('POST'), tags: ['posts', 'post-categories'] }
  );
  return dataFn();
}

function normalizeHashtag(tagParam: string): { forDisplay: string; forQuery: string[]; decoded: string } {
  let decoded = tagParam || '';
  try { decoded = decodeURIComponent(decoded); } catch {}
  const trimmed = decoded.trim();
  const base = trimmed.startsWith('#') ? trimmed.slice(1) : trimmed;

  const variants = new Set<string>();
  const addVariants = (s: string) => {
    variants.add(s);
    variants.add(s.toLowerCase());
    variants.add(s.toUpperCase());
    // TitleCase (basic): first char upper, rest lower
    variants.add(s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());
  };

  addVariants(base);
  // Also add with leading '#'
  Array.from(variants).forEach(v => variants.add(`#${v}`));

  const forQuery = Array.from(variants).filter(v => v);
  const forDisplay = `#${base}`;
  return { forDisplay, forQuery, decoded };
}

async function fetchPostsByHashtagPageUncached(tagParam: string, page: number, perPage: number): Promise<PostPageData & { tag: string }> {
  const { forQuery, forDisplay, decoded } = normalizeHashtag(tagParam);
  const skip = (page - 1) * perPage;
  let res: any = await client.getEntries({
    content_type: 'post',
    limit: perPage,
    skip,
    order: ['-fields.date', '-sys.createdAt'],
    include: 2,
    'fields.hashtags[in]': forQuery.join(','),
  } as any);

  // Fallback: if no direct hashtag match, try a broader text search using the base tag
  if (!res || (res.total || 0) === 0) {
    const base = forDisplay.replace(/^#+/, '').trim();
    const baseLower = base.toLowerCase();
    const fallback = await client.getEntries({
      content_type: 'post',
      limit: perPage,
      skip,
      order: ['-fields.date', '-sys.createdAt'],
      include: 2,
      query: base,
    } as any);
    // Filter to posts that actually contain the hashtag variant
    if (fallback && (fallback.total || 0) > 0) {
      fallback.items = (fallback.items || []).filter((entry: any) => {
        const tags: any[] = Array.isArray(entry.fields?.hashtags) ? entry.fields.hashtags : [];
        return tags.some((t: any) => typeof t === 'string' && t.replace(/^#+/, '').trim().toLowerCase() === baseLower);
      });
      res = fallback;
    }
  }
  const items: PostListItem[] = (res.items || []).map((entry: any) => {
    const fields = entry.fields || {};
    return {
      id: entry.sys?.id,
      slug: fields.slug,
      title: fields.title,
      date: fields.date || entry.sys?.createdAt,
      authorName: fields.author?.fields?.name,
      imageUrl: fields.image?.fields?.file?.url,
      summary: fields.summary,
    } as PostListItem;
  });

  const total: number = res.total || 0;
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  return { items, total, page, perPage, totalPages, tag: forDisplay };
}

export function getPostsByHashtagPageData(tagParam: string, page: number, perPage: number) {
  const dataFn = unstable_cache(
    async () => fetchPostsByHashtagPageUncached(tagParam, page, perPage),
    [`posts-hashtag:${tagParam}:${page}:${perPage}`],
    { revalidate: getRevalidationTime('POST'), tags: ['posts'] }
  );
  return dataFn();
}

async function fetchRelatedPostsByCategoryUncached(categoryId: string, excludeId: string, limit: number): Promise<PostListItem[]> {
  if (!categoryId) return [];
  const res = await client.getEntries({
    content_type: 'post',
    limit,
    order: ['-fields.date', '-sys.createdAt'],
    include: 2,
    'fields.category.sys.id[in]': categoryId,
    'sys.id[nin]': excludeId,
  } as any);
  const items: PostListItem[] = (res.items || [])
    .map((entry: any) => {
      const fields = entry.fields || {};
      return {
        id: entry.sys?.id,
        slug: fields.slug,
        title: fields.title,
        date: fields.date || entry.sys?.createdAt,
        authorName: fields.author?.fields?.name,
        imageUrl: fields.image?.fields?.file?.url,
        summary: fields.summary,
      } as PostListItem;
    });
  return items;
}

export function getRelatedPostsByCategory(categoryId: string, excludeId: string, limit = 3) {
  const dataFn = unstable_cache(
    async () => fetchRelatedPostsByCategoryUncached(categoryId, excludeId, limit),
    [`posts-related:${categoryId}:${excludeId}:${limit}`],
    { revalidate: getRevalidationTime('POST'), tags: ['posts', `posts-related:${categoryId}`] }
  );
  return dataFn();
}

export interface PopularHashtag { tag: string; count: number }
export interface PopularAuthor { name: string; count: number; imageUrl?: string }

async function fetchPopularHashtagsUncached(limit: number): Promise<PopularHashtag[]> {
  const res = await client.getEntries({
    content_type: 'post',
    limit: 1000,
    select: ['fields.hashtags'],
    include: 0,
  } as any);

  const counter = new Map<string, number>();
  (res.items || []).forEach((entry: any) => {
    const tags: any[] = Array.isArray(entry.fields?.hashtags) ? entry.fields.hashtags : [];
    tags.forEach((t: any) => {
      if (typeof t !== 'string') return;
      const raw = t.trim();
      const normalized = raw.replace(/^#+/, '');
      const key = normalized.toLowerCase();
      if (!key) return;
      counter.set(key, (counter.get(key) || 0) + 1);
    });
  });

  const sorted = Array.from(counter.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ tag: `#${key}`, count }));
  return sorted;
}

async function fetchPopularAuthorsUncached(limit: number): Promise<PopularAuthor[]> {
  const res = await client.getEntries({
    content_type: 'post',
    limit: 1000,
    select: ['fields.author'],
    include: 2,
  } as any);

  interface Acc { name: string; imageUrl?: string; count: number }
  const map = new Map<string, Acc>();
  (res.items || []).forEach((entry: any) => {
    const author = entry.fields?.author?.fields;
    const name: string | undefined = author?.name;
    if (!name) return;
    const imageUrl: string | undefined = author?.image?.fields?.file?.url;
    const key = name.toLowerCase();
    const cur = map.get(key);
    if (cur) {
      cur.count += 1;
      if (!cur.imageUrl && imageUrl) cur.imageUrl = imageUrl;
    } else {
      map.set(key, { name, imageUrl, count: 1 });
    }
  });

  return Array.from(map.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ name, imageUrl, count }) => ({ name, imageUrl, count }));
}

export const getPopularHashtags = unstable_cache(
  async (limit = 8) => fetchPopularHashtagsUncached(limit),
  ['posts-popular-hashtags'],
  { revalidate: getRevalidationTime('POST'), tags: ['posts'] }
);

export const getPopularAuthors = unstable_cache(
  async (limit = 8) => fetchPopularAuthorsUncached(limit),
  ['posts-popular-authors'],
  { revalidate: getRevalidationTime('POST'), tags: ['posts'] }
);


