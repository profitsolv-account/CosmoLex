import {get} from "lodash";
import {PageDataType} from "@/types";
import {FC} from "react";
import classNames from "classnames";
import Image from 'next/image';

type Props = {
    pageData: PageDataType;
    showCta?: boolean;
    showFeatureImage?: boolean;
    className?: string;
    bgClassName?: string;
    containerClassName?: string;
    hideContent?: boolean;
}

export const PageHeader:FC<Props> = ({pageData, showFeatureImage, showCta, className, bgClassName, containerClassName, hideContent}) => {

    const title = get(pageData, 'title', '');
    const description  = get(pageData, 'description', '');
    const subheading = get(pageData, 'subheading', '');

    const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Try for Free');
    const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Request Demo');
    const heroImage = get(pageData, 'heroImage', null);

    return (
        <div className={classNames(className)}>
            <div className="p-4 bg-primary md:pt-14">
                <div className="container flex flex-col justify-center items-center gap-4">
                    <div className={classNames("text-center max-w-[56.25rem]", containerClassName)}>
                        {subheading &&
                            <div className="relative text-center justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                        }

                        <div className="pt-6 mb-3">
                            <h1 className="home-title text-white text-[2.875rem] font-medium leading-[3.375rem] lg:text-[3.375rem] xl:text-[3.75rem] xl:leading-[3.75rem] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                        </div>
                        {!hideContent && <div className="min-h-[3.8125rem] text-center text-white text-xl font-normal leading-loose lg:w-full mb-8" dangerouslySetInnerHTML={{__html: description}} />}

                        {showCta && <div className="flex justify-center items-center gap-4 pb-10">
                            <div className="h-[3.375rem] px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] rounded-[6.25rem] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                                <a href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</a>
                            </div>
                            <div className="h-[3.375rem]  px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] bg-white rounded-[6.25rem] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                                <a href={pageData.settings?.freeTrialLink || ""} className="text-center text-primary-dark text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</a>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            {showFeatureImage && heroImage && <div className="relative pt-10">
                <div className="flex justify-center relative z-10 px-2">
                    <Image
                        src={heroImage?.node.sourceUrl}
                        alt={heroImage?.node.altText}
                        width={heroImage?.node.mediaDetails.width}
                        height={heroImage?.node.mediaDetails.height}
                    />
                </div>
                <div className={classNames("absolute h-1/2 top-0 left-0 w-full bg-primary rounded-bl-[3.125rem] md:rounded-bl-[6.25rem] z-0", bgClassName)}/>
            </div>}
        </div>

    )
}