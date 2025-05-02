"use client";
import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/layout";
import { HomeHeader } from "../blocks/headers/homeHeader";
import { ComplianceManagement } from "@/components/blocks/complianceManagement";
import { MatterCentric } from "@/components/blocks/matterCentric";
import { PageDataType } from "@/types";

const Testimonials = dynamic(() =>
    import('@/components/blocks/testimonials').then(mod => mod.Testimonials)
);
const VideoTestimonials = dynamic(() =>
    import('@/components/blocks/videoTestimonials').then(mod => mod.VideoTestimonials)
);
const Faq = dynamic(() =>
    import('@/components/blocks/faq').then(mod => mod.Faq)
);
const SimplifyPractice = dynamic(() =>
    import('@/components/blocks/simplifyPractice').then(mod => mod.SimplifyPractice)
);
const Partners = dynamic(() =>
    import('@/components/blocks/partners').then(mod => mod.Partners)
);

export default function HomePage({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((t) => !t.extended);
    const extendedTestimonials = (pageData.testimonials || []).filter((t) => t.extended);
    const faqs = pageData.faq || [];

    return (
        <Layout pageData={pageData}>
            <HomeHeader pageData={pageData} hideRating={pageData.hideRating} />

            <div className="px-4 md:px-0">
                <ComplianceManagement />
            </div>

            {pageData.settings && <MatterCentric setting={pageData.settings} />}

            <Testimonials testimonials={testimonials} showNavigation />
            <VideoTestimonials testimonials={extendedTestimonials} />

            <div className="relative rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] overflow-hidden bg-white pb-10 mt-20">
                <Faq faqs={faqs} />
            </div>

            <SimplifyPractice pageData={pageData} />
            <Partners className="pb-10" />
        </Layout>
    );
}
