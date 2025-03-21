"use client"
import React, {FC, Fragment} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {Testimonials} from "@/components/blocks/testimonials";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import classNames from "classnames";
import Image from 'next/image';
import {BarAssociationHeader} from "@/components/blocks/barAssociationHeader";
import {DemoForm} from "@/components/common/demoForm";

type Props = {
    pageData: PageDataType;
    formId: string;
    routerName: string;
}
export default function BarAssociationsTemplate({ pageData, formId, routerName }: Props) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);

    return (
        <Layout pageData={pageData}>
            <BarAssociationHeader
                pageData={pageData}
                className="mb-10"
                rightSideContent={<>
                    <DemoForm
                        formId={formId}
                        routerName={routerName}
                    />
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

