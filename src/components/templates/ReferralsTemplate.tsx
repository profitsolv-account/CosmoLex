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

export default function ReferralsTemplate({ pageData }: { pageData: PageDataType }) {
    const testimonials = (pageData.testimonials || []).filter((testimonial) => !testimonial.extended);
    return (
        <Layout pageData={pageData}>
            <CompareHeader
                pageData={pageData}
                className="mb-22"
                hideCta
                contentClassName="!max-w-[89rem]"
            />
            {/* <Referral Form />*/}
            <div className="relative">
                <ReferralHSForm />
            </div>
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
