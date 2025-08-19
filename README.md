# Chess Victoria Website

## Contentful Integration & ISR Setup

This project uses [Contentful](https://www.contentful.com/) as a headless CMS and is built with [Next.js](https://nextjs.org/) for deployment on [Vercel](https://vercel.com/). It uses Incremental Static Regeneration (ISR) to cache and revalidate pages when content changes.

### Setup Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   Create a `.env.local` file in the project root:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id
   CONTENTFUL_ACCESS_TOKEN=your_access_token
   ```
   Replace with your Contentful credentials.

3. **Contentful Client**
   The file `lib/contentful.ts` provides a reusable client and fetch function:
   ```ts
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
   ```

4. **Example Usage in a Page**
   See `app/blog/page.tsx` for an example of fetching and rendering blog posts:
   ```tsx
   import { getEntries } from '@/lib/contentful';
   export default async function BlogPage() {
     const posts = await getEntries('blogPost');
     return (
       <main>
         <h1>Blog</h1>
         <ul>
           {posts.map((post: any) => (
             <li key={post.sys.id}>{post.fields.title}</li>
           ))}
         </ul>
       </main>
     );
   }
   ```
   - Replace `'blogPost'` with your Contentful content type ID.

5. **Deployment & ISR**
   - Deploy to Vercel for automatic ISR support.
   - Pages are statically generated and revalidated on demand, reducing API calls.
   - To trigger revalidation when content changes, set up a webhook in Contentful to call Vercel's [On-Demand Revalidation API](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#on-demand-revalidation).

## Security
- API keys are only used server-side and are not exposed to the browser.
- Do not fetch Contentful data on the client side.

## Useful Links
- [Next.js ISR Docs](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Contentful Docs](https://www.contentful.com/developers/docs/)
- [Vercel Docs](https://vercel.com/docs)
