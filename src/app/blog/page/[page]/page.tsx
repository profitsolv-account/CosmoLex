import {getBlogData} from "@/lib/queries/blog";
import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import BlogTemplate from "@/components/templates/BlogTemplate";
import {generalSettings} from "@/lib/queries/settings";
import {notFound} from "next/navigation";

type Params = {
    params: Promise<{ page: string }>
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const {page} = await params;
    const {title} = await generalSettings();
    return {
        title: `${title} Blog | ${title} - Page ${page}`,
        description: '',
        keywords: '',
    }
    return await getSEOData('page');
}


export default async function BlogSinglePage({ params }: Params) {
   try {
       const {page} = await params;
       const pageData = await getBlogData(+page);
       if (!pageData) {
           notFound();
       }
       return <BlogTemplate pageData={pageData} page={+page} />
   } catch(error) {
       notFound();
   }
}

/*
export async function generateStaticParams() {
    const TOTAL_PAGES = 5;
    return new Array(TOTAL_PAGES).fill('').map((_, index) => ({page: String(index+1)}));
}*/

export const revalidate = false;
export const dynamic = "force-static";