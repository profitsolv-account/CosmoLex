import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import FeatureDefaultTemplate from "@/components/templates/FeatureDefaultTemplate";
import {getLeadersLogos} from "@/lib/queries/logos";

const slug = 'secure-file-sharing-electronic-signature';

export async function generateMetadata(): Promise<Metadata> {
    return await getSEOData(slug);
}

export default async function UserManagementPage() {
    try {
        const pageData = await getPageData(slug);
        const testimonials = await getTestimonialsList();
        const videoSection = await getVideoSection(slug);
        const features = await getPageFeaturesData('features');
        const logos = await getLeadersLogos();

        return <FeatureDefaultTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            videoSection,
            features,
            leaderLogos: logos,
        }} />
    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";