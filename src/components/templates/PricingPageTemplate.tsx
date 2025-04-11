import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "../blocks/headers/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PriceComparison} from "@/components/blocks/priceComparison";
import {AddonsBlock} from "@/components/blocks/addonsBlock";
import {Faq} from "@/components/blocks/faq";
import {PricingWidget} from "@/components/widgets/pricingWidget";
import {isProduction} from "@/helpers";

export default function PricingPageTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];
    const features = pageData.pricingFeatures || [];

    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />
           <div className="relative">
               <div className="relative z-10">
                   <PricingWidget isProduction={isProduction()} />
               </div>
                <div className="bg-primary absolute w-full h-[25%] left-0 top-0 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem]" />
           </div>

            <div className="relative">
                <PriceComparison
                    settings={pageData.settings}
                    plans={pageData.pricingPlans || []}
                    title='Get the right plan for your firm’s needs.'
                />
                <div className="bg-primary absolute w-full h-[50%] left-0 bottom-0 rounded-tr-[3.125rem] md:rounded-tr-[6.25rem]" />
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
