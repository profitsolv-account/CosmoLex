import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";

type Params = {
    params: Promise<{slug: string}>;
}

const slug = 'canada-cheques';

export async function generateMetadata({params}: Params): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const pageData = await getPageData(slug);
         if (!pageData) {
              notFound();
         }
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
