import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getEntries(contentType: string) {
  const entries = await client.getEntries({ content_type: contentType });
  return entries.items;
}

export default client;
