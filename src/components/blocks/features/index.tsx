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
        <div className="max-w-[84.5rem] mx-auto bg-salmon rounded-[1.875rem] px-[2.125rem] py-[4.4375rem]">
            <div className="text-center max-w-[46.875rem] mx-auto">
                <div className="text-center text-primary text-base font-normal font-['Inter'] uppercase tracking-wider mb-5">ONE END-TO-END solution</div>
                <h3 className="leading-[2.625rem] text-[2.25rem] text-center text-primary-dark  font-bold font-['Inter'] md:leading-[3.25rem] md:text-[2.875rem] mb-7">All the tools your firm needs to run your business. </h3>
                <p className="text-center text-primary-dark text-base font-normal font-['Inter'] leading-[1.875rem]">
                    Built with the needs of modern small and mid-sized law firms in mind, CosmoLex’s legal practice management software increases efficiency and profitability.
                </p>

                <div className="flex gap-5  items-center flex-col sm:flex-row md:justify-center pt-10">
                    <a href={settings["demoLink"] || ''} className="base-btn md:px-7 hover:bg-primary-dark hover:text-white">Request demo</a>
                    <a href={settings["freeTrialLink"] || ''} className="base-btn md:px-7 bg-primary-dark text-white hover:bg-transparent hover:text-primary-dark">Try for free</a>
                </div>
            </div>

            <div className="relative pt-20">

                <div className="hidden absolute z-11 right-[2.125rem] top-[-0.3125rem] gap-5 lg:flex">
                    <IconRLeft className="button-prev-features w-[2.9375rem] cursor-pointer" />
                    <IconRLeft className="button-next-features w-[2.9375rem] rotate-180 cursor-pointer" />
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
                    {[...features, ...features].map((tool, index) => (
                        <SwiperSlide key={index} className="">
                            <div key={index} className="relative bg-white rounded-[1.25rem] p-[1.5625rem] h-full">
                                <div className="mb-2">
                                    <Check />
                                </div>
                                <div className="">
                                    <div className="">
                                        <div className="text-primary-dark text-xl font-bold font-['Inter'] leading-normal">{tool.title}</div>
                                        <div className="text-primary-dark text-base font-normal font-['Inter'] leading-normal"  dangerouslySetInnerHTML={{__html: tool.description || ''}}/>
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