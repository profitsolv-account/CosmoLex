import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import {isProduction} from "@/helpers";


const REVALIDATE_SECRET = 'rev-token-122';
const baseUrl = process.env.WORDPRESS_API_URL || 'https://cosmonew1.wpenginepowered.com/';


const getPagePath = (url: string) => {
    return new URL(url, baseUrl).pathname.replace(/\/$/, '') || '/';
};

const reloadPage = async (url: string) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'User-Agent': 'Revalidate-Agent',
        },
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
    }
}

export async function POST(req: Request) {

    const NEXT_PUBLIC_SITE_URL = isProduction() ?
        'https://www.cosmolex.com/' :
        'https://cosmolex-staging.vercel.app/';

    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('secret');
        if (token !== REVALIDATE_SECRET) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const path = getPagePath(body.post_url);

        if (path.includes('home') || path === '/') {
            revalidateTag('home');
            console.log('Home revalidated');
            await reloadPage(`${NEXT_PUBLIC_SITE_URL}/`);
            return NextResponse.json({revalidated: true, path});
        } else if (path.includes('resource-hub') || path.includes('webinars')) {
            revalidateTag('resources');
        }

        revalidateTag(path);
        revalidateTag(path.replace(/^\/+|\/+$/g, ''));
        revalidatePath(path);

        await reloadPage(`${NEXT_PUBLIC_SITE_URL}/${path}`);
        return NextResponse.json({revalidated: true, path});

    } catch (err: any) {
        console.error('Revalidate error:', err);
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
