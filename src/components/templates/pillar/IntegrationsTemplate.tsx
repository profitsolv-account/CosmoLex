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
import {PageBlocksType} from "@/types/tools";
import {Faq} from "@/components/blocks/faq";
import Image from 'next/image';

export default function IntegrationsTemplate({ pageData }: { pageData: PageDataType }) {

    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];

    const pageBlocks: PageBlocksType = pageData.pageBlocks || {
        pageBlocksItems: []
    };

    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData}
                className="mb-10"
                showCta
                showFeatureImage
                bgClassName="!h-[85%]"
            />

            {pageBlocks && <ColumnsSection
                description={pageBlocks.pageBlocksDescription}
                heading={pageBlocks.pageBlocksTitle}
                rows={pageBlocks.pageBlocksItems.map((item) => ({
                    className: "rounded-[15px] md:rounded-[30px] overflow-hidden bg-[#D7EFFA] md:!gap-0",
                    leftContent: <div className="bg-[#D7EFFA] flex flex-col items-center justify-center w-full md:h-full">
                        <div className="px-5 py-5 md:px-[92px]">
                            <div className="text-primary-dark text-3xl font-semibold leading-[38px] mb-3">{item.title}</div>
                            <div className="text-primary-dark text-[22px] font-normal leading-9" dangerouslySetInnerHTML={{ __html: item.description || '' }} />
                        </div>
                    </div>,
                    rightContent: <div className="w-full relative flex justify-center items-center md:h-[363px] p-2 bg-white">
                        <Image
                            src={item.image?.node?.sourceUrl || ''}
                            alt={item.image?.node?.altText || ''}
                            className="w-auto max-h-full max-w-full"
                            width={item.image?.node?.mediaDetails?.width || 0}
                            height={item.image?.node?.mediaDetails?.height || 0}
                        />
                    </div>,
                    position: !item.reverse ? "right" : "left",
                }))}
            />}

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
            <Faq faqs={faqs} />
            <SimplifyPractice pageData={pageData} className="bg-white"/>
        </Layout>
    )
}
