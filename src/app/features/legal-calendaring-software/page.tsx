import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CalendarTasksTemplate from "@/components/templates/pillar/CalendarTasksTemplate";

const pageSlug = '/features/legal-calendaring-software'

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
        const features = await getPageFeaturesData('features');
        return <CalendarTasksTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            features
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";