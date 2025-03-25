"use client"
import React, { FC, useState } from 'react';
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import {Partners} from "@/components/blocks/partners";
import {Testimonials} from "@/components/blocks/testimonials";
import classNames from "classnames";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import ReferralHSForm from "@/components/blocks/referralHSForm";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {ColumnsSection} from "@/components/blocks/columnsSection";
import {PageBlocksType, ToolsType} from "@/types/tools";
import Image from 'next/image';
import {CareersApplicantManager} from "@/components/blocks/about/careers";

export default function CareersTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const pageBlocks: PageBlocksType = pageData.pageBlocks || {
        pageBlocksItems: []
    };

    return (
        <Layout pageData={pageData}>

            <CompareHeader
                pageData={pageData}
                className="mb-22"
                hideCta
                contentClassName="!max-w-[89rem]"
            />
            
            {pageBlocks && pageBlocks.showBlocksSection && <ColumnsSection
                items={pageBlocks.pageBlocksItems.map((item) => ({
                    title: item.title,
                    description: item.description,
                    media: <div className="w-full relative">
                        <Image
                            src={item.image?.node?.sourceUrl || '#'}
                            alt={item?.image?.node?.altText || ''}
                            className="w-full"
                            width={item.image?.node.mediaDetails.width}
                            height={item.image?.node.mediaDetails.height}
                        />
                    </div>,
                    position: !item.reverse ? "right" : "left",
                }))}
                subheading={pageBlocks.pageBlocksSubtitle}
                heading={pageBlocks.pageBlocksTitle}
                description={pageBlocks.pageBlocksDescription}
            />}
            <CareersApplicantManager />

            <Partners/>
            <Testimonials
                testimonials={testimonials}
                className="!bg-transparent !pt-0"
                bgOverlay={false}
                showNavigation
            />
            <SimplifyPractice pageData={pageData} />
        </Layout>
    );
}
