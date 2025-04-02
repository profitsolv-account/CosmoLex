"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {PageHeader} from "../blocks/headers/pageHeader";
import {Leaders} from "@/components/blocks/leaders";
import {BarAssociations} from "@/components/blocks/about/barAssociations";

export default function AboutCosmolexTemplate({pageData}: { pageData: PageDataType }) {

    return (
        <Layout pageData={pageData}>
           <div className="relative">
               <PageHeader
                   pageData={pageData}
                   className="mb-0 bg-primary relative z-10 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] pb-4 overflow-hidden"
                   containerClassName="!max-w-[46.5625rem]"
                   hideContent
               />
           </div>
            <div className="px-2 mb-10">
                <div
                    className="min-h-[18.75rem] max-w-[62.125rem] mx-auto wp-content mt-15 md:mt-30"
                    dangerouslySetInnerHTML={{__html: pageData.content || ''}}
                />
            </div>

            <div>
                <BarAssociations data={pageData.bar} />
            </div>

           <div className="pb-50 max-w-[94.5rem] mx-auto">
               <h3 className="text-center justify-start text-primary-dark text-[2.875rem] font-bold leading-[3.75rem] mb-20">Recognized by industry leaders.</h3>
               {pageData.leaderLogos &&
                   <Leaders
                       logos={[...pageData.leaderLogos, ...pageData.leaderLogos]}
                       className="!max-w-full"
                   />}
           </div>

        </Layout>

    )
}
