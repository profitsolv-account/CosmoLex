import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import {getLanguage} from "@/lib/helpers";
import OnlinePaymentsTemplate from "@/components/templates/pillar/OnlinePaymentsTemplate";

export const dynamic = 'force-dynamic';

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = '/features/online-payments-1'
    switch (lang) {
        case 'ca':
            slug = '/features-2/online-payments';
            break;
    }
    return slug;
}

export async function generateMetadata(): Promise<Metadata> {
    const slug = await getSlug();
    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const slug = await getSlug();
        const pageData = await getPageData(slug);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList('online-payments');
        const features = await getPageFeaturesData('features');
        return <OnlinePaymentsTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            features,
        }}
            formId="78ca8e05-3721-4d8d-9812-bb6cd71dc1f5"
            routerName="cosmolex-crm"
        />
    } catch (error) {
        console.error(error);
        notFound();
    }
}