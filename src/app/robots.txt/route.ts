import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const path = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com';
    const wpRobots = `${path}/robots.txt`;
    try {
        const res = await fetch(wpRobots);
        if (!res.ok) throw new Error(`Failed to fetch robots.txt: ${res.status}`);

        const robots = await res.text();

        return new Response(robots, {
            headers: {
                'Content-Type': 'text/plain',
                'Cache-Control': 's-maxage=3600, stale-while-revalidate',
            },
        });
    } catch (err) {
        console.error('Robots.txt fetch error:', err);
        return new Response('Robots.txt not found', { status: 404 });
    }
}
