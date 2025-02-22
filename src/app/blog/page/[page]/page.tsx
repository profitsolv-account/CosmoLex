import {getBlogData} from "@/lib/queries/blog";
import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";

type Params = {
    params: Promise<{ page: string }>
};

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('home-page');
}

export default async function BlogSinglePage({ params }: Params) {
    const {page} = await params;
    const pageData = await getBlogData(+page);
    return <BlogTemplate pageData={pageData} page={+page} />
}

export async function generateStaticParams() {
    const TOTAL_PAGES = 1;
    return new Array(TOTAL_PAGES).fill('').map((_, index) => ({page: String(index)}));
}

export const revalidate = false;
export const dynamic = "force-static";    // Keep it static
//export const dynamicParams = true;        // Allow dynamic params
export const fetchCache = "default-cache"; // Enable default caching