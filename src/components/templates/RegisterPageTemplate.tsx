"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {DemoHeader} from "@/components/blocks/demoHeader";
import {PageDataType} from "@/types";
import {Partners} from "@/components/blocks/partners";
import {Testimonials} from "@/components/blocks/testimonials";
import {Leaders} from "@/components/blocks/leaders";
import {Features} from "../blocks/features";
import HubSpotForm from "@/components/blocks/hubspotForm";

export default function RegisterPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>
            <DemoHeader pageData={pageData} />
           {/* <DemoForm />*/}
            <HubSpotForm />
            <Partners/>
            <Testimonials
                testimonials={testimonials}
                className="!bg-transparent !pt-0"
                bgOverlay={false}
                showNavigation
            />
            {pageData.leaderLogos && <Leaders logos={pageData.leaderLogos} />}
            {pageData.settings && <Features pageData={pageData} />}
        </Layout>

    )
}
