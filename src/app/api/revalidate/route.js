import { NextResponse } from 'next/server';

//const SECRET_TOKEN = process.env.REVALIDATE_SECRET;

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('secret');
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    try {
        await res.revalidate(`/blog/${slug}`);
        return NextResponse.json({ revalidated: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}
