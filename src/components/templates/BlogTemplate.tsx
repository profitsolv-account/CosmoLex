import React from 'react'
import Layout from "@/components/layout/layout";
import {PageDataType, ShortPostType} from "@/types";
import {ShortPost} from "@/components/common/shortPost";
import Pagination from "@/components/pagination/inde";
import {LatestPosts} from "@/components/widgets/latestPosts";
import {ResourcesHeader} from "@/components/blocks/headers/resourcesHeader";
import {TopArticles} from "@/components/resources/topArticles";
import {SearchForm} from "@/components/resources/searchForm";
import {SingleBlock} from "@/components/resources/singleBlock";
import {SubscribeForm} from "@/components/resources/subscribeForm";
import {SimplifyPractice} from "@/components/blocks/simplifyPractice";
import {TestimonialBlock} from "@/components/resources/testimonialBlock";

export default function BlogTemplate({ pageData, page }: { pageData: PageDataType, page: number }) {

    const totalPages = Math.ceil((pageData.total || 0) / 10);

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
                        <SingleBlock />
                        <SingleBlock />
                        <SingleBlock />
                    </div>

                    <div className="max-w-[66.438rem] mx-auto">
                        <TestimonialBlock />
                    </div>

                    <div className="max-w-[66.438rem] mx-auto py-20 grid grid-cols-1 gap-[8.125rem] gap-y-[6rem] md:grid-cols-2 lg:grid-cols-3">
                        <SingleBlock />
                        <SingleBlock />
                        <SingleBlock />
                    </div>

                    <div className="max-w-[66.438rem] mx-auto pb-40 flex align-center justify-center">
                        <div className="border border-primary-dark bg-primary-dark text-white rounded-[6.25rem] cursor-pointer inline-block px-22 py-3.5 text-base transition duration-300 hover:bg-transparent hover:text-primary-dark">Load more</div>
                    </div>
                </div>


            </div>

            <SubscribeForm />

            <SimplifyPractice pageData={pageData} className=""/>

        </Layout>

    )
}
