import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";

export const dynamic = 'force-dynamic';

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

       const invalidStaticPaths = ['.php'];

       const {slug} = await params;
       const newSlug = await getSlug(slug);
       if (invalidStaticPaths.some(ext => slug.endsWith(ext))) {
           notFound();
       }
       const pageData = await getPageData(newSlug);
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}



