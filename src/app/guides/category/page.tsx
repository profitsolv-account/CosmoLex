import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getBlogData} from "@/lib/queries/blog";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";
import GuidesBlogTemplate from "@/components/templates/GuidesBlogTemplate";

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
    if (!pageData) {
        notFound();
    }
    return <GuidesBlogTemplate pageData={pageData} page={1} />
}

export const revalidate = false;
export const dynamic = "force-static";