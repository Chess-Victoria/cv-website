import { NextResponse } from 'next/server';
import { getSiteConfiguration, SiteConfiguration } from '@/lib/site-config';

// Server-side API route for site configuration
export async function GET() {
  try {
    // Simple in-memory cache (can be replaced with Redis, etc.)
    type SiteConfigCache = {
      data: SiteConfiguration | null;
      timestamp: number;
    };
    if (!(globalThis as any)._siteConfigCache) {
      (globalThis as any)._siteConfigCache = {
        data: null,
        timestamp: 0,
      } as SiteConfigCache;
    }
    const CACHE_TTL = 60 * 5 * 1000; // 5 minutes
    const now = Date.now();
    const cache = (globalThis as any)._siteConfigCache as SiteConfigCache;
    const config = await getSiteConfiguration();
    // Only include keys with non-empty string values
    const filtered: SiteConfiguration = Object.fromEntries(
      Object.entries(config).filter(([_, v]) => !(typeof v === 'string' && v.trim() === ''))
    ) as SiteConfiguration;
    cache.data = filtered;
    cache.timestamp = now;
    return NextResponse.json(filtered);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to load site configuration' }, { status: 500 });
  }
}
