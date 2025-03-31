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
import {PageBlocksType, ToolsType} from "@/types/tools";
import {Faq} from "@/components/blocks/faq";
import {ColumnsSection} from "@/components/blocks/columnsSection";
import Image from 'next/image';
import {PillarHeader} from "../../blocks/headers/pillarHeader";
import {DemoForm} from "@/components/common/demoForm";

type Props = {
    pageData: PageDataType;
    formId: string;
    routerName: string;
}
export default function PillarChildWithFormTemplate({ pageData, formId, routerName }: Props) {

    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];
    const pageBlocks: PageBlocksType = pageData.pageBlocks || {
        pageBlocksItems: []
    };

    return (
        <Layout pageData={pageData}>

            <PillarHeader
                pageData={pageData}
                className="mb-10"
                rightSideContent={<>
                    <DemoForm
                        formId={formId}
                        routerName={routerName}
                    />
                </>}
            />

            {pageData.tools &&pageData.tools.showTools && <div className="relative">
                {pageData.tools && pageData.tools.items && <ToolsSection tools={pageData.tools} />}
                {pageBlocks && !pageBlocks.showBlocksSection && <div className="absolute bottom-0 w-full h-[18.75rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>}
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
                subheading={pageBlocks.pageBlocksSubtitle}
                heading={pageBlocks.pageBlocksTitle}
                description={pageBlocks.pageBlocksDescription}
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
                    <div className="absolute top-0 w-full h-full rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
                }
            </div>

            {pageData.settings && <div className="relative">
                <Features pageData={pageData} className="!pt-2" />
                <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>
            </div>}

            <div className="relative">
                <GuideBlock className="relative z-10"/>
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
                        <div className=" text-primary-dark text-[2.25rem] font-bold leading-[2.8125rem] font-['Inter'] lg:leading-[2.375rem] lg:text-[1.875rem]" dangerouslySetInnerHTML={{__html: t.title}} />
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[1.875rem]  lg:mb-7" dangerouslySetInnerHTML={{ __html: t.description }} />
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
            height="28.9375rem"
        />
    </div>
}