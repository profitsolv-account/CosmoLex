"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {PageHeader} from "../blocks/headers/pageHeader";
import {AboutCards} from "@/components/blocks/about/aboutCards";
import {PersonCard} from "@/components/blocks/about/personCard";
import classNames from "classnames";
import {Companies} from "@/components/blocks/about/companies";


export default function AboutUsTemplate({pageData}: { pageData: PageDataType }) {

    const members = pageData.members || [];
    const firstMember = members[0];
    const restMembers = members.slice(1);

    return (
        <Layout pageData={pageData}>
            <PageHeader
                pageData={pageData}
                className="mb-0 pb-10 bg-primary"
                containerClassName="!max-w-[25rem]"
            />

            <AboutCards />

            <div className="pt-20 relative">
                <PersonCard member={firstMember} className={classNames("mb-10 relative z-10", {
                    'lg:!flex-row-reverse': true
                })} />
                <div className="absolute w-full z-0 bg-white h-[70%] lg:h-[6.25rem] bottom-0 left-0 rounded-tr-[3.125rem]  md:rounded-tr-[6.25rem]"/>
            </div>
            <div className="relative z-10 bg-white rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] pb-12 mb-15">
                {restMembers.map((member, index) => (
                    <PersonCard key={index} member={member} className={classNames("mb-10 relative z-10", {
                        'lg:!flex-row-reverse': index % 2 !== 0
                    })} />))}
            </div>

            <div className="relative">
                <Companies />
            </div>

        </Layout>

    )
}
