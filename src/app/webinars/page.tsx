import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getWebinarsData} from "@/lib/queries/resources";
import WebinarsTemplate from "@/components/templates/WebinarsTemplate";

const slug = 'resource-hub';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage() {
    const resources = await getWebinarsData();
    const pageData = await getPageData(slug);
    return <WebinarsTemplate pageData={{
        ...pageData,
        footerExtendedBg: false,
        resources
    }} />
}

export const revalidate = false;
export const dynamic = "force-static";


