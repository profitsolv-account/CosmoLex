import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import BookKeepingTemplate from "@/components/templates/BookKeepingTemplate";
import {getLanguage} from "@/lib/helpers";

export async function generateMetadata(): Promise<Metadata> {
    const lang = await getLanguage();
    let slug = 'bookkeeping-payroll-services'
    switch (lang) {
        case 'ca':
            slug = 'bookkeeping-payroll-services-2';
            break;
    }

    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const lang = await getLanguage();
        let slug = 'bookkeeping-payroll-services'
        switch (lang) {
            case 'ca':
                slug = 'bookkeeping-payroll-services-2';
                break;
        }

        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();

        return <BookKeepingTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
        }} />

    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
//export const dynamic = "force-static";