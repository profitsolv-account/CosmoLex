import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import { getPageData } from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PillarChildWithFormTemplate from "@/components/templates/pillar/PillarChildWithFormTemplate";

const slug = 'law-firm-website-builder';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        return <PillarChildWithFormTemplate
            pageData={{
                ...pageData,
                testimonials,
                footerExtendedBg: true,
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
export const dynamic = "force-static";