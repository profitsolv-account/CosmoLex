import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareParentTemplate from "@/components/templates/CompareParrentTemplate";
import {getComparePageData} from "@/lib/queries/compare";

const pageSlug = "compare";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}

export default async function ComparePage() {
    try {
        const pageData = await getPageData(pageSlug);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();
        const compareSelector = await getComparePageData();

        return <CompareParentTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            compareSelector
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";