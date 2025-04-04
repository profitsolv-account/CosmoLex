import { Metadata } from "next";
import { getSEOData } from "@/lib/queries/seo";
import {getPageData, getPageFeaturesData, getVideoSection} from "@/lib/queries/wordpress";
import {getTestimonialsList} from "@/lib/queries/testimonials";
import {notFound} from "next/navigation";
import {getCompareChildPageData} from "@/lib/queries/compare";
import CaseStudyTemplate from "@/components/templates/CaseStudyTemplate";
import {getMembersData} from "@/lib/queries/about";
import './styles.css';

type Params = {
    params: Promise<{slug: string}>;
}

export async function generateMetadata({params}: Params): Promise<Metadata> {
    const {slug} = await params;
    return await getSEOData(`/case-study/${slug}`);
}

export default async function Page({params}: Params) {
    try {
        const {slug} = await params;
        const pageData = await getPageData(`/case-study/${slug}`);
        const testimonials = await getTestimonialsList();
        const compareSection = await getCompareChildPageData(`/case-study/${slug}`);
        const videoSection = await getVideoSection(`/case-study/${slug}`);
        const features = await getPageFeaturesData('features');

        const members = await getMembersData(`/case-study/${slug}`);
        return <CaseStudyTemplate pageData={{
            ...pageData,
            testimonials,
            footerExtendedBg: true,
            compareSection,
            members,
            videoSection,
            features
        }} />

    } catch (error) {
        console.error(error);
        notFound();
    }
}

export const revalidate = false;
export const dynamic = "force-static";