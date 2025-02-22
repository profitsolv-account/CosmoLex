import { getPostData } from "@/lib/queries/wordpress";
import PostTemplate from "@/components/templates/PostTemplate";
import { notFound } from "next/navigation";

export default async function SinglePost({ params }: any) {
    const { slug } = await params;
    const pageData = await getPostData(slug);

    if (!pageData) {
        notFound();
    }

    return <PostTemplate pageData={pageData} />;
}

/*export async function generateStaticParams() {
    return []
}*/

export const revalidate = false;
export const dynamic = "force-static";    // Keep it static
export const dynamicParams = true;        // Allow dynamic params
export const fetchCache = "default-cache"; // Enable default caching