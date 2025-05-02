import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import ContactUsTemplate from "@/components/templates/ContactUsTemplate";
import CalculatorPage from "@/components/templates/CalculatorPage";

const slug = "roi-calculator";
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

        return <CalculatorPage pageData={{
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