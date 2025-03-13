import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPricingPlans} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PricingPageTemplate from "@/components/templates/PricingPageTemplate";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData('pricing');
}

export default async function PricingPage() {
    try {
        const pageData = await getPageData("pricing");
        const testimonials = await getTestimonialsList();
        const pricingPlans = await getPricingPlans('pricing');
        return <PricingPageTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            pricingPlans
        }} />
    } catch (error) {
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";