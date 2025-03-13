"use client"
import React, {FC, Fragment} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "@/components/blocks/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {GuideBlock} from "@/components/blocks/guideBlock";
import classNames from "classnames";
import {TabbedSlider, TabType} from "@/components/ui/tabbedSlider";
import {PageBlocksType, ToolsType} from "@/types/tools";
import {Faq} from "@/components/blocks/faq";
import {ColumnsSection} from "@/components/blocks/columnsSection";
import Image from 'next/image';

export default function PillarChildTemplate({ pageData }: { pageData: PageDataType }) {

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
            />

            {pageData.tools &&pageData.tools.showTools && <div className="relative">
                {pageData.tools && pageData.tools.items && <ToolsSection tools={pageData.tools} />}
                {pageBlocks && !pageBlocks.showBlocksSection && <div className="absolute bottom-0 w-full h-[300px] rounded-tr-[50px] md:rounded-tr-[100px] bg-primary"/>}
            </div>}

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
            />}

            <div className={classNames("relative", {
                "bg-primary": pageBlocks && !pageBlocks.showBlocksSection,
                "pt-10": pageBlocks && pageBlocks.showBlocksSection
            })}>
                <Testimonials
                    testimonials={testimonials}
                    className="!bg-transparent !pt-0 relative z-10"
                    bgOverlay={false}
                    showNavigation
                    theme="light"
                />
                {pageBlocks && pageBlocks.showBlocksSection  &&
                    <div className="absolute top-0 w-full h-full rounded-tr-[50px] md:rounded-tr-[100px] bg-primary"/>
                }
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

type ToolsSectionProps = {
    tools: ToolsType
}

const ToolsSection: FC<ToolsSectionProps> = ({tools}) => {

    const items = [...tools.items, ...tools.items].map((t, index) => (
        <Fragment key={index}>
            <div className="h-full w-full flex flex-col-reverse justify-center lg:grid lg:grid-cols-2 overflow-hidden">
                <div className={classNames("grow max-h-[280px] rounded-br-[15px] rounded-bl-[15px] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:flex lg:items-center lg:justify-center", t.classname)}>
                    <Image
                        src={t.image.node.sourceUrl}
                        alt={t.image.node.altText}
                        className={classNames("relative z-4", t.mediaClassname)}
                        width={t.image.node.mediaDetails.width}
                        height={t.image.node.mediaDetails.height}
                    />
                    <div className="absolute z-0 top-0 left-0 w-full h-full bg-white/30"/>
                </div>
                <div className={classNames("grow rounded-tl-[15px] rounded-tr-[15px] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-tl-[0px] overflow-hidden", t.classname)}>
                    <div className="lg:w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                        <div>
                            {t.icon?.node && <Image
                                src={t.icon.node.sourceUrl}
                                alt={t.icon.node.altText}
                                width={t.icon.node.mediaDetails.width}
                                height={t.icon.node.mediaDetails.height}
                            />}
                        </div>
                        <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter'] lg:leading-[38px] lg:text-[30px]">{t.title}</div>
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[30px] max-w-[350px] lg:mb-7" dangerouslySetInnerHTML={{ __html: t.description }} />
                    </div>
                </div>
            </div>
        </Fragment>
    ))

    const tabs: TabType[] = tools.items.map((t) => (
        {
            title: t.tabName || t.title,
            id: t.title
        }
    ));

    return <div className="pt-10">
        <TabbedSlider
            subheading={tools.subtitle}
            heading={tools.toolsTitle}
            description={tools.toolsDescription}
            tabs={tabs}
            items={items}
            height="463px"
        />
    </div>
}