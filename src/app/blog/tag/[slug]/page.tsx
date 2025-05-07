import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {getBlogPageData, getCategoryIdBySlug, getPosts, getTagIdBySlug} from "@/lib/queries/blog";
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

export default async function BlogPage(data: {searchParams: Promise<{s: string}>, params: Promise<{slug: string}>}) {
    const pageData = await getBlogPageData();

    const {slug} = await data.params;
    const {s} = await data.searchParams;
    const search = s || '';

    const tag = await getTagIdBySlug(slug) || 0;

    const postsData = await getPosts(null, 15, search, [], [tag.id]);

    if (!pageData) {
        return notFound();
    }
    return <BlogTemplate pageData={{
            ...pageData,
            footerExtendedBg: true
        }}
        page={1}
        postsData={postsData}
        searchParams={{
            tagName: tag.name,
            tag: tag.id,
            s
        }}
    />
}

export const revalidate = false;
