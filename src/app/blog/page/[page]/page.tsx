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
    return <BlogTemplate pageData={pageData} />
}


export async function generateStaticParams() {
    //Update hardcoded count of posts
    const TOTAL_PAGES = 2;
    return new Array(TOTAL_PAGES).fill('').map((_, index) => ({page: String(index)}));
}

