import {get} from "lodash";
import classNames from "classnames";
import React, {ReactNode} from "react";
import {PostDataType} from "@/types/post";
import Image from "next/image";
import TagsIcon from "@/assets/img/tagsIcon.svg";

type Props = {
    pageData: PostDataType;
    className?: string;
    rightSideContent?: ReactNode
}

export const PostHeader = ({pageData, className}:Props) => {
    const title = get(pageData, 'title', '');
    const subheading = get(pageData, 'subheading', '');
    const description  = get(pageData, 'description', '');
    const categories = get(pageData, 'categories', []);
    const tags = get(pageData, 'tags', []);

    const formatTitle = (title: string) => {
        if (title.includes('<span>') || !title.includes(':')) return title;
        const splitted = title.split(':');
        return `${splitted[0]}:<br /> <span>${splitted[1]}</span>`;
    }

    return <div className={classNames("pt-18 relative mb-25 px-5 pb-5", className)}>

        <div className="mx-auto max-w-[62rem] justify-start items-center grid md:grid-cols-2 gap-2 lg:items-start relative z-2 lg:flex-row lg:gap-14 pb-6 ">
            <div className="justify-start text-green text-base font-normal uppercase tracking-wider">
                {categories.join(', ')}
            </div>
        </div>
        <div className="mx-auto max-w-[62rem] justify-center items-center grid md:grid-cols-2 gap-2 lg:items-start relative z-2 lg:flex-row lg:gap-9">
            <div>
                {subheading &&
                    <div
                        className="relative text-left justify-start text-green text-base font-normal uppercase tracking-wider pb-6">{subheading}</div>
                }
                <div className="mb-9">

                    <h1
                        className="text-left home-title text-white text-[2.875rem] font-medium leading-[2.875rem] md:leading-[100%] md:text-[3.75rem] md:font-normal lg:block tracking-[2.2px]"
                        style={{ fontFeatureSettings: "'liga' off, 'clig' off" }}
                        dangerouslySetInnerHTML={{__html: formatTitle(title)}}
                    />
                </div>
                {description &&
                    <div
                        className="min-h-[3.8125rem] text-left text-white text-xl font-normal leading-loose lg:w-full mb-8"
                        dangerouslySetInnerHTML={{__html: description}}
                    />
                }

                {!!tags.length && <div className="flex justify-start items-center gap-4 pb-10">
                    <div className="flex gap-2 text-white items-center flex-wrap">
                        <div className="flex items-center gap-1 text-white text-base font-normal leading-loose whitespace-nowrap mr-2">
                            <TagsIcon className="w-[0.938rem] h-[0.813rem]" /> Tags:
                        </div>
                        {
                            tags.map((tag, index) => {
                                return <div key={index} className="inline-block px-[0.813rem] py-0.5 bg-primary-dark rounded-[1.875rem] text-white text-base font-normal leading-loose whitespace-nowrap">
                                    {tag}
                                </div>
                            })
                        }
                    </div>
                </div>}
            </div>
            <div className="flex justify-center relative md:pl-6">
                {pageData.featuredImage && <>
                    <section className="container text-center">
                        <div className="inline-block rounded-[1.875rem] overflow-hidden">
                                <Image
                                    src={pageData.featuredImage?.node.sourceUrl}
                                    alt={pageData.featuredImage?.node.altText}
                                    width={pageData.featuredImage?.node.mediaDetails.width}
                                    height={pageData.featuredImage?.node.mediaDetails.height}
                                />
                        </div>
                    </section>
                </>}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] bottom-[0rem]"/>
    </div>
}