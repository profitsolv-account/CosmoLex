import React from 'react'
import Layout from "@/components/layout/layout";


export default function PageTemplate({ pageData }: { pageData: any }) {
    return (
        <Layout pageData={pageData}>
            <div className="pb-32">

                <section className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                    <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                </section>
                <section className="container" dangerouslySetInnerHTML={{__html: pageData && pageData.content ? pageData.content : ""}}>
                </section>
            </div>
        </Layout>

    )
}
