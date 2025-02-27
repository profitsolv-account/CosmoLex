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
      const ctaTrial = get(pageData, 'page.homePageSections.ctaTextForFreeTrialInHeader', 'Register');
      const demo = get(pageData, 'page.homePageSections.ctaTextForDemoInHeader', 'Demo');

    return <div className="bg-primary px-5 pt-10 rounded-bl-[50px] mb-30">

        <div className="flex flex-col gap-0 items-center lg:flex-row lg:gap-10 lg:justify-center lg:max-w-[1280px] lg:mx-auto lg:pb-10 relative">
            <div className="max-w-[353px] flex flex-col gap-6 lg:max-w-full lg:mt-32">
                <div className="pt-6">
                    <div className="home-title text-white text-[46px] font-medium font-['Inter'] leading-[54px] lg:text-[54px] xl:text-[74px] xl:leading-[80px] xl:font-normal lg:block" dangerouslySetInnerHTML={{__html: title}} />
                </div>
                <div className="w-[324px] min-h-[61px] text-white text-lg font-normal font-['Inter'] leading-loose lg:w-full" dangerouslySetInnerHTML={{__html: description}} />
                <div className="flex justify-center items-center gap-4 ax-w-[353px] lg:justify-start">
                    <div className="h-[54px] px-[30px] pt-5 pb-[22px] rounded-[100px] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
                        <a href={pageData.settings?.demoLink || ""} className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary">{demo}</a>
                    </div>
                    <div className="h-[54px] px-[30px] pt-5 pb-[22px] bg-white rounded-[100px] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
                        <a href={pageData.settings?.freeTrialLink || ""} className="text-center text-[#0c193a] text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white">{ctaTrial}</a>
                    </div>
                </div>

                <Rating />
            </div>

            <div className="max-w-[353px] lg:max-w-full lg:grow lg:w-[503px] lg:flex-none xl:w-[703px] ">
                <Image src={img} alt="alt" width={100} height={100} className="w-full relative top-30" />
            </div>
        </div>
    </div>
}