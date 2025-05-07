import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {getBlogPageData, getPosts} from "@/lib/queries/blog";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    const {title} = await generalSettings();
    return {
        title: `${title} Blog | ${title}`,
        description: '',
        keywords: '',
    }

    return await getSEOData('page');
}

export default async function BlogPage() {
    const pageData = await getBlogPageData();
    const postsData = await getPosts();

    if (!pageData) {
        return notFound();
    }
    return <BlogTemplate pageData={{
            ...pageData,
            footerExtendedBg: true
        }}
        page={1}
        postsData={postsData}
    />
}

export const revalidate = false;
export const dynamic = "force-static";