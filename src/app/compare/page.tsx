import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CompareParentTemplate from "@/components/templates/CompareParrentTemplate";
import {getComparePageData} from "@/lib/queries/compare";
import {getLanguage} from "@/lib/helpers";


const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'compare'
    switch (lang) {
        case 'ca':
            slug = 'compare-2';
            break;
        case 'uk':
            slug = 'compare-3';
            break;
    }
    return slug;
}

export async function generateMetadata(): Promise<Metadata> {
    const slug = await getSlug();
    return await getSEOData(slug);
}

export default async function ComparePage() {
    try {
        const slug = await getSlug();
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const compareSelector = await getComparePageData();

        return <CompareParentTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            compareSelector
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}
