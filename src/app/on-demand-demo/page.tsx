import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";
import {getLanguage} from "@/lib/helpers";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
    const lang = await getLanguage();
    let slug = 'on-demand-demo'
    switch (lang) {
        case 'ca':
            slug = 'on-demand-demo-2';
            break;
    }

    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage() {
   try {
       const lang = await getLanguage();
       let slug = 'on-demand-demo'
       switch (lang) {
           case 'ca':
               slug = 'on-demand-demo-2';
               break;
       }
       const pageData = await getPageData(slug);
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}
