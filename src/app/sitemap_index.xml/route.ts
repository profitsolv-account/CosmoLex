import {NextResponse} from "next/server";

export async function GET() {

    const wordpressSitemapUrl = 'https://cosmonew1.wpenginepowered.com/sitemap_index.xml';

    try {
        const response = await fetch(wordpressSitemapUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch sitemap: ${response.status}`);
        }

        const xml = await response.text();
        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate', // Optional: CDN cache
            },
        });
    } catch (error) {
        console.error(error);
        return new Response('Failed to fetch sitemap', { status: 500 });
    }
}
