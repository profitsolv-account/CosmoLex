import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import FeatureDefaultTemplate from "@/components/templates/FeatureDefaultTemplate";
import {getLeadersLogos} from "@/lib/queries/logos";
import {getLanguage} from "@/lib/helpers";

export async function generateMetadata(): Promise<Metadata> {

    const lang = await getLanguage();
    let slug = 'features/secure-file-sharing-electronic-signature'
    switch (lang) {
        case 'ca':
            slug = 'features-2/secure-file-sharing-electronic-signature';
            break;
    }

    return await getSEOData(slug);
}

export default async function UserManagementPage() {
    try {
        const lang = await getLanguage();
        let slug = 'features/secure-file-sharing-electronic-signature'
        switch (lang) {
            case 'ca':
                slug = 'features-2/secure-file-sharing-electronic-signature';
                break;
        }

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
//export const dynamic = "force-static";