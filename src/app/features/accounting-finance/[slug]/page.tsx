import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildTemplate from "@/components/templates/pillar/PillarChildTemplate";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(`/features/accounting-finance/${slug}`);
}

export default async function PillarPage({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(`/features/accounting-finance/${slug}`);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();
        const features = await getPageFeaturesData('features');
        return <PillarChildTemplate pageData={{
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