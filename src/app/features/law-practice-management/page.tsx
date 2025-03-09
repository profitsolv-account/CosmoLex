import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarParentTemplate from "@/components/templates/PillarParrentTemplate";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('law-practice-management');
}

export default async function PillarPage() {
    try {
        const pageData = await getPageData("law-practice-management");
        const testimonials = await getTestimonialsList();
        return <PillarParentTemplate pageData={{
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