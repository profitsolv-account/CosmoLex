import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;

    return await getSEOData(`/practice-types/${slug}`);
}

export default async function PracticeTypesPage({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(`/practice-types/${slug}`);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(`/practice-types/${slug}`);

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