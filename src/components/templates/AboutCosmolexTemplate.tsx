"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {PageHeader} from "@/components/blocks/pageHeader";
import {Leaders} from "@/components/blocks/leaders";
import {BarAssociations} from "@/components/blocks/about/barAssociations";

export default function AboutCosmolexTemplate({pageData}: { pageData: PageDataType }) {

    return (
        <Layout pageData={pageData}>
           <div className="relative">
               <PageHeader
                   pageData={pageData}
                   className="mb-0 pb-20 bg-primary relative z-10 rounded-bl-[50px] md:rounded-bl-[100px] md:pb-40"
                   containerClassName="!max-w-[745px]"
                   hideContent
               />
           </div>
            <div className="px-2 mb-10">
                <div
                    className="min-h-[300px] max-w-[994px] mx-auto wp-content mt-15 md:mt-30"
                    dangerouslySetInnerHTML={{__html: pageData.content || ''}}
                />
            </div>

            <div>
                <BarAssociations data={pageData.bar} />
            </div>

           <div className="pb-50 max-w-[1512px] mx-auto">
               <h3 className="text-center justify-start text-primary-dark text-[46px] font-bold leading-[60px] mb-20">Recognized by industry leaders.</h3>
               {pageData.leaderLogos &&
                   <Leaders
                       logos={[...pageData.leaderLogos, ...pageData.leaderLogos]}
                       className="!max-w-full"
                   />}
           </div>

        </Layout>

    )
}
