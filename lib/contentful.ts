import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});



export async function getEntries(contentType: string, include: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 2) {
  const entries = await client.getEntries({
    content_type: contentType,
    include: include
  });
  return entries.items;
}

export async function getSingleEntry(contentType: string, include: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 2) {
  const entries = await client.getEntries({
    content_type: contentType,
    include: include,
    limit: 1
  });
  return entries.items[0] || null;
}

export async function getEntryBySlug(contentType: string, slug: string,  include: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 = 3) {
  const entries = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
    include,
  });
  return entries.items[0] || null;
}

export default client;
