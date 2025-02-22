import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: any) {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
        return NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    try {
        revalidatePath(`/blog/${slug}`);
        revalidatePath(`/blog`);
        revalidatePath(`/blog/page/[page]`);
        revalidatePath(`/`);
        return NextResponse.json({ revalidated: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}