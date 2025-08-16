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
    if (!cache.data || now - cache.timestamp > CACHE_TTL) {
      const config = await getSiteConfiguration();
      cache.data = config;
      cache.timestamp = now;
    }
    return NextResponse.json(cache.data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Failed to load site configuration' }, { status: 500 });
  }
}
