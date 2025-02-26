// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {SettingsType} from "@/types";
import {FC} from "react";


type Props = {
    setting: SettingsType
}

export const MatterCentric: FC<Props> = ({setting}) => {

    const options = [{
            title: 'Cloud & Browser-Based',
            value: '100',
            type: '%'
        },
        {
            title: 'Time Saved with Workflows' ,
            value: '50',
            type: '%'
        },
        {
            title: 'Reporting Options',
            value: '100',
            type: '+'
        }
    ];

    return <div className="px-4">
        <div className="max-w-[351px] mx-auto bg-green rounded-[30px] pt-[43px] md:max-w-[1064px] md:pt-[75px] relative z-10">
            <div className="px-10 mb-4 md:max-w-[680px] md:mx-auto md:mb-10">
                <h3 className="text-center text-primary-dark text-4xl font-bold font-['Inter'] leading-[48px] mb-4 md:text-[46px] md:leading-[56px]">
                    Matter-centric by design.
                </h3>
                <p className="text-center text-primary-dark text-base font-normal font-['Inter'] leading-[30px]">
                    The only fully built-in matter management and firm accounting solution for small and mid-sized law firms.
                </p>
            </div>
            <div className="px-5 mb-10 md:mb-15">
               <div className="flex gap-5 md:justify-center">
                   <a href={setting["demoLink"] || ''} className="base-btn hover:bg-primary-dark hover:text-white">Request demo</a>
                   <a href={setting["freeTrialLink"] || ''} className="base-btn bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark">Try for free</a>
               </div>
           </div>
            <div className="md:max-w-[690px] md:mx-auto">

                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={0}
                    loop={true}
                    allowTouchMove={true}
                    className="mc-slider"
                >
                    {
                        options.map((option, index) => {
                            return <SwiperSlide key={index}  style={{ width: '215px' }}>
                               <div className="flex flex-col items-center gap-4 md:gap-2">
                                   <div className="w-[177.69px] h-[177.69px] bg-white rounded-[100px] shadow-[0px_17px_60px_-20px_rgba(0,0,0,0.25)] flex items-center justify-center md:w-[100px] md:h-[100px]">
                                       <div className="text-center text-primary-dark text-[64px] font-bold font-['Inter'] leading-[10px] flex items-center justify-center gap-0.5 md:text-[34px] md:leading-[10px]">
                                           <span>{option.value}</span>
                                           <span className="text-primary text-3xl font-medium font-['Inter'] md:text-[17px]">{option.type}</span>
                                       </div>
                                   </div>
                                   <p>{option.title}</p>
                               </div>
                            </SwiperSlide>
                        })
                    }

                </Swiper>



            </div>

            <div className="pl-7 pt-12 md:px-19 md:pt-12">
                <div className="w-full h-[394px] bg-[#ebebeb] rounded-tl-[10px] rounded-tr-[10px]" />
            </div>

        </div>
    </div>
}