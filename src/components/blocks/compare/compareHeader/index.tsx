import {PageDataType} from "@/types";
import {get} from "lodash";
import Image from "next/image";

type Props = {
    pageData: PageDataType
}

export const CompareHeader = ({pageData}:Props) => {

    const title = get(pageData, 'title', '');
    const description  = get(pageData, 'description', '');
    const subheading = get(pageData, 'subheading', '');

    const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Try for Free');
    const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Request Demo');
    const heroImage = get(pageData, 'heroImage', null);

    return <div className="pt-10 mb-10 relative pb-25">
        <div className="px-5 mx-auto max-w-[1100px] justify-center items-center grid md:grid-cols-2 gap-10 relative z-2 md:items-start md:flex-row md:gap-10">
            <div className="">

                {subheading &&
                    <div className="relative text-left justify-start text-green text-base font-normal uppercase tracking-wider">{subheading}</div>
                }
                <div className="pt-6 mb-3">
                    <h1 className="text-left home-title text-white text-[46px] font-medium leading-[46px] md:text-[52px] md:leading-[52px] md:font-normal lg:block"
                        dangerouslySetInnerHTML={{__html: title}}
                    />
                </div>
                <div className="min-h-[61px] text-left text-white text-base font-semibold leading-relaxed"
                     dangerouslySetInnerHTML={{__html: description}}
                />
                <div className="flex justify-center items-center gap-4 pb-10">
                    <div
                        className="h-[54px] px-[15px] md:px-[30px] pt-5 pb-[22px] rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                        <a href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</a>
                    </div>
                    <div className="h-[54px]  px-[15px] md:px-[30px] pt-5 pb-[22px] bg-white rounded-[100px] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                        <a href={pageData.settings?.freeTrialLink || ""} className="text-center text-primary-dark text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</a>
                    </div>
                </div>

            </div>
            <div className="flex justify-center md:pl-10 md:pt-10">
                {heroImage && <Image src={heroImage.node.sourceUrl} alt={heroImage.node.altText} width={heroImage?.node.mediaDetails.width} height={heroImage?.node.mediaDetails.height} />}
            </div>
        </div>

        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[100px] bottom-[0px]"/>
    </div>
}