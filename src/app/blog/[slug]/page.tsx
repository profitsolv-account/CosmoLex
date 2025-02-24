import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getAllPostSlugs} from "@/lib/queries/blog";

import fs from 'fs';
import path from 'path';

export default async function SinglePost({ params }: any) {
    const { slug } = await params;

    const filePath = path.join(process.cwd(), 'cache', 'posts.json');
    const posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const pageData = posts.find((post: any) => post.slug === slug) || {};

    if (!pageData) {
        notFound();
    }
    return <PostTemplate pageData={pageData} />;
}

export async function generateStaticParams() {
    const urls = await getAllPostSlugs();
    urls.length = 5;
    return urls;
}

export const revalidate = false;
export const dynamic = "force-static";
// export const fetchCache = "default-cache";
