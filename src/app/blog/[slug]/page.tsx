import { getPostData } from "@/lib/queries/wordpress";
import PostTemplate from "@/components/templates/PostTemplate";
import { getAllPostSlugs } from "@/lib/queries/blog";
import { notFound } from "next/navigation";


export default async function SinglePost({ params }: any) {
    const { slug } = params;
    const pageData = await getPostData(slug);

    // Return 404 if no data is found
    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

// Pre-render the first 50 posts
export async function generateStaticParams() {
    const posts = await getAllPostSlugs();
    const batchSize = 50;
    return posts.slice(0, batchSize).map((post) => ({
        slug: post.slug,
    }));
}

// Enable ISR
export const revalidate = 60;

// Force static generation and ISR
export const dynamic = "force-static";
