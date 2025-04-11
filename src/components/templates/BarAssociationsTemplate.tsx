"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {BarAssociationHeader} from "@/components/blocks/barAssociationHeader";
import {FreeTrialFormWidget} from "@/components/widgets/freeTrialFormWidget";
import {isProduction} from "@/helpers";

type Props = {
    pageData: PageDataType;
    formId: string;
    routerName: string;
}
export default function BarAssociationsTemplate({ pageData }: Props) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);

    return (
        <Layout pageData={pageData}>
            <BarAssociationHeader
                pageData={pageData}
                className="mb-10"
                rightSideContent={<>
                    <FreeTrialFormWidget isProduction={isProduction()} />
                </>}
            />
            <Testimonials
                testimonials={testimonials}
                className="!bg-transparent !pt-0 relative z-10"
                bgOverlay={false}
                showNavigation
                theme="dark"
            />
            <SimplifyPractice pageData={pageData} />
        </Layout>
    )
}

