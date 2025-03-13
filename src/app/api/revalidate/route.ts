import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {

        const body = await req.json(); // Parse JSON body
        //console.log('Received data:', body);
        if (body.post_type === 'page') {
            revalidatePath(`/${body.slug}`, "page");
            return NextResponse.json({ revalidated: true});
        } else {
            //TODO:Rewrite to handle real revalidation
            revalidatePath(`/blog/[slug]`, "page");
            revalidatePath(`/blog`);
            revalidatePath(`/blog/page/[page]`, "page");
            revalidatePath(`/[slug]`, "page");
            revalidatePath(`/`);
            revalidatePath(`/pricing`);
            revalidatePath(`/features/[page]`, "page");
            revalidatePath(`/[page]`, "page");
            return NextResponse.json({ revalidated: true, body});
        }


    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}