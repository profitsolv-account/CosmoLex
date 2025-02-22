import React from 'react'
import Layout from "@/components/layout/layout";
import {ShortPostType} from "@/types";
import {ShortPost} from "@/components/common/shortPost";

export default function BlogTemplate({ pageData }: { pageData: any }) {
    return (
        <Layout pageData={pageData}>
            <div>
                <section className="container mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold text-primary">{pageData?.title}</h1>
                    <p className="mt-4 text-lg text-gray-700">{pageData?.excerpt}</p>
                </section>
                <section className="container py-20">
                    {pageData.posts.map((post: ShortPostType) => {
                        return <ShortPost key={post.id} post={post} />
                    })}
                </section>
            </div>
        </Layout>

    )
}
