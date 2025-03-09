import {get} from "lodash";
import {PageDataType} from "@/types";
import {FC} from "react";
import classNames from "classnames";

type Props = {
    pageData: PageDataType;
    showCta?: boolean;
    showFeatureImage?: boolean;
    className?: string;
    bgClassName?: string;
}

export const PageHeader:FC<Props> = ({pageData, showFeatureImage, showCta, className, bgClassName}) => {

    const title = get(pageData, 'title', '');
    const description  = get(pageData, 'description', '');
    const subheading = get(pageData, 'subheading', '');

    const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Try for Free');
    const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Request Demo');
    const img = get(pageData, 'hero', null);

    return (
        <div className={classNames(className)}>
            <div className="p-4 bg-primary md:pt-14">
                <div className="container flex flex-col justify-center items-center gap-4">
                    <div className="text-center max-w-[900px]">
                        {subheading &&
                            <div className="relative text-center justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                        }
                        <div className="pt-6 mb-3">
                            <h1 className="home-title text-white text-[46px] font-medium leading-[54px] lg:text-[54px] xl:text-[60px] xl:leading-[60px] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                        </div>
                        <div className="min-h-[61px] text-center text-white text-xl font-normal leading-loose lg:w-full" dangerouslySetInnerHTML={{__html: description}} />

                        {showCta && <div className="flex justify-center items-center gap-4 pb-10">
                            <div className="h-[54px] px-[15px] md:px-[30px] pt-5 pb-[22px] rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                                <a href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</a>
                            </div>
                            <div className="h-[54px]  px-[15px] md:px-[30px] pt-5 pb-[22px] bg-white rounded-[100px] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                                <a href={pageData.settings?.freeTrialLink || ""} className="text-center text-primary-dark text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</a>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
            {showFeatureImage && img && <div className="relative pt-10">
                <div className="flex justify-center relative z-10 px-2">
                    <img src={img} alt={pageData.heroAlt} />
                </div>
                <div className={classNames("absolute h-1/2 top-0 left-0 w-full bg-primary rounded-bl-[50px] md:rounded-bl-[100px] z-0", bgClassName)}/>
            </div>}
        </div>

    )
}