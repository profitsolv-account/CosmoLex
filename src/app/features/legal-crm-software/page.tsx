import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildWithFormTemplate from "@/components/templates/pillar/PillarChildWithFormTemplate";
import {getLanguage} from "@/lib/helpers";

export async function generateMetadata(): Promise<Metadata> {

    const lang = await getLanguage();
    let slug = 'features/churn-zero-automation-in-app-messaging-and-email/'
    switch (lang) {
        case 'uk':
            slug = 'features-3/legal-crm-software';
            break;
    }

    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {

        const lang = await getLanguage();
        let slug = 'features/churn-zero-automation-in-app-messaging-and-email/'
        switch (lang) {
            case 'uk':
                slug = 'features-3/legal-crm-software';
                break;
        }

        const pageData = await getPageData(slug);

        const testimonials = await getTestimonialsList();
        return <PillarChildWithFormTemplate
            pageData={{
                ...pageData,
                testimonials,
                footerExtendedBg: true
            }}
            formId='d99a85d1-4cc1-46ba-97aa-4ff2847c728f'
            routerName='cosmolex-crm'
        />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = 'force-dynamic';
