"use client"
import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType, ShortPostType} from "@/types";
import {ShortPost} from "@/components/common/shortPost";
import {LatestPosts} from "@/components/widgets/latestPosts";
import Pagination from "@/components/pagination/inde";

export default function KBCategoryTemplate({ pageData, page, slug }: { pageData: PageDataType, page: number, slug: string }) {
    const totalPages = Math.ceil((pageData.total || 0) / 10);

    return (
        <Layout pageData={pageData}>
            <div className="pt-20 b-32 container-blog flex flex-col-reverse gap-10 items-start px-4 md:px-0 lg:flex-row justify-between">
                <div className="grow">
                   <section className="max-w-[53.75rem] mx-auto">
                       {pageData.posts && pageData.posts.map((post: ShortPostType) => {
                           return <ShortPost url={`/guides/${slug}/${post.slug}`} key={post.id} post={post} />
                       })}
                   </section>

                    <section className="mx-auto py-16 text-center">
                        <Pagination
                            pageCount={totalPages}
                            currentPage={page}
                            baseLink={`/guides/category/${slug}/page`}
                        />
                    </section>
               </div>
                <div className="hidden md:block w-full lg:flex-none lg:w-1/4 lg:sticky lg:top-22 lg:pb-10">
                    {pageData.latestPosts && <LatestPosts posts={pageData.latestPosts}/>}
                </div>
            </div>
        </Layout>
    )
}
