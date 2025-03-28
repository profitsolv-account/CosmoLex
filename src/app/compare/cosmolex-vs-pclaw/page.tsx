import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPricingPlans} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareChildTemplate from "@/components/templates/CompareChildTemplate";
import {getCompareChildPageData, getFeatureData} from "@/lib/queries/compare";
import {getLanguage} from "@/lib/helpers";

export async function generateMetadata(): Promise<Metadata> {
    const lang = await getLanguage();
    let slug = 'compare/cosmolex-vs-clio'
    switch (lang) {
        case 'ca':
            slug = 'compare-2/cosmolex-vs-clio';
            break;
    }

    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const lang = await getLanguage();
        let slug = 'compare/cosmolex-vs-clio'
        switch (lang) {
            case 'ca':
                slug = 'compare-2/cosmolex-vs-clio';
                break;
        }

        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const compareSection = await getCompareChildPageData(slug);
        const features = await getFeatureData('cosmolex-vs-pclaw');
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
export const dynamic = 'force-dynamic';