import React from 'react'
import Layout from "@/components/layout/layout";


export default function PostTemplate({ pageData }: { pageData: any }) {
    return (
        <Layout pageData={pageData}>
            <div>
                <section className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                    <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                </section>

                <section className="container mx-auto px-6 py-16 text-center">
                    {pageData.featuredImage && <>
                        <div
                            className="inline-block p-1 border border-primary"
                        >
                            <img
                                src={pageData.featuredImage}
                                alt={pageData.altText}
                            />
                        </div>
                    </>}
                </section>

                <section className="container py-4" dangerouslySetInnerHTML={{__html: pageData ? pageData?.content : ''}}>
                </section>
            </div>
        </Layout>

    )
}
