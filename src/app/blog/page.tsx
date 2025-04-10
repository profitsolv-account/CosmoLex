import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {getBlogData} from "@/lib/queries/blog";
import {generalSettings} from "@/lib/queries/settings";

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
    const pageData = await getBlogData(1);
    return <BlogTemplate pageData={pageData} page={1} />
}