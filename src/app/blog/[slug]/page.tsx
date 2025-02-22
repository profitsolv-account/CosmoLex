import { getPostData } from "@/lib/queries/wordpress";
import PostTemplate from "@/components/templates/PostTemplate";
import { getAllPostSlugs } from "@/lib/queries/blog";
import { notFound } from "next/navigation";

type Params = {
    params: Promise<{slug: string}>;
}

export default async function SinglePost({params}: Params) {
    const {slug} = await params;
    const pageData = await getPostData(slug);

    // Return 404 if no data is found
    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

export async function generateStaticParams() {
    const posts = await getAllPostSlugs();
    const batchSize = 50;
    return posts.slice(0, batchSize).map((post) => ({
        slug: post.slug,
    }));
}

export const revalidate = 60;
