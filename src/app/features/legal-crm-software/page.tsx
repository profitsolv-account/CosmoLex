import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildWithFormTemplate from "@/components/templates/pillar/PillarChildWithFormTemplate";
import {getLanguage} from "@/lib/helpers";

export const dynamic = 'force-dynamic';

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features/legal-crm-software/'
    switch (lang) {
        case 'uk':
            slug = 'features-3/legal-crm-software';
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

        const testimonials = await getTestimonialsList('legal-crm-software');
        const features = await getPageFeaturesData('features');
        return <PillarChildWithFormTemplate
            pageData={{
                ...pageData,
                testimonials,
                footerExtendedBg: true,
                features,
            }}
            formId='d99a85d1-4cc1-46ba-97aa-4ff2847c728f'
            routerName='cosmolex-crm'
        />
    } catch (error) {
        console.error(error);
        notFound();
    }
}
