import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import IntegrationsTemplate from "@/components/templates/pillar/IntegrationsTemplate";

const pageSlug = 'integrations'

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}

export default async function PillarPage() {
    try {
        const pageData = await getPageData(pageSlug);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();
        return <IntegrationsTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";