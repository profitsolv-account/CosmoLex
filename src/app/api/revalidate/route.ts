import { NextResponse } from 'next/server';
import {revalidatePath, revalidateTag} from 'next/cache';
import client from "@/lib/apollo-client";

const baseUrl = process.env.BASE_URL || 'https://cosmonew1.wpenginepowered.com/';
const getPagePath = (url: string) => {
    return new URL(url, baseUrl).pathname;
}

export async function POST(req: Request) {
    try {

        const body = await req.json();

        revalidatePath(getPagePath(body.post_url), 'page');
        revalidatePath(getPagePath(body.post_url));
        revalidatePath(`/compare/`, "layout");
        revalidatePath(`/features/[slug]`, "page");
        revalidatePath(`/features/`, "layout");
        revalidatePath(`/`, "layout");
        revalidateTag('graphql');

        await client.clearStore();
        await client.refetchQueries({ include: "all" });


        return NextResponse.json({ revalidated: true});


    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}