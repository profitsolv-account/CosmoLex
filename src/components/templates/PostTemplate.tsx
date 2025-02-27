import React from 'react'
import Layout from "@/components/layout/layout";
import {LatestPosts} from "@/components/widgets/latestPosts";

export default function PostTemplate({pageData}: { pageData: any }) {
    return (

        <Layout pageData={pageData}>
            <div className="pt-20 b-32 single-entity container flex flex-col-reverse gap-10 items-start lg:flex-row">
                <div>
                    <section>
                        <section className="mx-auto py-4 text-left md:py-16">
                            <h2 className=" text-primary text-[34px] font-bold font-['Inter'] leading-[55px] md:text-[46px]"
                                dangerouslySetInnerHTML={{__html: pageData?.title || ""}}/>
                        </section>
                        {pageData.featuredImage && <>
                            <section className="container text-center">
                                <div className="inline-block p-1 border border-primary">
                                    <img
                                        src={pageData.featuredImage}
                                        alt={pageData.altText}
                                    />
                                </div>
                            </section>
                        </>}
                        <section className="container py-4"
                                 dangerouslySetInnerHTML={{__html: pageData ? pageData?.content : ''}}/>
                    </section>
                </div>
                <div className="w-full lg:flex-none lg:w-1/4 lg:sticky lg:top-22 lg:pb-10">
                    {pageData.latestPosts && <LatestPosts posts={pageData.latestPosts}/>}
                </div>
            </div>
        </Layout>

    )
}
