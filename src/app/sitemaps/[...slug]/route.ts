import { NextRequest } from 'next/server';

export async function GET(
    req: NextRequest,
    context: any, // Adjust the type as needed
) {
    const slugPath = context.params.slug.join('/');
    const wpUrl = `https://cosmonew1.wpenginepowered.com/${slugPath}`;

    const currentDomain = req.nextUrl.origin;

    try {
        const wpRes = await fetch(wpUrl);
        if (!wpRes.ok) throw new Error(`Fetch failed: ${wpRes.status}`);

        let xml = await wpRes.text();

        // Optional: remove XSL line
        xml = xml.replace(/<\?xml-stylesheet.*?\?>/, '');

        // Replace all <loc> links to point to your own domain
        xml = xml.replace(/<loc>https:\/\/cosmonew1\.wpenginepowered\.com\/(.*?)<\/loc>/g, (_match, path) => {
            return `<loc>${currentDomain}/sitemaps/${path}</loc>`;
        });

        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (err) {
        console.error('Sitemap fetch error:', err);
        return new Response('Not found', { status: 404 });
    }
}
