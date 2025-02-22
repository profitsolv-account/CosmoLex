import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import {getUniversalCacheTag} from "@/lib/cache";

export async function POST(request: any) {
    const body = await request.json();
    const { slug } = body;

    if (!slug) {
        return NextResponse.json({ message: 'No slug provided' }, { status: 400 });
    }

    try {
        revalidateTag(getUniversalCacheTag());
        return NextResponse.json({ revalidated: true, message: 'All cache cleared' });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}