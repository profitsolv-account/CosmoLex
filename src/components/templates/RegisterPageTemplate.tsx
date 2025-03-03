"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageHeader} from "../blocks/pageHeader";
import {PageDataType} from "@/types";
import {Partners} from "@/components/blocks/partners";
import {Testimonials} from "@/components/blocks/testimonials";
import {Leaders} from "@/components/blocks/leaders";
import {Features} from "../blocks/features";
import {RatingBlock} from "@/components/blocks/ratingBlock";

export default function RegisterPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />
            <RatingBlock className="bg-primary pb-[57px]" />
           {/* <DemoForm />*/}
            <div className="relative">
                <div className="max-w-[437px] min-h-[500px] mx-auto relative z-1 bg-white rounded-[30px] p-[50px]">

                    <iframe
                        src="https://profitsolv-billingplatform.azurewebsites.net/subscription-management/subscription-management.html?businessUnit=cosmolex&amp;productCatalog=CosmoLex&amp;showOnlyMainProducts=true&amp;showPreselectedSignUpForm=true&amp;overrideHost=https://law.cosmolex.com"
                        data-gtm-yt-inspected-10="true"
                        style={{
                            width: '100%',
                            height: '1442px',
                            border: 'none',
                            background: 'transparent'
                        }}
                    >
                    </iframe>
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
