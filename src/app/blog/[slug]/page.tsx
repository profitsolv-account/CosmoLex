import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getAllPostSlugs} from "@/lib/queries/blog";

import fs from 'fs';
import path from 'path';

export default async function SinglePost({ params }: any) {
    const { slug } = await params;
   // const pageData = await getPostData(slug);

    const filePath = path.join(process.cwd(), 'cache', 'posts.json');
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    const pageData = posts.find((post: any) => post.slug === slug) || {};

    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

export async function generateStaticParams() {
    const postsSlugs = await getAllPostSlugs();
    //postsSlugs.length = 10;
    return postsSlugs;
}

export const revalidate = false;
export const dynamic = "force-static";
export const fetchCache = "force-cache";

/*
export const dynamic = "force-static";    // Keep it static
export const dynamicParams = true;        // Allow dynamic params
export const fetchCache = "default-cache"; // Enable default caching*/
