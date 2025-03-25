"use client"
import React, {FC, ReactNode, useState} from 'react';
import Layout from "@/components/layout/layout";
import { PageDataType } from "@/types";
import { ResourceBlock } from "../blocks/resources/resourceBlock";
import classNames from "classnames";
import {CompareHeader} from "@/components/blocks/compare/compareHeader";
import {GuideBlock} from "@/components/blocks/resources/guideBlock";
import {PageHeader} from "@/components/blocks/pageHeader";

export default function GuidesTemplate({ pageData }: { pageData: PageDataType }) {

    const availableCategories = ["business-accounting", "case-management", "cloud-computing", "billing", "running-a-law-office", "trust-retainer-accounting"];
    const knowledgeBase = (pageData.knowledgeBaseCategories || []).filter((cat) => availableCategories.includes(cat.node.slug));

    const icons: {[key: string]: ReactNode} = {
        "business-accounting":  <i className="epkbfa epkbfa-balance-scale"></i>,
        "case-management":  <i className="epkbfa ep_font_icon_folder"></i>,
        "cloud-computing":  <i className="epkbfa epkbfa-cloud"></i>,
        "billing":  <i className="epkbfa epkbfa-dollar"></i>,
        "running-a-law-office":  <i className="epkbfa epkbfa-legal"></i>,
        "trust-retainer-accounting":  <i className="epkbfa epkbfa-bank"></i>,
    };

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
                    <GuideBlock data={item} key={index} icon={icons[item.node.slug] || ''} />
                ))}
            </div>
        </Layout>
    );
}
