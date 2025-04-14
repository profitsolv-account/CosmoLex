import {Metadata} from "next";
import {getSEOData} from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import ReferralsTemplate from "@/components/templates/ReferralsTemplate";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";

const slug = 'referrals';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function ReferralsPage() {
    
    const pageData = await getPageData(slug);
    if (!pageData) {
        notFound();
    }
    const testimonials = await getTestimonialsList();
    
    return <ReferralsTemplate pageData={{
        ...pageData,
        testimonials,
        footerExtendedBg: true,
    }} />
}

export const revalidate = false;
export const dynamic = "force-static";


