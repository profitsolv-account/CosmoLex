"use client"
import React, {FC, Fragment} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "../../blocks/headers/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {GuideBlock} from "@/components/blocks/guideBlock";
import {ColumnsSection} from "@/components/blocks/columnsSection";
import classNames from "classnames";
import {TabbedSlider, TabType} from "@/components/ui/tabbedSlider";
import {PageBlocksType, ToolsType} from "@/types/tools";
import {Faq} from "@/components/blocks/faq";
import Image from 'next/image';

export default function CalendarTasksTemplate({ pageData }: { pageData: PageDataType }) {

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

            {pageData.tools && pageData.tools.items && <ToolsSection tools={pageData.tools} />}

            {pageBlocks && <ColumnsSection
                items={pageBlocks.pageBlocksItems.map((item) => ({
                    title: item.title,
                    description: item.description,
                    media: <div className="w-full relative">
                        <Image
                            src={item.image.node.sourceUrl}
                            alt={item.image.node.altText}
                            className={classNames("w-full")}
                            width={500}
                            height={500}
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
                <div className="absolute top-0 w-full h-full rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>

            {pageData.settings && <div className="relative">
                <Features pageData={pageData} className="!pt-2" />
                <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>
            </div>}

            <div className="relative">
                <GuideBlock className="relative z-10" pageData={pageData} />
                <div className="absolute bottom-0 w-full h-[6.25rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-white"/>
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
                <div className={classNames("grow max-h-[17.5rem] rounded-br-[0.9375rem] rounded-bl-[0.9375rem] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0rem] lg:rounded-tl-[1.875rem] lg:rounded-bl-[1.875rem] lg:flex lg:items-center lg:justify-center", t.classname)}>
                    <Image
                        src={t.image.node.sourceUrl}
                        alt={t.image.node.altText}
                        className={classNames("relative z-4", t.mediaClassname, {
                            "max-w-[23rem]": !t.mediaClassname?.includes('aspect-square')
                        })}
                        width={t.image.node.mediaDetails.width}
                        height={500}
                    />
                    <div className="absolute z-0 top-0 left-0 w-full h-full bg-white/30"/>
                </div>
                <div className={classNames("grow rounded-tl-[0.9375rem] rounded-tr-[0.9375rem] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[1.875rem] lg:rounded-tr-[1.875rem] lg:rounded-tl-[0rem] overflow-hidden", t.classname)}>
                    <div className="lg:w-[27.625rem] flex-col justify-start items-start gap-5 inline-flex">
                        <div>
                            <img src={t.icon.node.sourceUrl} alt={t.icon.node.altText} className="w-[1.875rem] h-[1.875rem]"/>
                        </div>
                        <div className=" text-primary-dark text-[2.25rem] font-bold leading-[2.8125rem] font-['Inter'] lg:leading-[2.375rem] lg:text-[1.875rem]" dangerouslySetInnerHTML={{__html: t.title}} />
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[1.875rem] max-w-[21.875rem] lg:mb-7" dangerouslySetInnerHTML={{ __html: t.description }} />
                    </div>
                </div>
            </div>
        </Fragment>
    ))

    const tabs: TabType[] = tools.items.map((t, index) => (
        {
            title: t.title.replace('</br>', ''),
        }
    ));

    return <div className="pt-10">
        <TabbedSlider
            subheading={tools.subtitle}
            heading={tools.toolsTitle}
            description={tools.toolsDescription}
            tabs={tabs}
            items={items}
            height="31.25rem"
        />
    </div>
}