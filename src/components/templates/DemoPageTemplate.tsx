"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageHeader} from "../blocks/pageHeader";
import {PageDataType} from "@/types";
import {Partners} from "@/components/blocks/partners";
import {Testimonials} from "@/components/blocks/testimonials";
import {Leaders} from "@/components/blocks/leaders";
import {Features} from "../blocks/features";
import HubSpotForm from "@/components/blocks/hubspotForm";
import {RatingBlock} from "@/components/blocks/ratingBlock";

export default function DemoPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>

            <PageHeader pageData={pageData} />
            <RatingBlock className="bg-primary pb-[3.5625rem]" />
            <div className="relative">
                <HubSpotForm />
                <div className="bg-primary absolute z-0 w-full h-[11.875rem] left-0 rounded-bl-[6.25rem] top-0" />
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
