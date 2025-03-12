"use client"

import React, {FC, Fragment} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {GuideBlock} from "@/components/blocks/guideBlock";
import classNames from "classnames";
import {TabbedSlider, TabType} from "@/components/ui/tabbedSlider";
import {ToolsType} from "@/types/tools";
import Image from 'next/image';
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import {CompareSection} from "../blocks/compare/compareSection";
import HubSpotForm from "@/components/blocks/hubspotForm";
import {PriceComparison} from "@/components/blocks/priceComparison";

export default function CompareChildTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>

            <CompareHeader pageData={pageData} />

            <div className="min-h-100">
                <CompareSection compareSection={pageData.compareSection} />
            </div>

            <PriceComparison
                settings={pageData.settings}
                plans={pageData.pricingPlans || []}
                title="Get the right plan for your firm’s needs."
            />

            <div className="relative">
                <SimplifyPractice pageData={pageData} className=""/>
                <div className="absolute bottom-0 w-full h-[150px] rounded-tr-[50px] md:rounded-tr-[100px] bg-primary"/>
            </div>

            <div className="relative bg-primary pt-10">
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
                <div className="absolute top-0 w-full h-[150px] rounded-bl-[50px] md:rounded-bl-[100px] bg-primary"/>
            </div>}

            <div className="pb-10 mt-10 md:mt-25">
                <div className="self-stretch text-center justify-start text-primary-dark text-[46px] font-bold leading-[60px] mb-4">Ready to get started?</div>
                <div className="self-stretch text-center justify-start text-primary-dark text-xl font-normal leading-loose">Schedule a personal one-on-one demo with our team.</div>
            </div>

            <HubSpotForm className="shadow-[0px_21px_30px_0px_rgba(0,0,0,0.05)]" />

        </Layout>
    )
}