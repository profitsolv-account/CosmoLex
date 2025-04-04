export async function GET() {
    const wpUrl = 'https://cosmonew1.wpenginepowered.com/sitemap_index.xml';

    try {
        const response = await fetch(wpUrl);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

        let xml = await response.text();
        xml = xml.replace(/<\?xml-stylesheet.*?\?>/, ''); // remove XSL line to avoid CORS

        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (err) {
        console.error('Error loading root sitemap:', err);
        return new Response('Sitemap not available', { status: 500 });
    }
}
