import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import PracticeTypesTemplate from "@/components/templates//PracticeTypesTemplate";

const slug = 'user-management';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function UserManagementPage() {
    try {
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(slug);
        const features = await getPageFeaturesData('features');
        return <PracticeTypesTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            videoSection,
            features,
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";