"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "@/components/blocks/pageHeader";
import {PricingBlocks} from "@/components/blocks/pricingBlocks";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PriceComparison} from "@/components/blocks/priceComparison";
import {AddonsBlock} from "@/components/blocks/addonsBlock";
import {Faq} from "@/components/blocks/faq";

export default function PricingPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];
    const features = pageData.pricingFeatures || [];
    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />
            <PricingBlocks />

            <div className="relative">
                <PriceComparison
                    settings={pageData.settings}
                    plans={pageData.pricingPlans || []}
                    title='Get the right plan for your firm’s needs.'
                />
                <div className="bg-primary absolute w-full h-[50%] left-0 bottom-0 rounded-tr-[50px] md:rounded-tr-[100px]" />
            </div>

            {pageData.settings && <AddonsBlock features={features} settings={pageData.settings} />}
            <Testimonials
                testimonials={testimonials}
                className="!bg-transparent !pt-0"
                bgOverlay={false}
                showNavigation
            />
            <Faq faqs={faqs} />
            <SimplifyPractice pageData={pageData} className="bg-white"/>
        </Layout>

    )
}
