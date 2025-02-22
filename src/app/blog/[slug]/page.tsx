import { getPostData } from "@/lib/queries/wordpress";
import PostTemplate from "@/components/templates/PostTemplate";
import { getAllPostSlugs } from "@/lib/queries/blog";
import { notFound } from "next/navigation";

export default async function SinglePost({ params }: any) {
    const { slug } = params;
    const pageData = await getPostData(slug);

    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

export async function generateStaticParams() {
    const posts = await getAllPostSlugs();
    posts.length = 10;

    return posts
}

// Enable ISR
export const revalidate = false;

export const dynamic = "force-static";
