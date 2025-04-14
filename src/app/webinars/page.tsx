import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getWebinarsData} from "@/lib/queries/resources";
import WebinarsTemplate from "@/components/templates/WebinarsTemplate";
import {notFound} from "next/navigation";

const slug = 'webinars';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage() {
    try {
        const resources = await getWebinarsData();
        const pageData = await getPageData(slug);
        if (!pageData) {
            notFound();
        }
        return <WebinarsTemplate pageData={{
            ...pageData,
            footerExtendedBg: false,
            resources
        }} />
    } catch(e: any) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";


