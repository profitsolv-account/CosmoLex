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
import {ToolsType} from "@/types/tools";
import Image from 'next/image';

export default function PillarParentTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData}
                className="mb-10"
                showCta
                showFeatureImage
            />

            <div className="relative">
                {pageData.tools && pageData.tools.items && <ToolsSection tools={pageData.tools} />}
                <div className="absolute bottom-0 w-full h-[18.75rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>
            <div className="relative bg-primary">
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
                <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>
            </div>}

            <div className="relative">
                <GuideBlock className="relative z-10"/>
                <div className="absolute bottom-0 w-full h-[6.25rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-white"/>
            </div>

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
            <div className={classNames("grow rounded-br-[0.9375rem] rounded-bl-[0.9375rem] relative bg-cover bg-center overflow-hidden aspect-3/2 md:aspect-auto lg:max-h-full lg:rounded-br-[0rem] lg:rounded-tl-[1.875rem] lg:rounded-bl-[1.875rem] lg:flex lg:items-center lg:justify-center", t.classname)}>
                <Image
                    src={t.image.node.sourceUrl}
                    alt={t.image.node.altText}
                    className={classNames("relative z-4", t.mediaClassname)}
                    width={t.image.node.mediaDetails.width}
                    height={t.image.node.mediaDetails.height}
                />
                <div className="absolute z-0 top-0 left-0 w-full h-full bg-white/30"/>
            </div>
            <div className={classNames("rounded-tl-[0.9375rem] rounded-tr-[0.9375rem] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[1.875rem] lg:rounded-tr-[1.875rem] lg:rounded-tl-[0rem] overflow-hidden", t.classname)}>
                <div className="lg:w-[27.625rem] flex-col justify-start items-start gap-5 inline-flex">
                    <div>
                        {t.icon?.node && <Image
                            src={t.icon.node.sourceUrl}
                            alt={t.icon.node.altText}
                            width={t.icon.node.mediaDetails.width}
                            height={t.icon.node.mediaDetails.height}
                        />}
                    </div>
                    <div className=" text-primary-dark text-[2.25rem] font-bold leading-[2.8125rem] font-['Inter'] lg:leading-[2.375rem] lg:text-[1.875rem]">{t.title}</div>
                    <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[1.875rem] max-w-[21.875rem] lg:mb-7" dangerouslySetInnerHTML={{ __html: t.description }} />
                    <a href={'/'}
                       className="w-full block text-center lg:inline-block rounded-[6.25rem] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[1.875rem] py-[0.9375rem] lg:w-auto">
                        Explore features
                    </a>
                </div>
            </div>
        </div>
    </Fragment>
    ))
    const tabs: TabType[] = tools.items.map((t) => (
        {
            title: t.tabName || t.title,
        }
    ));

    return <div className="pt-10">
        <TabbedSlider
            subheading={tools.subtitle}
            heading={tools.toolsTitle}
            description={tools.toolsDescription}
            tabs={tabs}
            items={items}
            height={"31.25rem"}
        />
    </div>
}