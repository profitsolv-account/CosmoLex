import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {Features} from "@/components/blocks/features";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import {FreeTrialFormWidget} from "@/components/widgets/freeTrialFormWidget";
import {Globe,
    Monitor,
    Calculator,
    Snowflake,
    File,
    Upload,
    CreditCard,
    LineChart,
    DollarSign,
    Package,} from "lucide-react";
import {isProduction} from "@/helpers";

export default function CompareChildRestTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>

            <CompareHeader
                pageData={pageData}
                className="mb-22"
            />

            <div className="px-4">
                <div className="container grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <h2 className="text-4xl"><span className="text-green">Top 10 Reasons</span> Law Firms Switch To CosmoLex:</h2>

                        <FeatureList />
                    </div>
                    <div>
                        <div className="relative">
                            <div className="max-w-[47.3125rem] mx-auto relative z-1 bg-white rounded-[1.875rem] p-[3.125rem]">
                                <FreeTrialFormWidget isProduction={isProduction()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <SimplifyPractice pageData={pageData} className=""/>
                <div className="absolute bottom-0 w-full h-[9.375rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
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
                <div className="absolute top-0 w-full h-[9.375rem] rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bg-primary"/>
            </div>}

        </Layout>
    )
}

const FeatureList = () => {
    const features = [
        { icon: <Globe className="w-12 h-12 mr-4 stroke-primary" />, text: '24/7 Anytime, Anywhere Access' },
        { icon: <Monitor className="w-12 h-12 mr-4 stroke-primary" />, text: 'Hassle-Free, Single Point Data Entry' },
        { icon: <Calculator className="w-12 h-12 mr-4 stroke-primary" />, text: 'Integrated Billing, Accounting & Practice Management' },
        { icon:<Snowflake className="w-12 h-12 mr-4 stroke-primary" />, text: 'Canadian Accrual GAAP & CRA Compliant' },
        { icon: <File className="w-12 h-12 mr-4 stroke-primary" />, text: 'Required Law Society Compliance Docs' },
        { icon: <Upload className="w-12 h-12 mr-4 stroke-primary" />, text: 'Secure Client Communication Portal' },
        { icon: <CreditCard className="w-12 h-12 mr-4 stroke-primary" />, text: 'Online Client Credit Card Payments via LawPay™' },
        { icon: <LineChart className="w-12 h-12 mr-4 stroke-primary" />, text: 'No Long Term Contracts. Unlimited Support.' },
        { icon: <DollarSign className="w-12 h-12 mr-4 stroke-primary" />, text: 'FREE External Bookkeeper Login [2]' },
        { icon: <Package className="w-12 h-12 mr-4 stroke-primary" />, text: 'FREE Data Migration Assistance' },
    ];

    return (
        <div className="py-6">
            <ul className="list-none space-y-4">
                {features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                        {feature.icon}
                        <span className="text-2xl">{feature.text}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};