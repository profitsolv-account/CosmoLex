"use client"
import React, {FC, Fragment} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {PageHeader} from "@/components/blocks/pageHeader";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {GuideBlock} from "@/components/blocks/guideBlock";
import {ColumnsSection} from "@/components/blocks/columnsSection";
import classNames from "classnames";
import {TabbedSlider, TabType} from "@/components/ui/tabbedSlider";
import {ToolsType} from "@/types/tools";

export default function PillarParentTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    const faqs = pageData.faq || [];
    const features = pageData.pricingFeatures || [];

    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData}
                className="mb-10"
                showCta
                showFeatureImage
            />

            {pageData.tools && pageData.tools.items && <ToolsSection tools={pageData.tools} />}

           {/* <ColumnsSection
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
            />*/}

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

type ToolsSectionProps = {
    tools: ToolsType
}
const ToolsSection: FC<ToolsSectionProps> = ({tools}) => {

    const items = [...tools.items, ...tools.items].map((t, index) => (
        <Fragment key={index}>
            <div className="h-full w-full flex flex-col-reverse justify-center lg:grid lg:grid-cols-2 overflow-hidden">
                <div className={classNames("grow max-h-[280px] rounded-br-[15px] rounded-bl-[15px] relative bg-cover bg-center overflow-hidden h-full lg:max-h-full lg:rounded-br-[0px] lg:rounded-tl-[30px] lg:rounded-bl-[30px] lg:flex lg:items-center lg:justify-center", t.classname)}>
                    <img src={t.image.node.sourceUrl} alt={t.image.node.altText} className={classNames("relative z-4", t.mediaClassname)}/>
                    <div className="absolute z-0 top-0 left-0 w-full h-full bg-white/30"/>
                </div>
                <div className={classNames("grow rounded-tl-[15px] rounded-tr-[15px] relative flex items-center justify-center px-9 py-9 pb-16 lg:rounded-br-[30px] lg:rounded-tr-[30px] lg:rounded-tl-[0px] overflow-hidden", t.classname)}>
                    <div className="lg:w-[442px] flex-col justify-start items-start gap-5 inline-flex">
                        <div>
                            <img src={t.icon.node.sourceUrl} alt={t.icon.node.altText} className="w-[30px] h-[30px]"/>
                        </div>
                        <div className=" text-primary-dark text-[36px] font-bold leading-[45px] font-['Inter'] lg:leading-[55px] lg:text-[46px]">{t.title}</div>
                        <div className="text-primary-dark text-base font-normal font-['Inter'] mb-2 leading-[30px] max-w-[350px] lg:mb-7" dangerouslySetInnerHTML={{ __html: t.description }} />
                        <a href={'/#'}
                           className="w-full block text-center lg:inline-block rounded-[100px] bg-primary-dark justify-center items-center text-white text-base font-normal font-['Inter'] px-[30px] py-[15px] lg:w-auto">
                            Explore features
                        </a>
                    </div>
                </div>
            </div>
        </Fragment>
    ))

    const tabs: TabType[] = tools.items.map((t) => (
        {
            title: t.title,
        }
    ));

    return <div className="pt-10">
        <TabbedSlider
            subheading={tools.subtitle}
            heading={tools.toolsTitle}
            description={tools.toolsDescription}
            tabs={tabs}
            items={items}
        />
    </div>
}