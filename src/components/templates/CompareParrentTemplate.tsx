import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "../blocks/headers/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {CompareSelector} from "@/components/blocks/compare/compareSelector";
import HubSpotForm from "@/components/blocks/hubspotForm";

export default function CompareParentTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const compareSelector = pageData.compareSelector;
    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData}
                className="mb-30"
                showCta
                showFeatureImage
            />

           <div className="relative">
               {compareSelector &&
                   <CompareSelector className="relative z-10" compareSelector={compareSelector}/> }
               <div className="absolute h-[9.375rem] bg-primary z-0 w-full bottom-0 left-0 rounded-tr-[3.125rem] md:rounded-tr-[6.25rem]" />
           </div>
            <div className="relative bg-primary">
                <Testimonials
                    testimonials={testimonials}
                    className="!bg-transparent !pt-0 relative z-10"
                    bgOverlay={false}
                    showNavigation
                    theme="light"
                />

                <div className="pb-10">
                    <div className="self-stretch text-center justify-start text-white text-[2.875rem] font-bold leading-[3.75rem] mb-4">Ready to get started?</div>
                    <div className="self-stretch text-center justify-start text-white text-xl font-normal leading-loose">Schedule a personal one-on-one demo with our team.</div>
                </div>
            </div>
            <div className="relative">
                <HubSpotForm className="shadow-[0rem_1.3125rem_1.875rem_0rem_rgba(0,0,0,0.05)]" />
                <div className="bg-primary absolute z-0 w-full h-[11.875rem] left-0 rounded-bl-[6.25rem] top-0" />
            </div>

            <SimplifyPractice pageData={pageData} className=""/>
        </Layout>
    )
}