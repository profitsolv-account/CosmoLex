import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features'
    switch (lang) {
        case 'ca':
            slug = 'features-2';
            break;
        case 'uk':
            slug = 'features-3';
            break;
    }
    return slug;
}


export async function generateMetadata(): Promise<Metadata> {
    const slug = await getSlug();
    return await getSEOData(slug);
}

export default async function FeaturesPage() {
    try {

        const slug = await getSlug();

        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(slug);

        return <PracticeTypesTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            videoSection
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}