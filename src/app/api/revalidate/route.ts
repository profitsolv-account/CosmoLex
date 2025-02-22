import { NextResponse } from 'next/server';
import {revalidatePath} from 'next/cache';


export async function POST() {
    try {
        await revalidatePath('/');
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath('/blog/page/[page]');
        revalidatePath('/blog/[slug]');
        return NextResponse.json({ revalidated: true, message: 'All cache cleared 2' });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}