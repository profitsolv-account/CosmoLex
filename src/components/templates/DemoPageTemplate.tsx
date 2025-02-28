"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {DemoHeader} from "@/components/blocks/demoHeader";
import {PageDataType} from "@/types";
import {DemoForm} from "@/components/blocks/demoForm";
import {Partners} from "@/components/blocks/partners";
import {Testimonials} from "@/components/blocks/testimonials";
import {Leaders} from "@/components/blocks/leaders";
import {EndToEndSolution} from "@/components/blocks/endToEndSolution";

export default function DemoPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>
            <DemoHeader pageData={pageData} />
            <DemoForm />
            <Partners/>
            <Testimonials
                testimonials={testimonials}
                className="!bg-transparent !pt-0"
                bgOverlay={false}
                showNavigation
            />
            {pageData.leaderLogos && <Leaders logos={pageData.leaderLogos} />}
            {pageData.settings && <EndToEndSolution settings={pageData.settings} />}
        </Layout>

    )
}
