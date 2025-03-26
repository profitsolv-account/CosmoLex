import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {notFound} from "next/navigation";
import {LoginBannerTemplate} from "@/components/templates/LoginBannerTemplate";
import './styles.css';

const slug= 'login-banner';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug || 'home-page');
}

export default async function SinglePage() {
   try {
       const pageData = await getPageData(slug);
       return <LoginBannerTemplate pageData={pageData} />
   } catch (error) {
       notFound();
   }
}

export const revalidate = false;
export const dynamic = "force-static";
