import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

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

        if (path.includes('redirects')) {
            revalidateTag('redirects');
            console.log('Cleared redirects cache');
            return NextResponse.json({ revalidated: true, path });
        }

        if (path.includes('home') || path === '/') {
            revalidateTag('home');
            return NextResponse.json({revalidated: true, path});
        } else if (path.includes('blog')) {
            revalidateTag('blog');
        } else if (path.includes('resource-hub') || path.includes('webinars')) {
            revalidateTag('resources');
        }

        revalidateTag(path);
        revalidateTag(path.replace(/^\/+|\/+$/g, ''));
        revalidatePath(path);

        return NextResponse.json({revalidated: true, path});

    } catch (err: any) {
        console.error('Revalidate error:', err);
        return NextResponse.json({ message: 'Error revalidating', error: err.message }, { status: 500 });
    }
}
