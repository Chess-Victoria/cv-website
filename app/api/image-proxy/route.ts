import { NextRequest, NextResponse } from 'next/server';

function isHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    if (!url || !isHttpUrl(url)) {
      return NextResponse.json({ error: 'Invalid url' }, { status: 400 });
    }

    const target = new URL(url);

    // Fetch the remote resource server-side
    const upstream = await fetch(target.toString(), {
      // Pass minimal headers; some hosts require a UA or referer
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ChessVictoriaBot/1.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36',
        'Referer': `${target.origin}/`,
        'Accept': '*/*',
      },
      // Cache per Next runtime; browsers/CDN will also cache via headers below
      next: {
        revalidate: parseInt(
          process.env.REVALIDATE_IMAGE_PROXY ||
            (process.env.NODE_ENV === 'development' ? '10' : '31536000')
        ),
      },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
    }

    // Forward content type and length when available
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const contentLength = upstream.headers.get('content-length');

    const isDev = process.env.NODE_ENV === 'development';
    const oneYearSeconds = 31536000;
    const cacheSeconds = isDev ? 10 : oneYearSeconds;
    const staleSeconds = isDev ? 60 : oneYearSeconds;

    const res = new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
        // Cache aggressively on CDN/browser in production; short in development
        'Cache-Control': `public, max-age=${cacheSeconds}, s-maxage=${cacheSeconds}, stale-while-revalidate=${staleSeconds}, immutable`,
      },
    });
    return res;
  } catch (err) {
    console.error('Image proxy error:', err);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}


