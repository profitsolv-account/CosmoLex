import Image from "next/image";
import {get} from 'lodash';
import heroImg from '@/assets/img/hero.png';
import {PageDataType} from "@/types";
import {FC} from "react";
import {Rating} from "@/components/common/rating";

type Props = {
    pageData: PageDataType
}
export const HomeHeader: FC<Props> = ({pageData}) => {

      const title = get(pageData, 'title', '');
      const description  = get(pageData, 'description', '');
      const img = get(pageData, 'hero', heroImg);
      const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Try for free');
      const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Request demo');

    return <div className=" px-5 pt-10 mb-10 relative">

        <div className="flex flex-col gap-0 items-center lg:flex-row lg:gap-10 lg:items-end lg:justify-center lg:max-w-[80rem] lg:mx-auto lg:pb-10 relative z-2">
            <div className="max-w-[22.0625rem] flex flex-col gap-6 lg:max-w-full lg:pb-10">
                <div className="">
                    <h1 className="home-title text-white text-[2.25rem] font-medium font-['Inter'] leading-[3.375rem] sm:text-[2.875rem] lg:text-[3.375rem] xl:text-[4.625rem] xl:leading-[5rem] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                </div>
                <div className="min-h-[3.8125rem] text-white text-lg font-normal font-['Inter'] leading-loose lg:w-full" dangerouslySetInnerHTML={{__html: description}} />
                <div className="flex justify-center items-center gap-4 max-w-[22.0625rem] lg:justify-start">
                    <div className="h-[3.375rem] px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] rounded-[6.25rem] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                        <a href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</a>
                    </div>
                    <div className="h-[3.375rem]  px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] bg-white rounded-[6.25rem] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                        <a href={pageData.settings?.freeTrialLink || ""} className="text-center text-[#0c193a] text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</a>
                    </div>
                </div>

                <div className=" hidden md:block py-13 ">
                    <Rating />
                </div>
            </div>

            <div className="mt-10 max-w-[22.0625rem] lg:mt-0 lg:max-w-full lg:grow lg:w-[31.4375rem] lg:flex-none xl:w-[43.9375rem] ">
                <Image src={img} alt="alt" width={700} height={600} className="w-full" />
            </div>
        </div>
        <div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[6.25rem] bottom-[5rem]"/>
    </div>
}