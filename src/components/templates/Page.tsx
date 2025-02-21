import React from 'react'
import Layout from "@/components/layout/layout";


export default function Page({ pageData }: { pageData: any }) {
    return (
        <Layout>
            <div>

                <section className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                    <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                </section>

                <section className="" dangerouslySetInnerHTML={{__html: pageData?.content}}>
                </section>
            </div>
        </Layout>

    )
}
