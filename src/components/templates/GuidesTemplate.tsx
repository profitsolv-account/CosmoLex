"use client"
import React, { FC, useState } from 'react';
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import { ResourceBlock } from "../blocks/resources/resourceBlock";
import classNames from "classnames";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import {GuideBlock} from "@/components/blocks/resources/guideBlock";
import {PageHeader} from "@/components/blocks/pageHeader";

export default function GuidesTemplate({ pageData }: { pageData: PageDataType }) {
    const knowledgeBase = pageData.knowledgeBaseCategories || [];

    return (
        <Layout pageData={pageData}>
            <PageHeader
                pageData={pageData}
                className="mb-10"
                showCta={false}
                showFeatureImage
            />
            <div className="container pb-10 grid md:grid-cols-3 gap-10">
                {knowledgeBase.map((item, index) => (
                    <GuideBlock data={item} key={index} />
                ))}
            </div>
        </Layout>
    );
}
