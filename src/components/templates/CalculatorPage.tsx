"use client";
import React from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import NetGainChart from "@/components/common/Calculator";
import {PageHeader} from "@/components/blocks/headers/pageHeader";

const SimplifyPractice = dynamic(() =>
    import('@/components/blocks/simplifyPractice').then(mod => mod.SimplifyPractice)
);
const Partners = dynamic(() =>
    import('@/components/blocks/partners').then(mod => mod.Partners)
);

export default function CalculatorPage({ pageData }: { pageData: PageDataType }) {

    return (
        <Layout pageData={pageData}>
            <PageHeader
                pageData={pageData}
                className="mb-0 pb-1 bg-primary relative z-10 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] md:pb-20"
            />

            <div className="container-s">
                <NetGainChart pageData={pageData} />
            </div>

            <SimplifyPractice pageData={pageData} />
            <Partners className="pb-10" />
        </Layout>
    );
}
