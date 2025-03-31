import { NextResponse } from 'next/server';
import {revalidatePath, revalidateTag} from 'next/cache';

const baseUrl = process.env.BASE_URL || 'https://cosmonew1.wpenginepowered.com/';
const getPagePath = (url: string) => {
    return new URL(url, baseUrl).pathname;
}

export async function POST(req: Request) {
    try {

        const body = await req.json();

        revalidatePath(getPagePath(body.post_url), 'page');
        revalidatePath(getPagePath(body.post_url));
        revalidatePath(`/compare/[slug]`, "page");
        revalidatePath(`/features/[slug]`, "page");

        revalidateTag('graphql');


        return NextResponse.json({ revalidated: true});


    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}