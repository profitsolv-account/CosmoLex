import Image from "next/image";
import {get} from "lodash";
import heroImg from "@/assets/img/hero.png";
import homeheaderg2 from "@/assets/img/home-images/g2.webp";
import homeheadercapterra from "@/assets/img/home-images/Capterra.png";
import homeheadergetapp from "@/assets/img/home-images/GetApp.png";
import homeheadersoftwareadvice from "@/assets/img/home-images/SoftwareAdvice.png";
import { PageDataType } from "@/types";
import { FC } from "react";
import { Rating } from "@/components/common/rating";
import { CustomLink } from "@/components/ui/customLink";
 
type Props = {
    pageData: PageDataType;
    hideRating?: boolean;
};
export const HomeHeader: FC<Props> = ({ pageData, hideRating }) => {
  const title = get(pageData, "title", "");
  const description = get(pageData, "description", "");
  const img = get(pageData, "hero", heroImg);
  const mediumImage: string = get(pageData, "mediumHero", heroImg.src);
  const ctaTrial = get(
    pageData,
    "page.homePageSections.ctaTextForFreeTrialInHeader",
    "Try for free"
  );
  const demo = get(
    pageData,
    "page.homePageSections.ctaTextForDemoInHeader",
    "Request demo"
  );
 
  return (
<div className=" px-5 pt-10 mb-15 sm:mb-10 relative">
<div className="flex flex-col gap-0 items-center lg:flex-row lg:gap-10 lg:items-end lg:justify-center lg:max-w-[80rem] lg:mx-auto lg:pb-10 relative z-2">
<div className="max-w-[24rem] sm:max-w-[40rem] flex flex-col gap-6 lg:max-w-full lg:pb-10">
<div className="">
<h1
              className="home-title text-white text-[2.25rem] font-medium font-['Inter'] leading-[3.375rem] sm:text-[2.875rem] lg:text-[3.375rem] xl:text-[4.625rem] xl:leading-[5rem] xl:font-normal lg:block"
              dangerouslySetInnerHTML={{ __html: title }}
            />
</div>
<div
            className="min-h-[3.8125rem] text-white text-lg font-normal font-['Inter'] leading-loose lg:w-full"
            dangerouslySetInnerHTML={{ __html: description }}
          />
<div className="w-full flex justify-center items-center gap-4 lg:justify-start">
<div className="h-[3.375rem] px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] rounded-[6.25rem] border border-white justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-white">
<CustomLink
                href={pageData.settings?.demoLink || ""}
                className="text-center text-white text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-primary"
>
                {demo}
</CustomLink>
</div>
<div className="h-[3.375rem]  px-[0.9375rem] md:px-[1.875rem] pt-5 pb-[1.375rem] bg-white rounded-[6.25rem] border justify-center items-center gap-2.5 inline-flex cursor-pointer transition-all duration-300 group hover:bg-primary hover:text-white">
<CustomLink
                href={pageData.settings?.freeTrialLink || ""}
                className="text-center text-[#0c193a] text-base font-normal font-['Inter'] transition-all duration-300 group-hover:text-white"
>
                {ctaTrial}
</CustomLink>
</div>
</div>
 
          <div className=" hidden md:block py-5 pb-10">
            {hideRating ? <div className='gap-4 flex'><Image
            src={homeheaderg2}
            alt="G2"
            height={50}
            width={75}
            className="hidden sm:block"
            priority={true}
          />
            <Image
            src={homeheadercapterra}
            alt="Capterra"
            height={50}
            width={75}
            className="w-full hidden sm:block"
            priority={true}
          />
            <Image
            src={homeheadergetapp}
            alt="GetApp"
            height={50}
            width={75}
            className="w-full hidden sm:block"
            priority={true}
          />
            <Image
            src={homeheadersoftwareadvice}
            alt="Software Advice"
            height={50}
            width={75}
            className="w-full hidden sm:block"
            priority={true}
          /> </div> : <Rating />}
</div>
</div>
 
        <div className="mt-10 max-w-[40rem] lg:mt-0 lg:max-w-full lg:grow lg:w-[31.4375rem] lg:flex-none xl:w-[43.9375rem] ">
<Image
            src={img}
            alt="alt"
            width={700}
            height={600}
            className="w-full hidden sm:block"
            priority={true}
          />
<Image
            src={mediumImage}
            alt="alt"
            width={200}
            height={200}
            className="sm:hidden"
            priority
          />
</div>
</div>
<div className="bg-primary absolute z-0 w-full h-full left-0 rounded-bl-[6.25rem] bottom-[5rem]" />
</div>
  );
};