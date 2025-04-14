import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getResourcesData} from "@/lib/queries/resources";
import ResourceHubTemplate from "@/components/templates/ResourceHubTemplate";
import {notFound} from "next/navigation";

const slug = 'resource-hub';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ResourceHubPage() {
  try {
      const resources = await getResourcesData();

      const pageData = await getPageData(slug);
      if (!pageData) {
          notFound();
      }
      return <ResourceHubTemplate pageData={{
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


