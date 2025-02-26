import React from 'react'
import Layout from "@/components/layout/layout";
import {ShortPostType} from "@/types";
import {ShortPost} from "@/components/common/shortPost";
import Pagination from "@/components/pagination/inde";

export default function BlogTemplate({ pageData, page }: { pageData: any, page: number }) {
    return (
        <Layout pageData={pageData}>
            <div className="pb-32">
                <section className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                    <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                </section>
                <section className="container py-20">
                    {pageData.posts.map((post: ShortPostType) => {
                        return <ShortPost key={post.id} post={post} />
                    })}
                </section>

                <section className="container mx-auto px-6 py-16 text-center">
                    <Pagination pageCount={100} currentPage={page}/>
                </section>
            </div>
        </Layout>

    )
}
