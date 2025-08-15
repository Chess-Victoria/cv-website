import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}

export async function getEntryBySlug(contentType: string, slug: string) {
  const entries = await client.getEntries({
    content_type: contentType,
    'fields.slug': slug,
  });
  return entries.items[0] || null;
}

export default client;
