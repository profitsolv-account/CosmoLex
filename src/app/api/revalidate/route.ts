import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

const baseUrl = process.env.BASE_URL || 'https://cosmonew1.wpenginepowered.com/';
const getPagePath = (url: string) => {
    return new URL(url, baseUrl).pathname;
}

export async function POST(req: Request) {
    try {


        const body = await req.json();
        console.log(body);
        console.log(getPagePath(body.post_url));

        const url = getPagePath(body.post_url);
        if (url.includes("accounting-finance")) {
            revalidatePath('/feature/accounting-finance', "layout");
            return NextResponse.json({ revalidated: true});
        }
        revalidatePath(getPagePath(body.post_url));
        return NextResponse.json({ revalidated: true});

      /*  if (body.post_type === 'page') {
            revalidatePath(getPagePath(body.post_url), "page");
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
*/

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
    }
}