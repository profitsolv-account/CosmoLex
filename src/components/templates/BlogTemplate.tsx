import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType, ShortPostType} from "@/types";
import {ShortPost} from "@/components/common/shortPost";
import Pagination from "@/components/pagination/inde";
import {LatestPosts} from "@/components/widgets/latestPosts";

export default function BlogTemplate({ pageData, page }: { pageData: PageDataType, page: number }) {
    return (
        <Layout pageData={pageData}>
            <div className="pt-20 b-32 single-entity container flex flex-col-reverse gap-10 items-start px-4 md:px-0 lg:flex-row ">
                <div>
                   <section>
                       {pageData.posts && pageData.posts.map((post: ShortPostType) => {
                           return <ShortPost key={post.id} post={post} />
                       })}
                   </section>
                   <section className="mx-auto py-16 text-center">
                       <Pagination pageCount={100} currentPage={page}/>
                   </section>
               </div>
                <div className="hidden md:block w-full lg:flex-none lg:w-1/4 lg:sticky lg:top-22 lg:pb-10">
                    {pageData.latestPosts && <LatestPosts posts={pageData.latestPosts}/>}
                </div>
            </div>
        </Layout>

    )
}
