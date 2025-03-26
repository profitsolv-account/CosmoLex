import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";

const pageSlug = "features";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}


export default async function FeaturesPage() {
    try {
        const pageData = await getPageData(pageSlug);
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(pageSlug);

        return <PracticeTypesTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            videoSection
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";