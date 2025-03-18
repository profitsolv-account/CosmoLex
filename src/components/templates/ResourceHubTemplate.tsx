"use client"
import React from 'react'
import Layout from "@/components/layout/layout";

import {PageDataType} from "@/types";
import {ResourceBlock} from "@/components/blocks/resourceBlock";



export default function ResourceHubTemplate({pageData}: { pageData: PageDataType }) {

    const resources = pageData.resources || [];
    return (
        <Layout pageData={pageData}>


            <div className="w-full h-[300px]">
            </div>

           <div className="px-2">
               <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                   {resources.map((resource, index) => (<ResourceBlock resource={resource} key={index}/>))}
               </div>
           </div>
        </Layout>
    )
}
