import { NextRequest } from 'next/server';

export async function GET(
    req: NextRequest,
    context: any
) {
    const slugPath = context.params.slug.join('/');

    if (!slugPath.endsWith('.xml')) {
        return new Response('Invalid sitemap path', { status: 404 });
    }

    const wpUrl = `https://cosmonew1.wpenginepowered.com/${slugPath}`;
    const currentDomain = req.nextUrl.origin;

    try {
        const wpRes = await fetch(wpUrl);
        if (!wpRes.ok) throw new Error(`Fetch failed: ${wpRes.status}`);

        let xml = await wpRes.text();

        xml = xml.replace(/<\?xml-stylesheet.*?\?>/, '');

        xml = xml.replace(
            /<loc>https:\/\/cosmonew1\.wpenginepowered\.com\/(.*?)<\/loc>/g,
            (_match, path) => `<loc>${currentDomain}/${path}</loc>`
        );

        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (err) {
        console.error('Sitemap proxy error:', err);
        return new Response('Failed to load sitemap', { status: 404 });
    }
}
