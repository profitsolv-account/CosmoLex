import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import "./wordpress-blocks.css";
import {getLanguage} from "@/lib/helpers";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata(): Promise<Metadata> {
    const lang = await getLanguage();
    let slug = 'privacy-policy'
    switch (lang) {
        case 'ca':
            slug = 'privacy-policy-2';
            break;
    }

    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage() {
   try {
       const lang = await getLanguage();
       let slug = 'privacy-policy'
       switch (lang) {
           case 'ca':
               slug = 'privacy-policy-2';
               break;
       }
       const pageData = await getPageData(slug);
       return <PageTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = 36000; // 10 hours
