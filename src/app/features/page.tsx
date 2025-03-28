import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";
import { headers } from 'next/headers';

const pageSlug = "features";

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(pageSlug);
}

export default async function FeaturesPage() {
    try {

        const lg_attrs: {[key: string]: string} = {
            'eng': '',
            'ca': '-2',
            'uk': '-3',
        }
        const headersList = headers();
        const hr = await headersList;

        const host = hr.get('host') || '';

        const lang = 'eng';
        /*if (host.includes('.ca')) {
            lang = 'ca';
        }*/


        const pageData = await getPageData(`${pageSlug}${lg_attrs[lang]}`);
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(pageSlug);

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

export const revalidate = false;
//export const dynamic = "force-static";