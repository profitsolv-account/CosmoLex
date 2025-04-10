import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";


type Params = {
    params: Promise<{slug: string}>;
}

const getSlug = async (defaultSlug: string) => {
    return defaultSlug;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    const newSlug = await getSlug(slug);
    return await getSEOData(newSlug);
}

export default async function SinglePage({params}: Params) {
   try {
       const {slug} = await params;
       const newSlug = await getSlug(slug);

       const pageData = await getPageData(newSlug);
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = 60; // revalidate every 60 seconds

