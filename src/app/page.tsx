import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import HomePage from "@/components/templates/HomePage";
import { getHomePageData} from "@/lib/queries/wordpress";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData("home-page");
}

export default async function Home() {
    const pageData = await getHomePageData();
    return <HomePage pageData={{
        ...pageData,
        footerExtendedBg: false,
    }} />
}

export const revalidate = false;
export const dynamic = "force-static";



