import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import DemoPageTemplate from "@/components/templates/DemoPageTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {getLeadersLogos} from "@/lib/queries/logos";
import {notFound} from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('demo');
}

export default async function DemoPage() {
    try {
        const pageData = await getPageData("demo");
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();
        const logos = await getLeadersLogos();

        return <DemoPageTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            leaderLogos: logos
        }} />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";