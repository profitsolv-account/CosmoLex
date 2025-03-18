import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getKBData, getResourcesData} from "@/lib/queries/resources";
import ResourceHubTemplate from "@/components/templates/ResourceHubTemplate";
import GuidesTemplate from "@/components/templates/GuidesTemplate";

const slug = 'guides';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage() {
    const knowledgeBaseCategories = await getKBData();
    const pageData = await getPageData(slug);

    return <GuidesTemplate pageData={{
        ...pageData,
        knowledgeBaseCategories
    }} />
}

export const revalidate = false;
export const dynamic = "force-static";


