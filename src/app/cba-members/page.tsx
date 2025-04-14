import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import CBAMembersTemplate from "@/components/templates/CBAMembersTemplate";

const slug = "cba-members";
export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function PillarPage() {
    try {
        const pageData = await getPageData(slug);
        if (!pageData) {
            notFound();
        }
        const testimonials = await getTestimonialsList();

        return <CBAMembersTemplate pageData={{
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
export const dynamic = "force-static";