"use client"

import React, {useState} from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType, PagedItemsResponse} from "@/types";
import {ResourcesHeader} from "@/components/blocks/headers/resourcesHeader";
import {SearchForm} from "@/components/resources/searchForm";
import {SingleBlock} from "@/components/resources/singleBlock";
import {SubscribeForm} from "@/components/resources/subscribeForm";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {TestimonialBlock} from "@/components/resources/testimonialBlock";
import {Resource} from "@/types/resources";
import {getResourcesUnionData} from "@/lib/queries/resources";

type Props = {
    pageData: PageDataType;
    postsData: PagedItemsResponse<Resource>;
    searchParams?: {
        s?: string;
        category?: number;
        tag?: number;
        categoryName?: string;
        tagName?: string;
    };
}

export default function GuidesInfographicsTemplate({ pageData, postsData, searchParams }: Props) {

    const firstPosts = postsData.items.slice(0, 6);

    const [posts, setPosts] = useState<Resource[]>(postsData.items.slice(6, postsData.items.length));
    const [pageInfo, setPageInfo] = useState<any>(postsData.pageInfo);
    const [loading, setLoading] = useState(false);

    const loadMorePosts = async () => {
        if (!pageInfo?.hasNextPage) return;
        setLoading(true);
        const data = await getResourcesUnionData(pageInfo.endCursor, 15, searchParams?.s || '');
        if (data) {
            setPosts((prev: any) => [...prev, ...data.items]);
            setPageInfo(data.pageInfo);
        }
        setLoading(false);
    };

    const isEmpty = firstPosts.length === 0;

    return (
        <Layout pageData={pageData}>

            <div className="bg-white">

                <ResourcesHeader
                    type={searchParams?.categoryName || searchParams?.tagName || 'resources'}
                    title="Infographics Library"
                    actions={[{
                        title: 'Articles',
                        link: '/blog',
                        active: false
                    },
                        {
                            title: 'Webinars',
                            link: '/webinars',
                            active: false
                        },
                        {
                            title: 'Infographics',
                            link: '/guides-infographics/',
                            active: true
                        },
                        {
                            title: 'Resource hub',
                            link: '/resource-hub',
                            active: false,
                            className: "min-w-[8.75rem]"
                        }
                    ]}
                   /* content={<TopArticles />}*/
                    className="!mb-7 pb-5"
                />


                <div className="px-4">
                    <div className="max-w-[66.438rem] mx-auto">
                        <SearchForm placeholder="Search Infographics Library"/>
                    </div>

                    {isEmpty && <div className="max-w-[66.438rem] mx-auto mt-20">
                        <p className="text-3xl text-center font-bold mb-10">
                            No articles found.
                        </p>
                    </div>}

                    {firstPosts.length && <div className="max-w-[66.438rem] mx-auto py-20 grid grid-cols-1 gap-[8.125rem] gap-y-[6rem] md:grid-cols-2 lg:grid-cols-3">

                        {firstPosts.map((post) => {
                            return <SingleBlock
                                key={post.node.id}
                                title={post.node.title}
                                link={post.node.fields.ctaLink}
                                description={post.node.content}
                                image={post.node.featuredImage?.node.sourceUrl || ''}
                                ctaText={post.node.fields.ctaText}
                            />
                        })}

                    </div>}

                    <div className="max-w-[66.438rem] mx-auto">
                        <TestimonialBlock />
                    </div>

                    {!!posts.length && <div className="max-w-[66.438rem] mx-auto py-20 grid grid-cols-1 gap-[8.125rem] gap-y-[6rem] md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => {
                            return <SingleBlock
                                key={post.node.id}
                                title={post.node.title}
                                link={post.node.fields.ctaLink}
                                description={post.node.content}
                                image={post.node.featuredImage?.node.sourceUrl || ''}
                                ctaText={post.node.fields.ctaText}
                            />
                        })}

                    </div>}

                    {pageInfo.hasNextPage && (
                        <button className="max-w-[66.438rem] mx-auto flex align-center justify-center disabled:opacity-70" onClick={loadMorePosts} disabled={loading}>
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
