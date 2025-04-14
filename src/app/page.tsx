import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import HomePage from "@/components/templates/HomePage";
import { getHomePageData} from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData("home-page");
}

export default async function Home() {
   try {
       const pageData = await getHomePageData();
       if (!pageData) {
           return notFound();
       }
       return <HomePage pageData={{
           ...pageData,
           footerExtendedBg: false,
       }} />
   } catch(e: any) {
         notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";



