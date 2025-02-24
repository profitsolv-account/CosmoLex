import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {getBlogData} from "@/lib/queries/blog";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(slug || 'home-page');
}

export default async function BlogPage() {
    const pageData = await getBlogData(1);
    return <BlogTemplate pageData={pageData} page={1} />
}

export const revalidate = false;
export const dynamic = "force-static";
export const fetchCache = "default-cache";