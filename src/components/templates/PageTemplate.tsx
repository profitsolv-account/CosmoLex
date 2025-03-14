import React from 'react'
import Layout from "@/components/layout/layout";

export default function PageTemplate({ pageData }: { pageData: any }) {
    return (
        <Layout pageData={pageData}>
            <div className="px-4 pb-32 single-entity container-blog">
                <section className="mx-auto py-4 text-left md:py-16">
                    <h2 className=" text-primary text-[2.125rem] font-bold font-['Inter'] leading-[3.4375rem] md:text-[2.875rem] " dangerouslySetInnerHTML={{__html: pageData?.title || ""}} />
                </section>
                <section className="" dangerouslySetInnerHTML={{__html: pageData && pageData.content ? pageData.content : ""}}>
                </section>
            </div>
        </Layout>

    )
}
