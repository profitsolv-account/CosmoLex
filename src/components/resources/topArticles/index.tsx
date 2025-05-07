import Img from './top-articles.webp';
import Image from 'next/image';
import React from 'react';
import {CustomLink} from "@/components/ui/customLink";

type ArticleType = {
    title: string;
    category: string;
    link: string;
}

export const TopArticles = () => {

    const articles: ArticleType[] = [{
        title: 'Accounting Terms Cheat Sheet',
        category: 'guide',
        link: '/'
    },
        {
            title: 'Back to Basics: Ensuring Legal Trust Accounting Compliance',
            category: 'webinar',
            link: '/'
        },
        {
            title: 'Why Is the Difference between Hard Costs and Soft Costs Important?',
            category: 'article',
            link: '/'
        },
        {
            title: 'Top 10 Things law firms can take away from 2024',
            category: 'infographic',
            link: '/'
        }
    ];

    return (
        <div>
            <div className="w-full max-w-[66.438rem] min-h-[33.438rem] mx-auto relative bg-green rounded-[1.875rem] overflow-hidden flex">
                <div className="grow">
                    <Image
                        src={Img.src}
                        alt="top-articles"
                        width={Img.width}
                        height={Img.height}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-[22.875rem] flex-none p-6 pt-9">
                    {
                        articles.map((article, index) => {
                            return <div key={index} className="border-b border-[#5D8166]/20 last:border-0 pb-1.5 mb-4">
                                <div
                                    className="justify-start text-primary-dark text-xl font-bold mb-0">
                                    {article.title}
                                </div>
                                <div className="justify-start">
                                    <span className="text-[#5d8166] text-base font-normal font-['Inter'] leading-[30px] uppercase">{article.category} | </span>
                                    <CustomLink href={article.link} className="text-[#0c193a] text-base font-normal font-['Inter'] underline leading-[30px]">Read </CustomLink>
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}
