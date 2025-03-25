"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageHeader} from "../blocks/pageHeader";
import {PartnersStrategic} from "@/components/blocks/partners/strategic";
import {PageDataType} from "@/types";
import Pagination from "@/components/pagination/inde";
import {Directory} from "@/components/common/directory";

export default function DirectoriesTemplate({ pageData, page }: { pageData: PageDataType, page: number  }) {
    const totalPages = Math.ceil((pageData.total || 0) / 10);
    const items = pageData.directories || [];
    return (
        <Layout pageData={pageData}>
            <PageHeader pageData={pageData} />

            <div className="mt-40 container grid grid-cols-3 gap-10">
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
