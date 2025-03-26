"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType} from "@/types";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {PageHeader} from "@/components/blocks/pageHeader";

export default function CaseStudyTemplate({ pageData }: { pageData: PageDataType }) {

    return (
        <Layout pageData={pageData}>

            <PageHeader
                pageData={pageData} className="mb-22"
                showCta
                hideContent
            />

            {/*<p className="font-semibold text-2xl">dsadasd asd </p>*/}

           <div className="px-4">
               <div className="container-blog page-content flex-row">
                   <div dangerouslySetInnerHTML={{__html: pageData.content || ''}}/>
               </div>
           </div>

            <div className="relative">
                <SimplifyPractice pageData={pageData} className=""/>
                <div
                    className="absolute bottom-0 w-full h-[9.375rem] rounded-tr-[3.125rem] md:rounded-tr-[6.25rem] bg-primary"/>
            </div>

        </Layout>
    )
}