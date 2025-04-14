import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import PartnersStrategicPageTemplate from "@/components/templates/PartnersStrategicPageTemplate";
import {getAffinityBarlogos} from "@/lib/queries/affinity-bar-partners";
import {notFound} from "next/navigation";

const slug = '/partners/strategic';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function AffinityBarPartnersPage() {
    try {
        const pageData = await getPageData(slug);
        if (!pageData) {
            notFound();
        }
       const affinityBarLogos = await getAffinityBarlogos();
       return <PartnersStrategicPageTemplate pageData={{
            ...pageData,
            partnerLogos: affinityBarLogos,
        }} />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";