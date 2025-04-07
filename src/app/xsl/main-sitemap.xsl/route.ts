import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const path = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com';
    const wpXslUrl = `${path}/wp-content/plugins/wordpress-seo/css/main-sitemap.xsl`;
    try {
        const res = await fetch(wpXslUrl);
        if (!res.ok) throw new Error(`Failed to fetch XSL: ${res.status}`);

        const xsl = await res.text();

        return new Response(xsl, {
            headers: {
                'Content-Type': 'application/xslt+xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (err) {
        console.error('XSL fetch error:', err);
        return new Response('XSL not found', { status: 404 });
    }
}
