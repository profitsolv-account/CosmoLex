import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildWithFormTemplate from "@/components/templates/pillar/PillarChildWithFormTemplate";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features/law-firm-website-builder'
    switch (lang) {
        case 'uk':
            slug = 'features-3/law-firm-website-builder';
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
        const testimonials = await getTestimonialsList('law-firm-website-builder');
        const features = await getPageFeaturesData('features');
        return <PillarChildWithFormTemplate
            pageData={{
                ...pageData,
                testimonials,
                footerExtendedBg: true,
                features
            }}
            formId='02586e92-0cc0-43b6-a937-7a42c176de06'
            routerName='cosmolex-websites'
        />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = 'force-dynamic';