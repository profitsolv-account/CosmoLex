import React from 'react'
import Layout from "@/components/layout/layout";
import {DemoHeader} from "@/components/blocks/demoHeader";
import {PageDataType} from "@/types";

export default function DemoPageTemplate({ pageData }: { pageData: PageDataType }) {
    return (
        <Layout pageData={pageData}>
            <DemoHeader pageData={pageData} />
        </Layout>

    )
}
