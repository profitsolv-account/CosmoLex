"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "@/components/blocks/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {GuideBlock} from "@/components/blocks/guideBlock";
import {ColumnsSection} from "@/components/blocks/columnsSection";

export default function PillarParentTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];
    const features = pageData.pricingFeatures || [];

    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />

            <ColumnsSection
                subheading="FINANCIAL REPORTING FOR LAW FIRMS"
                heading="View your financial fitness at a glance."
                description="CosmoLex provides the critical reports on the state of your firm’s finances."
                items={[{
                    title: "The true value of built-in accounting is in reporting.",
                    description: <>
                        CosmoLex has worked with firms for well over a decade in establishing the right financial reports firms want and need.
                        <div>The most critical information on cash flow, balances, ledger reports, and more is easily and accurately at your fingertips so you can make the right financial decisions for your firm.</div>
                    </>,
                    media: <div className="w-full h-[435px] relative bg-[#d9d9d9] rounded-[30px]" />,
                    position: "right"
                },
                    {
                        title: "Trust accounting reports made easy.",
                        description: <>
                            Nearly a dozen trust specific reports gives a 360 degree view on the status of all your trust transactions and reconciliation.
                        </>,
                        media: <div className="w-full h-[435px] relative bg-[#d9d9d9] rounded-[30px]" />,
                    },
                    {
                        title: "Keep your firm compliant.",
                        description: <>
                            Create and customize your reports for a full analysis of earnings and costs. <br/>
                            Develop practice area-specific reports to understand which parts of your practice are most profitable. <br/>
                            Report on all the details of time and expenses and collection rates to solve problems for your firm
                        </>,
                        media: <div className="w-full h-[435px] relative bg-[#d9d9d9] rounded-[30px]" />,
                        position: "right"
                    }
                ]}
            />

            <div className="relative pt-20">
                <Testimonials
                    testimonials={testimonials}
                    className="!bg-transparent !pt-0 relative z-10"
                    bgOverlay={false}
                    showNavigation
                    theme="light"
                />
                <div className="absolute top-0 w-full h-full rounded-tr-[50px] md:rounded-tr-[100px] bg-primary"/>
            </div>

            {pageData.settings && <div className="relative">
                <Features pageData={pageData} className="!pt-2" />
                <div className="absolute top-0 w-full h-[150px] rounded-bl-[50px] md:rounded-bl-[100px] bg-primary"/>
            </div>}

            <div className="relative">
                <GuideBlock className="relative z-10"/>
                <div className="absolute bottom-0 w-full h-[100px] rounded-tr-[50px] md:rounded-tr-[100px] bg-white"/>
            </div>

            <SimplifyPractice pageData={pageData} className="bg-white"/>
        </Layout>

    )
}
