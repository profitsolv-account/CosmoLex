import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarParentTemplate from "@/components/templates/PillarParrentTemplate";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = 'features/legal-billing-software'
    switch (lang) {
        case 'uk':
            slug = 'features-3/legal-billing-software';
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
        return <PillarParentTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = 'force-dynamic';