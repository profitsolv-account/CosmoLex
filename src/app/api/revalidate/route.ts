import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import client from "@/lib/apollo-client";

const REVALIDATE_SECRET = 'rev-token-122';
const baseUrl = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com/';

const getPagePath = (url: string) => {
    return new URL(url, baseUrl).pathname.replace(/\/$/, '') || '/';
};

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('secret');
        if (token !== REVALIDATE_SECRET) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const path = getPagePath(body.post_url);

        console.log('Revalidating path:', path);

        // Optional: clear Apollo client cache
        revalidateTag('graphql');
        await client.clearStore();
        await client.refetchQueries({ include: 'all' });

        // Trigger revalidation
        await revalidatePath(path);
        console.log('Marked for revalidation');

        // Trigger generation
        const triggerRes = await fetch(`https://cosmolex-staging.vercel.app${path}`, {
            headers: { 'x-revalidate-trigger': '1' },
            cache: 'no-store',
        });

        const xCache = triggerRes.headers.get('x-vercel-cache');

        console.log(`Triggered fetch with cache: ${xCache}`);

        return NextResponse.json({
            revalidated: true,
            path,
            xCache,
            status: triggerRes.status,
        });

    } catch (err: any) {
        console.error('Revalidate error:', err);
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
