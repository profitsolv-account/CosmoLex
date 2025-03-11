import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareChildTemplate from "@/components/templates/CompareChildTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;

    return await getSEOData(slug);
}

export default async function PillarPage({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();

        return <CompareChildTemplate pageData={{
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