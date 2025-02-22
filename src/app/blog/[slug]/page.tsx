import { getPostData } from "@/lib/queries/wordpress";
import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";
import {getAllPostSlugs} from "@/lib/queries/blog";

export default async function SinglePost({ params }: any) {
    const { slug } = await params;
    const pageData = await getPostData(slug);

    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

export async function generateStaticParams() {
   /* const postsSlugs = await getAllPostSlugs();
    postsSlugs.length = 10;*/
    return [];
}

export const revalidate = false;
export const dynamic = "auto";
export const fetchCache = "force-cache";

/*
export const dynamic = "force-static";    // Keep it static
export const dynamicParams = true;        // Allow dynamic params
export const fetchCache = "default-cache"; // Enable default caching*/
