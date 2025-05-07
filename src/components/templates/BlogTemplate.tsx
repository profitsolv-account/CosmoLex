"use client"

import React, {useState} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType, PostsDataResponse} from "@/types";
import {ResourcesHeader} from "@/components/blocks/headers/resourcesHeader";
import {SearchForm} from "@/components/resources/searchForm";
import {SingleBlock} from "@/components/resources/singleBlock";
import {SubscribeForm} from "@/components/resources/subscribeForm";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {TestimonialBlock} from "@/components/resources/testimonialBlock";
import {getPosts} from "@/lib/queries/blog";

type Props = {
    pageData: PageDataType;
    page: number;
    postsData: PostsDataResponse
}

export default function BlogTemplate({ pageData, page, postsData }: Props) {
    const firstPosts = postsData.posts.slice(0, 6);

    const [posts, setPosts] = useState<any>(postsData.posts.slice(6, postsData.posts.length));
    const [pageInfo, setPageInfo] = useState<any>(postsData.pageInfo);
    const [loading, setLoading] = useState(false);

    const loadMorePosts = async () => {
        if (!pageInfo?.hasNextPage) return;

        setLoading(true);
        const data = await getPosts(pageInfo.endCursor); // pass endCursor as `after`
        if (data) {
            setPosts((prev: any) => [...prev, ...data.posts]);
            setPageInfo(data.pageInfo);
        }
        setLoading(false);
    };




    return (
        <Layout pageData={pageData}>

            <div className="bg-white">

                <ResourcesHeader
                    type="resources"
                    title="Article Library"
                    actions={[{
                        title: 'Articles',
                        link: '/blog',
                        active: true
                    },
                        {
                            title: 'Webinars',
                            link: '/webinars',
                            active: false
                        },
                        {
                            title: 'Infographics',
                            link: '/infographics',
                            active: false
                        },
                        {
                            title: 'Guides',
                            link: '/guides',
                            active: false,
                            className: "min-w-[8.75rem]"
                        }
                    ]}
                    /*  content={<TopArticles />}*/
                    className="!mb-7 pb-5"
                />

                <div className="px-4">
                    <div className="max-w-[66.438rem] mx-auto">
                        <SearchForm />
                    </div>

                  <div className="max-w-[66.438rem] mx-auto py-20 grid grid-cols-1 gap-[8.125rem] gap-y-[6rem] md:grid-cols-2 lg:grid-cols-3">

                      {firstPosts.map((post) => {
                          return  <SingleBlock
                              key={post.id}
                              title={post.title}
                              link={'/'}
                              description={post.excerpt}
                              image={post.featuredImage?.sourceUrl || ''}
                          />
                      })}


                    </div>

                   <div className="max-w-[66.438rem] mx-auto">
                        <TestimonialBlock />
                    </div>

                    <div className="max-w-[66.438rem] mx-auto py-20 grid grid-cols-1 gap-[8.125rem] gap-y-[6rem] md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post: any) => {
                            return  <SingleBlock
                                key={post.id}
                                title={post.title}
                                link={'/'}
                                description={post.excerpt}
                                image={post.featuredImage?.sourceUrl || ''}
                            />
                        })}

                    </div>

                    {pageInfo.hasNextPage && (
                        <button className="max-w-[66.438rem] mx-auto pb-40 flex align-center justify-center" onClick={loadMorePosts} disabled={loading}>
                            <div className="border border-primary-dark bg-primary-dark text-white rounded-[6.25rem] cursor-pointer inline-block px-22 py-3.5 text-base transition duration-300 hover:bg-transparent hover:text-primary-dark">
                                    {loading ? "Loading..." : "Load More"}
                            </div>
                        </button>

                    )}

                </div>


            </div>

            <SubscribeForm />

            <SimplifyPractice pageData={pageData} className=""/>

        </Layout>

    )
}
