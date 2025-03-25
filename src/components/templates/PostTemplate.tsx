import React from 'react'
import Layout from "@/components/layout/layout";
import {LatestPosts} from "@/components/widgets/latestPosts";
import Image from 'next/image';
import {PostDataType} from "@/types/post";

export default function PostTemplate({pageData}: { pageData: PostDataType }) {
    return (

        <Layout pageData={pageData}>
            <div className="pt-20 b-32 single-entity container-blog flex flex-col-reverse gap-10 items-start lg:flex-row px-4 md:px-0">
                <div>
                    <section className="pb-20">
                        <section className="mx-auto py-4 text-left md:py-16">
                            <h2 className=" text-primary text-[2.125rem] font-bold font-['Inter'] leading-[3.4375rem] md:text-[2.875rem]"
                                dangerouslySetInnerHTML={{__html: pageData?.title || ""}}/>
                        </section>
                        {pageData.featuredImage && <>
                            <section className="container text-center">
                                <div className="inline-block p-1 border border-primary">
                                    <Image
                                        src={pageData.featuredImage?.node.sourceUrl}
                                        alt={pageData.featuredImage?.node.altText}
                                        width={pageData.featuredImage?.node.mediaDetails.width}
                                        height={pageData.featuredImage?.node.mediaDetails.height}
                                    />
                                </div>
                            </section>
                        </>}
                        <section className="container py-4"
                                 dangerouslySetInnerHTML={{__html: pageData ? pageData?.content : ''}}/>
                    </section>
                </div>
                <div className="hidden md:block w-full lg:flex-none lg:w-1/4 lg:sticky lg:top-22 lg:pb-10">
                    {pageData.latestPosts && <LatestPosts posts={pageData.latestPosts}/>}
                </div>
            </div>
        </Layout>

    )
}
