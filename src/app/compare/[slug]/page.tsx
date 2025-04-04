import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPricingPlans} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareChildTemplate from "@/components/templates/CompareChildTemplate";
import {getCompareChildPageData, getFeatureData} from "@/lib/queries/compare";

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;

    return await getSEOData(`/compare/${slug}`);
}

export default async function PillarPage({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(`/compare/${slug}`);
        const testimonials = await getTestimonialsList();
        const compareSection = await getCompareChildPageData(`/compare/${slug}`);
        const features = await getFeatureData('/comapre/cosmolex-vs-pclaw/');
        const pricingPlans = await getPricingPlans('pricing');
        return <CompareChildTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            compareSection,
            features,
            pricingPlans
        }} />

    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";