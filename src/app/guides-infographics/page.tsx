import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getResourcesUnionData} from "@/lib/queries/resources";
import {notFound} from "next/navigation";
import GuidesInfographicsTemplate from "@/components/templates/GuidesInfographicsTemplate";

const slug = 'resource-hub';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage(data: {searchParams: Promise<{s: string}>}) {
    try {
        const {s} = await data.searchParams;
        const search = s || '';

        const resources = await getResourcesUnionData(null, 15, search);
        const pageData = await getPageData(slug);

        if (!pageData) {
            notFound();
        }

        return <GuidesInfographicsTemplate
            pageData={{
                ...pageData,
                footerExtendedBg: true,
            }}
            postsData={resources}
        />
    } catch(e: any) {
        notFound();
    }
}

export const revalidate = false;


