import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildTemplate from "@/components/templates/pillar/PillarChildTemplate";
import {getLanguage} from "@/lib/helpers";

const getSlug = async () => {
    const lang = await getLanguage();
    let slug = '/features/online-payments'
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
        const testimonials = await getTestimonialsList();
        return <PillarChildTemplate pageData={{
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