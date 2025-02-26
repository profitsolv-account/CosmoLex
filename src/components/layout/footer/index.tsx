import slide1 from '@/assets/img/sliders/1.png';
import slide2 from '@/assets/img/sliders/2.png';
import slide3 from '@/assets/img/sliders/3.png';
import slide4 from '@/assets/img/sliders/4.png';
import slide5 from '@/assets/img/sliders/5.png';
import OtherCompaniesIcon from '@/assets/img/other-companies.svg';
import Image from 'next/image';
import { Navigations } from './navigations';
import {PageDataType} from "@/types";

export const Footer = ({pageData}: {pageData: PageDataType}) => {

    return (<div className="relative">
        <div className="absolute top-[-100px] left-0 w-full h-full bg-primary z-0 rounded-tr-[100px]" />
        <Navigations pageData={pageData} />
         <div className="w-full relative bg-[#eef8fd] flex items-center justify-center py-5">
            <div className="container max-w-[1266px] flex flex-col justify-between gap-5 items-center lg:flex-row">
                <div className="text-center text-2xl font-bold font-['Inter']">
                    <OtherCompaniesIcon className="max-w-full" />
                </div>
                <div className="grid grid-cols-2 lg:flex lg:justify-center">
                    <a href="#" className="flex justify-center items-center">
                        <Image src={slide1} alt="alt" width={151} height={82} />
                    </a>
                    <a href="#" className="flex justify-center items-center">
                        <Image src={slide2} alt="alt" width={151} height={82} />
                    </a>
                    <a href="#" className="flex justify-center items-center">
                        <Image src={slide3} alt="alt" width={151} height={82} />
                    </a>
                    <a href="#" className="flex justify-center items-center">
                        <Image src={slide4} alt="alt" width={151} height={82} />
                    </a>
                    <a href="#" className="flex justify-center items-center">
                        <Image src={slide5} alt="alt" width={151} height={82} />
                    </a>
                </div>
            </div>
        </div>
    </div>);
   
}