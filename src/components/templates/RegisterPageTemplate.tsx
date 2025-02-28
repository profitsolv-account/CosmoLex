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
            <div className="relative">
                <div className="max-w-[437px] min-h-[500px] mx-auto relative z-1 bg-white rounded-[30px] p-[50px]">

                </div>
                <div className="bg-primary absolute z-0 w-full h-[190px] left-0 rounded-bl-[100px] top-0" />
            </div>
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
