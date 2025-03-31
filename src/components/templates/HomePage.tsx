"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {HomeHeader} from "../blocks/headers/homeHeader";
import {Partners} from "@/components/blocks/partners";
import {ComplianceManagement} from "@/components/blocks/complianceManagement";
import {MatterCentric} from "@/components/blocks/matterCentric";
import {Testimonials} from "@/components/blocks/testimonials";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PageDataType} from "@/types";
import {VideoTestimonials} from "@/components/blocks/videoTestimonials";
import {Faq} from "@/components/blocks/faq";


export default function HomePage({pageData}: { pageData: PageDataType }) {

    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const extendedTestimonials = (pageData.testimonials || []).filter((testimonial) => testimonial.extended);
    const faqs = pageData.faq || [];

    return (
        <Layout pageData={pageData}>
            <HomeHeader pageData={pageData} />
            <ComplianceManagement/>
            {pageData.settings && <MatterCentric setting={pageData.settings}/>}
            <Testimonials testimonials={testimonials} showNavigation/>
            <VideoTestimonials testimonials={extendedTestimonials} />
            <Faq faqs={faqs} />
            <SimplifyPractice pageData={pageData}/>
            <Partners className="pb-10"/>
        </Layout>

    )
}
