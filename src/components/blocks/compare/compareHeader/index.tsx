import {PageDataType} from "@/types";
import {get} from "lodash";
import Image from "next/image";
import classNames from "classnames";
import {CustomLink} from "@/components/ui/customLink";

type Props = {
    pageData: PageDataType;
    className?: string;
    hideCta?: boolean;
    contentClassName?: string;
}

export const CompareHeader = ({pageData, className, hideCta, contentClassName}:Props) => {

    const title = get(pageData, 'title', '');
    const description  = get(pageData, 'description', '');
    const subheading = get(pageData, 'subheading', '');

    const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Try for free');
    const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Request demo');
    const heroImage = get(pageData, 'heroImage', null);

    return <div className={classNames("pt-10 mb-10 relative pb-15", className)}>
        <div className={classNames("px-5 mx-auto max-w-[68.75rem] justify-center items-center grid md:grid-cols-2 gap-10 relative z-2 md:items-start md:flex-row md:gap-14", contentClassName)}>
            <div className="">

                {subheading &&
                    <div className="relative text-left justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                }
                <div className="pt-6 mb-6">
                    <h1 className="text-left home-title text-white text-[2.875rem] font-medium leading-[2.875rem] md:text-[3.25rem] md:leading-[3.25rem] md:font-normal lg:block"
                        dangerouslySetInnerHTML={{__html: title}}
                    />
                </div>
                <div className="min-h-[3.8125rem] text-left text-white text-base font-normal leading-relaxed mb-10"
                     dangerouslySetInnerHTML={{__html: description}}
                />
                {!hideCta && <div className="flex justify-start items-center gap-4 pb-10">
                    <div
                        className="h-[3.375rem] px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] rounded-[6.25rem] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                        <CustomLink useDefault href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</CustomLink>
                    </div>
                    <div className="h-[3.375rem]  px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] bg-white rounded-[6.25rem] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                        <CustomLink useDefault href={pageData.settings?.freeTrialLink || ""} className="text-center text-primary-dark text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</CustomLink>
                    </div>
                </div>}

            </div>
            <div className="flex justify-center md:pl-10 md:pt-13">
                {heroImage && <Image src={heroImage.node.sourceUrl} alt={heroImage.node.altText} width={heroImage?.node.mediaDetails.width} height={heroImage?.node.mediaDetails.height} />}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[6.25rem] bottom-[0rem]"/>
    </div>
}