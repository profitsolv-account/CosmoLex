import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST() {
    try {
        //TODO:Rewrite to handle real revalidation
        revalidatePath(`/blog/[slug]`, "page");
        revalidatePath(`/blog`);
        revalidatePath(`/blog/page/[page]`, "page");
        revalidatePath(`/[slug]`, "page");
        revalidatePath(`/`);
        revalidatePath(`/pricing`);
        revalidatePath(`/features/[page]`, "page");
        revalidatePath(`/[page]`, "page");
        return NextResponse.json({ revalidated: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}