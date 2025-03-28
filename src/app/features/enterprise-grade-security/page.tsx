import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";
import {getLanguage} from "@/lib/helpers";


export async function generateMetadata(): Promise<Metadata> {
    const lang = await getLanguage();
    const slug = lang === 'ca'
        ? '/features-2/enterprise-grade-security-2/'
        : '/features/enterprise-grade-security/';

    return await getSEOData(slug);
}

export default async function EnterPriseGradeSecurityPage() {
    try {

        const lang = await getLanguage();
        const slug = lang === 'ca'
            ? '/features-2/enterprise-grade-security-2/'
            : '/features/enterprise-grade-security/';

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

export const revalidate = false;
 export const dynamic = "force-dynamic";