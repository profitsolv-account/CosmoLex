import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import CareersTemplate from "@/components/templates/CareersTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";

const slug = '/about-cosmolex/careers/';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function CareersPage() {
    
    const pageData = await getPageData(slug);
    const testimonials = await getTestimonialsList();
    
    return <CareersTemplate pageData={{
        ...pageData,
        testimonials,
        footerExtendedBg: true,
    }} />
}

export const revalidate = false;


