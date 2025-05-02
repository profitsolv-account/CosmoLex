import React from 'react'
import Layout from "@/components/layout/layout";
import {LatestPosts} from "@/components/widgets/latestPosts";
import Image from 'next/image';
import {PostDataType} from "@/types/post";
import {PostHeader} from "@/components/blocks/headers/postHeader";

export default function PostTemplate({pageData}: { pageData: PostDataType }) {
    return (

        <Layout pageData={pageData}>

            <PostHeader pageData={pageData} />

            <div className="pt-20 b-32 single-entity container-blog flex flex-col-reverse gap-10 items-start lg:flex-row px-4 md:px-0">
                <div>
                    <section className="pb-20">
                        <section className="mx-auto pb-4 text-left md:pb-16">
                            <h2 className=" text-primary text-[2.125rem] font-bold font-['Inter'] leading-[3.4375rem] md:text-[2.875rem]"
                                dangerouslySetInnerHTML={{__html: pageData?.title || ""}}/>
                        </section>

                        <section className="container py-4"
                                 dangerouslySetInnerHTML={{__html: pageData ? pageData?.content : ''}}/>
                    </section>
                </div>
                <div className="hidden md:block w-full lg:flex-none lg:w-1/4 lg:sticky lg:top-22 lg:pb-10">
                    {pageData.latestPosts && <LatestPosts posts={pageData.latestPosts}/>}
                </div>
            </div>

            <section className="container py-4 hidden">
                <div className="w-full relative bg-[#b9dfc3] rounded-tl-[3.125rem] rounded-br-[3.125rem] overflow-hidden p-[4.625rem] my-5">
                    <div className="top-[74px] justify-start text-primary-dark text-xl font-bold font-['Inter'] leading-loose"></div>
                    <div className="justify-start text-primary-dark text-[2.875rem] font-bold font-['Inter'] leading-[3.375rem] mb-5"></div>
                    <div className="justify-start text-primary-dark text-2xl font-normal font-['Inter'] leading-9 mb-5"></div>
                    <a href="/" className="no-underline base-btn w-auto mx-auto bg-primary-dark text-white inline-flex px-8 hover:bg-transparent hover:text-primary-dark"></a>
                </div>
            </section>
        </Layout>

    )
}
