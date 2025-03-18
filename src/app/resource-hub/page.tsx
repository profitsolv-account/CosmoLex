import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getResourcesData} from "@/lib/queries/resources";
import ResourceHubTemplate from "@/components/templates/ResourceHubTemplate";

const slug = 'resource-hub';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage() {
    const resources = await getResourcesData();

    const pageData = await getPageData(slug);
    return <ResourceHubTemplate pageData={{
        ...pageData,
        footerExtendedBg: false,
        resources
    }} />
}

export const revalidate = false;
export const dynamic = "force-static";


