import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PageTemplate from "@/components/templates/PageTemplate";
import {notFound} from "next/navigation";
import {HappyCustomersTemplate} from "@/components/templates/HappyCustomersTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

const slug = 'happy-customers';

export async function generateMetadata({params}: Params): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage({params}: Params) {
   try {
       const pageData = await getPageData(slug);
       return <HappyCustomersTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
