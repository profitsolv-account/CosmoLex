"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageHeader} from "../blocks/headers/pageHeader";
import {PartnersStrategic} from "@/components/blocks/partners/strategic";
import {LocationItem, PageDataType} from "@/types";
import Pagination from "@/components/pagination/inde";
import {Directory} from "@/components/common/directory";
import SearchComponent from "@/components/common/directory/search";

type Props = {
    pageData: PageDataType,
    page: number,
    locations: LocationItem[],
    categories: {id: string, name: string}[]
}

export default function DirectoriesTemplate({ pageData, page, locations, categories }: Props) {
    const totalPages = Math.ceil((pageData.total || 0) / 12);
    const items = pageData.directories || [];
    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />

           <div className="px-2 mt-40 container">


               <SearchComponent categories={categories} locations={locations}/>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                   {
                       items.map((item, index) => {
                           return (
                               <div key={index} className="grow">
                                   <Directory data={item} />
                               </div>
                           )
                       })
                   }
               </div>
           </div>

            <section className="mx-auto py-16 text-center">
                <Pagination
                    pageCount={totalPages}
                    currentPage={page}
                    baseLink={"/partners/certified-consultant/page/"}
                />
            </section>

        </Layout>

    )
}
