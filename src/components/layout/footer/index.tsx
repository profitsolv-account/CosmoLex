import slide1 from '@/assets/img/sliders/clearviewsocial.webp';
import slide2 from '@/assets/img/sliders/orionlaw.webp';
import slide3 from '@/assets/img/sliders/rocketmatter.webp';
import slide4 from '@/assets/img/sliders/tabs3.webp';
import slide5 from '@/assets/img/sliders/timesolv.webp';
import OtherCompaniesIcon from '@/assets/img/other-companies.svg';
import Image from 'next/image';
import { Navigations } from './navigations';
import {PageDataType} from "@/types";
import classNames from "classnames";

export const Footer = ({pageData}: {pageData: PageDataType}) => {

    return (<div className="relative">
        <div className={classNames("absolute top-[-0.625rem] left-0 w-full h-full bg-primary z-0 rounded-tr-[1.25rem] md:rounded-tr-[6.25rem]", {
            "top-[-6.25rem]": pageData.footerExtendedBg
        })} />
        <Navigations pageData={pageData} />
         <div className="w-full relative bg-[#eef8fd] flex items-center justify-center py-5 px-2">
            <div className="container max-w-[79.125rem] flex flex-col justify-between gap-5 items-center lg:flex-row">
                <div className="text-center text-2xl font-bold pr-10">
                    <OtherCompaniesIcon className="max-w-[95%] h-10" />
                </div>
                <div className="grid grid-cols-2 lg:flex lg:justify-center">
                    <a href="https://clearviewsocial.com/" className="flex justify-center items-center">
                        <Image src={slide1} alt="clear-view-social" width={151} height={82} />
                    </a>
                    <a href="https://orionlaw.com" className="flex justify-center items-center">
                        <Image src={slide2} alt="orion-law" width={151} height={82} />
                    </a>
                    <a href="https://www.rocketmatter.com" className="flex justify-center items-center">
                        <Image src={slide3} alt="rocket-matter" width={151} height={82} />
                    </a>
                    <a href="https://www.tabs3.com" className="flex justify-center items-center">
                        <Image src={slide4} alt="tabs3" width={151} height={82} />
                    </a>
                    <a href="https://www.timesolv.com" className="flex justify-center items-center">
                        <Image src={slide5} alt="timesolv" width={151} height={82} />
                    </a>
                </div>
            </div>
        </div>
    </div>);
   
}