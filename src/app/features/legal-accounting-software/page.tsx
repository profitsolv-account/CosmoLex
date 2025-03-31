import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildTemplate from "@/components/templates/pillar/PillarChildTemplate";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features/legal-accounting-software'
    switch (lang) {

        case 'uk':
            slug = '/en-gb/features-3/legal-accounting-software';
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
export const dynamic = 'force-dynamic';
