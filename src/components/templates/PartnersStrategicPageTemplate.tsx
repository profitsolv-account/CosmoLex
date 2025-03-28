"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageHeader} from "../blocks/headers/pageHeader";
import {PartnersStrategic} from "@/components/blocks/partners/strategic";
import {PageDataType} from "@/types";

export default function PartnersStrategicPageTemplate({ pageData }: { pageData: PageDataType }) {
    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />
            <PartnersStrategic logos={pageData.partnerLogos} />
        </Layout>

    )
}
