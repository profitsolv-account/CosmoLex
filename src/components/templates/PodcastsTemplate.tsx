"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {PageHeader} from "@/components/blocks/pageHeader";
import {Testimonials} from "@/components/blocks/testimonials";
import {Features} from "@/components/blocks/features";
import {Faq} from "@/components/blocks/faq";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Podcast} from "@/components/common/podcust";

export default function PodcastsTemplate({pageData}: { pageData: PageDataType }) {

    const podcasts = pageData.podcasts || [];
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);

    const faqs = pageData.faq || [];

    return (
        <Layout pageData={pageData}>
           <PageHeader
               pageData={pageData}
                className="mb-10"

           />

            <div className="px-4 relative pb-[12rem] pt-20">
                <div className="container flex flex-col gap-10 relative z-10 min-h-[30rem]">
                    {podcasts.map((podcast, index) => (
                        <Podcast key={index} podcast={podcast} />
                    ))}
                </div>
                <div className="left-0 absolute bottom-0 w-full h-[9.375rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>

            <div className="relative bg-primary">
                <Testimonials
                    testimonials={testimonials}
                    className="!bg-transparent !pt-0 relative z-10"
                    bgOverlay={false}
                    showNavigation
                    theme="light"
                />
            </div>

            {pageData.settings && <div className="relative">
                <Features pageData={pageData} className="!pt-2" />
                <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>
            </div>
            }

            {faqs && faqs.length > 0 && (
                <Faq faqs={faqs} className="!bg-transparent" />
            )}
            <SimplifyPractice pageData={pageData} />


        </Layout>

    )
}
