import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import LeftIcon from "@/assets/img/icons/left-arrow-icon.svg";
import RightIcon from "@/assets/img/icons/right-arrow-icon.svg";
import React, { FC, ReactNode } from "react";
import classNames from "classnames";
import "./styles.css";

type Props = {
    items: ReactNode[];
    ref?: any;
    setActiveIndex?: (index: number) => void;
    height?: string;
    className?: string;
};

export const Slider: FC<Props> = ({ items, ref, setActiveIndex, className, height = '34.375rem' }) => {
    return (
        <div>
            <div className={classNames(`slider-wrapper max-w-[33.875rem] flex mx-auto lg:max-w-[203.125rem] relative blocks-slider`, className)} style={{
                height: height,
            }}>
                <Swiper
                    onSwiper={(swiper) => {
                        if (ref) {
                            ref.current = swiper;
                        }
                    }}
                    onSlideChange={(swiper) => {
                        if (setActiveIndex) {
                            setActiveIndex(swiper.realIndex);
                        }
                    }}
                    slidesPerView={1}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    navigation={{
                        enabled: true,
                        nextEl: ".button-next-slide",
                        prevEl: ".button-prev-slide",
                    }}
                    className="max-lg:!pb-12"
                    centeredSlides={true}
                    spaceBetween={20}
                    autoHeight={false}
                    speed={1200}
                    breakpoints={{
                        1024: {
                            slidesPerView: "auto",
                            spaceBetween: 20,
                        },
                    }}
                >
                    {items.map((t, index) => (
                        <SwiperSlide key={index} className={"w-full lg:!w-[66.625rem] !flex items-center h-full"}>
                            <div
                                className={`test h-full w-full mx-auto relative z-10 slide-content overflow-hidden transition-all duration-1200 lg:h-[${height}] lg:max-w-[66.625rem']`}
                            >
                                {t}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="button-prev-slide absolute left-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block z-12">
                    <LeftIcon />
                </div>
                <div className="button-next-slide absolute z-5 right-16 top-[50%] translate-y-[-60%] hidden cursor-pointer lg:block">
                    <RightIcon />
                </div>
            </div>
        </div>
    );
};
