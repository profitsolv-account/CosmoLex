import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPricingPlans} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareChildTemplate from "@/components/templates/CompareChildTemplate";
import {getCompareChildPageData, getFeatureData} from "@/lib/queries/compare";
import CompareChildRestTemplate from "@/components/templates/CompareChildRestTemplate";

const slug = "cosmolex-vs-esilaw";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const features = await getFeatureData('cosmolex-vs-pclaw');
        return <CompareChildRestTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            features,
        }} />

    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";