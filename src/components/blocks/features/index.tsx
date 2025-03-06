import Check from "@/assets/img/icons/check.svg";
import {PageDataType, SettingsType} from "@/types";
import {get} from "lodash";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import IconRLeft from "@/assets/img/icons/left-rounded-icon.svg";
import classNames from "classnames";

type Props = {
    pageData: PageDataType;
    className?: string;
}

export const Features = ({pageData, className}: Props) => {
    const settings = get(pageData, "settings", {}) as SettingsType;
    const features = get(pageData, "features", []) || [];

    return <div id="features" className={classNames("px-2 relative z-10 pt-10 md:pt-22 features-block", className)}>
        <div className="max-w-[1352px] mx-auto bg-salmon rounded-[30px] px-[34px] py-[71px]">
            <div className="text-center max-w-[750px] mx-auto">
                <div className="text-center text-primary text-base font-normal font-['Inter'] uppercase tracking-wider mb-5">ONE END-TO-END solution</div>
                <h3 className="leading-[42px] text-[36px] text-center text-primary-dark  font-bold font-['Inter'] md:leading-[52px] md:text-[46px] mb-7">All the tools your firm needs to run your business. </h3>
                <p className="text-center text-primary-dark text-base font-normal font-['Inter'] leading-[30px]">
                    Built with the needs of modern small and mid-sized law firms in mind, CosmoLex’s legal practice management software increases efficiency and profitability.
                </p>

                <div className="flex gap-5  items-center flex-col sm:flex-row md:justify-center pt-10">
                    <a href={settings["demoLink"] || ''} className="base-btn md:px-7 hover:bg-primary-dark hover:text-white">Request demo</a>
                    <a href={settings["freeTrialLink"] || ''} className="base-btn md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark">Try for free</a>
                </div>
            </div>

            <div className="relative pt-20">

                <div className="hidden absolute z-11 right-[34px] top-[-5px] gap-5 lg:flex">
                    <IconRLeft className="button-prev-features w-[47px] cursor-pointer" />
                    <IconRLeft className="button-next-features w-[47px] rotate-180 cursor-pointer" />
                </div>

                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    speed={1200}
                    allowTouchMove={true}
                    modules={[Navigation]}
                    navigation={{
                        enabled: true,
                        nextEl: '.button-next-features',
                        prevEl: '.button-prev-features',
                    }}
                    breakpoints={{
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                >
                    {features.map((tool, index) => (
                        <SwiperSlide key={index} className="">
                            <div key={index} className="relative bg-white rounded-[20px] p-[25px] h-full">
                                <div className="mb-2">
                                    <Check />
                                </div>
                                <div className="">
                                    <div className="">
                                        <div className="text-primary-dark text-xl font-bold font-['Inter'] leading-normal">{tool.title}</div>
                                        <div className="text-primary-dark text-base font-normal font-['Inter'] leading-normal">{tool.description}</div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>



            </div>
        </div>
    </div>
}