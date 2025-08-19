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
      // Cache per Next runtime; browsers will also cache via headers below
      next: { revalidate: parseInt(process.env.REVALIDATE_IMAGE_GALLERY || (process.env.NODE_ENV === 'development' ? '10' : '86400')) },
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.json({ error: 'Upstream fetch failed' }, { status: 502 });
    }

    // Forward content type and length when available
    const contentType = upstream.headers.get('content-type') || 'application/octet-stream';
    const contentLength = upstream.headers.get('content-length');

    const res = new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        ...(contentLength ? { 'Content-Length': contentLength } : {}),
        // Cache on CDN/browser; adjust as needed
        'Cache-Control': `public, max-age=${process.env.NODE_ENV === 'development' ? '10' : '86400'}, s-maxage=${process.env.NODE_ENV === 'development' ? '10' : '86400'}, stale-while-revalidate=${process.env.NODE_ENV === 'development' ? '60' : '604800'}`,
      },
    });
    return res;
  } catch (err) {
    console.error('Image proxy error:', err);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}


