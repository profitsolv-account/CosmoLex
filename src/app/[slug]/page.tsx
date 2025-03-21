import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const {slug} = await params;
       const pageData = await getPageData(slug);
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
