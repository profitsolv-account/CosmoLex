import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildTemplate from "@/components/templates/pillar/PillarChildTemplate";

const slug = "billing-invoicing";

export async function generateMetadata(): Promise<Metadata> {

    return await getSEOData(slug);
}
export default async function PillarPage() {
    try {
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList(slug);
        return <PillarChildTemplate pageData={{
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